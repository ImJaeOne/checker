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
