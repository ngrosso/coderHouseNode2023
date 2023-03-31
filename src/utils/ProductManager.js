import fs from "fs/promises";


import Product from "./Product.js";

class ProductManager {

  #id = Number;
  #products = Array;
  path = String;
  dir = String;

  constructor() {
    this.dir = "./src/utils/files/"
    this.path = `${this.dir}products.json`
    this.#id = 1;
    this.#products = [];
  }

  async init() {
    let fileExists = false;
    try {
      await fs.access(this.dir);
    } catch (e) {
      await fs.mkdir(this.dir);
    }
    try {
      await fs.stat(this.path)
      fileExists = true;
    } catch (e) {
      fileExists = false;
    }
    if (!fileExists) {
      try {
        await fs.writeFile(this.path, "[]");
      } catch (e) {
        throw new Error(e);
      }
    } else {
      try {
        const productListFile = await fs.readFile(this.path, 'utf-8');
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
    const { title, description, price, thumbnail, code, stock, status, category } = product;
    if (typeof (title) !== "string") throw new InvalidProductError("title")
    if (typeof (description) !== "string") throw new InvalidProductError("description")
    if (typeof (price) !== "number") throw new InvalidProductError("price")
    if (typeof (thumbnail) !== "object") throw new InvalidProductError("thumbnail")
    if (typeof (code) !== "string") throw new InvalidProductError("code")
    if (typeof (stock) !== "number") throw new InvalidProductError("stock");
    if (typeof (status) !== "boolean") throw new InvalidProductError("status");
    if (typeof (category) !== "string") throw new InvalidProductError("category");
    const productObject = new Product(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.status, product.category);
    if (this.#products.find(p => p.code === productObject.code)) throw new RepeatedCodeError(product.code);
    productObject["id"] = this.#id++;
    this.#products.push(productObject);
    try {
      await fs.writeFile(this.path, JSON.stringify(this.#products));
      return productObject;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProducts() {
    try {
      this.#products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      return this.#products;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    try {
      this.#products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    } catch (e) {
      throw new Error(e);
    }
    const product = this.#products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      throw new ProductDoesntExistError(id);
    }
  }

  /* permite modificar uno o mas campos de un producto llamando: 
  updateProduct(id, {campo: valor}) 
  updateProduct(id, {campo: valor, campo: valor}) 
  o todos los campos a modificar updateProduct(id, {campo: valor, campo: valor, campo: valor})*/
  async updateProduct(id, product) {
    const { title, description, price, thumbnail, code, stock, status, category } = product;
    if (typeof (title) !== "string" && title !== undefined) throw new InvalidProductError("title")
    if (typeof (description) !== "string" && description !== undefined) throw new InvalidProductError("description")
    if (typeof (price) !== "number" && price !== undefined) throw new InvalidProductError("price")
    if (typeof (thumbnail) !== "object" && thumbnail !== undefined) throw new InvalidProductError("thumbnail")
    if (typeof (code) !== "string" && code !== undefined) throw new InvalidProductError("code")
    if (typeof (stock) !== "number" && stock !== undefined) throw new InvalidProductError("stock");
    if (typeof (status) !== "boolean" && status !== undefined) throw new InvalidProductError("status");
    if (typeof (category) !== "string" && category !== undefined) throw new InvalidProductError("category");
    const productToModify = await this.getProductById(id);
    if (this.#products.find(p => p.code === code)) throw new RepeatedCodeError(product.code);
    if (productToModify) {
      const productNewValues = new Product(
        title ?? productToModify.title,
        description ?? productToModify.description,
        price ?? productToModify.price,
        thumbnail ?? productToModify.thumbnail,
        code ?? productToModify.code,
        stock ?? productToModify.stock,
        status ?? productToModify.status,
        category ?? productToModify.category
      );
      this.#products[this.#products.indexOf(productToModify)] = { ...productToModify, ...productNewValues };
      try {
        await fs.writeFile(this.path, JSON.stringify(this.#products));
      } catch (e) {
        throw new Error(e);
      }
      return productNewValues;
    }
  }

  async deleteProduct(id) {
    const productToDelete = await this.getProductById(id);
    if (productToDelete) {
      this.#products = this.#products.filter(product => product != productToDelete);
      try {
        await fs.writeFile(this.path, JSON.stringify(this.#products));
        return productToDelete;
      } catch (e) {
        throw new Error(e);
      }
    }
    throw new ProductDoesntExistError(id);
  }
}

class RepeatedCodeError extends Error {
  constructor(code) {
    super(`Product Code:${code} already exists!`);
  }
}

class ProductDoesntExistError extends Error {
  constructor(id) {
    super(`Product Id:${id} Not Found!`);
  }
}

class InvalidProductError extends Error {
  constructor(param) {
    super(`Product ${param} format is not valid!`);
  }
}

export default ProductManager;

