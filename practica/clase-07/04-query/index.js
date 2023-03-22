import express from 'express'

const app = express();

app.use(express.urlencoded({ extended: true }));

const users = [
  {
    id: 1,
    nombre: 'Pepe',
    apellido: 'Argento',
    edad: 32,
    genero: "M"
  },
  {
    id: 2,
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 27,
    genero: "M"
  },
  {
    id: 3,
    nombre: 'Maria',
    apellido: 'Gomez',
    edad: 25,
    genero: "F"
  }
]

app.get('/', (req, res) => {
  console.log(req.query)
  if(req.query.genero){
    const { genero } = req.query;
    if(!genero || (genero !== "M" && genero !== "F")) res.status(400).send({ error: 'Debe ingresar un genero Valido' });
    const user = users.filter(user => user.genero === genero);
    if (!user) res.status(404).send({ error: 'Usuario no encontrado' });
    res.send({data:user});
  }else{
    res.send({data:users});
  }
});

app.get("/query", (req, res) => {
  const { nombre, apellido } = req.query;
  const user = users.find(user => user.nombre === nombre && user.apellido === apellido);
  if (!user) res.status(404).send({ error: 'Usuario no encontrado' });
  res.send(user);
});

app.get("/", (req, res) => {

});


app.listen(8081, () => {
  console.log('Servidor http escuchando en el puerto 8081');
});