import { useForm } from 'react-hook-form';
import validator from 'validator';
import { Body, ContainerRegister, Input, Select } from './Register.styles';
import ButtonLogin from './ButtonLogin';
import { useNavigate } from 'react-router-dom';

export interface IUsers {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  occupation: string;
  privatyTerms: boolean;
}

export const NewRegister = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<IUsers>();

  const navigate = useNavigate();
  const watchPassword = watch('password');

  const handleNavigate = () => {
    navigate('/register');
  };

  const onSubmit = (data: IUsers) => {
    alert('CADASTRADO COM SUCESSO!!!');
    console.log(data);
  };

  return (
    <Body>
      <div style={{ padding: '50px 400px 0px 400px'}}>
        <ContainerRegister>
          <h1>Bem vindo ao OPTIMIZATION SYSTEM</h1>
          <h2>Crie uma conta</h2>
        
          <div>
            <Input
              type="text"
              placeholder="Nome"
              {...register('name', {required: true})}
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
            <Input 
              style={{ marginTop: '30px' }}
              type='password'
              placeholder='Confirmação de senha'
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watchPassword,
              })}
            />
            {errors?.confirmPassword?.type === 'required' && (
              <p style={{ color: 'red' }}>Confirmação de senha é obrigatório</p>
            )}

            {errors?.confirmPassword?.type === 'validate' && (
              <p style={{ color: 'red' }}>Senhas diferentes</p>
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
            <ButtonLogin onClick={() => handleSubmit(onSubmit)()}>CRIAR CONTA</ButtonLogin>
          </div>
        </ContainerRegister>
      </div>
    </Body>
  );
};