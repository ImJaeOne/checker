import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { usePostAttendanceMutation } from '@/hooks/usePostAttendanceMutation';
import { ATTENDANCE_STATUS } from '@/constants/attendance.constant';
import type { UserWithPositionDTO } from '@/types/DTO/user.dto';
import type { AttendanceState } from '@/types/DTO/attendances.dto';

interface AttendanceButtonsProps {
  user: UserWithPositionDTO;
  attendanceState: AttendanceState;
}

const AttendanceBtn = ({ user, attendanceState }: AttendanceButtonsProps) => {
  const { mutate: attendanceMutation, isPending: isMutating } =
    usePostAttendanceMutation();

  const onClickCheckIn = () => {
    if (
      !isMutating &&
      attendanceState.status === ATTENDANCE_STATUS.NOT_CHECKED
    ) {
      attendanceMutation(user.id);
    }
  };

  const onClickCheckOut = () => {
    if (
      !isMutating &&
      attendanceState.status === ATTENDANCE_STATUS.CHECKED_IN
    ) {
      attendanceMutation(user.id);
    }
  };

  const isCheckInDisabled =
    isMutating || attendanceState.status !== ATTENDANCE_STATUS.NOT_CHECKED;
  const isCheckOutDisabled =
    isMutating || attendanceState.status !== ATTENDANCE_STATUS.CHECKED_IN;

  const checkInTime = attendanceState.check_in_time;
  const checkOutTime = attendanceState.check_out_time;

  return (
    <>
      <DropdownMenuItem
        onClick={onClickCheckIn}
        disabled={isCheckInDisabled}
        className={isCheckInDisabled ? 'text-gray-400' : ''}
      >
        <span>출근</span>
        {checkInTime && (
          <span className="ml-2 text-xs text-gray-700">{checkInTime}</span>
        )}
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={onClickCheckOut}
        disabled={isCheckOutDisabled}
        className={isCheckOutDisabled ? 'text-gray-400' : ''}
      >
        <span>퇴근</span>
        {checkOutTime && (
          <span className="ml-2 text-xs text-gray-700">{checkOutTime}</span>
        )}
      </DropdownMenuItem>
    </>
  );
};

export default AttendanceBtn;
