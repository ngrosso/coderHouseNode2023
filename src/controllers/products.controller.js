import ProductManager from "../utils/ProductManager.js"

const productManager = new ProductManager();

export class ProductController {
  constructor() {
    productManager.init();
  }

  async getProducts(req, res) {
    const limit = req.query.limit;
    const productList = await productManager.getProducts();
    if (limit) {
      res.send({ data: productList.slice(0, limit) });
    } else {
      res.send({ data: productList });
    }
  }

  async getProductById(req, res) {
    const id = +req.params.pid;
    try {
      const product = await productManager.getProductById(id);
      res.send({ data: product });
    } catch (e) {
      res.send({ error: e.message });
    }
  }

  //TODO: Usar multer con el thumbnail si hay tiempo
  async addProduct(req, res) {
    const product = req.body;
    try {
      const newProduct = await productManager.addProduct(product);
      res.send({ data: newProduct });
    } catch (e) {
      res.send({ error: e.message });
    }
  }

  //TODO: Usar multer con el thumbnail si hay tiempo
  async updateProduct(req, res) {
    const id = +req.params.pid;
    const product = req.body;
    try {
      const updatedProduct = await productManager.updateProduct(id, product);
      res.send({ data: updatedProduct });
    } catch (e) {
      res.send({ error: e.message });
    }
  }

  async deleteProduct(req, res) {
    const id = +req.params.pid;
    try {
      const deletedProduct = await productManager.deleteProduct(id);
      res.send({ data: deletedProduct });
    } catch (e) {
      res.send({ error: e.message });
    }
  }

}


export default ProductController;