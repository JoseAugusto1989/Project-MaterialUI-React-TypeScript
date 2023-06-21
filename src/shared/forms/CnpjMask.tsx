/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';

export const cnpjMask = (value: any) => {
  return value
    .replace(/\D+/g, '') 
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

type TVTextFieldProps = {
  name: string;
  label: string;
  disabled?: boolean;
  value?: number | string;
  size?: 'small' | 'medium' | undefined;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

export const CnpjMask: React.FC<TVTextFieldProps> = ({ name, disabled, label, size, ...rest }) => {
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
    const maskedValue = cnpjMask(inputValue);
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