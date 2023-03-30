import fs from "fs";
import ProductManager from "./ProductManager.js";
import Cart from "./Cart.js";
import CartProduct from "./CartProduct.js";

class CartManager {

  #id = Number;
  #carts = Array;
  path = String;
  dir = String;
  productManager = new ProductManager();

  constructor() {
    this.dir = "./src/utils/files/"
    this.path = `${this.dir}carts.json`
    this.#id = 1;
    this.#carts = [];
    this.productManager.init();
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

  async addCart() {
    const cartObj = new Cart(this.#id++, []);
    this.#carts.push(cartObj);
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
      return cartObj;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    if(typeof(quantity) !== "number" || isNaN(quantity)) throw new InvalidInformationError("cantidad");
    const cart = await this.getCartById(cid);
    if (cart) {
      const productExistsCheck = await this.productManager.getProductById(pid);
      const productCart = cart.products.find(product => product.id === pid);
      if(productCart){
        this.#carts[this.#carts.indexOf(cart)].products[cart.products.indexOf(productCart)].quantity += quantity;
      }else{
        const productToAdd = new CartProduct(productExistsCheck.id, quantity);
        this.#carts[this.#carts.indexOf(cart)].products.push(productToAdd);
      } 
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
        return cart;
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new CartDoesntExistError(cid);
    }
  }

  async getCarts() {
      try {
        this.#carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        return this.#carts;
      } catch (e) {
        throw new Error(e);
      }
    }

  async getCartById(cid) {
      try {
        this.#carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      } catch (e) {
        throw new Error(e);
      }
      const cart = this.#carts.find(cart => cart.id === cid);
      if (cart) {
        return cart;
      } else {
        throw new CartDoesntExistError(cid);
      }
    }

  async deleteCart(cid) {
      const cartToDelete = await this.getCartById(cid);
      if (cartToDelete) {
        this.#carts = this.#carts.filter(cart => cart != cartToDelete);
        try {
          await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
          return cartToDelete;
        } catch (e) {
          throw new Error(e);
        }
      }
      throw new CartDoesntExistError(cid);
    }
  }

class CartDoesntExistError extends Error {
  constructor(id) {
    super(`Cart Id:${id} Not Found!`);
  }
}

class InvalidInformationError extends Error{
  constructor(info){
    super(`Invalid ${info}!`);
  }
}

export default CartManager;

