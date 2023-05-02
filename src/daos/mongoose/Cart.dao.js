import CartSchema from '../../models/Cart.model.js';
import ProductSchema from '../../models/Product.model.js';

class CartMongooseDao {

  async find() {
    const cartDocument = await CartSchema.find();

    return cartDocument.map(document => ({
      id: document._id,
      products: document.products.map(product => ({
        id: product._id,
        quantity: product.quantity
      }))
    }));
  }

  async findOne(id) {
    const cartDocument = await CartSchema.findOne({ _id: id }).populate('products._id');
    if (!cartDocument) return null;
    if (!cartDocument.products) return { id: cartDocument._id, products: [] }
    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        product: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
        status: product.status,
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

  async updateOne(cid, pid, quantity) {

    await CartSchema.updateOne({ _id: cid }, { $push: { products: { _id: pid, quantity: quantity } } }, { new: true });
    const foundDocument = await CartSchema.findOne({ _id: cid }).populate('products._id');
    return {
      id: foundDocument._id,
      products: foundDocument.products.map(product => ({
        product: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
        status: product.status,
        quantity: product.quantity
      }))
    }
  }

  async updateOneQty(cid, pid, quantity) {

    const cartDocument = await CartSchema.updateOne({ _id: cid, "products._id": pid }, { $inc: { "products.$.quantity": quantity } });

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        productId: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
        status: product.status,
        quantity: product.quantity
      }))
    }
  }

  async remove(id) {
    return CartSchema.deleteOne({ _id: id });
  }

  async removeProduct(cid, pid) {
    const cartDocument = await CartSchema.findOne({ _id: cid }).populate('products._id');
    cartDocument.products = cartDocument.products.filter(product => product._id != pid);
    await cartDocument.save();

    return {
      id: cartDocument._id,
      products: cartDocument.products.map(product => ({
        id: product._id,
        quantity: product.quantity
      }))
    }
  }
}

export default CartMongooseDao;