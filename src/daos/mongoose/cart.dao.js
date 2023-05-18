import CartSchema from '../../models/cart.model.js';

class CartMongooseDao {

  async find() {
    const cartDocument = await CartSchema.find();

    return cartDocument.map(document => ({
      id: document._id,
      products: document.products.map(product => ({
        quantity: product.quantity,
        product: {
          id: product.product._id,
          title: product.product.title,
          description: product.product.description,
          price: product.product.price,
          thumbnail: product.product.thumbnail,
          code: product.product.code,
          stock: product.product.stock,
          category: product.product.category,
          status: product.product.status
        },
      }))
    }));
  }

  async findOne(id) {
    const cartDocument = await CartSchema.findOne({ _id: id })

    if (!cartDocument) throw new CartDoesntExistError(id);

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        quantity: product.quantity,
        product: {
          id: product.product._id,
          title: product.product.title,
          description: product.product.description,
          price: product.product.price,
          thumbnail: product.product.thumbnail,
          code: product.product.code,
          stock: product.product.stock,
          category: product.product.category,
          status: product.product.status
        },
      }))
    };
  }

  async getOne(id) {
    const cartDocument = await CartSchema.findOne({ _id: id });

    if (!cartDocument) throw new CartDoesntExistError(id);

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        quantity: product.quantity,
        product: product.product._id
      }))
    };
  }

  async create() {
    const cartDocument = await CartSchema.create({ products: [] });

    return {
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async updateOne(cid, cart) {
    const updatedCart = await CartSchema.findOneAndUpdate({ _id: cid }, cart, { new: true }).populate([{
      path: 'products',
      populate: {
        path: 'product',
        model: 'products'
      }
    }]);

    return {
      id: updatedCart._id,
      products: updatedCart.products.map(product => ({
        quantity: product.quantity,
        product: {
          id: product.product._id,
          title: product.product.title,
          description: product.product.description,
          price: product.product.price,
          thumbnail: product.product.thumbnail,
          code: product.product.code,
          stock: product.product.stock,
          category: product.product.category,
          status: product.product.status
        },
      }))
    };
  }

  async remove(id) {
    const cartDocument = await CartSchema.findOne({ _id: id })
    cartDocument.products = [];
    await cartDocument.save();

    return {
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async removeProduct(cid, pid) {
    const cartDocument = await CartSchema.findOne({ _id: cid })
    cartDocument.products = cartDocument.products.filter(p => p.product._id != pid);
    await cartDocument.save();

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        quantity: product.quantity,
        product: {
          id: product.product._id,
          title: product.product.title,
          description: product.product.description,
          price: product.product.price,
          thumbnail: product.product.thumbnail,
          code: product.product.code,
          stock: product.product.stock,
          category: product.product.category,
          status: product.product.status
        },
      }))
    }
  }
}

class CartDoesntExistError extends Error {
  constructor(id) {
    super(`Cart Id:${id} Not Found!`);
  }
}

export default CartMongooseDao;