
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ncba-lightBlue">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <img 
            src="/ncba-logo.png" 
            alt="NCBA Bank" 
            className="h-16 mx-auto mb-6" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='50' fill='%23003B70'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='white' text-anchor='middle' dominant-baseline='middle'%3ENCBA BANK%3C/text%3E%3C/svg%3E";
            }}
          />
          <h1 className="text-3xl font-bold text-ncba-blue mb-4">Personal Loan Application</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Quick, simple, and secure way to apply for a personal loan with NCBA Bank.
          </p>
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <Button 
            onClick={() => navigate('/mobile-verification')}
            className="w-full py-6 text-lg bg-ncba-blue hover:bg-ncba-blue/90"
          >
            Start Application
          </Button>
          
          <p className="text-sm text-gray-500">
            By continuing, you agree to our <a href="#" className="text-ncba-blue underline">Terms & Conditions</a> and <a href="#" className="text-ncba-blue underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      
      <div className="bg-white py-8 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-center text-ncba-blue mb-6">Why Choose NCBA Loans?</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="bg-ncba-lightBlue w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ncba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Quick Approval</h3>
              <p className="text-sm text-gray-600">Get approved in as little as 24 hours</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-ncba-lightBlue w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ncba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Secure Process</h3>
              <p className="text-sm text-gray-600">Your data is encrypted and protected</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-ncba-lightBlue w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ncba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Flexible Amounts</h3>
              <p className="text-sm text-gray-600">Borrow what you need, when you need it</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-ncba-lightBlue w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ncba-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Convenient Repayment</h3>
              <p className="text-sm text-gray-600">Multiple repayment options</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-ncba-blue text-white py-6 px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} NCBA Bank. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 text-xs">
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
