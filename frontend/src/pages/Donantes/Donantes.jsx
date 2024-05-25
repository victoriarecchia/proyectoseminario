import { Button, TextField } from '@mui/material'
import Axios from 'axios'
import './Donantes.css'
import { useEffect, useState } from 'react'

const Donantes = () => {

  const [users, setUsers] = useState([])
  const obtenerUsuarios = async (e) => {
    try {
      const response = await Axios.get('http://localhost:8000/usuarios'); 
      setUsers(response.data);
      // console.log(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  // const handleFiltrarClick = () => {
    // filtrarUsuarios();
  // };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Lista de donantes</h1>
      <h3>Filtrar datos</h3>
      <div className='filtrosUsuarios'>
        <TextField name='Factor sanguíneo' placeholder='Factor sanguíneo'></TextField>
        <TextField name='Ciudad' placeholder='Ciudad'></TextField>
        <TextField name='Provincia' placeholder='Provincia'></TextField>
        <Button>Filtrar</Button>
      </div>
      <div>
        <h3>DONANTES</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>Nombre: {user}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default Donantes