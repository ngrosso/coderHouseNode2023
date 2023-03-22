import fs from "fs";

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
      this.#products = this.#products.filter(product => product != productToDelete);
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#products));
        return productToDelete;
      } catch (e) {
        throw new Error(e);
      }
    }
    console.log(new ProductDoesntExistError(id));
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

export default ProductManager;


