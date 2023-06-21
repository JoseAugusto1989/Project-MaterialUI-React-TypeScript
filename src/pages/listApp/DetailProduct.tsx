/* eslint-disable no-empty */
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { IProduct } from '../../interfaces';
import { DetailTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../shared/forms';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import ProductService from '../../shared/services/api/product/ProductService';

const formValidationSchema: yup.SchemaOf<IProduct> = yup.object().shape({
  name: yup.string().required().min(3),
  id: yup.mixed().optional(),
  gain: yup.number().optional(),
  provider: yup.string().required().min(3),
  // TODO: verificar o yup dos inputs que recebem numeros
  addedAmount: yup.number().required().positive().integer(),
  purchasePrice: yup.number().required().positive(),
  quantityInStock: yup.mixed().optional(),
  salePrice: yup.number().required().positive(),
});

export const DetailProduct: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      ProductService.get(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            navigate('/product');

          } else {
            // TODO: verificar o endpoint para atualizar o produto
            setName(result.data.content);
            console.log(result);

            formRef.current?.setData(result);

            alert('Produto adicionado com sucesso!');
          }          
        });
    } else {
      formRef.current?.setData({
        name: '',
        quantityInStock: '',
        salePrice: '',
        provider: '',
        purchasePrice: '',
        addedAmount: '',
      });
    }
  }, [id]);

  const handleSave = (data: IProduct) => {
    formValidationSchema.
      validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === 'new') {
          ProductService.create(validateData).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {

            } else {
              if (isSaveAndClose()) {
                navigate('/product');

              } else {
                navigate(`/product/details/${result}`);
              }    
            }
          });
      
        } else {
          // TODO: olhar aqui algum erro no Product
          // (Number(id), { id: Number(id), ...data })
          ProductService.update({ ...validateData }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              

            } else {
              if (isSaveAndClose()) {
                navigate('/product');
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
      ProductService.delete(id).then((result) => {
        if (result instanceof Error) {
          
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/product');
        }
      });
    }
  };

  return (
    <LateralMenu>
      <LayoutPageBase
        title={id === 'new' ? 'Novo produto' : `Produto: ${name}`}
        toolbar={
          <DetailTools
            textButtonNew="Nova"
            showButtonSaveAndClose
            showButtonNew={id !== 'new'}
            showButtonDelete={id !== 'new'}
            toClickInSave={save}
            toClickInSaveAndClose={saveAndClose}
            toClickInDelete={() => handleDelete(Number(id))}
            toClickInNew={() => navigate('/product/detail/new')}
            toClickInBack={() => navigate('/product')}
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
                    label="Nome Produto" 
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
                    label="Fornecedor" 
                    name="provider" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            
              {/* <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField
                    label="Qtd. Estoque" 
                    name="quantityInStock" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid> */}
            </Grid>
          
            <Grid container direction="column" padding={4} spacing={2}>

              <Grid item>
                <Typography variant='h6'>Quantidades:</Typography>
              </Grid>
              
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Preço de venda" 
                    name="salePrice" 
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
              
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Preço de compra" 
                    name="purchasePrice"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              {/* <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Lucro" 
                    name="gain" 
                    //value={}
                    disabled={isLoading}
                  />
                </Grid>
              </Grid> */}
           
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                  <VTextField 
                    label="Qtd. Adicionada" 
                    name="addedAmount" 
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
