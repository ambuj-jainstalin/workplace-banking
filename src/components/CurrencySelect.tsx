
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
  className?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  currencies,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-24", className)}>
        <SelectValue placeholder={currencies[0]?.code || 'KES'} />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2">
              <span>{currency.code}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
