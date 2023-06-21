/* eslint-disable no-empty */
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { IProvider } from '../../interfaces';
import { DetailTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../shared/forms';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import ProviderService from '../../shared/services/api/provider/ProviderService';
import { CnpjMask } from '../../shared/forms/CnpjMask';
import { PhoneMask } from '../../shared/forms/PhoneMask';

const formValidateSchema: yup.SchemaOf<IProvider> = yup.object().shape({
  id: yup.mixed().optional(),
  name: yup.string().required().min(2),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  cnpj: yup.string().required(),
  phone: yup.string().required(),
  companyName: yup.string().required(),
});

export const DetailProvider: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cnpj, setCnpj] = useState('');

  const { formRef, save, resetForm, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      ProviderService.get(Number(id))
        .then((res) => {
          setIsLoading(false);

          if (res instanceof Error) {
            navigate('/provider');

          } else {
            setName(res.data.content);
            formRef.current?.setData(res);
            alert('Fornecedor adicionado com sucesso!');
          }
        });
    } else {
      formRef.current?.setData({
        name: '',
        lastName: '',
        cnpj: '',
        email: '',
        phone: '',
        companyName: '',
      });
    }
  }, []);

  const handleSave = (data: IProvider) => {
    formValidateSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          ProviderService.create(validateData)
            .then((res) => {
              setIsLoading(false);

              if (res instanceof Error) {

              } else {
                if (isSaveAndClose()) {
                  navigate('/provider');
                } else {
                  navigate(`/provider/details/${res}`);
                }
                resetForm();
              }
            });

        } else {
          ProviderService.update({ ...validateData })
            .then((res) => {
              setIsLoading(false);
              
              if (res instanceof Error) {

              } else {
                if (isSaveAndClose()) {
                  navigate('/provider');
                }
                resetForm();
              }
            });
        }
      })
      .catch((_errors: yup.ValidationError) => {
        const validateErrors: IVFormErrors = {};

        _errors.inner.forEach(error => {
          if (!error.path) return;
          validateErrors[error.path] = error.message;
        });
        console.log('Erros Yup: ', validateErrors);
        formRef.current?.setErrors(validateErrors);
      });
  };

  return(
    <LateralMenu>
      <LayoutPageBase
        title={id === 'new' ? 'Novo fornecedor' : `Fornecedor: ${name}`}
        toolbar={
          <DetailTools
            textButtonNew="Novo"
            showButtonSaveAndClose
            showButtonNew={id !== 'new'}
            showButtonDelete={id !== 'new'}
            toClickInSave={save}
            toClickInSaveAndClose={saveAndClose}
            toClickInNew={() => navigate('/provider/detail/new')}
            toClickInBack={() => navigate('/provider')}
          />
        }
      >
        <VForm ref={formRef} onSubmit={handleSave}>
          <Box margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined">
           
            <Grid container direction="column" padding={4} spacing={2}>
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

              {/* <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="CNPJ" 
                    name="cnpj" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>     */}

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <CnpjMask 
                    label="CNPJ"
                    name="cnpj"
                  /> 
                </Grid>
              </Grid>    

               

              {/* TODO: autocomplete de funcionarios */}

              {/* <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <AutoComplete isExternalLoading={isLoading} />
                </Grid>
              </Grid> */}
            
            </Grid>
          
            <Grid container direction="column" padding={4} spacing={2}>

              <Grid item>
                <Typography variant='h6'>Contatos:</Typography>
              </Grid>
              
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    name="email" 
                    label="E-mail" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <PhoneMask 
                    name='phone'
                    label='Telefone'
                  />
                </Grid>
              </Grid>

              {/* <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    name="phone" 
                    label="Telefone" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid> */}
              
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Nome da Empresa" 
                    name="companyName"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
             
            </Grid>
          </Box>
        </VForm>

        {isLoading && <LinearProgress variant="indeterminate" />}
      </LayoutPageBase>
    </LateralMenu>
  );
};