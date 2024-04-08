import { Box, Button, TextField } from '@mui/material'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import  Axios from 'axios'

export const Login = () => {

  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const navigateTo = useNavigate()

  const [loginStatus, setLoginStatus]= useState("")
  const [statusHolder, setStatusHolder]= useState('message')


  const loginUser = (e) => {
    e.preventDefault()
    // Usamos Axios para crear una API para conectar con el servidor
    Axios.post('http://localhost:3002/login', {
      LoginUsername: loginUsername,
      LoginPassword: loginPassword
    }).then((response) => {
      // console.log(response.data);
      if (response.data.message || loginUsername == '' || loginPassword == '') {
        navigateTo("/login")
        setLoginStatus('Datos incorrectos')
      }
      else{
        navigateTo("/")
      }
    })
  }
  useEffect(() => {
    if(loginStatus!== ''){
      setStatusHolder('showMessage')
      setTimeout(() => {
        setStatusHolder('message')
        
      }, 4000);
    }
  }, [loginStatus])
  
  const onSubmit = () => {
    setLoginUsername('')
    setLoginPassword('')
  }


  return (
    <>
      <h1 className='titleLogin'>Login</h1>
      <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <form className='formLogin' onSubmit={onSubmit}>
          <span className={statusHolder}>{loginStatus}</span>
          <TextField
            onChange={(e) => setLoginUsername(e.target.value)}
            label="Usuario"
            variant="outlined"
            name="loginusername"
            placeholder='Ingrese su usuario'
          />
          <TextField
            onChange={(e)=>setLoginPassword(e.target.value)}
            name="contraseña"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder='Ingrese su contraseña'
          />
          <TextField
            id="outlined-password-input"
            type="password"
            autoComplete="current-password"
            label="Confirm Password"
            variant="outlined"
            name="confirmarContraseña"
            placeholder='Repita su contraseña'
            onChange={ (e)=> setLoginPassword(e.target.value) }

          />
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", gap: "20px" }}>
            <Button type="submit" variant="contained" onClick={loginUser} sx={{ width: 200 }}>
              Enviar
            </Button>
          </Box>
          <span>¿Te olvidaste tu contraseña? <Link>Click aca</Link></span>
          <span>¿No tienes cuenta?  <Link to="/registro">Registrarme</Link></span>

        </form>
      </div>

    </>
  )
}
