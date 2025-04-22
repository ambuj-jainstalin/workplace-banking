
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BasicInfoFormProps {
  firstName: string;
  lastName: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const BasicInfoForm = ({ firstName, lastName, onInputChange, errors }: BasicInfoFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="form-group">
        <Label htmlFor="firstName" className="form-label">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={onInputChange}
          className={errors.firstName ? 'border-ncba-red' : ''}
        />
        {errors.firstName && <p className="form-error">{errors.firstName}</p>}
      </div>
      
      <div className="form-group">
        <Label htmlFor="lastName" className="form-label">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={onInputChange}
          className={errors.lastName ? 'border-ncba-red' : ''}
        />
        {errors.lastName && <p className="form-error">{errors.lastName}</p>}
      </div>
    </div>
  );
};

export default BasicInfoForm;
