import { ATTENDANCE_TYPES } from '@/constants/attendance.constant';
import { DB } from '@/constants/db.constant';
import type { AttendanceState } from '@/types/DTO/attendances.dto';
import type { UserId } from '@/types/DTO/user.dto';
import { parseAttendanceStateFromDB } from '@/utils/createAttendanceState.utis';
import { formatDateToYMD } from '@/utils/date.util';
import { supabase } from '@/utils/supabase';

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
export const postAttendance = async (
  id: UserId,
): Promise<'check-in' | 'check-out'> => {
  const now = new Date();
  const time = now.toTimeString().slice(0, 8);
  const date = now.toISOString().slice(0, 10);

  // 사용자 출근 시간 조회
  const { data: userData, error: userError } = await supabase
    .from(DB.USERS)
    .select('work_start_time')
    .eq('id', id)
    .maybeSingle();

  if (userError || !userData) {
    throw new Error('사용자 정보를 가져올 수 없습니다.');
  }

  const scheduledStartTime = userData.work_start_time;

  // 해당 날짜에 이미 출근한 기록이 있는지 확인
  const { data: existingRecord, error: fetchError } = await supabase
    .from(DB.ATTENDANCES)
    .select('*')
    .eq('user_id', id)
    .eq('date', date)
    .maybeSingle();

  if (fetchError) {
    throw new Error('출근 기록 조회 실패');
  }

  if (existingRecord) {
    // 이미 출근 기록 있음 → 퇴근 처리
    const { error: updateError } = await supabase
      .from(DB.ATTENDANCES)
      .update({
        check_out_time: time,
        updated_at: now.toISOString(),
      })
      .eq('id', existingRecord.id);

    if (updateError) {
      throw new Error('퇴근 기록 실패');
    }
    return 'check-out';
  } else {
    // 출근 기록 없음 → 출근 처리
    const isLate = time > scheduledStartTime;

    const status = isLate ? ATTENDANCE_TYPES.LATE : ATTENDANCE_TYPES.PRESENT;

    const { error: insertError } = await supabase.from(DB.ATTENDANCES).insert({
      user_id: id,
      date,
      check_in_time: time,
      status,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    });

    if (insertError) {
      throw new Error('출근 기록 실패');
    }
    return 'check-in';
  }
};
