export const ATTENDANCE_TYPES = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EARLY_LEAVE: 'early_leave',
  HOLIDAY: 'holiday',
} as const;

export const ATTENDANCE_STATUS = {
  NOT_CHECKED: 'not_checked',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
} as const;

export type PostAttendance = Exclude<
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS],
  'not_checked'
>;
