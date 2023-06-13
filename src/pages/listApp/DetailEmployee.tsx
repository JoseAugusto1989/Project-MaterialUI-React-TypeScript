/* eslint-disable no-empty */
import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { IEmployee } from '../../interfaces';
import { DetailTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../shared/forms';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import EmployeeService from '../../shared/services/api/employee/EmployeeService';

const formSchema: yup.SchemaOf<IEmployee> = yup.object().shape({
  id: yup.mixed().optional(),
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  job: yup.string().required(),
  salary: yup.number().required(),
  bonus: yup.mixed().optional(),
  initialDate: yup.mixed().optional(),
});

export const DetailEmployee: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { formRef, save, resetForm, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      EmployeeService.get(Number(id))
        .then((res) => {
          setIsLoading(false);
          console.log('Funcionarios: ', res);

          if (res instanceof Error) {
            navigate('/employee');

          } else {
            setName(res.data.content);
            formRef.current?.setData(res);
            alert('Funcionario adicionado com sucesso!');
          }
        });
    } else {
      formRef.current?.setData({
        name: '',
        email: '',
        phone: '',
        job: '',
        salary: '',
        initialDate: '',
      });
    }
  }, []);

  const handleSave = (data: IEmployee) => {
    formSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          EmployeeService.create(validateData)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {

              } else {
                if (isSaveAndClose()) {
                  navigate('/employee');

                } else {
                  navigate(`/employee/details/${result}`);
                }
                resetForm();    
              }
            });
      
        } else {
          // TODO: olhar aqui algum erro no Product
          // (Number(id), { id: Number(id), ...data })
          EmployeeService.update({ ...validateData })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {

              } else {
                if (isSaveAndClose()) {
                  navigate('/employee');
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

  return (
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
            toClickInNew={() => navigate('/employee/detail/new')}
            toClickInBack={() => navigate('/employee')}
          />
        }
      >
        <VForm ref={formRef} onSubmit={handleSave} >
          <Box margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined" >
            <Grid container direction="column" padding={4} spacing={2}>
              <Grid item>
                <Typography variant='h6'>Dados pessoais:</Typography>
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
            </Grid>

            <Grid container direction="column" padding={4} spacing={2}>

              <Grid item>
                <Typography variant='h6'>Informações:</Typography>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Ocupação" 
                    name="job"  
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Salario" 
                    name="salary"  
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