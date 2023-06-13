/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react';
import { IconDesign, ImageIcon, Input } from './Input.styles';

type Props = {
  type?: string;
  name?: string;
  placeholder?: string;
  icon?: string;
  value?: string;
  id?: number | any;
  functionClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputLogin = forwardRef<HTMLInputElement, Props>(
  ({ type, name, placeholder, icon, value, id, functionClick }, ref) => {
    return (
      <IconDesign>
        <ImageIcon src={icon} alt="icon" />
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={functionClick}
          id={id}
          ref={ref}
        />
      </IconDesign>
    );
  }
);

export default InputLogin;
