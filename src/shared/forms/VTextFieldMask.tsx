/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = TextFieldProps & {
  name: string;
  disabled?: boolean;
};

export const VTextFieldMask: React.FC<TVTextFieldProps> = ({
  name,
  disabled,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        error && clearError();
      }}
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};