import type {
  ATTENDANCE_STATUS,
  ATTENDANCE_TYPES,
} from '@/constants/attendance.constant';

type AttendanceType = keyof typeof ATTENDANCE_TYPES;

export type AttendanceDTO = {
  id: number;
  date: Date;
  check_in_time: Date;
  check_out_time: Date;
  work_times: number;
  overtime_hour: number;
  late_minutes: number;
  early_leave_minutes: number;
  status: AttendanceType;
  notes: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

export type AttendancesDTO = AttendanceDTO[];

export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export type AttendanceState = {
  status: AttendanceStatus;
  check_in_time?: string;
  check_out_time?: string;
  date?: string;
};
