import type {
  HALF_DAY_TYPES,
  LEAVE_STATUSES,
} from '@/constants/leave.constant';

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
  processed_by: string | null;
  processed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  requested_at: string;
};

export type LeaveRequests = LeaveRequestDTO[];

export type HalfDayType = (typeof HALF_DAY_TYPES)[number];

export type Leave_status = (typeof LEAVE_STATUSES)[number];

export type LeaveRequestFormValue = Pick<
  LeaveRequestDTO,
  'leave_type_id' | 'start_date' | 'end_date' | 'half_day_type' | 'reason'
>;

export type LeaveApprovalDTO = LeaveRequestDTO & {
  start_date: string;
  end_date: string;
  leave_type_id: {
    id: number;
    name: string;
  };
  users: {
    id: string;
    name: string;
    departments: { name: string };
    positions: { name: string };
  };
  approver: {
    id: string;
    name: string;
  };
};

export type LeaveApprovals = LeaveApprovalDTO[];
