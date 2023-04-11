import ProductManager from "../utils/ProductManager.js";

const productManager = new ProductManager();

export class ViewsController {
  constructor() {
    this.initProductManagerFiles();
  }

  async initProductManagerFiles() {
    await productManager.init();
  }

  async home(req, res) {
    const limit = req.query.limit;
    try {
      const productList = await productManager.getProducts();
      if (limit) {
        res.status(200).render("home", { pageTitle: "List of Products", productList: productList.slice(0, limit), amount: limit });
      } else {
        res.status(200).render("home", { pageTitle: "List of Products", productList: productList, amount: productList.length });
      }
    } catch (e) {
      res.status(400).render("home", { pageTitle: "List of Products", error: e.message });
    }
  }

  async realtimeProducts(req, res) {
    const socketio = req.app.get("socketio");
    const limit = req.query.limit;
    try {
      const productList = await productManager.getProducts();
      if (limit) {
        socketio.on("connection", (socket) => {
          socket.emit("products", productList.slice(0, limit));
        });
      } else {
        socketio.on("connection", (socket) => {
          socket.emit("products", productList);
        });
      }
      res.status(200).render("realTimeProducts", { pageTitle: "List of Real Time Products" });
    } catch (e) {
      res.status(400).render("realTimeProducts", { pageTitle: "List of Real Time Products", error: e.message });
    }

  }


}

export default ViewsController;