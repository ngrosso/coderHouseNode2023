import CartManager from "../utils/CartManager.js"

const cartManager = new CartManager();

export class CartController {
  constructor() {
    this.initCartManagerFiles();
  }

  async initCartManagerFiles(){
    await cartManager.init();
  }
  
  async getCarts(req, res) {
    try {
      const cartList = await cartManager.getCarts();
      res.status(200).json({ success: true, data: cartList });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async getCartById(req, res) {
    const id = +req.params.cid;
    try {
      const cart = await cartManager.getCartById(id);
      res.status(200).json({ success: true, data: cart });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async addCart(req, res) {
    try {
      const newCart = await cartManager.addCart();
      res.status(201).json({ success: true, data: newCart });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async addProductToCart(req, res) {
    const cid = +req.params.cid;
    const pid = +req.params.pid;
    const quantity = +req.body.cantidad;
    try {
      const cart = await cartManager.addProductToCart(cid, pid, quantity);
      res.status(201).json({ success: true, data: cart });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

}


export default CartController;