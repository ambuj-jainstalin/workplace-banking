
import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  className?: string;
  inputClassName?: string;
}

const OTPInput = ({
  length = 6,
  onComplete,
  className,
  inputClassName,
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize inputRefs with correct length
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    const missingRefs = length - inputRefs.current.length;
    if (missingRefs > 0) {
      inputRefs.current = [
        ...inputRefs.current,
        ...Array(missingRefs).fill(null),
      ];
    }
  }, [length]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take only the last character if multiple were pasted/entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const newOtpString = newOtp.join('');
    if (newOtpString.length === length && onComplete) {
      onComplete(newOtpString);
    }
  };

  // Handle key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move focus left on arrow left
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move focus right on arrow right
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is valid
    if (!/^\d+$/.test(pastedData)) return;
    
    // Fill the OTP fields with the pasted digits
    const newOtp = [...otp];
    
    for (let i = 0; i < Math.min(length - index, pastedData.length); i++) {
      newOtp[index + i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((digit, idx) => idx >= index && !digit);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < length) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
    
    // Check if OTP is complete
    const newOtpString = newOtp.join('');
    if (newOtpString.length === length && onComplete) {
      onComplete(newOtpString);
    }
  };

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index] || ''}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className={cn(
            "w-12 h-12 text-center text-lg font-semibold border rounded-md focus:outline-none focus:border-ncba-blue focus:ring-1 focus:ring-ncba-blue",
            inputClassName
          )}
          autoComplete="one-time-code"
          inputMode="numeric"
        />
      ))}
    </div>
  );
};

export default OTPInput;
