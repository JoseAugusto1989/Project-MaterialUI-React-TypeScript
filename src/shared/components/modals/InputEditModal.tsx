import { TextField } from '@mui/material';
import { MainContainer } from './EditModal.styles';

type Props = {
  label?: string;
};

export const Input = ({ label }: Props) => {
  return (
    <MainContainer>
      <TextField id="outlined-basic" label={label} variant="outlined"/>
    </MainContainer>
  );
};
