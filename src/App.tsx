
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobileVerification from "./pages/MobileVerification";
import OTPVerification from "./pages/OTPVerification";
import PersonalInfo from "./pages/PersonalInfo";
import LoanAmount from "./pages/LoanAmount";
import DocumentUpload from "./pages/DocumentUpload";
import LoanOffer from "./pages/LoanOffer";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mobile-verification" element={<MobileVerification />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/loan-amount" element={<LoanAmount />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route path="/loan-offer" element={<LoanOffer />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
