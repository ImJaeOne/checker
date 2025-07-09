import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { UserSignInDTO } from '@/types/DTO/user.dto';
import { signInSchema } from '@/schemas/auth.shema';
import { signIn } from '@/apis/auth.api';
import { useNavigate } from 'react-router-dom';
import SITE_MAP from '@/constants/siteMap.constant';

const signInDefaultValue: UserSignInDTO = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<UserSignInDTO>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValue,
  });

  const watchedValues = form.watch();
  const isFormInvalid = Object.values(watchedValues).some((value) => !value);

  const onSubmit = async (data: UserSignInDTO) => {
    setIsPending(true);
    try {
      const { error } = await signIn(data);
      if (error) {
        alert(error);
        return;
      }
      alert('로그인이 완료되었습니다.');
      navigate(SITE_MAP.DASHBOARD);
    } catch (error) {
      alert('에러 발생');
      console.error(error);
    } finally {
      setIsPending(false);
    }
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
