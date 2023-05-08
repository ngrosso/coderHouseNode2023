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

  async findOne(id) {
    const cart = await this.cartDao.findOne(id);
    if (!cart) throw new CartDoesntExistError(id);
    return cart;
  }

  async create() {
    return this.cartDao.create();
  }

  async insertProduct(cid, pid, quantity) {
    const cart = await this.cartDao.getOne(cid);
    const product = await this.productDao.findOne(pid);
    if (!cart) throw new CartDoesntExistError(cid);
    if (!product) throw new ProductDoesntExistError(pid);
    let cartProduct = cart.products.find(cp => cp.product.toString() === product.id.toString());
    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cart.products.push({
        quantity,
        product: product.id
      });
    }
    return await this.cartDao.updateOne(cid, cart);
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