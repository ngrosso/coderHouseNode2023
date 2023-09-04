import ProductManager from '../../domain/managers/product.manager.js';
import { verifyToken } from '../../shared/auth.js';

class ProductsContoller {
}

export const list = async (req, res) => {
  const params = req.query;
  const manager = new ProductManager();
  try {
    const productList = await manager.list(params);
    res.status(200).json({ success: true, data: productList });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, error: e.message });
  }

};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const manager = new ProductManager();
  try {
    const product = await manager.getOne(id);
    if (!product) res.status(404).json({ success: false, error: 'Product not found' });
    res.status(200).json({ succcess: true, data: product });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, error: e.message });
  }
};

export const create = async (req, res) => {
  const { accessToken } = req.cookies;
  const { user } = await verifyToken(accessToken);
  const product = req.body;
  const manager = new ProductManager();
  try {
    let newProduct = undefined
    if (user.premium) {
      newProduct = await manager.create(user.email, product);
    } else {
      newProduct = await manager.create(undefined, product)
    }
    res.status(201).json({ succcess: true, data: newProduct });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ succcess: false, error: e.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const manager = new ProductManager();
  try {
    const foundProduct = manager.getOne(id);
    await checkOwnership(req.cookies.accessToken, foundProduct);
    const result = await manager.update(id, product);
    res.status(202).json({ succcess: true, data: result });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ succcess: false, error: e.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const manager = new ProductManager();
  try {
    const foundProduct = manager.getOne(id);
    await checkOwnership(req.cookies.accessToken, foundProduct);
    const result = await manager.remove(id);
    res.status(200).json({ succcess: true, data: result });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ succcess: false, error: e.message });
  }
};

const checkOwnership = async (accessToken, product) => {
  const { user } = await verifyToken(accessToken);
  if (user.email !== product.owner || !user.admin) res.status(403).json({ success: false, error: "User doesn't own the product" });
}

export default ProductsContoller;
