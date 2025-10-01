import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductCollection = 'products';

export interface IProductModel {
  title: string;
  description: string;
  price: number;
  thumbnail: string[];
  code: string;
  stock: number;
  category: string;
  owner: string;
  status: boolean;
}

const ProductSchema = new Schema<IProductModel>({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true },
  thumbnail: { type: [Schema.Types.String], required: true },
  code: { type: Schema.Types.String, required: true },
  stock: { type: Schema.Types.Number, required: true },
  category: { type: Schema.Types.String, required: true },
  owner: { type: Schema.Types.String, required: true, default: "admin" },
  status: { type: Schema.Types.Boolean, required: true, default: true },
});

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model(ProductCollection, ProductSchema);
