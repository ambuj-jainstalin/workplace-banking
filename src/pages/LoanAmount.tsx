import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import LoanAmountInput from '@/components/LoanAmountInput';
import LoanTenureInput from '@/components/LoanTenureInput';
import { useToast } from '@/hooks/use-toast';

const LoanAmount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState(24); // Default 2 years
  const [currency, setCurrency] = useState('KES');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [hasExistingLoan, setHasExistingLoan] = useState(false);
  
  // For the purposes of the demo, we'll set min and max amounts
  const minAmount = 10000;
  const maxAmount = 1000000;
  
  // Loan tenure constraints
  const minTenure = 6; // 6 months
  const maxTenure = 72; // 6 years
  
  // Set of currencies the user is eligible for
  const [eligibleCurrencies, setEligibleCurrencies] = useState([
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  ]);
  
  useEffect(() => {
    // Simulate API check if user is existing customer with loan
    // In a real app, this would be an API call to check customer status
    setTimeout(() => {
      // Randomize for demo purposes
      const isExisting = Math.random() > 0.5;
      setIsExistingCustomer(isExisting);
      
      if (isExisting) {
        // Check if customer has existing loan
        setHasExistingLoan(Math.random() > 0.7);
        
        // Determine eligible currencies (more for existing customers)
        if (Math.random() > 0.4) {
          setEligibleCurrencies([
            { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
            { code: 'USD', name: 'US Dollar', symbol: '$' },
            { code: 'EUR', name: 'Euro', symbol: '€' },
            { code: 'GBP', name: 'British Pound', symbol: '£' },
          ]);
        }
      }
    }, 1000);
  }, []);

  const calculateMonthlyPayment = () => {
    // Simple interest calculation for demo purposes
    const annualRate = 0.13; // 13% p.a.
    const monthlyRate = annualRate / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                          (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(monthlyPayment);
  };
  
  const handleSubmit = () => {
    if (amount < minAmount || amount > maxAmount) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: `Please enter an amount between ${minAmount} and ${maxAmount}`,
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Store loan request details
    sessionStorage.setItem('loanRequest', JSON.stringify({
      amount,
      currency,
      tenure,
      monthlyPayment: calculateMonthlyPayment(),
      isTopUp: hasExistingLoan,
    }));
    
    // Simulate backend validation checks
    setTimeout(() => {
      setIsProcessing(false);
      
      if (hasExistingLoan) {
        // Navigate to top-up flow
        toast({
          title: "Existing Loan Detected",
          description: "We'll process this as a top-up loan",
        });
        navigate('/document-upload');
      } else {
        // Regular flow - proceed to document upload
        navigate('/document-upload');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoanAppHeader 
        title="Loan Amount" 
        subtitle="Select your preferred loan amount and tenure"
        progress={40}
      />
      
      <main className="flex-1 flex justify-center items-start py-6">
        <div className="w-full max-w-md px-4">
          <div className="space-y-6">
            {isExistingCustomer && (
              <div className="bg-ncba-lightBlue p-4 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Welcome back!</span> {' '}
                  {hasExistingLoan 
                    ? 'We noticed you have an existing loan. This will be processed as a top-up loan.' 
                    : 'As a returning customer, you may be eligible for special rates.'}
                </p>
              </div>
            )}
            
            <LoanAmountInput
              value={amount}
              onChange={setAmount}
              currency={currency}
              onCurrencyChange={setCurrency}
              minAmount={minAmount}
              maxAmount={maxAmount}
              step={5000}
              availableCurrencies={eligibleCurrencies}
            />

            <LoanTenureInput
              value={tenure}
              onChange={setTenure}
              minTenure={minTenure}
              maxTenure={maxTenure}
            />
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Loan Summary</h3>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500">Monthly Payment:</span>
                  <span className="font-medium">{currency === 'KES' ? 'KSh' : currency} {calculateMonthlyPayment().toLocaleString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Interest Rate:</span>
                  <span>13% p.a.</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Processing Fee:</span>
                  <span>2.5% of loan amount</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Total Tenure:</span>
                  <span>{tenure} months</span>
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={handleSubmit} 
              className="btn-primary w-full mt-6"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  Processing...
                </span>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default LoanAmount;
