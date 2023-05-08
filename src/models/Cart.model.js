import mongoose, { Schema } from "mongoose";

const CartCollection = 'carts';

const ProductRelationSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "products", index: true },
  quantity: { type: Schema.Types.Number, default: 1 }
});

const CartSchema = new Schema({
  products: { type: [ProductRelationSchema] }
});

CartSchema.pre('find', function () {
  this.populate([
    {
      path: 'products',
      populate: {
        path: 'product',
        model: 'products'
      }
    }
  ]);
});

CartSchema.pre('findOne', function () {
  this.populate([
    {
      path: 'products',
      populate: {
        path: 'product',
        model: 'products'
      }
    }
  ]);
});

export default mongoose.model(CartCollection, CartSchema);
