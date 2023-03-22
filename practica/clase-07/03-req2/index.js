import express from 'express'

const app = express();

const users = [
  {
    id: 1,
    nombre: 'Pepe',
    apellido: 'Argento',
    edad: 32,
  },
  {
    id: 2,
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 27,
  },
  {
    id: 3,
    nombre: 'Maria',
    apellido: 'Gomez',
    edad: 25
  }
]

app.get('/', (req, res) => {
  res.send(users);
});

app.get('/:userId', (req, res) => {
  const id = +req.params.userId;
  const user = users.find(user => user.id === id);
  if (!user) res.status(404).send({ error: 'Usuario no encontrado' });
  res.send(user);
});


app.listen(8081, () => {
  console.log('Servidor http escuchando en el puerto 8081');
});