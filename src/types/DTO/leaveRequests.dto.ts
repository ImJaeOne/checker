import type {
  HALF_DAY_TYPES,
  LEAVE_STATUSES,
} from '@/constants/leaveRequests.constant';

export type LeaveRequestDTO = {
  id: number;
  user_id: string;
  leave_type_id: number;
  start_date: Date;
  end_date?: Date;
  half_day_type?: HalfDayType;
  total_days: number;
  reason: string;
  status: Leave_status;
  approved_by: string;
  approved_at: string;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
};

export type HalfDayType = (typeof HALF_DAY_TYPES)[number];

export type Leave_status = (typeof LEAVE_STATUSES)[number];

export type LeaveRequestFormValue = Pick<
  LeaveRequestDTO,
  'leave_type_id' | 'start_date' | 'end_date' | 'half_day_type' | 'reason'
>;
