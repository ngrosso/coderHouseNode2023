import CartManager from "../managers/cart.manager.js";


export class CartController {
}

export const create = async (req, res) => {
  const manager = new CartManager();
  try {
    const newCart = await manager.create();
    res.status(201).json({ success: true, data: newCart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const list = async (req, res) => {
  const manager = new CartManager()
  try {
    const cartList = await manager.list()
    res.status(200).json({ success: true, data: cartList });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const findOne = async (req, res) => {
  const { cid } = req.params;
  const manager = new CartManager();
  try {
    const cart = await manager.findOne(cid);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const insertProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const manager = new CartManager();
  try {
    const cart = await manager.insertProduct(cid, pid, quantity);
    res.status(201).json({ success: true, data: cart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const products = req.body;
  const manager = new CartManager();
  try {
    const cart = await manager.updateCart(cid, products);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const updateProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const manager = new CartManager();
  try {
    const cart = await manager.updateProduct(cid, pid, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const removeCart = async (req, res) => {
  const { cid } = req.params;
  const manager = new CartManager();
  try {
    const cart = await manager.removeCart(cid);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
}

export const removeProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const manager = new CartManager();
  try {
    const cart = await manager.removeProduct(cid, pid);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
}


export default CartController;