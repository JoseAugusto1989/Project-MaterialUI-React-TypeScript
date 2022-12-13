import { TextField } from '@mui/material';

type Props = {
  label?: string;
};

export const Input = ({ label }: Props) => {
  return (
    <>
      <TextField id="outlined-basic" label={label} variant="outlined"/>
    </>
  );
};
