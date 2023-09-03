import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import uniquevalidator from 'mongoose-unique-validator';

const userCollection = 'users';

const DocumentsSchema = new Schema({
  name: { type: Schema.Types.String },
  reference: { type: Schema.Types.String }
})

const UserSchema = new Schema({
  firstName: { type: Schema.Types.String },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true, required: true, index: true },
  age: { type: Schema.Types.Number },
  password: { type: Schema.Types.String },
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  lastConnection: { type: Schema.Types.Number },
  admin: { type: Schema.Types.Boolean, default: false },
  premium: { type: Schema.Types.Boolean, default: false },
  documents: { type: [DocumentsSchema] },
  status: { type: Schema.Types.Boolean, default: true}
});

UserSchema.plugin(paginate);
UserSchema.plugin(uniquevalidator);

export default mongoose.model(userCollection, UserSchema);
