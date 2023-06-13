/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';

type VTextFieldProps = {
  name: string;
  label: string;
  disabled?: boolean;
  value?: string;
  size?: 'small' | 'medium' | undefined;
  onChange?: (value: string) => void;
};

export const VTextFieldEmail: React.FC<VTextFieldProps> = ({
  name,
  disabled,
  label,
  size,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (isValidEmail(inputValue) || inputValue === '') {
      setValue(inputValue);
      if (rest.onChange) {
        rest.onChange(inputValue);
      }
      if (error) {
        clearError();
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    // Simple email validation regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return emailRegex.test(email);
  };

  return (
    <TextField
      {...rest}
      error={!!error}
      size={size}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        error && clearError();
      }}
      value={value}
      disabled={disabled}
      onChange={handleInputChange}
      label={label}
    />
  );
};