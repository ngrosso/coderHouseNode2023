import express from 'express'

const app = express();


app.get('/bienvenida', (req, res) => {
  const message = "<html><body><h1 style='color:blue'>Bienvenido</h1></body></html>";
  res.send(message);
});

app.get('/usuario', (req, res) => {
  const message = {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 30
  };
  res.send(message);
})


app.listen(8081, () => {
  console.log('Servidor http escuchando en el puerto 8081');
});