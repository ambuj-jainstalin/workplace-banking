import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoanAppHeader from '@/components/LoanAppHeader';
import LoanAppFooter from '@/components/LoanAppFooter';
import DocumentUploader from '@/components/DocumentUploader';
import { useToast } from '@/hooks/use-toast';
import FaceVerification from '@/components/FaceVerification';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [passportFront, setPassportFront] = useState<File | null>(null);
  const [passportBack, setPassportBack] = useState<File | null>(null);
  const [faceVerificationComplete, setFaceVerificationComplete] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState('');
  const [payslips, setPayslips] = useState<File[]>([]);
  const [employmentLetter, setEmploymentLetter] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'id' | 'face' | 'employer' | 'documents'>('id');
  
  // Mock list of employers
  const employers = [
    { id: 'govt', name: 'Government of Kenya' },
    { id: 'safaricom', name: 'Safaricom PLC' },
    { id: 'kcb', name: 'KCB Bank Group' },
    { id: 'equity', name: 'Equity Bank' },
    { id: 'eabl', name: 'East African Breweries Ltd' },
    { id: 'kengen', name: 'Kenya Electricity Generating Company' },
    { id: 'nation', name: 'Nation Media Group' },
    { id: 'other', name: 'Other' },
  ];
  
  const handleIdUpload = () => {
    if (!idFront || !idBack) {
      toast({
        variant: "destructive",
        title: "Missing Documents",
        description: "Please upload both front and back sides of your National ID",
      });
      return;
    }

    if (!passportFront || !passportBack) {
      toast({
        variant: "destructive",
        title: "Missing Documents",
        description: "Please upload both front and back sides of your Passport",
      });
      return;
    }
    
    // Simulate OCR processing
    toast({
      title: "Processing ID",
      description: "We're verifying your documents...",
    });
    
    setTimeout(() => {
      toast({
        title: "Documents Verified",
        description: "Your ID documents have been successfully verified",
      });
      setCurrentStep('face');
    }, 2000);
  };
  
  const handleFaceCapture = (videoBlob: Blob) => {
    console.log('Face verification video captured:', videoBlob);
    // In a real app, this would be sent to the server for liveness detection and facial matching
  };
  
  const handleFaceVerificationComplete = () => {
    setFaceVerificationComplete(true);
    
    setTimeout(() => {
      toast({
        title: "Verification Successful",
        description: "Your identity has been verified successfully",
      });
      setCurrentStep('employer');
    }, 1500);
  };
  
  const handleEmployerSelection = () => {
    if (!selectedEmployer) {
      toast({
        variant: "destructive",
        title: "Required Field",
        description: "Please select your employer",
      });
      return;
    }
    
    setCurrentStep('documents');
  };
  
  const handleSubmitDocuments = () => {
    if (payslips.length < 3) {
      toast({
        variant: "destructive",
        title: "Missing Documents",
        description: "Please upload at least 3 months of payslips",
      });
      return;
    }
    
    if (!employmentLetter) {
      toast({
        variant: "destructive",
        title: "Missing Document",
        description: "Please upload your employment letter",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate document processing and account statement fetch
    toast({
      title: "Processing Documents",
      description: "We're processing your documents and fetching account information...",
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Documents Verified",
        description: "Your documents have been successfully processed",
      });
      
      navigate('/loan-offer');
    }, 3000);
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'id':
        return (
          <>
            <div className="mb-6">
              <h2 className="section-title">ID Verification</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please upload clear images of your National ID and Passport
              </p>
              
              <div className="space-y-8">
                {/* National ID Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">National ID</h3>
                  <div className="space-y-4">
                    <DocumentUploader
                      title="National ID (Front)"
                      description="Upload a clear photo of the front side of your National ID"
                      accept="image/*"
                      onUpload={setIdFront}
                    />
                    
                    <DocumentUploader
                      title="National ID (Back)"
                      description="Upload a clear photo of the back side of your National ID"
                      accept="image/*"
                      onUpload={setIdBack}
                    />
                  </div>
                </div>

                {/* Passport Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Passport</h3>
                  <div className="space-y-4">
                    <DocumentUploader
                      title="Passport (Front)"
                      description="Upload a clear photo of the front side of your Passport"
                      accept="image/.pdf/*"
                      onUpload={setPassportFront}
                    />
                    
                    <DocumentUploader
                      title="Passport (Back)"
                      description="Upload a clear photo of the back side of your Passport"
                      accept="image/pdf/*"
                      onUpload={setPassportBack}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleIdUpload} 
              className="btn-primary w-full"
              disabled={!idFront || !idBack || !passportFront || !passportBack}
            >
              Continue
            </Button>
          </>
        );
        
      case 'face':
        return (
          <>
            <div className="mb-6">
              <h2 className="section-title">Face Verification</h2>
              <p className="text-sm text-gray-600 mb-4">
                We need to verify it's really you. Please look at the camera and follow the instructions
              </p>
              
              <FaceVerification
                onCapture={handleFaceCapture}
                onComplete={handleFaceVerificationComplete}
                otpToRepeat="246810"
              />
            </div>
          </>
        );
        
      case 'employer':
        return (
          <>
            <div className="mb-6">
              <h2 className="section-title">Employment Information</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please select your current employer
              </p>
              
              <div className="form-group">
                <Label htmlFor="employer" className="form-label">Employer</Label>
                <Select value={selectedEmployer} onValueChange={setSelectedEmployer}>
                  <SelectTrigger id="employer">
                    <SelectValue placeholder="Select your employer" />
                  </SelectTrigger>
                  <SelectContent>
                    {employers.map((employer) => (
                      <SelectItem key={employer.id} value={employer.id}>
                        {employer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleEmployerSelection} 
              className="btn-primary w-full"
              disabled={!selectedEmployer}
            >
              Continue
            </Button>
          </>
        );
        
      case 'documents':
        return (
          <>
            <div className="mb-6">
              <h2 className="section-title">Document Upload</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please upload the required documents for verification
              </p>
              
              <div className="space-y-8">
                {/* Employment Documents Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Employment Documents</h3>
                  <div className="space-y-4">
                    <DocumentUploader
                      title="Employment Letter"
                      description="Upload your current employment letter"
                      accept="image/*,.pdf"
                      onUpload={setEmploymentLetter}
                    />
                    
                    <DocumentUploader
                      title="Payslip"
                      description="Upload your most recent payslip"
                      accept="image/*,.pdf"
                      onUpload={(file) => setPayslips([...payslips, file])}
                    />
                    <DocumentUploader
                      title="Payslip"
                      description="Upload your most recent payslip"
                      accept="image/*,.pdf"
                      onUpload={(file) => setPayslips([...payslips, file])}
                    />
                    <DocumentUploader
                      title="Payslip"
                      description="Upload your most recent payslip"
                      accept="image/*,.pdf"
                      onUpload={(file) => setPayslips([...payslips, file])}
                    />
                  </div>
                </div>

                {/* Financial Documents Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Financial Documents</h3>
                  <div className="space-y-4">
                    <DocumentUploader
                      title="Bank Statement (Last 1 Months)"
                      description="Upload your bank statement for the last 3 months"
                      accept=".pdf"
                      onUpload={(file) => {
                        // Handle bank statement upload
                        toast({
                          title: "Bank Statement Uploaded",
                          description: "Your bank statement has been uploaded successfully",
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmitDocuments} 
              className="btn-primary w-full"
              disabled={!employmentLetter || payslips.length === 0}
            >
              {isProcessing ? 'Processing...' : 'Submit Documents'}
            </Button>
          </>
        );
        
      default:
        return null;
    }
  };
  
  // Calculate progress based on current step
  const getProgress = () => {
    switch (currentStep) {
      case 'id': return 50;
      case 'face': return 60;
      case 'employer': return 70;
      case 'documents': return 80;
      default: return 50;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoanAppHeader 
        title="Document Upload" 
        subtitle="Please upload the required documents"
        progress={getProgress()}
      />
      
      <main className="flex-1 flex justify-center items-start py-6">
        <div className="w-full max-w-md px-4">
          {renderCurrentStep()}
        </div>
      </main>
      
      <LoanAppFooter />
    </div>
  );
};

export default DocumentUpload;
