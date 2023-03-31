import ProductManager from "../utils/ProductManager.js"

const productManager = new ProductManager();

export class ProductController {
  constructor() {
    this.initProductManagerFiles();
  }

  async initProductManagerFiles(){
    await productManager.init();
  }

  async getProducts(req, res) {
    const limit = req.query.limit;
    const productList = await productManager.getProducts();
    if (limit) {
      res.status(200).json({ success: true, data: productList.slice(0, limit) });
    } else {
      res.status(200).json({ success: true, data: productList });
    }
  }

  async getProductById(req, res) {
    const id = +req.params.pid;
    try {
      const product = await productManager.getProductById(id);
      res.status(200).json({ succcess: true, data: product });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  //TODO: Usar multer con el thumbnail si hay tiempo
  async addProduct(req, res) {
    const product = req.body;
    try {
      const newProduct = await productManager.addProduct(product);
      res.status(201).json({ succcess: true, data: newProduct });
    } catch (e) {
      res.status(400).json({ succcess: false, error: e.message });
    }
  }

  //TODO: Usar multer con el thumbnail si hay tiempo
  async updateProduct(req, res) {
    const id = +req.params.pid;
    const product = req.body;
    try {
      const updatedProduct = await productManager.updateProduct(id, product);
      res.status(202).json({ succcess: true, data: updatedProduct });
    } catch (e) {
      res.status(400).json({ succcess: false, error: e.message });
    }
  }

  async deleteProduct(req, res) {
    const id = +req.params.pid;
    try {
      const deletedProduct = await productManager.deleteProduct(id);
      res.status(202).json({ succcess: true, data: deletedProduct });
    } catch (e) {
      res.status(200).json({ succcess: false, error: e.message });
    }
  }

}


export default ProductController;