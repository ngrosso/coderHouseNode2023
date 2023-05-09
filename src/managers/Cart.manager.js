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
    const cartProduct = cart.products.find(cp => cp.product.toString() === product.id.toString());
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

  async updateCart(cid, products) {
    const cart = await this.cartDao.findOne(cid);
    if (!cart) throw new CartDoesntExistError(cid);
    cart.products = [];
    await products.forEach(async product => {
      const productInDb = await this.productDao.findOne(product.product.id);
      if (!productInDb) throw new ProductDoesntExistError(product.produdct.id);
    })
    for (const product of products) {
      const productInDb = await this.productDao.findOne(product.product.id);
      cart.products.push({
        quantity: product.quantity,
        product: productInDb.id
      });
    }
    return await this.cartDao.updateOne(cid, cart);
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.cartDao.getOne(cid);
    const product = await this.productDao.findOne(pid);
    if (!cart) throw new CartDoesntExistError(cid);
    if (!product) throw new ProductDoesntExistError(pid);
    const cartProduct = cart.products.find(cp => cp.product.toString() === product.id.toString());
    if (!cartProduct) throw new ProductDoesntExistError(`${pid} in cart: ${cid}`);
    cartProduct.quantity = quantity;
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