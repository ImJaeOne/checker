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
    <fieldset className="flex-1">
      <legend>기간</legend>
      <div className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="startDate" className="sr-only">
                시작일
              </FormLabel>
              <FormControl>
                <DatePicker
                  id="startDate"
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

        <FormField
          control={form.control}
          name="endDate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="endDate" className="sr-only">
                종료일
              </FormLabel>
              <FormControl>
                <DatePicker
                  id="endDate"
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
    </fieldset>
  );
};

export default DateRangeField;
