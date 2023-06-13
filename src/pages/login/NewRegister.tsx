import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import * as yup from 'yup';

import { IUsers } from '../../interfaces';
import { UsersServices } from '../../shared/services/api/axios-config/testProduct/UserService';
import ButtonLogin from './ButtonLogin';
import { Body, ContainerRegister, Input, Select } from './Register.styles';

export const UsersValidationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  occupation: yup.string().required(),
  privatyTerms: yup.boolean().required(),
});

export const UsersSchema = yupResolver(UsersValidationSchema);

export const NewRegister = () => {
  const formMethods = useForm<IUsers>({ resolver: UsersSchema });
  const { register, handleSubmit, watch, reset, formState: { errors }, } = formMethods;

  const navigate = useNavigate();
  const watchPassword = watch('password');

  const handleNavigate = () => {
    navigate('/register');
  };

  const onSubmit = async (values: IUsers) => {
    const { status, data } = await UsersServices.sendUser(values);
    alert(`Usuário "${values.name}" adicionado com sucesso!`);

    if (status !== 202) {
      console.log('Error...', data);  
      alert('Algo de errado com o seu cadastro!');
    }
  };

  return (
    <Body>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '50px 400px 0px 400px'}}>
          <ContainerRegister>
            <h1>Bem vindo ao OPTIMIZATION SYSTEM</h1>
            <h2>Crie uma conta</h2>
        
            <div>
              <Input
                type="text"
                placeholder="Nome"
                {...register('name')}
              />
              {errors?.name?.type === 'required' && (
                <p style={{ color: 'red' }}>O nome é obrigatório</p>
              )}
            </div>

            <div>
              <Input
                style={{ marginTop: '30px' }}
                type="email"
                placeholder='Email'
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
            </div>

            <div>
              <Input
                style={{ marginTop: '30px' }}
                type='password'
                placeholder='Senha'
                {...register('password', {
                  required: true, 
                  minLength: 6,
                })}
              />
              {errors?.password?.type === 'required' && (
                <p style={{ color: 'red' }}>Senha é obrigatório</p>
              )}
            </div>

            <div>
              <Select
                style={{ marginTop: '30px' }}
                defaultValue='0'
                {...register('occupation', {
                  validate: (value) => value !== '0'
                })}
              >
                <option value='0'>Selecione a sua profissão</option>
                <option value='developer'>Desenvolvedor</option>
                <option value='student'>Estudante</option>
                <option value='other'>Outros</option>
        
              </Select>
              {errors?.occupation?.type === 'validate' && (
                <p style={{ color: 'red' }}>Profissão é obrigatório</p>
              )}
            </div>

            <div>
              <input
                style={{ marginTop: '30px' }} 
                type='checkbox'
                {...register('privatyTerms', {
                  validate: (value) => value === true,
                })}
              />
              <label style={{ fontSize: '18px' }}>Eu concordo com o termos de privacidade</label>
              {errors?.privatyTerms?.type === 'validate' && (
                <p style={{ color: 'red' }}>
            Termos de privacidade são obrigatórios
                </p>
              )}
            </div>
            <div style={{  display: 'flex '}}>
              <ButtonLogin onClick={handleNavigate}>VOLTAR</ButtonLogin>
              <ButtonLogin>CRIAR CONTA</ButtonLogin>
            </div>
          </ContainerRegister>
        </form>
      </FormProvider>
    </Body>
  );
};