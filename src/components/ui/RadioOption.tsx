import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';

type RadioOptionProps = {
  id: string;
  label: string;
  value: string;
};

const RadioOption = ({ id, label, value }: RadioOptionProps) => (
  <div className="flex items-center gap-3">
    <RadioGroupItem value={value} id={id} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

export default RadioOption;
