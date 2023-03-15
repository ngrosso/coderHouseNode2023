const fs = require("fs");

class UserManager {

  fileName = String;

  constructor() {
    this.fileName = "Users.json";
    if(!fs.existsSync(this.fileName)){
      fs.promises.writeFile(this.fileName, "[]");
    } 
  }

  async addUser(userObject) {
    try{
      const userListFile = await fs.promises.readFile(this.fileName,'utf-8');
      const userList = JSON.parse(userListFile);
      userList.push(userObject);
      await fs.promises.writeFile(this.fileName, JSON.stringify(userList));
    }catch(error){
      console.log(error);
    }
  }

  async getUsers() {
     const users = await fs.promises.readFile(this.fileName);
     return JSON.parse(users);
  }
}


const user = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 30,
  curso: "Full Stack"
}

const user2 = {
  nombre: "Pedro",
  apellido: "Gomez",
  edad: 25,
  curso: "Front End"
}


const main = async () => {
  const userManager = new UserManager();
  console.log(await userManager.getUsers());
  await userManager.addUser(user);
  console.log(await userManager.getUsers());
  await userManager.addUser(user2);
  console.log(await userManager.getUsers());
}

main();