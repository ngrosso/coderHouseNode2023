import express from 'express'

const app = express();


app.get('/bienvenida/:nombre', (req, res) => {
  res.send(`Bienvenido ${req.params.nombre}`);
});

app.get('/bienvenida/:nombre/:apellido', (req, res) => {
  res.send(`Bienvenido ${req.params.nombre} ${req.params.apellido}`);
});


app.listen(8081, () => {
  console.log('Servidor http escuchando en el puerto 8081');
});