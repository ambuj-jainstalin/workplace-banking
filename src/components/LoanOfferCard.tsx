
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface LoanOfferCardProps {
  requestedAmount: number;
  approvedAmount: number;
  currency: string;
  interestRate: number;
  tenure: number;
  monthlyPayment: number;
  onAccept: () => void;
  onReject: () => void;
  className?: string;
}

const LoanOfferCard: React.FC<LoanOfferCardProps> = ({
  requestedAmount,
  approvedAmount,
  currency,
  interestRate,
  tenure,
  monthlyPayment,
  onAccept,
  onReject,
  className,
}) => {
  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Get currency symbol
  const getCurrencySymbol = (code: string): string => {
    switch (code) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'KES': 
      default: return 'KSh';
    }
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <div className="bg-ncba-blue text-white p-4">
        <h3 className="text-xl font-semibold">Your Loan Offer</h3>
        <p className="text-sm opacity-80">Review and accept your personalized offer</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="text-sm text-gray-500">Requested Amount</p>
            <p className="text-lg">{symbol} {formatNumber(requestedAmount)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Approved Amount</p>
            <p className="text-lg font-semibold text-ncba-green">{symbol} {formatNumber(approvedAmount)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="text-lg font-medium">{interestRate}% p.a.</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Tenure</p>
            <p className="text-lg font-medium">{tenure} Months</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg col-span-2">
            <p className="text-sm text-gray-500">Monthly Payment</p>
            <p className="text-lg font-medium">{symbol} {formatNumber(monthlyPayment)}</p>
          </div>
        </div>

        <div className="bg-ncba-lightBlue p-3 rounded-lg">
          <h4 className="font-medium mb-2">Loan Features:</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-ncba-green mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Competitive interest rate</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-ncba-green mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">No hidden fees or charges</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-ncba-green mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Quick disbursement within 24 hours</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <Button onClick={onAccept} className="w-full bg-ncba-green">
            Accept Offer
          </Button>
          <Button onClick={onReject} variant="outline" className="w-full text-ncba-blue border-ncba-blue">
            Decline Offer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoanOfferCard;
