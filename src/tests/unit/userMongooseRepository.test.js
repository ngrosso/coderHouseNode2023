import config from '../../config/index.js';
import { faker } from '@faker-js/faker';
import DbFactory from "../../data/factories/dbFactory.js";
import UserMongooseRepository from '../../data/repositories/mongoose/userMongooseRepository';

const userRepository = new UserMongooseRepository();
const db = DbFactory.create(config.dbType);
let userResult = {};

describe('User Mongoose Repository', () => {
 //custom matcher
  expect.extend({
    toContainObject(received, argument) {

      const pass = this.equals(received,
        expect.arrayContaining([
          expect.objectContaining(argument)
        ])
      )

      if (pass) {
        return {
          message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
          pass: true
        }
      } else {
        return {
          message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
          pass: false
        }
      }
    }
  });

  beforeAll(async () => {
    await db.init(config.dbUri, config.dbName);
  });
  afterAll(async () => {
    await userRepository.deleteOne(userResult.id);
    await db.close();
  });

  test('should be an instancce', async () => {
    expect(userRepository).toBeInstanceOf(UserMongooseRepository);
  })

  test('should create a user', async () => {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    return await userRepository.create(user).then(result => {
      expect(result).toHaveProperty('firstName');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('id');
      userResult = result;
    });
  })

  test('should get a user by id', async () => {
    return await userRepository.getOne(userResult.id).then(result => {
      expect(result).toHaveProperty('firstName');
      expect(result).toHaveProperty('email');
    });
  })

  test('should get all users', async () => {
    return await userRepository.paginate({ limit: 500 }).then(result => {
      expect(result.docs).toBeInstanceOf(Array);
      expect(result.docs).toContainObject({id:userResult.id});
    });

  });
});