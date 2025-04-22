
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import { Check } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState<any>(null);
  
  useEffect(() => {
    // Retrieve loan completion data
    const completionData = sessionStorage.getItem('loanCompleted');
    if (completionData) {
      setLoanData(JSON.parse(completionData));
    } else {
      // Redirect if no completion data exists
      navigate('/');
    }
  }, [navigate]);
  
  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'KES' ? 'KSh' : 
                  currency === 'USD' ? '$' : 
                  currency === 'EUR' ? '€' : 
                  currency === 'GBP' ? '£' : 'KSh';
    
    return `${symbol} ${amount.toLocaleString()}`;
  };
  
  const handleGoHome = () => {
    // Clear session storage and go back to home
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="app-container">
      <LoanAppHeader 
        title="Application Successful!" 
        subtitle="Your loan has been approved and is being processed"
        progress={100}
      />
      
      <main className="flex-1 px-4 py-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-ncba-green flex items-center justify-center mb-6">
          <Check className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-semibold text-ncba-blue mb-2">Congratulations!</h2>
        <p className="text-gray-600 mb-8">
          Your loan application has been successfully processed.
        </p>
        
        {loanData && (
          <div className="bg-white border rounded-lg p-5 w-full max-w-sm mb-8">
            <h3 className="font-semibold mb-4">Loan Details</h3>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-medium">{formatCurrency(loanData.approvedAmount, loanData.currency)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-medium">{loanData.interestRate}% p.a.</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure:</span>
                <span className="font-medium">{loanData.tenure} months</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-medium">{formatCurrency(loanData.monthlyPayment, loanData.currency)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Disbursement:</span>
                <span className="font-medium text-ncba-green">In Process</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-ncba-lightBlue p-4 rounded-lg text-left w-full max-w-sm mb-8">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-ncba-green mt-0.5 mr-2 flex-shrink-0" />
              <span>Your loan will be disbursed within 24 hours</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-ncba-green mt-0.5 mr-2 flex-shrink-0" />
              <span>You will receive an SMS notification once funds are transferred</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-ncba-green mt-0.5 mr-2 flex-shrink-0" />
              <span>A welcome email with loan details will be sent to you</span>
            </li>
          </ul>
        </div>
        
        <Button onClick={handleGoHome} className="btn-primary">
          Return to Home
        </Button>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default Success;
