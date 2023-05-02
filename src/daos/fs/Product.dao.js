import fs from "fs/promises";
import Product from "../../utils/Product.js";

class ProductFSDao {

  #id = Number;
  #products = Array;
  path = String;
  dir = String;

  constructor() {
    this.dir = "./src/utils/files/"
    this.path = `${this.dir}products.json`
    this.#id = 1;
    this.#products = [];
  }

  async init() {
    let fileExists = false;
    try {
      await fs.access(this.dir);
    } catch (e) {
      await fs.mkdir(this.dir);
    }
    try {
      await fs.stat(this.path)
      fileExists = true;
    } catch (e) {
      fileExists = false;
    }
    if (!fileExists) {
      try {
        await fs.writeFile(this.path, "[]");
      } catch (e) {
        throw new Error(e);
      }
    } else {
      try {
        const productListFile = await fs.readFile(this.path, 'utf-8');
        this.#products = JSON.parse(productListFile);
        if (this.#products.length > 0) {
          this.#id = Math.max(...this.#products.map(obj => obj.id)) + 1;
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  async find(limit) {
    try {
      this.#products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      this.#products = this.#products.filter(product => product.status === true);
      if (limit) return this.#products.slice(0, limit);
      return this.#products;
    } catch (e) {
      throw new Error(e);
    }
  };

  async findOneByCode(code) {
    try {
      this.#products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    } catch (e) {
      throw new Error(e);
    }
    return this.#products.find(product => product.code === code && product.status === true);
  }


  async findOne(id) {
    try {
      this.#products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    } catch (e) {
      throw new Error(e);
    }
    return this.#products.find(product => product.id === Number(id) && product.status === true);
  }

  async findOneSpecial(id) {
    try {
      this.#products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    } catch (e) {
      throw new Error(e);
    }
    return this.#products.find(product => product.id === Number(id));
  }

  //TODO: Usar multer con el thumbnail si hay tiempo
  async create(product) {
    await this.init();
    const productObject = new Product(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category, product.status);
    if (this.#products.find(p => p.code === productObject.code)) throw new RepeatedCodeError(product.code);
    productObject["id"] = this.#id++;
    this.#products.push(productObject);
    try {
      await fs.writeFile(this.path, JSON.stringify(this.#products));
      return productObject;
    } catch (e) {
      throw new Error(e);
    }
  }

  //TODO: Usar multer con el thumbnail si hay tiempo
  async update(id, product) {
    const { title, description, price, thumbnail, code, stock, status, category } = product;
    const productToModify = await this.findOne(Number(id));
    if (productToModify) {
      const productNewValues = new Product(title, description, price, thumbnail, code, stock, category, status);
      this.#products[this.#products.indexOf(productToModify)] = { ...productToModify, ...productNewValues };
      try {
        await fs.writeFile(this.path, JSON.stringify(this.#products));
      } catch (e) {
        throw new Error(e);
      }
      return productNewValues;
    }
  }

  async remove(id) {
    const productToDelete = await this.findOne(Number(id));
    if (productToDelete) {
      const productNewValues = new Product(
        title = productToDelete.title,
        description = productToDelete.description,
        price = productToDelete.price,
        thumbnail = productToDelete.thumbnail,
        code = productToDelete.code,
        stock = productToDelete.stock,
        category = productToDelete.category,
        status = false
      );
      this.#products[this.#products.indexOf(productToDelete)] = { ...productToDelete, ...productNewValues };
      try {
        await fs.writeFile(this.path, JSON.stringify(this.#products));
      } catch (e) {
        throw new Error(e);
      }
      return productToDelete;
    }
  }
}

export default ProductFSDao;
