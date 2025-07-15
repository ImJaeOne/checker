import { HALF_DAY_TYPES } from '@/constants/leaveRequests.constant';
import z from 'zod';

export const leaveRequestSchema = z
  .object({
    leave_type_id: z.number(),
    start_date: z.date(),
    end_date: z.date().optional(),
    half_day_type: z.enum(HALF_DAY_TYPES).optional(),
    reason: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.leave_type_id === 2) {
      if (!data.half_day_type) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '반차 구분을 선택해 주세요.',
          path: ['half_day_type'],
        });
      }
    } else {
      if (!data.end_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '종료일자를 입력해 주세요.',
          path: ['end_date'],
        });
      } else if (data.start_date > data.end_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '종료일자는 시작일자보다 빠를 수 없습니다.',
          path: ['end_date'],
        });
      }
    }
  });
