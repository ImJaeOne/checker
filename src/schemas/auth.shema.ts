import z from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해 주세요' }),
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' }),
  name: z.string().min(1, { message: '이름을 입력해 주세요' }),
  department_id: z.number(),
  phone: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, {
    message: '올바른 휴대전화 번호 형식이 아닙니다',
  }),
  position_id: z.number().min(1, { message: '직급을 선택해 주세요' }),
});

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});
