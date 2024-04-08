const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Corremos el servidor
app.listen(3002, () => {
  console.log("Servidor correindo en el puerto 3002");
})

// Creamos la base de datos (mysql)

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '', //If you gave
  database: 'dovos'
})

// Ruta al servidor para registrar un usuario
app.post('/registro', (req, res) => {
  // Obtenemos las variables enviadas en el formulario de registro
  const sentEmail = req.body.Email
  const sentUsername = req.body.Username
  const sentPassword = req.body.Password

  // Creamos SQL statements
  const SQL = 'INSERT INTO Users (email, username, password) VALUES(?,?,?)'
  const Values = [sentEmail, sentUsername, sentPassword]

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      console.log('usuario insertado correctamente');
      res.send({ message: 'User added' })
    }
  })
})


app.post('/login', (req, res) => {
  const sentLoginUsername = req.body.LoginUsername
  const sentLoginPassword = req.body.LoginPassword

  // Creamos SQL statements
  const SQL = 'SELECT * FROM Users WHERE username = ? AND password = ?'
  const Values = [sentLoginUsername, sentLoginPassword]

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err })
    }
    if (results.length > 0) {
      res.send(results)
    }
    else {
      res.send({ message: 'Los datos ingresados no coinciden' })
    }
  })
}
)