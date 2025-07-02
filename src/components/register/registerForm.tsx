import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserSignUpDTO } from '@/types/DTO/user.dto';
import { signUpSchema } from '@/schemas/auth.shema';

const signUpDefaultValue: UserSignUpDTO = {
  email: '',
  password: '',
  name: '',
  department_id: 1,
  phone: '',
  position: '',
};

const RegisterForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<UserSignUpDTO>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValue,
  });

  const isFormInvalid = Object.values(form.getValues()).some((value) => !value);

  const onSubmit = (data: UserSignUpDTO) => {
    setIsPending(true);
    // TODO 회원가입 처리
    console.log(data);
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
              <FormMessage />
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
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="성함을 입력해 주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>휴대전화</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="전화번호를 입력해 주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>부서</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="부서를 선택해 주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">개발팀</SelectItem>
                  <SelectItem value="2">디자인팀</SelectItem>
                  <SelectItem value="3">기획팀</SelectItem>
                  <SelectItem value="4">QA팀</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>직급</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="직급을 선택해 주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="임원">임원</SelectItem>
                  <SelectItem value="부장">부장</SelectItem>
                  <SelectItem value="차장">차장</SelectItem>
                  <SelectItem value="과장">과장</SelectItem>
                  <SelectItem value="대리">대리</SelectItem>
                  <SelectItem value="주임">주임</SelectItem>
                  <SelectItem value="사원">사원</SelectItem>
                  <SelectItem value="인턴">인턴</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isPending || isFormInvalid}
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
