import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userCollection = 'users';

const UserSchema = new Schema({
  email: { type: Schema.Types.String, unique: true, required: true },
  admin: { type: Schema.Types.Boolean, default: false },
  password: { type: Schema.Types.String }
});

UserSchema.plugin(paginate);

export default mongoose.model(userCollection, UserSchema);
