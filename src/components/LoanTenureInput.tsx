import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface LoanTenureInputProps {
  value: number;
  onChange: (value: number) => void;
  minTenure: number;
  maxTenure: number;
  step?: number;
}

const LoanTenureInput = ({
  value,
  onChange,
  minTenure,
  maxTenure,
  step = 6
}: LoanTenureInputProps) => {
  const formatTenure = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} months`;
    } else if (remainingMonths === 0) {
      return years === 1 ? '1 year' : `${years} years`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <Label className="text-sm font-medium">Loan Tenure</Label>
          <div className="text-2xl font-semibold text-ncba-blue">
            {formatTenure(value)}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {formatTenure(minTenure)} - {formatTenure(maxTenure)}
        </div>
      </div>

      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={minTenure}
        max={maxTenure}
        step={step}
        className="w-full"
      />

      <div className="grid grid-cols-3 text-xs text-gray-500">
        <div>Short term</div>
        <div className="text-center">Medium term</div>
        <div className="text-right">Long term</div>
      </div>
    </div>
  );
};

export default LoanTenureInput; 