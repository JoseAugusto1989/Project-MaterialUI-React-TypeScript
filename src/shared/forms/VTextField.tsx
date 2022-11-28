import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = {
    name: string;
    label: string;
}

// eslint-disable-next-line react/prop-types
export const VTextField: React.FC<TVTextFieldProps> = ({ name, label, ...rest }) => {
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
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : undefined}
      value={value}
      onChange={e => setValue(e.target.value)}
      label={label}
    />
  );
};