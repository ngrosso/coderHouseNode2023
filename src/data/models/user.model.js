import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const UserSchema = new Schema({
  firstName: {type:Schema.Types.String},
  lastName: {type:Schema.Types.String},
  email: { type: Schema.Types.String, unique: true, required: true, index: true },
  age: { type: Schema.Types.Number },
  password: { type: Schema.Types.String },
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  admin: { type: Schema.Types.Boolean, default: false },
});

UserSchema.plugin(paginate);

export default mongoose.model(userCollection, UserSchema);
