import { Box, Button, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Axios from 'axios'


export const Registro = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  // Onclick en el boton submit
  const createUser = (e) => {
    e.preventDefault()
    // Usamos Axios para crear una API para conectar con el servidor
    Axios.post('http://localhost:3002/registro', {
      Email: email,
      Username: username,
      Password: password
    }).then(() => {
      // Una vez registrado nos redirigimos al login
      navigateTo("/login")
      setEmail('')
      setUsername('')
      setPassword('')
    })
  }

  return (
    <>
      <h1 className='titleLogin'>Registro</h1>
      <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <form className='formLogin'>
          <TextField
            label="Usuario"
            variant="outlined"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={(e) => setEmail(e.target.value)}

          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="outlined-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            placeholder='Ingrese su contraseña'

          />
          <TextField
            label="Confirmar contraseña"
            variant="outlined"
            name="confirmarContraseña"
            type="password"
            autoComplete="current-password"
          />
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" sx={{ width: 200 }} onClick={createUser}>
              Enviar
            </Button>
          </Box>
          <Link to="/login">Ya tengo cuenta</Link>
        </form>
      </div>
    </>
  )
}