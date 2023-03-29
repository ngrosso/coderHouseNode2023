import fs from "fs";

class CartManager {

  #id = Number;
  #carts = Array;
  path = String;
  dir = String;

  constructor() {
    this.dir = "./src/utils/files/"
    this.path = `${this.dir}products.json`
    this.#id = 1;
    this.#carts = [];
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
        const cartListFile = await fs.promises.readFile(this.path, 'utf-8');
        this.#carts = JSON.parse(cartListFile);
        if (this.#carts.length > 0) {
          this.#id = Math.max(...this.#carts.map(obj => obj.id)) + 1;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  async addCart(cart) {
    await this.init();
    cart["id"] = this.#id++;
    this.#carts.push(cart);
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
      return cart;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCarts() {
    await this.init();
    try {
      this.#carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      return this.#carts;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    await this.init();
    try {
      this.#carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (e) {
      throw new Error(e);
    }
    const product = this.#carts.find(product => product.id === id);
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
    await this.init();
    const { title, description, price, thumbnail, code, stock } = product;
    const productToModify = await this.getProductById(id);
    if (this.#carts.find(p => p.code === code)) throw new RepeatedCodeError(product.code);
    if (productToModify) {
      const productNewValues = {
        title: title ?? productToModify.title,
        description: description ?? productToModify.description,
        price: price ?? productToModify.price,
        thumbnail: thumbnail ?? productToModify.thumbnail,
        code: code ?? productToModify.code,
        stock: stock ?? productToModify.stock
      };
      this.#carts[this.#carts.indexOf(productToModify)] = { ...productToModify, ...productNewValues };
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
      } catch (e) {
        throw new Error(e);
      }
      return await this.getProductById(id);
    }
  }

  async deleteProduct(id) {
    await this.init();
    const productToDelete = await this.getProductById(id);
    if (productToDelete) {
      this.#carts = this.#carts.filter(product => product != productToDelete);
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
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

export default ProductManager;

