import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import { useToast } from '@/hooks/use-toast';

const MobileVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{
    mobile?: string;
    terms?: string;
  }>({});

  const validateMobile = (number: string) => {
    // Simple Kenyan mobile number validation
    // Should start with 07, 01, or +254, followed by 8-9 digits
    const kenyanMobileRegex = /^(?:(?:\+254)|(?:0))[17][0-9]{8}$/;
    return kenyanMobileRegex.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate mobile number
    if (!mobileNumber.trim()) {
      setErrors(prev => ({ ...prev, mobile: 'Mobile number is required' }));
      return;
    }
    
    if (!validateMobile(mobileNumber)) {
      setErrors(prev => ({ ...prev, mobile: 'Please enter a valid Kenyan mobile number' }));
      return;
    }
    
    // Validate terms acceptance
    if (!acceptTerms) {
      setErrors(prev => ({ ...prev, terms: 'You must accept the terms and conditions' }));
      return;
    }
    
    // Proceed to OTP verification
    toast({
      title: "Verification code sent",
      description: `A verification code has been sent to ${mobileNumber}`,
    });
    
    // Store mobile number in session storage for later use
    sessionStorage.setItem('mobileNumber', mobileNumber);
    
    // Navigate to OTP verification
    navigate('/otp-verification');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoanAppHeader 
        title="Mobile Verification" 
        subtitle="Please enter your mobile number to get started"
        progress={10}
      />
      
      <main className="flex-1 flex justify-center items-start py-6">
        <div className="w-full max-w-md px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <Label htmlFor="mobile-number" className="form-label">Mobile Number</Label>
              <Input
                id="mobile-number"
                type="tel"
                placeholder="e.g. 0712345678"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className={errors.mobile ? 'border-ncba-red' : ''}
              />
              {errors.mobile && <p className="form-error">{errors.mobile}</p>}
              <p className="form-helper">Please enter your Safaricom, Airtel, or Telkom Kenya mobile number</p>
            </div>
            
            <div className="form-group">
              <div className="flex items-start space-x-2">
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
                    I agree to the ACME Bank <a href="#" className="text-ncba-blue underline">Terms of Service</a> and <a href="#" className="text-ncba-blue underline">Privacy Policy</a>
                  </Label>
                  {errors.terms && <p className="form-error">{errors.terms}</p>}
                </div>
              </div>
            </div>
            
            <Button type="submit" className="btn-primary mt-6">
              Continue
            </Button>
          </form>
        </div>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default MobileVerification;
