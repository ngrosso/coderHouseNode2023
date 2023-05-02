import mongoose, { Schema } from "mongoose";

const ProductCollection = 'products';

const ProductSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true },
  thumbnail: { type: [Schema.Types.String], required: true },
  code: { type: Schema.Types.String, required: true },
  stock: { type: Schema.Types.Number, required: true },
  category: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.Boolean, required: true, default: true },
});

export default mongoose.model(ProductCollection, ProductSchema);