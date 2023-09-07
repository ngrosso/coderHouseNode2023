import ProductManager from '../../domain/managers/product.manager.js';

class ProductsContoller {
}

export const list = async (req, res, next) => {
  const params = req.query;
  const manager = new ProductManager();
  try {
    const productList = await manager.list(params);
    res.status(200).json({ success: true, data: productList });
  } catch (e) {
    next(e)
  }

};

export const getOne = async (req, res, next) => {
  const { id } = req.params;
  const manager = new ProductManager();
  try {
    const product = await manager.getOne(id);
    if (!product) throw new Error(`Product ${id} not found`);
    res.status(200).json({ succcess: true, data: product });
  } catch (e) {
    next(e)
  }
};

export const create = async (req, res, next) => {
  const product = req.body;
  const manager = new ProductManager();
  try {
    let newProduct = undefined
    if (req.userInfo.premium) {
      newProduct = await manager.create(req.userInfo.email, product);
    } else {
      newProduct = await manager.create(undefined, product)
    }
    res.status(201).json({ succcess: true, data: newProduct });
  } catch (e) {
    next(e)
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  const manager = new ProductManager();
  try {
    const foundProduct = await manager.getOne(id);
    await checkProductOwnership(req.userInfo, foundProduct);
    const result = await manager.update(id, product);
    res.status(202).json({ succcess: true, data: result });
  } catch (e) {
    next(e)
  }
};

export const remove = async (req, res, next) => {
  const { id } = req.params;
  const manager = new ProductManager();
  try {
    const foundProduct = await manager.getOne(id);
    if (!foundProduct) throw new Error("Product Not Found!")
    await checkProductOwnership(req.userInfo, foundProduct);
    const result = await manager.remove(id);
    res.status(200).json({ succcess: true, data: result });
  } catch (e) {
    next(e)
  }
};

const checkProductOwnership = async (user, product) => {
  if (!user.admin) {
    if (user.email !== product.owner) throw new Error("User doesn't own the product");
  }
  return
}

export default ProductsContoller;
