import {
  ATTENDANCE_STATUS,
  ATTENDANCE_TYPES,
  type PostAttendance,
} from '@/constants/attendance.constant';
import { DB } from '@/constants/db.constant';
import type { AttendanceState } from '@/types/DTO/attendances.dto';
import type { UserId } from '@/types/DTO/user.dto';
import { parseAttendanceStateFromDB } from '@/utils/createAttendanceState.util';
import { formatDateToYMD, formatTimeToHMS } from '@/utils/date.util';
import { supabase } from '@/utils/supabase';
import {
  getUserWorkStartTime,
  getTodayAttendanceRecord,
  isLateAttendance,
  createAttendanceRecord,
  updateCheckOutTime,
} from '@/services/attendances.service';

/**
 * 오늘 날짜 기준으로 해당 사용자의 출근/퇴근 상태를 조회합니다.
 *
 * @param id - 출근/퇴근 상태를 조회할 사용자 ID
 * @returns 출근/퇴근 상태 및 시간 정보 (AttendanceState)
 *  - status: 'not-checked' | 'checked-in' | 'checked-out'
 *  - checkInTime: 출근 시간 (있을 경우)
 *  - checkOutTime: 퇴근 시간 (있을 경우)
 *  - date: 해당 날짜
 * @throws {Error}
 */
export const getAttendance = async (id: UserId): Promise<AttendanceState> => {
  const today = formatDateToYMD(new Date());

  const { data: attendanceState, error } = await supabase
    .from(DB.ATTENDANCES)
    .select('*')
    .eq('user_id', id)
    .eq('date', today)
    .maybeSingle();

  if (error) {
    throw new Error('출근 여부 확인 실패');
  }

  return parseAttendanceStateFromDB(attendanceState);
};

/**
 * 출근 또는 퇴근 처리를 수행합니다.
 *
 * - 출근 기록이 없으면 출근, 이미 출근 기록이 있으면 퇴근 처리
 * - 출근 시 지각 여부를 판단하여 상태를 기록합니다.
 *
 * @param id - 출근/퇴근 처리할 사용자 ID
 * @returns 'check-in' | 'check-out' (출근/퇴근 처리 결과)
 * @throws {Error}
 */
export const postAttendance = async (id: UserId): Promise<PostAttendance> => {
  const now = new Date();
  const date = formatDateToYMD(now);
  const time = formatTimeToHMS(now);

  // 사용자 출근 기준 시간 조회
  const scheduledStartTime = await getUserWorkStartTime(id);

  // 오늘 출근 기록 조회
  const existingRecord = await getTodayAttendanceRecord(id, date);

  if (existingRecord && existingRecord.id) {
    // 이미 출근 기록 있음 → 퇴근 처리
    const { error: updateError } = await updateCheckOutTime(
      existingRecord.id,
      time,
    );
    if (updateError) {
      throw new Error('퇴근 기록 실패');
    }
    return ATTENDANCE_STATUS.CHECKED_OUT;
  } else {
    // 출근 기록 없음 → 출근 처리
    const isLate = isLateAttendance(time, scheduledStartTime);
    const status = isLate ? ATTENDANCE_TYPES.LATE : ATTENDANCE_TYPES.PRESENT;
    const { error: insertError } = await createAttendanceRecord(
      id,
      date,
      time,
      status,
    );
    if (insertError) {
      throw new Error('출근 기록 실패');
    }
    return ATTENDANCE_STATUS.CHECKED_IN;
  }
};
