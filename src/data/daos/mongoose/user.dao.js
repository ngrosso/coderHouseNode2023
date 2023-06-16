import userSchema from "../../models/user.model.js";

class UserMongooseDao {
  async paginate(criteria) {
    const limit = criteria.limit || 10;
    const page = criteria.page || 1;
    const userDocuments = await userSchema.paginate({}, { limit, page });

    userDocuments.docs = userDocuments.docs.map(document => ({
      id: document._id,
      email: document.email,
    }));

    return userDocuments;
  }

  async getOne(id) {
    const userDocument = await userSchema.findOne({ _id: id });

    if (!userDocument) {
      throw new Error("user doesn't exist.");
    }

    return {
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      cart: userDocument?.cart,
      role: userDocument?.role,
      password: userDocument?.password
    }
  }

  async getOneByEmail(email) {
    const userDocument = await userSchema.findOne({ email });
    console.log(userDocument)
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      admin: userDocument?.admin,
      password: userDocument?.password
    }
  }

  async create(data) {
    const userDocument = await userSchema.create(data);

    return {
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      age: userDocument.age,
      cart: userDocument.cart,
      role: userDocument.role
    }
  }

  async updateOne(id, data) {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!userDocument) {
      throw new Error("User doesn't exist.");
    }

    return {
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      age: userDocument.age,
      role: userDocument.role,
      cart: userDocument.cart
    }
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

export default UserMongooseDao;