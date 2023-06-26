import userSchema from "../../models/user.model.js";
import User from "../../../domain/entities/user.js";

class UserMongooseRepository {
  async paginate(criteria) {
    const limit = criteria.limit || 10;
    const page = criteria.page || 1;
    const userDocuments = await userSchema.paginate({}, { limit, page });

    userDocuments.docs = userDocuments.docs.map(document => new User({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      age: document.age,
      email: document.email,
      admin: document.admin
    }));

    return userDocuments;
  }

  async getOne(id) {
    const userDocument = await userSchema.findOne({ _id: id });

    if (!userDocument) {
      throw new Error("user doesn't exist.");
    }

    return new User({
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      cart: userDocument?.cart,
    });
  }

  async getOneByEmail(email) {
    const userDocument = await userSchema.findOne({ email });
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      admin: userDocument?.admin,
      password: userDocument?.password
    }
  }

  async create(data) {
    const userDocument = await userSchema.create(data);

    return new User({
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      age: userDocument.age,
      cart: userDocument.cart
    })
  }

  async updateOne(id, data) {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!userDocument) {
      throw new Error("User doesn't exist.");
    }

    return new User({
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      age: userDocument.age,
      cart: userDocument.cart
    })
  }

  async deleteOne(id) {
    return userSchema.deleteOne({ _id: id });
  }

  async addCart(id, cartId) {
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument) throw new Error("user doesn't exist.");
    userDocument.cart = cartId;
    return userDocument.save();
  }

  async removeCart(id, cartId) {
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument) {
      throw new Error("user doesn't exist.");
    }
    userDocument.cart = null;
    return userDocument.save();
  }
}

export default UserMongooseRepository;