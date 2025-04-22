
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import { useToast } from '@/hooks/use-toast';
import BasicInfoForm from '@/components/personal-info/BasicInfoForm';
import DateOfBirthPicker from '@/components/personal-info/DateOfBirthPicker';
import IdentificationForm from '@/components/personal-info/IdentificationForm';
import { validatePersonalInfo, PersonalInfoFormData } from '@/utils/personalInfoValidation';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PersonalInfoFormData>({
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
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validatePersonalInfo(formData, dob);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      sessionStorage.setItem('personalInfo', JSON.stringify({
        ...formData,
        dob: dob?.toISOString(),
      }));
      
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
          <BasicInfoForm
            firstName={formData.firstName}
            lastName={formData.lastName}
            onInputChange={handleInputChange}
            errors={errors}
          />
          
          <DateOfBirthPicker
            dob={dob}
            setDob={setDob}
            error={errors.dob}
          />
          
          <IdentificationForm
            idNumber={formData.idNumber}
            kraPin={formData.kraPin}
            onInputChange={handleInputChange}
            errors={errors}
          />
          
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
