
import container from '../../container.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { sendMail } from '../../shared/mailer.js';
import Stripe from 'stripe';
import config from '../../config/index.js';
class CartManager {
  constructor() {
    this.productRepository = container.resolve('ProductRepository');
    this.cartRepository = container.resolve('CartRepository');
    this.userRepository = container.resolve('UserRepository');
    this.ticketRepository = container.resolve('TicketRepository');
  }

  async list() {
    return this.cartRepository.find();
  }

  async findOne(cid) {
    const cart = await this.cartRepository.findOne(cid);
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

  async insertProduct(cid, pid, quantity, owner) {
    const cart = await this.cartRepository.getOne(cid);
    const product = await this.productRepository.findOne(pid);
    if (!product) throw new ProductDoesntExistError(pid);
    if (product.owner === owner) throw new Error("Product owner can't buy his own product");
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
    cart.products = [];
    console.log(products[0].product.id)
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
    const cart = await this.cartRepository.getOne(cid);
    await this.userRepository.removeCart(uid);
    await this.cartRepository.remove(cid);
    return cart;
  }

  async purchaseCart(cid, email) {
    const cart = await this.cartRepository.findOne(cid);
    if(cart.products.length == 0) throw new Error('Cart is empty');
    let cartResults = await Promise.all(cart.products.map(async product => {
      const productInDb = await this.productRepository.findOne(product.product.id);
      if (!productInDb) return ({ 'reason': "Product doesn't exist anymore", 'productId': product.product.id });
      if (productInDb.stock < product.quantity) return ({ 'reason': 'Not enough stock', 'productId': product.product.id.toHexString(), 'quantity': product.quantity, 'currentStock': productInDb.stock });
      productInDb.stock -= product.quantity;
      await this.productRepository.update(product.product.id, productInDb);
      await this.cartRepository.removeProduct(cid, product.product.id);
    }));

    const cartResultLength = cartResults.length;

    cartResults = cartResults.filter(product => product != null);

    const filteredCartResultLength = cartResults.length;
    if (cartResultLength == 0 && filteredCartResultLength == 0) throw new Error('Cart is empty');
    if (cartResultLength == filteredCartResultLength) throw ({ 'cart': cartResults });
    const validProducts = cart.products.filter(product => !JSON.stringify(cartResults).includes(product.product.id.toHexString()));
    const rejectedProducts = cart.products.filter(product => JSON.stringify(cartResults).includes(product.product.id.toHexString()));
    const ticket = await this.ticketRepository.create({
      code: nanoid(),
      purchaseDateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      amount: validProducts.reduce((acc, product) => acc + product.quantity * product.product.price, 0).toFixed(2),
      purchaser: email
    });

    const stripe = new Stripe(config.STRIPE_SECRET);

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: validProducts.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.product.title,
            description: product.product.description,
          },
          unit_amount: product.product.price * 100,
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      customer_email: email,
      success_url: `http://${config.HOST_URL}/api/carts/success?ticket=${ticket.id}`,
      cancel_url: `http://${config.HOST_URL}/api/carts/cancel?ticket=${ticket.id}`,
    });
    await sendMail(email, ticket, validProducts, rejectedProducts, stripeSession.url);
    return ({ 'ticket': ticket, 'cart': cartResults, 'paymentLink': stripeSession.url });
  }
}


class ProductDoesntExistError extends Error {
  constructor(cid) {
    super(`Product Id:${cid} Not Found!`);
  }
}

export default CartManager;