import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

export type Option = {
  value: string;
  label: string;
};

type ComboboxProps = {
  id: string;
  options: Option[];
  placeholder?: string;
  emptyMessage?: string;
  selectedValue?: string;
  onSelect: (value: string) => void;
};

const Combobox = ({
  id,
  options,
  placeholder = '선택하세요.',
  emptyMessage = '검색 결과가 없습니다.',
  selectedValue = '',
  onSelect,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="검색..." className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onSelect(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedValue === option.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
