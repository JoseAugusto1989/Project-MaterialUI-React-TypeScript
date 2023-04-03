import { useMemo } from 'react';
import * as yup from 'yup';

export const useValidationSchema = () => {
  const txtInputInvalid = 'Este campo não pode ficar em branco';
  return useMemo(() => {
    return yup.object({
      name: yup.string().required(txtInputInvalid),
      email: yup.string().required(txtInputInvalid).email('Email inválido'),
      password: yup.string().required(txtInputInvalid),
    });
  }, []);
};
