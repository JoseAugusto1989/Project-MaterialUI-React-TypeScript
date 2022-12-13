import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import nameIcon from '../../assets/img/Add-User.png';
import emailIcon from '../../assets/img/Message.png';
import passwordIcon from '../../assets/img/Password.png';

import userAuth from '../../shared/contexts/userAuth';
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
} from './Login.styles';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleRegistration = (data: any) => console.log(data);

  const navigate = useNavigate();
  const { signin } = userAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEnterLogin = () => {
    navigate('/enterLogin');
  };

  const handleLogin = () => {
    console.log('testing!!!@@@');
    if (!email || !password) {
      setError('Por favor preencha todos os campos');
      return;
    }

    if (signin) {
      const res = signin(email, password);

      if (res) {
        setError(res);
        return;
      }
      navigate('/home');
    }
  };

  return (
    <ContainerMain>
      <ContainerLeft color="#484747">
        <LetterLogo>OPTIMIZATION SYSTEM</LetterLogo>
        <TextContainerLeft>Bem vindo de volta!</TextContainerLeft>
        <TextContainerLeft>Acesse sua conta agora mesmo</TextContainerLeft>

        <DivTest>
          <ButtonLogin onClick={handleEnterLogin}>ENTRAR</ButtonLogin>
        </DivTest>
      </ContainerLeft>

      <ContainerRight color="white">
        <LetterContainer>Crie sua conta</LetterContainer>
        <LetterData>Preencha seus dados</LetterData>

        <InputLogin icon={nameIcon} type="text" placeholder="Nome" />

        <InputLogin
          icon={emailIcon}
          type="email"
          placeholder="Email"
          onChange={(e) => [setEmail(e.target.value), setError('')]}
        />

        <InputLogin
          icon={passwordIcon}
          type="password"
          placeholder="Senha"
          onChange={(e) => [setPassword(e.target.value), setError('')]}
        />

        <DivTest>
          <ButtonLogin onClick={handleLogin}>CADASTRAR</ButtonLogin>
        </DivTest>
      </ContainerRight>
    </ContainerMain>
  );
};

export default Login;
