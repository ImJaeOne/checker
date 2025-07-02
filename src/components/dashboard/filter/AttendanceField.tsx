import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import RadioOption from '@/components/ui/RadioOption';

const attendanceOptions = [
  { id: 'normal', label: '정상 출퇴근', value: 'normal' },
  { id: 'missed-in', label: '출근 누락', value: 'missed-in' },
  { id: 'missed-out', label: '퇴근 누락', value: 'missed-out' },
];

const AttendanceField = () => {
  return (
    <FormField
      name="attendance"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>출퇴근 여부</FormLabel>
          <FormControl>
            <RadioGroup
              defaultValue={field.value}
              onValueChange={field.onChange}
              className="flex flex-wrap gap-2"
            >
              {attendanceOptions.map((option) => (
                <RadioOption key={option.id} {...option} />
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AttendanceField;
