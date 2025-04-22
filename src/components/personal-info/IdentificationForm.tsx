
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface IdentificationFormProps {
  idNumber: string;
  kraPin: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const IdentificationForm = ({ idNumber, kraPin, onInputChange, errors }: IdentificationFormProps) => {
  return (
    <>
      <div className="form-group">
        <Label htmlFor="idNumber" className="form-label">National ID Number</Label>
        <Input
          id="idNumber"
          name="idNumber"
          value={idNumber}
          onChange={onInputChange}
          className={errors.idNumber ? 'border-ncba-red' : ''}
        />
        {errors.idNumber && <p className="form-error">{errors.idNumber}</p>}
      </div>
      
      <div className="form-group">
        <Label htmlFor="kraPin" className="form-label">KRA PIN</Label>
        <Input
          id="kraPin"
          name="kraPin"
          value={kraPin}
          onChange={onInputChange}
          className={errors.kraPin ? 'border-ncba-red' : ''}
        />
        {errors.kraPin && <p className="form-error">{errors.kraPin}</p>}
        <p className="form-helper">Your 11-character KRA PIN (e.g. A123456789Z)</p>
      </div>
    </>
  );
};

export default IdentificationForm;
