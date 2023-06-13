/* eslint-disable no-empty */
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { ICustomer } from '../../interfaces';
import { DetailTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { IVFormErrors, VForm, VTextField } from '../../shared/forms';
import { useVForm } from '../../shared/forms/useVForm';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import CustomerService from '../../shared/services/api/customer/CustomerService';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


const formValidationSchema: yup.SchemaOf<ICustomer> = yup.object().shape({
  name: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  id: yup.mixed().optional(),
  email: yup.string().required().email(),
  phone: yup.string().required().matches(phoneRegExp, 'Este telefone não é um número válido'),
  address: yup.string().required().min(3),
  // TODO: Ajustar a validação para CPF ou CNPJ
  cpf: yup.string().required(),
  occupation: yup.string().required().min(3),
  number: yup.number().required(),
  district: yup.string().required().min(3),
  // TODO: fazer uma lista de cidades e estados no inputs
  city: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

export const DetailCustomer: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const { formRef, save, resetForm, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      CustomerService.get(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            navigate('/customer');

          } else {
            setName(result.data.content);
            formRef.current?.setData(result);
            alert('Cliente adicionado com sucesso!');
          }
        });
    } else {
      formRef.current?.setData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        cpf: '',
        occupation: '',
        number: '',
        district: '',
        city: '',
        state: '',
      });
    }
  }, []);

  const handleSave = (data: ICustomer) => {
    formValidationSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          CustomerService.create(validateData)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {

              } else {
                if (isSaveAndClose()) {
                  navigate('/customer');

                } else {
                  navigate(`/customer/details/${result}`);
                }
                resetForm();    
              }
            });
      
        } else {
          // TODO: olhar aqui algum erro no Product
          // (Number(id), { id: Number(id), ...data })
          CustomerService.update({ ...validateData })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {

              } else {
                if (isSaveAndClose()) {
                  navigate('/customer');
                }
              }
            });
        }
      })
      .catch((_errors: yup.ValidationError) => {
        const validationsErrors: IVFormErrors = {};

        _errors.inner.forEach(error => {
          if (!error.path) return;
          validationsErrors[error.path] = error.message;
        });
        console.log('Erros Yup: ', validationsErrors);
        formRef.current?.setErrors(validationsErrors);
      });
  };

  return(
    <LateralMenu>
      <LayoutPageBase 
        title={id === 'new' ? 'Novo Cliente' : `Cliente: ${name}`}
        toolbar={
          <DetailTools 
            textButtonNew="Novo"
            showButtonSaveAndClose
            showButtonNew={id !== 'new'}
            showButtonDelete={id !== 'new'}
            toClickInSave={save}
            toClickInSaveAndClose={saveAndClose}
            toClickInNew={() => navigate('/customer/detail/new')}
            toClickInBack={() => navigate('/customer')}
          />
        }
      >
        <VForm ref={formRef} onSubmit={handleSave} >
          <Box margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined" >
            <Grid container direction="column" padding={4} spacing={2}>

              { isLoading && (<Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>)}

              <Grid item>
                <Typography variant='h6'>Geral:</Typography>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Nome" 
                    name="name" 
                    // TODO: corrigir onChange para settar um novo nome ao produto ao atualizar
                    onChange={(e: any) => setName(e.target.value)}
                    disabled={isLoading}
                    size='medium'
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Sobrenome" 
                    name="lastName"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="E-mail" 
                    name="email"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Telefone" 
                    name="phone"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Ocupação" 
                    name="occupation"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="CPF" 
                    name="cpf"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              {/* TODO: validar CPF e CNPJ com um checkbutton */}
              
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="CNPJ" 
                    name="cnpj"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction="column" padding={4} spacing={2}>

              <Grid item>
                <Typography variant='h6'>Endereço:</Typography>
              </Grid>
            
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Estado" 
                    name="state"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Cidade" 
                    name="city"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Endereço" 
                    name="address"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Número" 
                    name="number"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Distrito" 
                    name="district"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>  
          </Box>
        </VForm>
      </LayoutPageBase>
    </LateralMenu>
  );
};