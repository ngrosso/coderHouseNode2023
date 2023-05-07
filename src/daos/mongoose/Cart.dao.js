import CartSchema from '../../models/Cart.model.js';
import ProductSchema from '../../models/Product.model.js';

class CartMongooseDao {

  async find() {
    const cartDocument = await CartSchema.find();

    return cartDocument.map(document => ({
      id: document._id,
      products: document.products.map(product => ({
        product: {
          id: product._id._id,
          title: product._id.title,
          description: product._id.description,
          price: product._id.price,
          thumbnail: product._id.thumbnail,
          code: product._id.code,
          stock: product._id.stock,
          category: product._id.category,
          status: product._id.status
        },
        quantity: product.quantity
      }))
    }));
  }

  async findOne(id) {
    const cartDocument = await CartSchema.findOne({ _id: id })
    if (!cartDocument) return null;
    if (!cartDocument.products) return { id: cartDocument._id, products: [] }
    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        product: {
          id: product._id._id,
          title: product._id.title,
          description: product._id.description,
          price: product._id.price,
          thumbnail: product._id.thumbnail,
          code: product._id.code,
          stock: product._id.stock,
          category: product._id.category,
          status: product._id.status
        },
        quantity: product.quantity
      }))
    }
  }

  async create() {
    const cartDocument = await CartSchema.create({ products: [] });

    return {
      id: cartDocument._id,
      products: cartDocument.products
    }
  }

  async updateOne(cid, cart) {

    await CartSchema.updateOne({ _id: cid }, cart, { new: true });
    const foundDocument = await CartSchema.findOne({ _id: cid })
    return {
      id: foundDocument._id,
      products: foundDocument.products.map(product => ({
        product: {
          id: product._id._id,
          title: product._id.title,
          description: product._id.description,
          price: product._id.price,
          thumbnail: product._id.thumbnail,
          code: product._id.code,
          stock: product._id.stock,
          category: product._id.category,
          status: product._id.status
        },
        quantity: product.quantity
      }))
    }
  }

  async updateOneQty(cid, pid, quantity) {

    const cartDocument = await CartSchema.updateOne({ _id: cid, "products._id": pid }, { $inc: { "products.$.quantity": quantity } });

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        product: {
          id: product._id._id,
          title: product._id.title,
          description: product._id.description,
          price: product._id.price,
          thumbnail: product._id.thumbnail,
          code: product._id.code,
          stock: product._id.stock,
          category: product._id.category,
          status: product._id.status
        },
        quantity: product.quantity
      }))
    }
  }

  async remove(id) {
    return CartSchema.deleteOne({ _id: id });
  }

  async removeProduct(cid, pid) {
    const cartDocument = await CartSchema.findOne({ _id: cid })
    cartDocument.products = cartDocument.products.filter(p => p._id._id != pid);;
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        product: {
          id: product._id._id,
          title: product._id.title,
          description: product._id.description,
          price: product._id.price,
          thumbnail: product._id.thumbnail,
          code: product._id.code,
          stock: product._id.stock,
          category: product._id.category,
          status: product._id.status
        },
        quantity: product.quantity
      }))
    }
  }
}

export default CartMongooseDao;