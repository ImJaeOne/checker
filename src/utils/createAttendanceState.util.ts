import { ATTENDANCE_STATUS } from '@/constants/attendance.constant';
import { formatDateToYMD } from '@/utils/date.util';
import type {
  AttendanceState,
  AttendanceStatus,
} from '@/types/DTO/attendances.dto';

export const createAttendanceState = (
  status: AttendanceStatus,
  date?: string,
  check_in_time?: string,
  check_out_time?: string,
): AttendanceState => ({
  status,
  check_in_time,
  check_out_time,
  date,
});

/**
 * Supabase에서 받아온 출근/퇴근 row 데이터를 AttendanceState로 변환합니다.
 *
 * @param data - Supabase에서 받아온 출근/퇴근 row 데이터(혹은 null)
 * @returns 변환된 AttendanceState 객체
 */
export const parseAttendanceStateFromDB = (
  data: AttendanceState | null,
): AttendanceState => {
  const today = formatDateToYMD(new Date());

  if (!data) {
    return createAttendanceState(ATTENDANCE_STATUS.NOT_CHECKED, today);
  }

  const hasCheckedIn = data.check_in_time && !data.check_out_time;
  const hasCheckedOut = data.check_in_time && data.check_out_time;

  if (hasCheckedIn) {
    return createAttendanceState(
      ATTENDANCE_STATUS.CHECKED_IN,
      data.date,
      data.check_in_time,
    );
  }

  if (hasCheckedOut) {
    return createAttendanceState(
      ATTENDANCE_STATUS.CHECKED_OUT,
      data.date,
      data.check_in_time,
      data.check_out_time,
    );
  }

  return createAttendanceState(
    ATTENDANCE_STATUS.NOT_CHECKED,
    data.date ?? today,
  );
};
