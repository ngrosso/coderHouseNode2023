import { hash } from 'bcrypt';
import container from '../../container.js';
import { createHash, isValidPassword } from '../../shared/auth.js';
import userCreateValidation from '../validators/user/userCreateValidation.js';
import userUpdateValidation from '../validators/user/userUpdateValidation.js';

class UserManager {
  constructor() {
    this.userRepository = container.resolve('UserRepository');
  }

  async paginate(criteria) {
    return this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email) {
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id) {
    return this.userRepository.getOne(id);
  }

  async create(data) {
    await userCreateValidation.parseAsync(data);
    const user = await this.userRepository.create({ ...data, password: await createHash(data.password) });
    return { ...user, password: undefined };
  }

  async updateOne(id, data) {
    await userUpdateValidation.parseAsync(data);
    const user = await this.userRepository.getOneByEmail(data.email);
    try {
      if (data.password && data.password != user.password) throw new Error()
      return this.userRepository.updateOne(id, data);
    } catch (e) {
      return await this.changePassword(data);
    }
  }

  async deleteOne(id) {
    return this.userRepository.deleteOne(id);
  }

  async updateLastConnection(id) {
    const user = await this.userRepository.getOne(id);
    user.lastConnection = Date.now();
    return this.userRepository.updateOne(id, user);
  }

  async changePassword(data) {
    const user = await this.userRepository.getOneByEmail(data.email);
    return this.userRepository.updateOne(user.id, { ...user, password: await createHash(data.password) });
  }

  async removeInactiveUsers() {
    return this.userRepository.removeInactiveUsers();
  }
}

export default UserManager;
