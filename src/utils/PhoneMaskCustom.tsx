import MaskedInput from 'react-text-mask';

export const PhoneMaskCustom = (props: any) => {
  const { inputRef, ...other } = props;
  
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={ ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,] }
      placeholderChar={'\u2000'}
      showMask
    />
  );
};