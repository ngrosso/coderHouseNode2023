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

  async list(params) {
    const limit = params.limit ? parseInt(params.limit) : 100;
    const page = params.page ? parseInt(params.page) : 1;
    const sort = params.sort === "asc" || params.sort === "desc" ? params.sort : 1;

    const query = params.query ? params.query : {};
    const optionsParams = { query: query, sort: sort, page: page, limit: limit };
    return this.productDao.find(optionsParams);
  }

  async getOne(id) {
    const product = await this.productDao.findOne(id);
    if (!product) throw new ProductDoesntExistError(id);
    return product;
  }

  async create(product) {
    await validateFormat(product);
    return this.productDao.create(product);
  }

  async update(id, product) {
    await validateFormat(product);
    await this.productDao.update(id, product);
    return await this.productDao.findOneSpecial(id);
  }

  async remove(id) {
    const product = await this.productDao.findOne(id);
    if (!product) throw new ProductDoesntExistError(id);
    await this.productDao.remove(id);
    return product;
  }
}

const validateFormat = async (product) => {
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