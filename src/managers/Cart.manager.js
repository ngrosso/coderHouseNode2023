import CartMongooseDao from "../daos/mongoose/Cart.dao.js";
import ProductMongooseDao from "../daos/mongoose/Product.dao.js";
//import CartFsDao from "../daos/fs/Cart.dao";

class CartManager {
  constructor() {
    if (process.env.PERSISTANCE_TYPE == 1) {
      this.cartDao = new CartMongooseDao();
      this.productDao = new ProductMongooseDao();
    } else {
      //this.cartDao = new CartFsDao();
    }
  }

  async list() {
    return this.cartDao.find();
  }

  async getOne(id) {
    const cart = await this.cartDao.findOne(id);
    if (!cart) throw new CartDoesntExistError(id);
    return cart;
  }

  async create() {
    return this.cartDao.create();
  }

  async insertProduct(cid, pid, quantity) {
    try { quantity = parseInt(quantity) } catch (e) { throw new FormatError("Quantity") }
    const cart = await this.cartDao.findOne(cid);
    const product = await this.productDao.findOne(pid);
    if (!cart) throw new CartDoesntExistError(cid);
    if (!product) throw new ProductDoesntExistError(pid);
    const productsInCart = cart.products.map(p => ({ _id: p.product.id.toString(), quantity: p.quantity }));
    const foundProduct = productsInCart.filter(p => p._id == pid);
    if (foundProduct.length > 0) {
      const index = productsInCart.indexOf(foundProduct[0]);
      productsInCart[index].quantity += parseInt(quantity);
    } else {
      productsInCart.push({ _id: pid.toString(), quantity: quantity })
    }
    cart.products = productsInCart;
    return await this.cartDao.updateOne(cid, cart)
  }

  async removeProduct(cid, pid) {
    const cart = await this.cartDao.findOne(cid);
    const productsInCart = cart.products.map(p => p.product.id.toString());
    if (!productsInCart.includes(pid)) throw new ProductDoesntExistError(pid);
    return await this.cartDao.removeProduct(cid, pid);
  }

  async removeCart(id) {
    const cart = await this.cartDao.findOne(id);
    if (!cart) throw new CartDoesntExistError(id);
    await this.cartDao.remove(id);
    return cart;
  }
}

class CartDoesntExistError extends Error {
  constructor(id) {
    super(`Cart Id:${id} Not Found!`);
  }
}

class ProductDoesntExistError extends Error {
  constructor(id) {
    super(`Product Id:${id} Not Found!`);
  }
}

class FormatError extends Error {
  constructor(param) {
    super(`${param} has an incorrect format!`);
  }
}

export default CartManager;