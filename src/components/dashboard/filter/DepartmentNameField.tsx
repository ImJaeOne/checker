import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Combobox from '@/components/ui/Combobox';
import { useFormContext } from 'react-hook-form';

const departmentOptions = [
  { value: '', label: '전체' },
  { value: 'dev', label: '개발팀' },
  { value: 'design', label: '디자인팀' },
  { value: 'plan', label: '기획팀' },
];

const DepartmentNameField = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="department"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>부서/구성원</FormLabel>
          <FormControl>
            <div className="flex gap-2">
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
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DepartmentNameField;
