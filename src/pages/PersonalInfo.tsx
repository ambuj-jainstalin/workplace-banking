import React from 'react';
import { Button } from '@/components/ui/button';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import BasicInfoForm from '@/components/personal-info/BasicInfoForm';
import DateOfBirthPicker from '@/components/personal-info/DateOfBirthPicker';
import IdentificationForm from '@/components/personal-info/IdentificationForm';
import { usePersonalInfoForm } from '@/hooks/usePersonalInfoForm';

const PersonalInfo = () => {
  const {
    formData,
    dob,
    setDob,
    errors,
    isProcessing,
    handleInputChange,
    handleSubmit,
  } = usePersonalInfoForm();

  return (
    <div className="min-h-screen flex flex-col">
      <LoanAppHeader 
        title="Personal Information" 
        subtitle="Please provide your personal details"
        progress={30}
      />
      
      <main className="flex-1 flex justify-center items-start py-6">
        <div className="w-full max-w-md px-4">
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
        </div>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default PersonalInfo;
