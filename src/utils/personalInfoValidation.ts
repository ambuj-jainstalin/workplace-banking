
export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  idNumber: string;
  kraPin: string;
}

export const validatePersonalInfo = (formData: PersonalInfoFormData, dob?: Date) => {
  const errors: Record<string, string> = {};
  
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  if (!formData.idNumber.trim()) {
    errors.idNumber = 'National ID number is required';
  } else if (!/^\d{8}$/.test(formData.idNumber)) {
    errors.idNumber = 'National ID must be 8 digits';
  }
  
  if (!formData.kraPin.trim()) {
    errors.kraPin = 'KRA PIN is required';
  } else if (!/^[A-Z][0-9]{9}[A-Z]$/.test(formData.kraPin)) {
    errors.kraPin = 'Invalid KRA PIN format (e.g. A123456789Z)';
  }
  
  if (!dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      errors.dob = 'You must be at least 18 years old';
    } else if (age > 70) {
      errors.dob = 'Age cannot exceed 70 years';
    }
  }
  
  return errors;
};
