import userSchema from '../../models/user.model.js';
import User from '../../../domain/entities/user.js';
import config from '../../../config/index.js'

class UserMongooseRepository {
  async paginate(criteria) {
    const limit = criteria.limit || 10;
    const page = criteria.page || 1;
    const userDocuments = await userSchema.paginate({}, { limit, page });

    userDocuments.docs = userDocuments.docs.map(userDocument => new User({
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      age: userDocument.age,
      email: userDocument.email,
      admin: userDocument.admin,
      cart: userDocument.cart,
      lastConnection: (userDocument.lastConnection) != undefined ? new Date(userDocument.lastConnection) : undefined,
      documents: userDocument?.documents.map(doc => ({
        name: doc.name,
        reference: doc.reference
      })),
      documents: userDocument.documents,
      status: userDocument.status
    }));

    return userDocuments;
  }

  async getOne(id) {
    const userDocument = await userSchema.findOne({ _id: id, status: true });

    if (!userDocument) {
      throw new UserIdDoesntExistError(id);
    }

    return new User({
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      cart: userDocument?.cart,
      lastConnection: (userDocument.lastConnection) != undefined ? new Date(userDocument.lastConnection) : undefined,
      admin: userDocument?.admin,
      premium: userDocument?.premium,
      documents: userDocument?.documents.map(doc => ({
        name: doc.name,
        reference: doc.reference
      })),
      status: userDocument?.status
    });
  }

  async getOneByEmail(email) {
    const userDocument = await userSchema.findOne({ email });
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      admin: userDocument?.admin,
      password: userDocument?.password,
      cart: userDocument?.cart,
      lastConnection: (userDocument.lastConnection) != undefined ? new Date(userDocument.lastConnection) : undefined,
      premium: userDocument?.premium,
      documents: userDocument?.documents.map(doc => ({
        name: doc.name,
        reference: doc.reference
      })),
      status: userDocument?.status
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
      cart: userDocument.cart,
      lastConnection: Date.now(),
      premium: userDocument.premium,
      documents: userDocument.documents,
      status: userDocument.status
    })
  }

  async updateOne(id, data) {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!userDocument) {
      throw new UserIdDoesntExistError(id);
    }

    return new User({
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      age: userDocument?.age,
      cart: userDocument?.cart,
      lastConnection: userDocument?.lastConnection,
      premium: userDocument?.premium,
      admin: userDocument?.admin,
      documents: userDocument?.documents,
      status: userDocument?.status
    })
  }

  async deleteOne(id) {
    return userSchema.updateOne({ _id: id }, { status: false }, { new: true });
  };

  async addCart(id, cartId) {
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument) throw new UserIdDoesntExistError(id);
    userDocument.cart = cartId;
    return userDocument.save();
  }

  async removeCart(id) {
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument) throw new UserIdDoesntExistError(id);
    userDocument.cart = null;
    return userDocument.save();
  }

  async removeInactiveUsers() {
    const deltaTime = Date.now() - config.ACCOUNT_EXPIRE_MINUTES * 60000;
    const query = { $and: [{ $or: [{ lastConnection: { $lt: 1693722010985 } }, { lastConnection: undefined }] }, { $or: [{ status: true }, { status: undefined }] }, { $or: [{ admin: { $exists: false } }, { admin: false }] }] }
    const userDocuments = await userSchema.find(query);
    await userSchema.updateMany(query, { status: false });

    return userDocuments.map(userDocument => new User({
      id: userDocument._id,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      age: userDocument.age,
      email: userDocument.email,
      admin: userDocument.admin,
      cart: userDocument.cart,
      lastConnection: (userDocument.lastConnection) != undefined ? new Date(userDocument.lastConnection) : undefined,
      premium: userDocument.premium,
      documents: userDocument?.documents.map(doc => ({
        name: doc.name,
        reference: doc.reference
      })),
      status: userDocument.status
    }));

  }
}

class UserIdDoesntExistError extends Error {
  constructor(id) {
    super(`User with Id:${id} Not Found!`);
  }
}


export default UserMongooseRepository;