import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import RadioOption from '@/components/ui/RadioOption';

const leaveOptions = [
  { id: 'annual', label: '연차', value: 'annual' },
  { id: 'half-day', label: '반차', value: 'half-day' },
  { id: 'monthly', label: '월차', value: 'monthly' },
  { id: 'sick-leave', label: '병가', value: 'sick-leave' },
];

const LeaveField = () => {
  return (
    <FormField
      name="leave"
      render={({ field }) => (
        <FormItem className="flex-1">
          <div>휴가 사용 여부</div>
          <FormControl>
            <RadioGroup
              defaultValue={field.value}
              onValueChange={field.onChange}
              className="flex flex-wrap gap-2"
            >
              {leaveOptions.map((option) => (
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

export default LeaveField;
