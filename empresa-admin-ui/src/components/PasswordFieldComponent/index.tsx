import React, { useState, ChangeEvent  } from 'react';
import {
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";
import { Input } from '@material-tailwind/react';
import { labelProps } from '@material-tailwind/react/types/components/input';

interface PasswordFieldProps {
  value: string;
  name: string;
  label?: string;
  className?: string;
  labelProps?: labelProps;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordFieldComponent({ name, value, label, onChange, className, labelProps }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        name={name}
        label={label}
        crossOrigin={undefined}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className={className}
        labelProps={labelProps} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}  />
     <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeIcon className="h-6 w-6 text-black-100" />
        ) : (
          <EyeSlashIcon className="h-6 w-6 text-black-100" />
        )}
      </div>
    </div>
  );
};
