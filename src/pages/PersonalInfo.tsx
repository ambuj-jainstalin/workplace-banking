
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    kraPin: '',
  });
  
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'National ID number is required';
    } else if (!/^\d{8}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'National ID must be 8 digits';
    }
    
    if (!formData.kraPin.trim()) {
      newErrors.kraPin = 'KRA PIN is required';
    } else if (!/^[A-Z][0-9]{9}[A-Z]$/.test(formData.kraPin)) {
      newErrors.kraPin = 'Invalid KRA PIN format (e.g. A123456789Z)';
    }
    
    if (!dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      } else if (age > 70) {
        newErrors.dob = 'Age cannot exceed 70 years';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate deduplication check and API validation
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store personal info in session storage
      sessionStorage.setItem('personalInfo', JSON.stringify({
        ...formData,
        dob: dob?.toISOString(),
      }));
      
      // Navigate to loan amount page
      navigate('/loan-amount');
    }, 2000);
  };

  return (
    <div className="app-container">
      <LoanAppHeader 
        title="Personal Information" 
        subtitle="Please enter your personal details"
        progress={30}
      />
      
      <main className="flex-1 px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="firstName" className="form-label">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'border-ncba-red' : ''}
              />
              {errors.firstName && <p className="form-error">{errors.firstName}</p>}
            </div>
            
            <div className="form-group">
              <Label htmlFor="lastName" className="form-label">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'border-ncba-red' : ''}
              />
              {errors.lastName && <p className="form-error">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="form-group">
            <Label htmlFor="dob" className="form-label">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dob && "text-muted-foreground",
                    errors.dob && "border-ncba-red"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dob ? format(dob, "PPP") : <span>Select your date of birth</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dob}
                  onSelect={setDob}
                  disabled={(date) => {
                    const today = new Date();
                    const minDate = new Date();
                    minDate.setFullYear(today.getFullYear() - 70);
                    const maxDate = new Date();
                    maxDate.setFullYear(today.getFullYear() - 18);
                    
                    return date > today || date < minDate;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dob && <p className="form-error">{errors.dob}</p>}
          </div>
          
          <div className="form-group">
            <Label htmlFor="idNumber" className="form-label">National ID Number</Label>
            <Input
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className={errors.idNumber ? 'border-ncba-red' : ''}
            />
            {errors.idNumber && <p className="form-error">{errors.idNumber}</p>}
          </div>
          
          <div className="form-group">
            <Label htmlFor="kraPin" className="form-label">KRA PIN</Label>
            <Input
              id="kraPin"
              name="kraPin"
              value={formData.kraPin}
              onChange={handleInputChange}
              className={errors.kraPin ? 'border-ncba-red' : ''}
            />
            {errors.kraPin && <p className="form-error">{errors.kraPin}</p>}
            <p className="form-helper">Your 11-character KRA PIN (e.g. A123456789Z)</p>
          </div>
          
          <Button 
            type="submit" 
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
        </form>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default PersonalInfo;
