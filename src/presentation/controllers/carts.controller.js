import CartManager from '../../domain/managers/cart.manager.js';
import { generateToken } from '../../shared/auth.js';


export class CartController {
}

export const create = async (req, res, next) => {
  const user = req.userInfo;
  const manager = new CartManager();
  try {
    if (user.cart) throw new Error("User already has a cart");
    await checkCartOwnership(user, req.params.cid);
    const newCart = await manager.create(user.id);
    user.cart = newCart.id;
    const accessToken = await generateToken(user);
    res.cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(201).json({ success: true, data: newCart });
  } catch (e) {
    next(e);
  }
}

export const list = async (req, res, next) => {
  const manager = new CartManager()
  try {
    const cartList = await manager.list()
    res.status(200).json({ success: true, data: cartList });
  } catch (e) {
    next(e);
  }
}

export const findOne = async (req, res, next) => {
  const user = req.userInfo;
  const { cid } = req.params;
  const manager = new CartManager();
  try {
    await checkCartOwnership(user, cid)
    const cart = await manager.findOne(cid);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    next(e);
  }
}

export const insertProduct = async (req, res, next) => {
  const user = req.userInfo;
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const manager = new CartManager();
  try {
    await checkCartOwnership(user, cid);
    const cart = await manager.insertProduct(cid, pid, quantity, user.email);
    res.status(201).json({ success: true, data: cart });
  } catch (e) {
    next(e);
  }
}

export const updateCart = async (req, res, next) => {
  const user = req.userInfo;
  const { cid } = req.params;
  const products = req.body;
  const manager = new CartManager();
  try {
    await checkCartOwnership(user, cid);
    const cart = await manager.updateCart(cid, products);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    next(e);
  }
}

export const updateProduct = async (req, res, next) => {
  const user = req.userInfo;
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const manager = new CartManager();
  try {
    await checkCartOwnership(user, cid);
    const cart = await manager.updateProduct(cid, pid, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    next(e);
  }
}

export const removeCart = async (req, res, next) => {
  const user = req.userInfo
  const { cid } = req.params;
  const manager = new CartManager();
  try {
    await checkCartOwnership(user, cid);
    const cart = await manager.removeCart(user.id, cid);
    user.cart = undefined;
    const accessToken = await generateToken(user);
    res.cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    next(e);
  }
}

export const removeProduct = async (req, res, next) => {
  const user = req.userInfo
  const { cid, pid } = req.params;
  const manager = new CartManager();
  try {
    await checkCartOwnership(user, cid);
    const cart = await manager.removeProduct(cid, pid);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    next(e);
  }
}

export const purchaseCart = async (req, res) => {
  const user = req.userInfo
  const { cid } = req.params;

  const manager = new CartManager();
  try {
    if (!user.cart) throw new Error("User doesn't have a cart");
    await checkCartOwnership(user, cid)
    const { cart, ticket } = await manager.purchaseCart(cid, user.email);
    res.status(201).json({ success: true, data: { cart: cart, ticket: ticket } });
  } catch (e) {
    let error = e
    if (e.message != undefined && e.message != null && e.message != '' && e.message != {} && e.message != []) {
      error = e.message
    }
    req.logger.warn(JSON.stringify(error.cart));
    res.status(400).json({ success: false, error: error });
  }
}

const checkCartOwnership = async (user, cid) => {
  if (!user.admin) {
    if (user.cart !== cid) throw new Error("User cart missmatch");
  }
  return
}


export default CartController;