import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateOfBirthPickerProps {
  dob: Date | undefined;
  setDob: (date: Date | undefined) => void;
  error?: string;
}

const DateOfBirthPicker = ({ dob, setDob, error }: DateOfBirthPickerProps) => {
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 70);
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - 18);

  return (
    <div className="form-group">
      <Label htmlFor="dob" className="form-label">Date of Birth</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dob"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dob && "text-muted-foreground",
              error && "border-ncba-red"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dob ? format(dob, "PPP") : <span>Select your date of birth</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dob}
            onSelect={setDob}
            defaultMonth={maxDate}
            fromDate={minDate}
            toDate={maxDate}
            captionLayout="dropdown-buttons"
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="form-error">{error}</p>}
      <p className="text-xs text-gray-500 mt-1">You must be between 18 and 70 years old</p>
    </div>
  );
};

export default DateOfBirthPicker;
