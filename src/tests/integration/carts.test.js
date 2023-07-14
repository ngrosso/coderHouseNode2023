import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';

describe('Carts API Tests', () => {

  let testContext;

  beforeAll(() => {
    testContext = {};
  });

  beforeAll(async () => {
    const { app, db } = await initServer();
    const application = app.callback();
    testContext.app = app;
    testContext.db = db;
    testContext.requester = supertest.agent(application);
  });
  afterAll(async () => {
    await testContext.db.close();
    await testContext.requester.app.close();
    console.log('server closed');
  });

  // test('POST /api/sessions/signup should create a user for testing Carts', async () => {
  //   const user = {
  //     firstName: faker.person.firstName(),
  //     lastName: faker.person.lastName(),
  //     email: faker.internet.email(),
  //     password: faker.internet.password()
  //   };
  //   testContext.user = user;
  //   return await testContext.requester.post('/api/sessions/signup').send(user).then(result => {
  //     expect(result.status).toBe(201);
  //     expect(result.body).toHaveProperty('data');
  //     expect(result.body.data).toHaveProperty('firstName');
  //     expect(result.body.data).toHaveProperty('email');
  //     expect(result.body.data).toHaveProperty('id');
  //   });
  // });

});