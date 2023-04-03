import { Box, Button, TextField, Typography } from '@mui/material';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import React, { useState } from 'react';

export interface ILogin {
  name: string;
  email: string;
  passward?: string;
}

export const AuthLogin = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(input);
  };

  const resetState = () => {
    setIsSignup(!isSignup);
    setInput({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          display='flex' 
          flexDirection='column' 
          maxWidth={400}
          alignItems='center'
          justifyContent='center'
          margin='auto'
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow='5px 5px 10px #ccc'
          sx={{
            ':hover': {
              boxShadow:'10px 10px 20px #ccc'
            }}}
        >
          <Typography variant='h2' padding={3} textAlign='center'>
            { isSignup ? 'Cadastrar novo usuário': 'Login' }
          </Typography>
          
          { isSignup && (
            <TextField 
              onChange={handleChange}
              name='name'
              margin='normal' 
              type='text' 
              value={input.name}
              variant='outlined' 
              placeholder='Nome' 
            />
          )}

          <TextField 
            onChange={handleChange}
            name='email'
            margin='normal' 
            type='email' 
            value={input.email}
            variant='outlined'
            placeholder='Email' 
          />

          <TextField 
            onChange={handleChange}
            name='password'
            margin='normal' 
            type='password' 
            value={input.password}
            variant='outlined' 
            placeholder='Senha' 
          />

          <Button 
            size='large'
            endIcon={ isSignup ? <LoginOutlinedIcon /> : <HowToRegOutlinedIcon />}
            type='submit'
            variant='contained' 
            color='primary'
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            { isSignup ? 'Confirmar' : 'Entrar' }
          </Button>

          <Button 
            size='large'
            variant='text' 
            color='secondary'
            endIcon={ isSignup ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />}
            onClick={resetState}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            { isSignup ? 'Entrar Login' : 'Cadastrar' }
          </Button>

        </Box>
      </form>
    </div>
  );
};