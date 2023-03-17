const fs = require("fs");

class ProductManager {

  #id = Number;
  #products = Array;
  path = String;
  dir = String;

  constructor() {
    this.dir = "./files/"
    this.path = `${this.dir}products.json`
    this.#id = 1;
    this.#products = [];
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
        this.#products = JSON.parse(productListFile);
        if (this.#products.length > 0) {
          this.#id = Math.max(...this.#products.map(obj => obj.id)) + 1;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  async addProduct(product) {
    if (this.#products.find(p => p.code === product.code)) return console.log(new RepeatedCodeError(product.code));
    product["id"] = this.#id++;
    this.#products.push(product);
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.#products));
      return product;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProducts() {
    try {
      this.#products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      return this.#products;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    try {
      this.#products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (e) {
      throw new Error(e);
    }
    const product = this.#products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      return console.log(new ProductDoesntExistError(id));
    }
  }

  /* permite modificar uno o mas campos de un producto llamando: 
  updateProduct(id, {campo: valor}) 
  updateProduct(id, {campo: valor, campo: valor}) 
  o todos los campos a modificar updateProduct(id, {campo: valor, campo: valor, campo: valor})*/
  async updateProduct(id, product) {
    const { title, description, price, thumbnail, code, stock } = product;
    const productToModify = await this.getProductById(id);
    if (this.#products.find(p => p.code === code)) return console.log(new RepeatedCodeError(product.code));
    if (productToModify) {
      const productNewValues = {
        title: title ?? productToModify.title,
        description: description ?? productToModify.description,
        price: price ?? productToModify.price,
        thumbnail: thumbnail ?? productToModify.thumbnail,
        code: code ?? productToModify.code,
        stock: stock ?? productToModify.stock
      };
      this.#products[this.#products.indexOf(productToModify)] = { ...productToModify, ...productNewValues };
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#products));
      } catch (e) {
        throw new Error(e);
      }
      return await this.getProductById(id);
    }
  }

  async deleteProduct(id) {
    const productToDelete = await this.getProductById(id);
    if (productToDelete) {
      this.#products.splice(this.#products.indexOf(productToDelete), 1);
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#products));
        return productToDelete;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
}

class RepeatedCodeError extends Error {
  constructor(code) {
    super(`Code:${code} already exists!`);
  }
}

class ProductDoesntExistError extends Error {
  constructor(id) {
    super(`Id:${id} Not Found!`);
  }
}


const main = async () => {
  // Productos de prueba
  const producto1 = {
    title: "producto Prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin Imagen",
    code: "abc123",
    stock: 25
  }
  const producto2 = {
    title: "producto Prueba 2",
    description: "Este es un producto prueba 2",
    price: 400,
    thumbnail: "Sin Imagen",
    code: "bcd234",
    stock: 30
  }
  const producto5Update = {
    title: "producto Prueba5",
    description: "Este es un producto prueba 5",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "cde345",
    stock: 35
  }

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
  console.log(await productManager.addProduct(producto1));
  // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
  console.log(`========= Get Products (cantidad: ${(await productManager.getProducts()).length} productos) =========`);
  console.log(await productManager.getProducts());
  // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
  console.log("====== Add Product (Error mismo codigo) ======");
  console.log(await productManager.addProduct(producto1));
  // Se evaluará que getProductById devuelva el producto en caso de encontrarlo
  console.log("============= Get Product By Id =============");
  console.log(await productManager.getProductById(1));
  // Se evaluará que getProductById devuelva error si no encuentra el producto
  console.log("===== Get Product By Id (Error not found, si se ejecuta nuevamente, existe) =====");
  console.log(await productManager.getProductById(2));
  console.log("================ Add Product ================");
  console.log(await productManager.addProduct(producto2));
  console.log(console.log(`========= Get Products (cantidad: ${(await productManager.getProducts()).length} productos) =========`));
  console.log(await productManager.getProducts());
  // Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
  console.log("============= Update Product (Solo title) =============");
  console.log(await productManager.updateProduct(1, { title: "producto Prueba4" }));
  console.log("============= Update Product (Todos los campos) =============");
  console.log(await productManager.updateProduct(2, producto5Update));
  console.log("============= Update Product (Error mismo codigo) =============");
  console.log(await productManager.updateProduct(2, producto1));
  // Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
  console.log("============= Delete Product =============");
  console.log(await productManager.deleteProduct(1));
  console.log(`========= Get Products (cantidad: ${(await productManager.getProducts()).length} productos) =========`);
  console.log(await productManager.getProducts());
}

main();