import type { LeaveType } from '@/types/DTO/leaveType.dto';

export const HALF_DAY_TYPES = ['morning', 'afternoon'] as const;

export const HALF_DAY_TYPE_LABELS = {
  morning: '오전 반차',
  afternoon: '오후 반차',
} as const;

export const LEAVE_STATUSES = [
  'pending',
  'approved',
  'rejected',
  'cancelled',
] as const;

export const LEAVE_STATUSES_LABELS = {
  pending: '대기',
  approved: '승인',
  rejected: '반려',
  cancelled: '취소',
};

export const LEAVE_TYPE_ID = {
  ANNUAL: 1,
  HALF_DAY: 2,
  SICK: 3,
  MONTH: 4,
} as const;

export const LEAVE_DAYS: Record<LeaveType, number> = {
  ANNUAL: 1,
  HALF_DAY: 0.5,
  SICK: 1,
  MONTH: 1,
} as const;
