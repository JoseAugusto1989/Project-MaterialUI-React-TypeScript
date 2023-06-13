/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = {
    name: string;
    label: string;
    disabled?: boolean;
    value?: number | string;
    size?: 'small' | 'medium' | undefined;
    onChange?: React.FormEventHandler<HTMLInputElement>;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, disabled, label, size, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value ,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return(
    <TextField 
      {...rest}
      error={!!error}
      size={size}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={(e) => { error && clearError(); }}
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      label={label}
    />
  );
};