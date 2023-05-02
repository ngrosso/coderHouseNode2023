import ProductManager from "../managers/Product.manager.js";

class ProductsContoller {
}

export const list = async (req, res) => {
  const { limit } = req.query;
  const manager = new ProductManager();
  try {
    const productList = await manager.list(limit);
    res.status(200).json({ success: true, data: productList });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message, details: e.stack });
  }

};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const manager = new ProductManager();
  try {
    const product = await manager.getOne(id);
    res.status(200).json({ succcess: true, data: product });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message, details: e.stack });
  }
};

export const create = async (req, res) => {
  const product = req.body;
  const manager = new ProductManager();
  try {
    const newProduct = await manager.create(product);
    res.status(201).json({ succcess: true, data: newProduct });
  } catch (e) {
    res.status(400).json({ succcess: false, error: e.message, details: e.stack });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const manager = new ProductManager();
  try {
    const result = await manager.update(id, product);
    res.status(202).json({ succcess: true, data: result });
  } catch (e) {
    res.status(400).json({ succcess: false, error: e.message, details: e.stack });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const manager = new ProductManager();
  try {
    const result = await manager.remove(id);
    res.status(200).json({ succcess: true, data: result });
  } catch (e) {
    res.status(400).json({ succcess: false, error: e.message, details: e.stack });
  }
};

export default ProductsContoller;
