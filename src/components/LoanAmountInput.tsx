
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import CurrencySelect from './CurrencySelect';
import { cn } from '@/lib/utils';

interface LoanAmountInputProps {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  minAmount: number;
  maxAmount: number;
  step?: number;
  className?: string;
  availableCurrencies?: Array<{code: string; name: string; symbol: string;}>;
}

const LoanAmountInput: React.FC<LoanAmountInputProps> = ({
  value,
  onChange,
  currency,
  onCurrencyChange,
  minAmount,
  maxAmount,
  step = 1000,
  className,
  availableCurrencies = [
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ],
}) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const currencySymbol = availableCurrencies.find(c => c.code === currency)?.symbol || 'KSh';

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Parse formatted number to remove commas
  const parseFormattedNumber = (str: string): number => {
    return parseInt(str.replace(/,/g, ''), 10) || 0;
  };

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(formatNumber(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and commas
    const newValue = e.target.value.replace(/[^\d,]/g, '');
    setInputValue(newValue);

    // Parse the input value and update if it's a valid number
    const parsedValue = parseFormattedNumber(newValue);
    if (!isNaN(parsedValue)) {
      onChange(Math.min(Math.max(parsedValue, minAmount), maxAmount));
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    const value = newValue[0];
    onChange(value);
    setInputValue(formatNumber(value));
  };

  const handleInputBlur = () => {
    // Format the number with commas on blur
    const parsedValue = parseFormattedNumber(inputValue);
    const boundedValue = Math.min(Math.max(parsedValue, minAmount), maxAmount);
    setInputValue(formatNumber(boundedValue));
    onChange(boundedValue);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label htmlFor="loan-amount" className="text-sm font-medium">
            Loan Amount
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">{currencySymbol}</span>
            </div>
            <Input
              id="loan-amount"
              className="pl-10"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
        <CurrencySelect
          value={currency}
          onChange={onCurrencyChange}
          currencies={availableCurrencies}
        />
      </div>

      <Slider
        value={[value]}
        min={minAmount}
        max={maxAmount}
        step={step}
        onValueChange={handleSliderChange}
        className="mt-6"
      />

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{currencySymbol} {formatNumber(minAmount)}</span>
        <span>{currencySymbol} {formatNumber(maxAmount)}</span>
      </div>
    </div>
  );
};

export default LoanAmountInput;
