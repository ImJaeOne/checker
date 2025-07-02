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
    <fieldset className="flex-1">
      <legend className="text-sm font-medium mb-2">부서/구성원</legend>
      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="department"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="department" className="sr-only">
                부서 선택
              </FormLabel>
              <FormControl>
                <Combobox
                  id="department"
                  options={departmentOptions}
                  placeholder="부서를 선택하세요"
                  emptyMessage="존재하지 않는 부서입니다."
                  selectedValue={field.value}
                  onSelect={field.onChange}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="sr-only">
                구성원 이름
              </FormLabel>
              <FormControl>
                <Input id="name" placeholder="구성원 이름 입력" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
    </fieldset>
  );
};

export default DepartmentNameField;
