
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import OTPInput from '@/components/OTPInput';
import { useToast } from '@/hooks/use-toast';

const OTPVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  
  useEffect(() => {
    // Get stored mobile number
    const storedMobile = sessionStorage.getItem('mobileNumber');
    if (storedMobile) {
      setMobileNumber(storedMobile);
    } else {
      // Redirect back to mobile verification if no mobile number is found
      navigate('/mobile-verification');
    }
    
    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  const handleOTPComplete = (otp: string) => {
    console.log('OTP entered:', otp);
    
    // For demo purposes, we'll just accept any 6-digit OTP
    if (otp.length === 6) {
      toast({
        title: "Verification successful",
        description: "Your mobile number has been verified",
      });
      
      // Navigate to personal info page
      navigate('/personal-info');
    }
  };
  
  const handleResendOTP = () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsResending(false);
      setCountdown(30);
      
      toast({
        title: "New verification code sent",
        description: `A new verification code has been sent to ${mobileNumber}`,
      });
      
      // Reset countdown and start it again
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="app-container">
      <LoanAppHeader 
        title="Verify Your Mobile Number" 
        subtitle="Please enter the verification code sent to your mobile"
        progress={20}
      />
      
      <main className="flex-1 px-4 py-6">
        <div className="text-center mb-6">
          <div className="text-sm text-gray-600 mb-1">Code sent to</div>
          <div className="font-medium">{mobileNumber}</div>
        </div>
        
        <div className="space-y-8">
          <OTPInput
            length={6}
            onComplete={handleOTPComplete}
            className="justify-center gap-2"
          />
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              onClick={handleResendOTP}
              disabled={countdown > 0 || isResending}
              className="text-ncba-blue"
            >
              {isResending ? (
                <span className="flex items-center">
                  <span className="h-4 w-4 rounded-full border-2 border-ncba-blue border-t-transparent animate-spin mr-2"></span>
                  Resending...
                </span>
              ) : countdown > 0 ? (
                `Resend code in ${countdown}s`
              ) : (
                'Resend Code'
              )}
            </Button>
          </div>
        </div>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default OTPVerification;
