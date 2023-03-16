const moment = require("moment");

const fechaActual = moment();
const fechaNacimiento = moment("1993-10-07");

if(!fechaNacimiento.isValid()){
  console.log("La fecha no es válida");
}else{
  const diasTranscurridos = fechaActual.diff(fechaNacimiento,'years');
  console.log(`Han transcurrido ${diasTranscurridos} años desde tu nacimiento`)
}


