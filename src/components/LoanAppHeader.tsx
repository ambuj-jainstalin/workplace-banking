import React from 'react';
import { cn } from '@/lib/utils';

interface LoanAppHeaderProps {
  title: string;
  subtitle?: string;
  progress?: number;
  className?: string;
  logo?: boolean;
}

const LoanAppHeader: React.FC<LoanAppHeaderProps> = ({
  title,
  subtitle,
  progress,
  className,
  logo = true,
}) => {
  return (
    <div className={cn("px-4 py-6", className)}>
      {logo && (
        <div className="flex justify-start mb-4">
          <img 
            src="/ncba-bank-uganda-logo-png_seeklogo-550938.png" 
            alt="NCBA Bank" 
            className="h-10" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg width='200' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='50' fill='%23003B70'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='white' text-anchor='middle' dominant-baseline='middle'%3ENCBA BANK%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      )}
      
      {progress !== undefined && (
        <div className="progress-container mb-6">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      
      <h1 className="text-2xl text-center text-ncba-blue font-semibold mb-2">{title}</h1>
      
      {subtitle && (
        <p className="text-center text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};

export default LoanAppHeader;
