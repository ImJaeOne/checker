import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { UserSignInDTO } from '@/types/DTO/user.dto';
import { signInSchema } from '@/schemas/auth.shema';

const signInDefaultValue: UserSignInDTO = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<UserSignInDTO>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValue,
  });

  const isFormInvalid = !form.getValues('email') || !form.getValues('password');

  const onSubmit = (data: UserSignInDTO) => {
    setIsPending(true);
    // TODO 로그인 함수 처리
    console.log('data', data);
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="이메일 형식의 아이디를 입력해 주세요"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  autoComplete="false"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isPending || isFormInvalid}
        >
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
