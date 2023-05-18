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
      throw new Error('User dont exist.');
    }

    return {
      id: userDocument?._id,
      email: userDocument?.email,
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
      email: userDocument.email,
      password: userDocument.password,
    }
  }

  async updateOne(id, data) {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!userDocument) {
      throw new Error('User dont exist.');
    }

    return {
      id: userDocument._id,
      email: userDocument.email,
    }
  }

  async deleteOne(id) {
    return userSchema.deleteOne({ _id: id });
  }
}

export default UserMongooseDao;