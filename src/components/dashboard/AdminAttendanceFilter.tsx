import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { attendanceFilterSchema } from '@/schemas/attendance.schema';
import DateRangeField from './filter/DateRangeField';
import DepartmentNameField from './filter/DepartmentNameField';
import AttendanceField from './filter/AttendanceField';
import LeaveField from './filter/LeaveField';

const AdminAttendanceFilter = () => {
  const form = useForm<z.infer<typeof attendanceFilterSchema>>({
    resolver: zodResolver(attendanceFilterSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      department: '',
      name: '',
      attendance: 'normal',
      leave: 'annual',
    },
  });

  const onSubmit = (data: z.infer<typeof attendanceFilterSchema>) => {
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          <DateRangeField />
          <DepartmentNameField />
        </div>
        <div className="flex gap-6">
          <AttendanceField />
          <LeaveField />
        </div>
        <Button type="submit">조회</Button>
      </form>
    </FormProvider>
  );
};

export default AdminAttendanceFilter;
