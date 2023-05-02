import mongoose, { Schema } from "mongoose";

const CartCollection = 'carts';

const CartSchema = new Schema({
  products: {
    type: [{
      _id: { type: Schema.Types.ObjectId, ref: "products", index: true },
      quantity: { type: Schema.Types.Number, required: true },
    }], required: true
  },
});

CartSchema.pre('find', function () {
  this.populate(['products'])
})

CartSchema.pre('findOne', function () {
  this.populate(['products'])
})

export default mongoose.model(CartCollection, CartSchema);