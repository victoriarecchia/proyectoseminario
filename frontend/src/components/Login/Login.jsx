import { Box, Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "./Login.css";

export const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');
  const [errorMessage, setErrorMessage] = useState('')
  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (loginUsername == '' || loginPassword == '') {
      setErrorMessage('Rellene todos los campos');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:8000/login', {
        LoginUsername: loginUsername,
        LoginPassword: loginPassword,
      },
      {  headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.data.success) {
        navigateTo('/');
        setLoginPassword('')
        setLoginUsername('')
        setErrorMessage('')
      } else {
        setLoginStatus(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Datos incorrectos');
    }
  }

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
    }
  }, [loginStatus]);

  return (
    <>
      <h1 className='titleLogin'>Login</h1>
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <form className='formLogin' onSubmit={loginUser}>
          <span className={statusHolder}>{loginStatus}</span>
          <TextField
            onChange={(e) => setLoginUsername(e.target.value)}
            label="Usuario"
            variant="outlined"
            name="loginusername"
            placeholder='Ingrese su usuario'
          />
          <TextField
            onChange={(e) => setLoginPassword(e.target.value)}
            name="contraseña"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder='Ingrese su contraseña'
          />
          {errorMessage && (
            <Typography color="error" align="center">
              {errorMessage}
            </Typography>
          )}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 2 }}>
            <Button type="submit" variant="contained" sx={{ width: 200 }}>
              Enviar
            </Button>
          </Box>
          <span>¿Te olvidaste tu contraseña? <Link>Click acá</Link></span>
          <span>¿No tienes cuenta? <Link to="/registro">Registrarme</Link></span>
        </form>
      </div>
    </>
  );
};

