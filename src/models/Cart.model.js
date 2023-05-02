import mongoose, { Schema } from "mongoose";

const CartCollection = 'carts';

const CartProductSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "products", index: true},
  quantity: { type: Schema.Types.Number, required: true },
})

const CartSchema = new Schema({
  products: { type: [CartProductSchema], required: true },
});

CartProductSchema.pre('find', function () {
  this.populate(['products'])
})

CartProductSchema.pre('findOne', function () {
  this.populate(['products'])
})

export default mongoose.model(CartCollection, CartSchema);