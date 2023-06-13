import { TextField } from '@mui/material';
import React from 'react';

interface Props {
  label?: string;
  value?: number | string;
  name?: string;
  rows?: number;
  variant?: 'outlined' | 'filled' | 'standard';
}

const LargeTextField: React.FC<Props> = ({ variant, label, value, rows = 4 }) => {

  return (
    <TextField
      label={label}
      multiline
      rows={rows}
      variant={variant}
      fullWidth
      value={value}
    />
  );
};

export default LargeTextField;