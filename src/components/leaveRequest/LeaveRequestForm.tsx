import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetLeaveTypesQuery } from '@/hooks/useLeaveTypesQuery';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDownIcon } from 'lucide-react';

import { leaveRequestSchema } from '@/schemas/leaveRequest.shema';
import type {
  LeaveRequestDTO,
  LeaveRequestFormValue,
} from '@/types/DTO/leaveRequests.dto';
import {
  HALF_DAY_TYPE_LABELS,
  HALF_DAY_TYPES,
} from '@/constants/leaveRequests.constant';
import { useNavigate } from 'react-router-dom';
import SITE_MAP from '@/constants/siteMap.constant';
import { postLeaveRequests } from '@/apis/leaveRequests.api';

const leaveRequestDefaultValue: LeaveRequestFormValue = {
  leave_type_id: 1,
  start_date: new Date(),
  end_date: new Date(),
  half_day_type: undefined,
  reason: '',
};

const LeaveRequestForm = () => {
  const navigate = useNavigate();
  const { data: leaveTypes } = useGetLeaveTypesQuery();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LeaveRequestFormValue>({
    mode: 'onBlur',
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: leaveRequestDefaultValue,
  });

  const watchedLeaveTypeId = form.watch('leave_type_id');
  const watchedStartDate = form.watch('start_date');
  const watchedEndDate = form.watch('end_date');
  const totalDaysPreview = calcTotalDays(
    watchedLeaveTypeId,
    watchedStartDate,
    watchedEndDate,
  );

  const onSubmit = async (data: LeaveRequestFormValue): Promise<void> => {
    setIsPending(true);
    try {
      const total_days = calcTotalDays(
        data.leave_type_id,
        data.start_date,
        data.end_date,
      );
      await postLeaveRequests({ ...data, total_days } as LeaveRequestDTO);
      alert('연차 신청 완료');
      navigate(SITE_MAP.DASHBOARD);
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const leaveTypeId = form.watch('leave_type_id');
  const startDate = form.watch('start_date');

  useEffect(() => {
    if (leaveTypeId === 2 && startDate) {
      form.setValue('end_date', startDate, { shouldValidate: true });
    }
  }, [leaveTypeId, startDate, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          <FormField
            control={form.control}
            name="leave_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>휴가 구분</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {leaveTypes?.map((leaveType) => (
                      <SelectItem
                        key={leaveType.id}
                        value={String(leaveType.id)}
                      >
                        {leaveType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch('leave_type_id') === 2 && (
            <FormField
              control={form.control}
              name="half_day_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>반차 구분</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="반차 구분 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {HALF_DAY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {HALF_DAY_TYPE_LABELS[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작 일자</FormLabel>
                <Popover open={openStart} onOpenChange={setOpenStart}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-between w-48 font-normal"
                    >
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 overflow-hidden"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpenStart(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch('leave_type_id') !== 2 && (
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>종료 일자</FormLabel>
                  <Popover open={openEnd} onOpenChange={setOpenEnd}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="end-date"
                        className="justify-between w-48 font-normal"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : 'Select date'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 overflow-hidden"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenEnd(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div>
          <FormField
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>신청 사유</FormLabel>
                <Textarea placeholder="신청 사유를 입력하세요" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4 text-sm text-right text-gray-600">
          총 연차 일수: <span className="font-bold">{totalDaysPreview}</span>일
        </div>
        <Button disabled={isPending}>신청하기</Button>
      </form>
    </Form>
  );
};

export default LeaveRequestForm;

/**
 * 휴가 신청 기간의 총 일수를 계산합니다 (주말 제외)
 *
 * @param {number} leave_type_id - 휴가 타입 ID (2: 반차, 기타: 연차)
 * @param {Date} start_date - 휴가 시작일
 * @param {Date} end_date - 휴가 종료일
 * @returns {number} 계산된 총 휴가 일수
 *
 * @description
 * - 반차(leave_type_id === 2)인 경우: 0.5일 반환
 * - 연차인 경우: 시작일부터 종료일까지 평일(월~금)만 카운트
 * - 주말(토요일, 일요일)은 휴가 일수에서 제외
 * - 시작일이 종료일보다 늦은 경우: 0 반환
 * - 날짜가 없는 경우: 기본값 1 반환
 */
const calcTotalDays = (
  leave_type_id: number,
  start_date: Date,
  end_date?: Date,
) => {
  if (leave_type_id === 2) return 0.5;

  if (start_date && end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (start > end) return 0;

    let totalDays = 0;
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return totalDays;
  }

  return 1;
};
