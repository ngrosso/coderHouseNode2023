import ProductMongooseDao from '../daos/mongoose/Product.dao.js';
import ProductFsDao from '../daos/fs/Product.dao.js';


class ProductManager {

  constructor() {
    if (process.env.PERSISTANCE_TYPE == 1) {
      this.productDao = new ProductMongooseDao();
    } else {
      this.productDao = new ProductFsDao();
    }
  }

  async list(l) {
    const limit = l ? parseInt(l) : 0;
    return this.productDao.find(limit);
  }

  async getOne(id) {
    const product = await this.productDao.findOne(id);
    if (!product) throw new ProductDoesntExistError(id);
    return product;
  }

  async create(product) {
    const { title, description, price, thumbnail, code, stock, status, category } = product;
    if (typeof (title) !== "string") throw new InvalidFormatError("title")
    if (typeof (description) !== "string") throw new InvalidFormatError("description")
    if (typeof (price) !== "number") throw new InvalidFormatError("price")
    if (typeof (thumbnail) !== "object") throw new InvalidFormatError("thumbnail")
    if (typeof (code) !== "string") throw new InvalidFormatError("code")
    if (typeof (stock) !== "number") throw new InvalidFormatError("stock");
    if (typeof (status) !== "boolean") throw new InvalidFormatError("status");
    if (typeof (category) !== "string") throw new InvalidFormatError("category");
    const productExists = await this.productDao.findOneByCode(code);
    if (productExists) throw new RepeatedCodeError(code);
    return this.productDao.create(product);
  }

  async update(id, product) {
    const { title, description, price, thumbnail, code, stock, status, category } = product;
    if (typeof (title) !== "string") throw new InvalidFormatError("title")
    if (typeof (description) !== "string") throw new InvalidFormatError("description")
    if (typeof (price) !== "number") throw new InvalidFormatError("price")
    if (typeof (thumbnail) !== "object") throw new InvalidFormatError("thumbnail")
    if (typeof (code) !== "string") throw new InvalidFormatError("code")
    if (typeof (stock) !== "number") throw new InvalidFormatError("stock");
    if (typeof (status) !== "boolean") throw new InvalidFormatError("status");
    if (typeof (category) !== "string") throw new InvalidFormatError("category");
    const productExists = await this.productDao.findOneByCode(code);
    if (productExists) throw new RepeatedCodeError(code);
    await this.productDao.update(id, product);
    const retrievedProduct = await this.productDao.findOneSpecial(id);
    return retrievedProduct;
  }

  async remove(id) {
    const product = await this.productDao.findOne(id);
    if (!product) throw new ProductDoesntExistError(id);
    await this.productDao.remove(id);
    return product;
  }
}

class RepeatedCodeError extends Error {
  constructor(code) {
    super(`Product Code:${code} already exists!`);
  }
}

class ProductDoesntExistError extends Error {
  constructor(id) {
    super(`Product Id:${id} Not Found!`);
  }
}

class InvalidFormatError extends Error {
  constructor(param) {
    super(`Product ${param} format is not valid!`);
  }
}

export default ProductManager;