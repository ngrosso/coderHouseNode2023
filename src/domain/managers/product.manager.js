import container from '../../container.js';
import productCreateValidation from '../validators/products/productCreateValidation.js';
import productUpdateValidation from '../validators/products/productUpdateValidation.js';


class ProductManager {

  constructor() {
    this.productRepository = container.resolve('ProductRepository');
  }

  async list(params) {
    const limit = params.limit ? parseInt(params.limit) : 100;
    const page = params.page ? parseInt(params.page) : 1;
    const sort = params.sort === 'asc' || params.sort === 'desc' ? params.sort : 1;
    const query = {};
    if (params.query) {
      const queries = params.query.split(';');
      queries.forEach(q => {
        const [key, value] = q.split('=');
        query[key] = value;
      });
    }
    const optionsParams = { query: query, sort: sort, page: page, limit: limit };
    return this.productRepository.find(optionsParams);
  }

  async getOne(id) {
    return await this.productRepository.findOne(id);

  }

  async create(owner, product) {
    await productCreateValidation.parseAsync(product);
    await this.existanceValidator(product);
    product.owner = owner;
    return this.productRepository.create(product);

  }

  async update(id, product) {
    await productUpdateValidation.parseAsync(product);
    return this.productRepository.update(id, product);
  }

  async remove(id) {
    const product = await this.productRepository.findOne(id);
    await this.productRepository.remove(id);
    return product;
  }

  async existanceValidator(product) {
    const { code } = product;
    const productExists = await this.productRepository.findOneByCode(code);

    if (productExists) throw new RepeatedCodeError(code);
  }
}

class RepeatedCodeError extends Error {
  constructor(code) {
    super(`Product Code:${code} already exists!`);
  }
}

class InvalidFormatError extends Error {
  constructor(param) {
    super(`Product ${param} format is not valid!`);
  }
}

export default ProductManager;