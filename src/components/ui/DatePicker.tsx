import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DatePickerProps {
  id: string;
  label: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: string;
}

export function DatePicker({
  id,
  label,
  value,
  onChange,
  error,
}: DatePickerProps) {
  return (
    <FormItem className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              id={id}
              variant="outline"
              className={cn(
                'w-[180px] pl-3 text-left font-normal',
                !value && 'text-muted-foreground',
              )}
            >
              {value ? (
                format(value, 'PPP', { locale: ko })
              ) : (
                <span>{label} 선택</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date('2000-01-01')
            }
            captionLayout="dropdown"
            required
          />
        </PopoverContent>
      </Popover>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
}
