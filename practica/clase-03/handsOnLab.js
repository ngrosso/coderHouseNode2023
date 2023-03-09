const suma = async (sumando1,sumando2) =>{
  return new Promise((resolve,reject) =>{
    if (sumando1 !== 0 && sumando2 !== 0) resolve(sumando1 + sumando2);
    reject("Sumandos tienen que ser distinto de cero");;
  })
}

const resta = async (minuendo,sustraendo) =>{
  return new Promise((resolve,reject) =>{
    if (minuendo >= sustraendo) resolve(minuendo - sustraendo);
    reject("Minuendo tiene que ser mayor o igual al sustraendo");;
  })
}


const operaciones = async () =>{
  try{
    const resSum = await suma(0,0);
    console.log(resSum);
  }catch(error){
    console.log(error)
  }

  try{
    const resSum = await(5,5);
    console.log(resSum);
  }catch(error){
    console.log(error)
  }

  try{
    const resResta = await resta(5,6);
    console.log(resResta);
  }catch(error){
    console.log(error)
  }

  try{
    const resResta = await resta(5,2);
    console.log(resResta);
  }catch(error){
    console.log(error)
  }
}

operaciones();