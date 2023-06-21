/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';

export const phoneMask = (value: any) => {
  const numericValue = value.replace(/\D/g, '');

  if (numericValue.length <= 10) {
    return numericValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
};

type TVTextFieldProps = {
  name: string;
  label: string;
  disabled?: boolean;
  value?: number | string;
  size?: 'small' | 'medium' | undefined;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

export const PhoneMask: React.FC<TVTextFieldProps> = ({ name, disabled, label, size, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const maskedValue = phoneMask(inputValue);
    setValue(maskedValue);
  };

  return (
    <TextField
      {...rest}
      error={!!error}
      size={size}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={(e) => { error && clearError(); }}
      value={value}
      disabled={disabled}
      onChange={handleInputChange}
      label={label}
    />
  );
};
