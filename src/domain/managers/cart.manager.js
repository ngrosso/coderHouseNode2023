import container from "../../container.js";
class CartManager {
  constructor() {
    this.productRepository = container.resolve("ProductRepository");
    this.cartRepository = container.resolve("CartRepository");
    this.userRepository = container.resolve("UserRepository");
  }

  async list() {
    return this.cartRepository.find();
  }

  async findOne(cid) {
    const cart = await this.cartRepository.findOne(cid);
    if (!cart) throw new CartDoesntExistError(cid);
    return cart;
  }

  async create(uid) {
    const user = await this.userRepository.getOne(uid);
    if (user.cart) throw new Error(`User ${uid} already has Cart ${user.cart}`);
    const cart = await this.cartRepository.create();
    if (!cart) throw new Error("Cart coudln't be created");
    await this.userRepository.addCart(uid, cart.id);
    return cart;
  }

  async insertProduct(cid, pid, quantity) {
    const cart = await this.cartRepository.getOne(cid);
    const product = await this.productRepository.findOne(pid);
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
    return await this.cartRepository.updateOne(cid, cart);
  }

  async updateCart(cid, products) {
    const cart = await this.cartRepository.findOne(cid);
    if (!cart) throw new CartDoesntExistError(cid);
    cart.products = [];
    await products.forEach(async product => {
      const productInDb = await this.productRepository.findOne(product.product.id);
      if (!productInDb) throw new ProductDoesntExistError(product.produdct.id);
    })
    for (const product of products) {
      const productInDb = await this.productRepository.findOne(product.product.id);
      cart.products.push({
        quantity: product.quantity,
        product: productInDb.id
      });
    }
    return await this.cartRepository.updateOne(cid, cart);
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await this.cartRepository.getOne(cid);
    const product = await this.productRepository.findOne(pid);
    if (!cart) throw new CartDoesntExistError(cid);
    if (!product) throw new ProductDoesntExistError(pid);
    const cartProduct = cart.products.find(cp => cp.product.toString() === product.id.toString());
    if (!cartProduct) throw new ProductDoesntExistError(`${pid} in cart: ${cid}`);
    cartProduct.quantity = quantity;
    return await this.cartRepository.updateOne(cid, cart);
  }

  async removeProduct(cid, pid) {
    const cart = await this.cartRepository.findOne(cid);
    const productsInCart = cart.products.map(p => p.product.id.toString());
    if (!productsInCart.includes(pid)) throw new ProductDoesntExistError(pid);
    return await this.cartRepository.removeProduct(cid, pid);
  }

  async removeCart(uid, cid) {
    const cart = await this.cartRepository.findOne(cid);
    if (!cart) throw new CartDoesntExistError(cid);
    await this.UserMongooseDao.removeCart(uid, cid);
    await this.cartRepository.remove(cid);
    return cart;
  }
}

class CartDoesntExistError extends Error {
  constructor(cid) {
    super(`Cart Id:${cid} Not Found!`);
  }
}

class ProductDoesntExistError extends Error {
  constructor(cid) {
    super(`Product Id:${cid} Not Found!`);
  }
}

class FormatError extends Error {
  constructor(param) {
    super(`${param} has an incorrect format!`);
  }
}

export default CartManager;