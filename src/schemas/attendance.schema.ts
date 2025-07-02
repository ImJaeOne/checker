import z from 'zod';

export const attendanceFilterSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    department: z.string().optional(),
    name: z.string().optional(),
    attendance: z.string().optional(),
    leave: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      (data.startDate && data.endDate && data.endDate >= data.startDate),
    {
      message: '종료일은 시작일 이후여야 합니다.',
      path: ['endDate'],
    },
  );
