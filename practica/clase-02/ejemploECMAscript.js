const objetos = [
  { manzanas: 3, peras: 2, carne: 1, jugos: 5, dulces: 2 },
  { manzanas: 1, sandias: 1, huevos: 6, jugos: 1, panes: 4 }
]; 

const allObjects = objetos.map(obj => Object.keys(obj));
const oneArrayObjects = [...allObjects[0], ...allObjects[1]];
const uniqueArray = oneArrayObjects.filter((item, index) => oneArrayObjects.indexOf(item) === index);
console.log(uniqueArray);

const sum = objetos.map(obj =>  Object.values(obj)).flat().reduce((a, b) => a + b, 0)
console.log(sum);