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
import { signUp } from '@/apis/auth.api';
import { formatPhoneNumber } from '@/utils/formatNumber.util';
import { useGetDepartmentsQuery } from '@/hooks/useDepartmentsQuery';
import { useGetPositionsQuery } from '@/hooks/usePositionsQuery';
import { useNavigate } from 'react-router-dom';
import SITE_MAP from '@/constants/siteMap.constant';

const signUpDefaultValue: UserSignUpDTO = {
  email: '',
  password: '',
  name: '',
  phone: '',
  department_id: 1,
  position_id: 2,
};

const RegisterForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { data: departments } = useGetDepartmentsQuery();
  const { data: positions } = useGetPositionsQuery();
  const navigate = useNavigate();

  const form = useForm<UserSignUpDTO>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValue,
  });

  const watchedValues = form.watch();
  const isFormInvalid = Object.values(watchedValues).some((value) => !value);

  const onSubmit = async (data: UserSignUpDTO): Promise<void> => {
    setIsPending(true);
    try {
      const { error } = await signUp(data);
      if (error) {
        console.log(error);
        alert(error);
        return;
      }
      alert('회원가입이 완료되었습니다.');
      navigate(SITE_MAP.LOGIN);
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다.');
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
                  onChange={(e) => {
                    const value = formatPhoneNumber(e.target.value);
                    field.onChange(value);
                  }}
                  maxLength={13} // 010-1234-5678
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
                  {departments?.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={String(department.id)}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>직급</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="직급을 선택해 주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions?.map((position) => (
                    <SelectItem key={position.id} value={String(position.id)}>
                      {position.name}
                    </SelectItem>
                  ))}
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
