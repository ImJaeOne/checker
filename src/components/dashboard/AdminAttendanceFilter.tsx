'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@/components/ui/DatePicker';
import Combobox from '@/components/ui/Combobox';
import RadioOption from '@/components/ui/RadioOption';
import { RadioGroup } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

const FormSchema = z
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

const departmentOptions = [
  { value: '', label: '전체' },
  { value: 'dev', label: '개발팀' },
  { value: 'design', label: '디자인팀' },
  { value: 'plan', label: '기획팀' },
];

const attendanceOptions = [
  { id: 'normal', label: '정상 출퇴근', value: 'normal' },
  { id: 'missed-in', label: '출근 누락', value: 'missed-in' },
  { id: 'missed-out', label: '퇴근 누락', value: 'missed-out' },
];

const leaveOptions = [
  { id: 'annual', label: '연차', value: 'annual' },
  { id: 'half-day', label: '반차', value: 'half-day' },
  { id: 'monthly', label: '월차', value: 'monthly' },
  { id: 'sick-leave', label: '병가', value: 'sick-leave' },
];

const AdminAttendanceFilter = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      department: '',
      name: '',
      attendance: 'normal',
      leave: 'annual',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const payload = {
      startDate: data.startDate ?? '전체',
      endDate: data.endDate ?? '전체',
      department: data.department || '전체',
      name: data.name || '전체',
      attendance: data.attendance || '전체',
      leave: data.leave || '전체',
    };

    console.log('payload:', payload);
    alert('Success');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex">
          <div className="flex items-center gap-2 flex-1">
            <span>기간</span>
            <DatePicker
              label="시작일"
              value={form.watch('startDate')}
              onChange={(date) => form.setValue('startDate', date)}
              error={form.formState.errors.startDate?.message}
            />
            <span>~</span>
            <DatePicker
              label="종료일"
              value={form.watch('endDate')}
              onChange={(date) => form.setValue('endDate', date)}
              error={form.formState.errors.endDate?.message}
            />
          </div>

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 flex-1">
                <span>부서/구성원</span>
                <div className="flex gap-2 flex-1">
                  <Combobox
                    options={departmentOptions}
                    placeholder="부서를 선택하세요"
                    emptyMessage="존재하지 않는 부서입니다."
                    selectedValue={field.value}
                    onSelect={field.onChange}
                  />
                  <Input
                    placeholder="구성원 이름 입력"
                    value={form.watch('name') ?? ''}
                    onChange={(e) => form.setValue('name', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex">
          <Controller
            control={form.control}
            name="attendance"
            render={({ field }) => (
              <div className="flex gap-2 flex-1">
                <span>출퇴근 여부</span>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-2"
                >
                  {attendanceOptions.map((option) => (
                    <RadioOption key={option.id} {...option} />
                  ))}
                </RadioGroup>
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="leave"
            render={({ field }) => (
              <div className="flex gap-2 flex-1">
                <span>휴가 사용 여부</span>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-2"
                >
                  {leaveOptions.map((option) => (
                    <RadioOption key={option.id} {...option} />
                  ))}
                </RadioGroup>
              </div>
            )}
          />
        </div>

        <Button type="submit">조회</Button>
      </form>
    </Form>
  );
};

export default AdminAttendanceFilter;
