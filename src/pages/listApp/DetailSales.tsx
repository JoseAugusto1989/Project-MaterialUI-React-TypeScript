/* eslint-disable @typescript-eslint/ban-types */
import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { IEmployee, ISales } from '../../interfaces';
import { DetailTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../shared/forms';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import EmployeeService from '../../shared/services/api/employee/EmployeeService';
import SalesService from '../../shared/services/api/sales/SalesService';

const formSchema: yup.SchemaOf<ISales> = yup.object().shape({
  id: yup.mixed().optional(),
  employee: yup.string().required(),
  productName: yup.string().required(),
  code: yup.string().required(),
  unitPrice: yup.number().required(),
  totalPrice: yup.mixed().optional(),
  quantity: yup.number().required(),
  customer: yup.string().required(),
  dateSale: yup.mixed().optional(),
  description: yup.mixed().optional(),
});

export const DetailSales = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [selectedValue, setSelectedValue] = useState<IEmployee>();
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    init();
  }, []);
  
  const init = () => {
    setIsLoading(true);
    const list: IEmployee[] = [];
    EmployeeService.getAllList(list)
      .then((res) => {
        console.log('Funcionarios', res);
        setSelectedValue(res.data.content[0]?.id || ''); 
        setEmployeeName(res.data.content[0]?.name || '');
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Erro em funcionarios: ', error);
        setIsLoading(false);
      });
  };


  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      SalesService.get(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/sales');

          } else {
            // TODO: verificar o endpoint para atualizar o produto
            setName(result.data.content);
            console.log(result);

            formRef.current?.setData(result);

            alert('Venda realizada com sucesso!');
          }          
        });
    } else {
      formRef.current?.setData({
        employee: '',
        unitPrice: '',
        productName: '',
        totalPrice: '',
        quantity: '',
        code: '',
        customer: '',
        dateSale: '',
        description: '',
      });
    }
  }, [formRef, id, navigate]);

  const handleSave = (data: ISales) => {
    formSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          SalesService.create(validateData).then((result) => {
            setIsLoading(false);
            console.log('OK axios', result);

            if (result instanceof Error) {
              alert(result.message);
              console.log('Erro', data);

            } else {
              if (isSaveAndClose()) {
                navigate('/sales');

              } else {
                navigate(`/sales/details/${result}`);
              }    
            }
          });
      
        } else {
          // TODO: olhar aqui algum erro no Product
          // (Number(id), { id: Number(id), ...data })
          SalesService.update({ ...validateData }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);

            } else {
              if (isSaveAndClose()) {
                navigate('/sales');
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

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      SalesService.delete(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Venda apagado com sucesso!');
          navigate('/sales');
        }
      });
    }
  };

  return (
    <LateralMenu>
      <LayoutPageBase
        title={id === 'new' ? 'Nova venda' : `Venda: ${name}`}
        toolbar={
          <DetailTools
            textButtonNew="Nova"
            showButtonSaveAndClose
            showButtonNew={id !== 'new'}
            showButtonDelete={id !== 'new'}
            toClickInSave={save}
            toClickInSaveAndClose={saveAndClose}
            toClickInDelete={() => handleDelete(Number(id))}
            toClickInNew={() => navigate('/sales/detail/new')}
            toClickInBack={() => navigate('/sales')}
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
                    label="Vendedor" 
                    name="employee" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Nome do produto" 
                    name="productName" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Código do produto" 
                    name="code" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Descrição" 
                    name="description"
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
                    label="Quantidade" 
                    name="quantity" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Cliente" 
                    name="customer" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Preço unitário" 
                    name="unitPrice" 
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