import ProductSchema from "../../models/Product.model.js";

class ProductMongooseDao {

  async find(params) {
    const { query, page, limit, sort } = params;
    console.log(params);
    
    const productsDocument = await ProductSchema.paginate({ $and: [{ status: true }, query] }, { page, sort: { price: sort }, limit });
    const { docs, ...rest } = productsDocument;

    return {
      payload: docs.map((document) => ({
        id: document._id,
        title: document.title,
        description: document.description,
        price: document.price,
        thumbnail: document.thumbnail,
        code: document.code,
        stock: document.stock,
        category: document.category,
        status: document.status
      })),
      ...rest
    };
  }

  async findOne(id) {
    const productDocument = await ProductSchema.findOne({ _id: id, status: true });

    if (!productDocument) return null;
    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    }
  }

  async create(product) {
    const productDocument = await ProductSchema.create(product);

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    }
  }

  async update(id, product) {
    const productDocument = await ProductSchema.updateOne({ _id: id }, product);


    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    }
  }

  async remove(id) {
    return ProductSchema.updateOne({ _id: id }, { status: false });
  }

  async findOneByCode(code) {
    const productDocument = await ProductSchema.findOne({ code: code, status: true });

    if (!productDocument) return null;
    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    }
  }

  async findOneSpecial(id) {
    const productDocument = await ProductSchema.findOne({ _id: id });

    if (!productDocument) return null;
    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status
    }
  }
}

export default ProductMongooseDao;