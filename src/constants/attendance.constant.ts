export const ATTENDANCE_TYPES = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EARLY_LEAVE: 'early_leave',
  HOLIDAY: 'holiday',
} as const;

export const ATTENDANCE_STATUS = {
  NOT_CHECKED: 'not-checked',
  CHECKED_IN: 'checked-in',
  CHECKED_OUT: 'checked-out',
} as const;

export type PostAttendance = Exclude<
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS],
  'not-checked'
>;
