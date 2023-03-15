const fs = require("fs");

const dir = "./files/";
const fileName = "./files/ejemploFSPromises.txt";

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const operacionesAsincronicas = async() =>{
  await fs.promises.writeFile(fileName, "Hola Coders\n");

  let contenido = await fs.promises.readFile(fileName,'utf-8');
  console.log(contenido);

  await fs.promises.appendFile(fileName, "Append contenido\n");
  
  contenido = await fs.promises.readFile(fileName,'utf-8');
  console.log(contenido);
}

operacionesAsincronicas();