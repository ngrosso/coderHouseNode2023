const fs = require("fs").promises;
const crypto = require("crypto");

class UserManager {

  nombre = String;
  apellido = String;
  username = String;
  password = String;

  constructor() {
    this.fileName = "./users.json";
  }

  async create(user) {
    let users = await this.getUsers();
    const userExists = users.find(u => u.username === user.username);

    if (userExists) {
      console.log(`El usuario ${user.username} ya existe`);
      return;
    }

    const hashedPassword = crypto.createHash("sha256").update(user.password).digest("hex");

    users.push({
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      password: hashedPassword
    });

    await fs.writeFile(this.fileName, JSON.stringify(users));
    
  }

  async validate(username, password) {
    const users = await this.getUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
      console.log(`El usuario ${username} no existe`);
      return;
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    if (user.password === hashedPassword) {
      console.log(`El usuario ${username} se ha logueado correctamente`);
    } else {
      console.log(`La contraseña es incorrecta`);
    }
  }

  async getUsers() {
    try {
      const users = await fs.readFile(this.fileName, "utf-8");
      return JSON.parse(users);
    } catch (e) {
      await fs.writeFile(this.fileName, "[]");
      return [];
    }
  }

}

const main = async () =>{
  try {
    const userManager = new UserManager();
    
    await userManager.create({
      nombre: "Juan",
      apellido: "Perez",
      username: "jperez",
      password: "mypassword"
    });

    await userManager.validate("jperez", "mypassword");
    await userManager.validate("jperez", "mypassword2");
  }catch(e){
    console.log(e);
  }
}

main();