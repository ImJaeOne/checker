import z from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해 주세요' }),
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' }),
  name: z.string().min(1, { message: '이름을 입력해 주세요' }),
  department_id: z.number(),
  phone: z.string().min(10, { message: '전화번호를 입력해 주세요' }),
  position: z.string().min(1, { message: '직급을 선택해 주세요' }),
});

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});
