
import React from 'react';
import { cn } from '@/lib/utils';

interface LoanAppFooterProps {
  className?: string;
}

const LoanAppFooter: React.FC<LoanAppFooterProps> = ({ className }) => {
  return (
    <footer className={cn("mt-auto px-4 py-6 text-center text-sm text-gray-500", className)}>
      <p>© {new Date().getFullYear()} NCBA Bank. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="text-ncba-blue hover:underline">Help</a>
        <a href="#" className="text-ncba-blue hover:underline">Terms</a>
        <a href="#" className="text-ncba-blue hover:underline">Privacy</a>
      </div>
    </footer>
  );
};

export default LoanAppFooter;
