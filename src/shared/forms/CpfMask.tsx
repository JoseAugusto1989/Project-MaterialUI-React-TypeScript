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

export const CpfMask: React.FC<TVTextFieldProps> = ({ name, disabled, label, size, ...rest }) => {
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
    const { value } = e.target;

    // Aplica a máscara de CPF
    const maskedValue = cpfMask(value);

    // Atualiza o valor do campo com a máscara aplicada
    setValue(maskedValue);
  };

  const cpfMask = (value: string) => {
    // Remove todos os caracteres não numéricos do valor
    const numericValue = value.replace(/\D/g, '');

    // Aplica a máscara: XXX.XXX.XXX-XX
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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