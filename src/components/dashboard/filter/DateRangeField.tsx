import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { DatePicker } from '@/components/ui/DatePicker';
import { useFormContext } from 'react-hook-form';

const DateRangeField = () => {
  const form = useFormContext();

  return (
    <div className="flex-1">
      <FormLabel>기간</FormLabel>
      <div className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  label="시작일"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span>~</span>
        <FormField
          control={form.control}
          name="endDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  label="종료일"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DateRangeField;
