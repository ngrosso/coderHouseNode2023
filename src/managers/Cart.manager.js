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
    const cart = await this.cartDao.findOne(cid);
    const product = await this.productDao.findOne(pid);
    if (!cart) throw new CartDoesntExistError(cid);
    if (!product) throw new ProductDoesntExistError(pid);
    const productsInCart = cart.products.map(product => product._id);
    if (productsInCart.includes(pid))
      productsInCart.forEach(product => {
        if (product.id == pid) {
          product.quantity += quantity;
          return this.cartDao.updateOneQty(cid, pid, product.quantity)
        }
      })
    return await this.cartDao.updateOne(cid, pid, quantity)
  }

  async removeProduct(cid, pid) {
    const cart = await this.cartDao.findOne(cid);
    const productsInCart = cart.products.map(product => product._id);
    if (!productsInCart.includes(pid)) throw new ProductDoesntExistError(pid);
    return await this.cartDao.removeProduct(cid, pid);
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

export default CartManager;