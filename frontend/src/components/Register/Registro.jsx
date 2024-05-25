import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


export const Registro = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:8000/registro', {
        Email: email,
        Username: username,
        Password: password,
      });

      if (response.status === 201) {
        navigateTo('/login');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Error al registrar el usuario');
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Registro
      </Typography>
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <form className='formLogin' onSubmit={createUser}>
          <TextField
            label="Usuario"
            variant="outlined"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            placeholder='Ingrese su contraseña'
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirmar contraseña"
            variant="outlined"
            name="confirmarContraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {errorMessage && (
            <Typography color="error" align="center">
              {errorMessage}
            </Typography>
          )}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" sx={{ width: 200 }}>
              Enviar
            </Button>
          </Box>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Link to="/login">Ya tengo cuenta</Link>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Registro;
