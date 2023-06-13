import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import emailIcon from '../../assets/img/Message.png';
import passwordIcon from '../../assets/img/Password.png';
import ButtonLogin from './ButtonLogin';
import InputLogin from './Input';
import { UsersSchema } from './NewRegister';
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
import { IUsers } from '../../interfaces';

export const Register : React.FC = () => {
  const formMethods = useForm<IUsers>({ resolver: UsersSchema });
  const [dataUser, setDataUser] = useState<IUsers>();
  const[email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, watch, handleSubmit, formState: { errors }, } = formMethods;
  const navigate = useNavigate();
  const watchPassword = watch('password');

  const handleNewLogin = () => {
    navigate('/newLogin');
  };

  const handleLogin = () => {
  // const handleLogin = async (email: string, password: string) => {
    navigate('/initial-page');
    // await UsersServices.getLogin(email, password)
    //   .then((res) => {
    //     // setDataUser(res.data.content);
    //     alert('deu certo 1');
    //   })
    //   .then(() => navigate('initial-page'))
    //   .catch();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={() => handleLogin()}>
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
              functionClick={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email"
              {...register('email', {
                validate: (value) => validator.isEmail(value)
              })}
            />
            {errors?.email?.type === 'required' && (
              <p style={{ color: 'red', padding: '0px 190px 0px 0px' }}>Email é obrigatório</p>
            )}

            <InputLogin
              icon={passwordIcon}
              functionClick={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Senha"
              {...register('password', {
                minLength: 4,
              })}
            />
            {errors?.password?.type === 'required' && (
              <p style={{ color: 'red', padding: '0px 160px 0px 0px' }}>Password é obrigatório</p>
            )}

            <DivTest>
              <ButtonLogin>ENTRAR</ButtonLogin>
            </DivTest>
          </ContainerRight>
        </ContainerMain>
      </form>
    </FormProvider>
  );
};
