// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';
// import bcrypt from 'bcrypt';

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Corremos el servidor
// app.listen(8000, () => {
//   console.log("Servidor corriendo en el puerto 8000");
// });

// // Configuración de la base de datos (mysql)
// const db = mysql.createConnection({
//   user: 'root',
//   host: 'localhost',
//   password: '', // Asegúrate de definir la contraseña si la tienes
//   database: 'dovos',
// });
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la base de datos (mysql)
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '', // Asegúrate de definir la contraseña si la tienes
  database: 'dovos',
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Corremos el servidor
app.listen(8000, () => {
  console.log("Servidor corriendo en el puerto 8000");
});

// Ruta para obtener la lista de usuarios
app.get('/usuarios', (req, res) => {
  const SQL = 'SELECT username FROM users'; // Ajusta la consulta SQL según tu esquema de base de datos
  db.query(SQL, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).send({ error: 'Error al obtener usuarios' });
    } else {
      const usuarios = results.map(result => result.username);
      res.status(200).send(usuarios);
    }
  });
});


// Ruta al servidor para registrar un usuario
app.post('/registro', async (req, res) => {
  const { Email, Username, Password } = req.body;

  try {
    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(Password, 10);
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const Values = [Email, Username, hashedPassword];

    db.query(SQL, Values, (err, results) => {
      if (err) {
        res.status(500).send({ error: 'Error al registrar el usuario' });
      } else {
        console.log('Usuario insertado correctamente');
        res.status(201).send({ message: 'Usuario registrado con éxito' });
      }
    });
  } catch (error) {
    res.status(500).send({ error: 'Error al encriptar la contraseña' });
  }
});

// Ruta al servidor para iniciar sesión
app.post('/login', (req, res) => {
  const { LoginUsername, LoginPassword } = req.body;

  if (!LoginUsername || !LoginPassword) {
    return res.status(400).send({ error: 'Por favor, rellene todos los campos' });
  }

  const SQL = 'SELECT * FROM users WHERE username = ?';
  const Values = [LoginUsername];

  db.query(SQL, Values, async (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      res.status(500).send({ error: 'Error al buscar el usuario' });
    }
    else if (results.length > 0) {
      // Comparamos la contraseña encriptada
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(LoginPassword, user.password);

      if (isPasswordValid) {
        res.send({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).send({ message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  });
});
