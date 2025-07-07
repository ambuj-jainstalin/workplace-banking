import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import LoanOfferCard from '@/components/LoanOfferCard';
import { useToast } from '@/hooks/use-toast';

const LoanOffer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [loanDetails, setLoanDetails] = useState({
    requestedAmount: 0,
    approvedAmount: 0,
    currency: 'KES',
    interestRate: 13.5,
    tenure: 24,
    monthlyPayment: 0,
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load loan request details and calculate offer
  useEffect(() => {
    const storedRequest = sessionStorage.getItem('loanRequest');
    
    if (storedRequest) {
      const { amount, currency } = JSON.parse(storedRequest);
      
      // Simulate loan eligibility check (usually done on backend)
      setTimeout(() => {
        // For demo purposes, approve 80-100% of requested amount
        const approvalFactor = 0.8 + Math.random() * 0.2;
        const approvedAmount = Math.floor(amount * approvalFactor / 1000) * 1000;
        
        // Simple monthly payment calculation
        // In reality, this would use proper amortization formulas
        const monthlyRate = 13.5 / 100 / 12;
        const tenure = 24;
        const monthlyPayment = Math.ceil(
          (approvedAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
          (Math.pow(1 + monthlyRate, tenure) - 1)
        );
        
        setLoanDetails({
          requestedAmount: amount,
          approvedAmount,
          currency,
          interestRate: 13.5,
          tenure,
          monthlyPayment,
        });
        
        setIsLoading(false);
      }, 2000);
    } else {
      // Handle missing loan request data
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load loan request details",
      });
      navigate('/loan-amount');
    }
  }, [navigate, toast]);
  
  const handleAcceptOffer = () => {
    setShowTerms(true);
  };
  
  const handleRejectOffer = () => {
    // Navigate to a regret page or back to loan amount
    toast({
      title: "Offer Declined",
      description: "Your loan offer has been declined",
    });
    navigate('/');
  };
  
  const handleFinalSubmit = () => {
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate final submission and account creation
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store completion data
      sessionStorage.setItem('loanCompleted', JSON.stringify({
        ...loanDetails,
        completedAt: new Date().toISOString(),
      }));
      
      // Navigate to success page
      navigate('/success');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoanAppHeader 
        title={showTerms ? "Terms & Conditions" : "Your Loan Offer"} 
        subtitle={showTerms ? "Please review and accept the terms" : "Review your personalized loan offer"}
        progress={90}
      />
      
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-md px-4 py-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="h-12 w-12 rounded-full border-4 border-ncba-blue border-t-transparent animate-spin mb-4"></div>
              <p className="text-gray-600">Calculating your personalized offer...</p>
            </div>
          ) : showTerms ? (
            <div className="space-y-6">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Loan Agreement Summary</h3>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium">Loan Amount:</span> {loanDetails.currency} {loanDetails.approvedAmount.toLocaleString()}</p>
                  <p><span className="font-medium">Interest Rate:</span> {loanDetails.interestRate}% p.a.</p>
                  <p><span className="font-medium">Term:</span> {loanDetails.tenure} months</p>
                  <p><span className="font-medium">Monthly Payment:</span> {loanDetails.currency} {loanDetails.monthlyPayment.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Terms and Conditions</h3>
                <div className="text-xs text-gray-600 space-y-2">
                  <p>This Personal Loan Agreement ("Agreement") is entered into between you, the borrower, and NCBA BANK ("Lender"), on the date of your acceptance of this offer.</p>
                  
                  <h4 className="font-medium mt-3">1. Loan Details</h4>
                  <p>The Lender agrees to provide you with a personal loan under the terms and conditions set forth in this Agreement.</p>
                  
                  <h4 className="font-medium mt-3">2. Repayment</h4>
                  <p>You agree to repay the loan amount plus interest in monthly installments as specified in your loan offer. Payments are due on the same day each month and will continue until the loan is paid in full.</p>
                  
                  <h4 className="font-medium mt-3">3. Interest Rate</h4>
                  <p>The annual interest rate for this loan is fixed at the rate specified in your loan offer. Interest is calculated on a reducing balance basis.</p>
                  
                  <h4 className="font-medium mt-3">4. Fees and Charges</h4>
                  <p>You will be charged a one-time processing fee of 2.5% of the loan amount, which will be deducted from the disbursed amount. Late payment fees of 5% of the overdue amount may apply for payments not received by the due date.</p>
                  
                  <h4 className="font-medium mt-3">5. Early Repayment</h4>
                  <p>You may repay the loan in full or in part before the end of the loan term. An early repayment fee of 3% of the amount being prepaid may apply.</p>
                  
                  <h4 className="font-medium mt-3">6. Default</h4>
                  <p>If you fail to make a payment when due, or breach any other term of this Agreement, the Lender may declare the entire unpaid balance immediately due and payable.</p>
                  
                  <h4 className="font-medium mt-3">7. Credit Reporting</h4>
                  <p>The Lender may report information about your account to credit bureaus. Late payments, missed payments, or other defaults on your account may be reflected in your credit report.</p>
                  
                  <h4 className="font-medium mt-3">8. Governing Law</h4>
                  <p>This Agreement shall be governed by and construed in accordance with the laws of Kenya.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 py-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                />
                <div>
                  <Label 
                    htmlFor="terms" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    I have read, understood, and agree to the terms and conditions of this loan agreement
                  </Label>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={handleFinalSubmit} 
                  className="btn-primary w-full"
                  disabled={!acceptTerms || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    'Confirm and Submit'
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full text-ncba-blue border-ncba-blue"
                  onClick={() => setShowTerms(false)}
                  disabled={isSubmitting}
                >
                  Back to Offer
                </Button>
              </div>
            </div>
          ) : (
            <LoanOfferCard
              requestedAmount={loanDetails.requestedAmount}
              approvedAmount={loanDetails.approvedAmount}
              currency={loanDetails.currency}
              interestRate={loanDetails.interestRate}
              tenure={loanDetails.tenure}
              monthlyPayment={loanDetails.monthlyPayment}
              onAccept={handleAcceptOffer}
              onReject={handleRejectOffer}
            />
          )}
        </div>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default LoanOffer;
