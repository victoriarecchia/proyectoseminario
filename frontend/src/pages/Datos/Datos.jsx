// import React from 'react'
// import './Datos.css'

// export const Datos = () => {
//   return (
//     <div className='containerData'>
//       <p style={{textAlign: 'center'}}> DATOS PERSONALES</p>
//       <p>Nombre: </p>
//       <p>Apellido:</p>
//       <p>DNI:</p>
//       <p>Telefono:</p>
//       <p>Direccion:</p>
//       <p>Factor de sangre:</p>
//       <p>Localidad:</p>
//       <p>Provincia:</p>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

export const Datos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    direccion: '',
    factorSangre: '',
    localidad: '',
    provincia: ''
  });

  useEffect(() => {
    // Cargar los datos desde localStorage al montar el componente
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Guardar los datos en localStorage
    localStorage.setItem('userData', JSON.stringify(formData));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          DATOS PERSONALES
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { marginBottom: 2 },
        }}
      >
        <TextField 
          label="Nombre" 
          variant="outlined" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Apellido" 
          variant="outlined" 
          name="apellido" 
          value={formData.apellido} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="DNI" 
          variant="outlined" 
          name="dni" 
          value={formData.dni} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Teléfono" 
          variant="outlined" 
          name="telefono" 
          value={formData.telefono} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Dirección" 
          variant="outlined" 
          name="direccion" 
          value={formData.direccion} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Factor de Sangre" 
          variant="outlined" 
          name="factorSangre" 
          value={formData.factorSangre} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Localidad" 
          variant="outlined" 
          name="localidad" 
          value={formData.localidad} 
          onChange={handleInputChange} 
        />
        <TextField 
          label="Provincia" 
          variant="outlined" 
          name="provincia" 
          value={formData.provincia} 
          onChange={handleInputChange} 
        />
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ marginTop: 2 }} 
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Box>
    </Container>
  );
};
