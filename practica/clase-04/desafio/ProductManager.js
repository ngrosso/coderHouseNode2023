const fs = require("fs");

class ProductManager {

  id = Number;
  products = Array;
  path = String;
  dir = String;

  constructor() {
    this.dir = "./files/"
    this.path = "./files/products.json"
    this.id = 1;
    this.products = [];
  }

  async init() {
    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir);
    if (!fs.existsSync(this.path)) {
      try {
        await fs.promises.writeFile(this.path, "[]");
      } catch (e) {
        throw new Error(e);
      }
    } else {
      try {
        const productListFile = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(productListFile);
        if (this.products.length > 0) {
          this.id = Math.max(...this.products.map(obj => {
            return obj.id;
          })) + 1;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const product = { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock };
    if (this.products.find(p => p.code == product.code)) return console.log(new RepeatedCode(product.code));
    product["id"] = this.id++;
    this.products.push(product);
    try{
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      return product;
    }catch(e){
      throw new Error(e);
    }
  }

  async getProducts() {
    try{
      this.products = JSON.parse(await fs.promises.readFile(this.path,"utf-8"));
      return this.products;
    }catch(e){
      throw new Error(e);
    }
  }

  async getProductById(id) {
    try{
      this.products = JSON.parse(await fs.promises.readFile(this.path,"utf-8"));
    }catch(e){
      throw new Error(e);
    }
    const product = this.products.find(product => product.id === id);
    if (product != undefined) {
      return product;
    } else {
      console.log(new ProductDoesntExist(id));
    }
  }

}

class ProductDoesntExist extends Error {
  constructor(id) {
    super(`Id:${id} Not Found!`);
  }
}

class RepeatedCode extends Error {
  constructor(code) {
    super(`Code:${code} already exists!`);
  }
}


const main = async () => {

  // Se creará una instancia de la clase “ProductManager”
  let productManager = new ProductManager()
  // Se llamará al método “init” de la instancia creada
  await productManager.init();

  // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
  console.log("=========== Get Products (Leyendo archivo) ===========");
  console.log(await productManager.getProducts());
  // Se llamará al método “addProduct” con los campos:
  // title: “producto prueba”
  // description:”Este es un producto prueba”
  // price:200,
  // thumbnail:”Sin imagen”
  // code:”abc123”,
  // stock:25
  // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
  console.log("================ Add Product ================");
  await productManager.addProduct("producto Prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
  // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
  console.log(`========= Get Products (cantidad: ${(await productManager.getProducts()).length} productos) =========`);
  console.log(await productManager.getProducts());
  // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
  console.log("====== Add Product (Error mismo codigo) ======");
  await productManager.addProduct("producto Prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
  // Se evaluará que getProductById devuelva el producto en caso de encontrarlo
  console.log("============= Get Product By Id =============");
  console.log(await productManager.getProductById(1));
  // Se evaluará que getProductById devuelva error si no encuentra el producto
  console.log("===== Get Product By Id (Error not found, si se ejecuta nuevamente, existe) =====");
  console.log(await productManager.getProductById(2));
  console.log("================ Add Product ================");
  await productManager.addProduct("producto Prueba2", "Este es un producto prueba2", 400, "Sin Imagen", "bcd234", 30);
  console.log(console.log(`========= Get Products (cantidad: ${(await productManager.getProducts()).length} productos) =========`));
  console.log(await productManager.getProducts());
}

main();