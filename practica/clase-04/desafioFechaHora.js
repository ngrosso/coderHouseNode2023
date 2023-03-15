const fs = require("fs");

const dir = "./files";
const fileName = "./files/desafioFechaHora.txt";

const currentDate = new Date().toLocaleString();

if (!fs.existsSync(dir)) fs.mkdirSync(dir);


fs.writeFile(fileName, `${currentDate} \n` , (err) => {
  if (err) return new Error(err);
  fs.readFile(fileName, "utf-8", (err, res) => {
    if (err) return new Error(err);
    console.log(res);
  })
});

