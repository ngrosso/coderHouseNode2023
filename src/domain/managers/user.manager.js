import container from '../../container.js';
import { createHash } from '../../shared/auth.js';
import userCreateValidation from '../validators/user/userCreateValidation.js';

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
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id) {
    return this.userRepository.deleteOne(id);
  }

  async changePassword(dto) {
    const user = await this.userRepository.getOneByEmail(dto.email);
    user.password = dto.password;

    return this.userRepository.updateOne(user.id, user);

  }

  async removeInactiveUsers() {
    return this.userRepository.removeInactiveUsers();
  }
}

export default UserManager;
