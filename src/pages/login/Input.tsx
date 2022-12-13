import React from 'react';
import { IconDesign, ImageIcon, Input } from './Input.styles';

type Props = {
  type?: string;
  name?: string;
  placeholder?: string;
  icon?: string;
  value?: string;
  id?: number | any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputLogin = ({ type, name, placeholder, icon, value, id }: Props) => {
  return (
    <IconDesign>
      <ImageIcon src={icon} alt="icon" />
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={(event) => {}}
        id={id}
      />
    </IconDesign>
  );
};

export default InputLogin;
