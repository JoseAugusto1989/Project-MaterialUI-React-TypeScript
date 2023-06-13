import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import validator from 'validator';
import * as yup from 'yup';

import LateralMenu from '../../../shared/components/lateral-menu/LateralMenu';
import LayoutPageBase from '../../../shared/layouts/LayoutPageBase';
import ProviderService from '../../../shared/services/api/provider/ProviderService';
import { IEmailProvider } from '../../../interfaces';

const EmailMessageValidSchema = yup.object({
  subject: yup.string().required(),
  email: yup.string().required(),
  text: yup.string().required(),
});

const SendEmail = yupResolver(EmailMessageValidSchema);

export const FormEmailProvider = () => {
  const formMethods = useForm<IEmailProvider>({ resolver: SendEmail });
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = formMethods;

  const onSubmit = (values: IEmailProvider) => {
    ProviderService.createEmail(values)
      .then(response => {
        alert(`Email de ${values.subject} salvo com sucesso!`);
  
        ProviderService.sendEmailProvider(values)
          .then(res => {

            alert(`Email de ${values.subject} enviado com sucesso!`);
          })
          .catch(error => {
            console.error('Error...', error);
            alert('Ocorreu um erro ao enviar o email!');
          });
  
      })
      .catch(error => {
        console.error('Error...', error);
        alert('Ocorreu um erro ao salvar seu email!');
      });
  };

  return (
    <LateralMenu>
      <LayoutPageBase title="Envio de email">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined">
           
              <Grid container direction="column" padding={5} spacing={2}>
                <Grid item>
                  <Typography variant='h6'>Contato:</Typography>
                </Grid>

                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                    <TextField 
                      label="Assunto" 
                      variant="outlined"
                      {...register('subject')} 
                    />
                    {errors?.subject?.type === 'required' && (
                      <p style={{ color: 'red' }}>O assunto é obrigatório</p>
                    )}
                  </Grid>
                </Grid>

                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                    <TextField 
                      label="Email" 
                      variant="outlined"
                      {...register('email', {
                        required: true,
                        validate: (value) => validator.isEmail(value)
                      })} 
                    />
                    {errors?.email?.type === 'required' && (
                      <p style={{ color: 'red' }}>Email é obrigatório</p>
                    )}

                    {errors?.email?.type === 'validate' && (
                      <p style={{ color: 'red' }}>Email não válido</p>
                    )}
                  </Grid>
                </Grid>
            
                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={12}>
                    <TextField
                      label="Escreva sua mensagem..." 
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      {...register('text')} 
                    />
                    {errors?.text?.type === 'required' && (
                      <p style={{ color: 'red' }}>A mensagem é obrigatória</p>
                    )}

                    <Button 
                      variant="contained" 
                      type="submit" 
                      style={{ marginTop: '15px' }}
                    >
                      Enviar
                    </Button>
                  </Grid>   
                </Grid>         
              </Grid>
            </Box>
          </form>
        </FormProvider>
      </LayoutPageBase>
    </LateralMenu>
  );
};