// let variableDePrueba = 0;
//let variableDePrueba = false;
let variableDePrueba = null;

let variableAsignable = variableDePrueba || "Sin Valor";
console.log(variableAsignable);

let variableNullish = variableDePrueba?? "Sin Valor";
console.log(variableNullish);

class Persona{
  #fullname;

  constructor(nombre,apellido){
    this.nombre = nombre;
    this.apellido = apellido
    this.#fullname = `${nombre} ${apellido}`;
  }

  getFullName(){
    return this.#fullname;
  }
}

const persona = new Persona("Juan","Perez");
console.log(persona.getFullName());
