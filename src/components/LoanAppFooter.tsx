import React from 'react';
import { cn } from '@/lib/utils';

interface LoanAppFooterProps {
  className?: string;
}

const LoanAppFooter: React.FC<LoanAppFooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full mt-auto px-4 py-6 text-center text-sm bg-ncba-blue text-white", className)}>
      <div className="flex justify-center mb-4">
        <img 
          src="/Perfios Logo.png" 
          alt="Perfios" 
          className="h-12"
        />
      </div>
      <p>© {new Date().getFullYear()} Perfios Software Solutions</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:underline">Help</a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Privacy</a>
      </div>
    </footer>
  );
};

export default LoanAppFooter;
