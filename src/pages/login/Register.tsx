import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import validator from 'validator';

import emailIcon from '../../assets/img/Message.png';
import passwordIcon from '../../assets/img/Password.png';
import ButtonLogin from './ButtonLogin';
import InputLogin from './Input';
import {
  ContainerLeft,
  ContainerMain,
  ContainerRight,
  DivTest,
  LetterContainer,
  LetterData,
  LetterLogo,
  TextContainerLeft,
} from './Register.styles';

interface IUsers {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register : React.FC = () => {

  const { register, watch, handleSubmit, formState: { errors }, } = useForm<IUsers>();

  const navigate = useNavigate();
  const watchPassword = watch('password');

  const handleMenu = () => {
    navigate('/initial-page');
  };

  const handleNewLogin = () => {
    navigate('/newLogin');
  };

  const handleLogin = (data: IUsers) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <ContainerMain>
          <ContainerLeft color="#484747">
            <LetterLogo>OPTIMIZATION SYSTEM</LetterLogo>
            <TextContainerLeft>Bem vindo!</TextContainerLeft>
            <TextContainerLeft>Novo por aqui?</TextContainerLeft>
            <TextContainerLeft>Cadastre-se agora mesmo!</TextContainerLeft>

            { true && (<DivTest>
              <ButtonLogin onClick={handleNewLogin}>CADASTRAR</ButtonLogin>
            </DivTest>)}
          </ContainerLeft>

          <ContainerRight color="white">
            <LetterContainer>Acesse a sua conta</LetterContainer>
            <LetterData>Preencha seus dados</LetterData>

            <InputLogin
              icon={emailIcon}
              type="email"
              placeholder="Email"
              {...register('email', {
                required: true,
                validate: (value) => validator.isEmail(value)
              })}
            />
            {errors?.email?.type === 'required' && (
              <p style={{ color: 'red', padding: '0px 190px 0px 0px' }}>Email é obrigatório</p>
            )}

            <InputLogin
              icon={passwordIcon}
              type="password"
              placeholder="Senha"
              {...register('password', {
                required: true, 
                minLength: 6,
              })}
            />
            {errors?.password?.type === 'required' && (
              <p style={{ color: 'red', padding: '0px 160px 0px 0px' }}>Password é obrigatório</p>
            )}

            <InputLogin
              icon={passwordIcon}
              type="password"
              placeholder="Confirme sua senha"
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watchPassword,
              })}
            />
            {errors?.confirmPassword?.type === 'required' && (
              <p style={{ color: 'red', padding: '0 70px 0 0' }}>Confirmação da senha é obrigatório</p>
            )}

            {errors?.confirmPassword?.type === 'validate' && (
              <p style={{ color: 'red' }} className="error-message">Passwords does not match.</p>
            )}

            <DivTest>
              <ButtonLogin onClick={handleMenu} type='submit'>ENTRAR</ButtonLogin>
            </DivTest>
          </ContainerRight>
        </ContainerMain>
      </form>
    </div>
  );
};
