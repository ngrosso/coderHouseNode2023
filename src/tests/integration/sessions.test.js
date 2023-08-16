import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';
import { logger } from '../../utils/logger.js';

describe('Sessions API Tests', () => {

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
    logger.info('server closed');
  });

  test('POST /api/sessions/signup should create a user', async () => {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    testContext.user = user;
    return await testContext.requester.post('/api/sessions/signup').send(user).then(result => {
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data).toHaveProperty('firstName');
      expect(result.body.data).toHaveProperty('email');
      expect(result.body.data).toHaveProperty('id');
    });
  });

  test('POST /api/sessions/login should login a user', async () => {
    const user = {
      email: testContext.user.email,
      password: testContext.user.password
    };
    return await testContext.requester.post('/api/sessions/login').send(user).then(result => {
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty('success');
      expect(result.body.success).toBe(true);
      testContext.token = result.headers['set-cookie'][0]
    });
  });
  
  test('GET /api/sessions/current should return the user', async () => {
    return await testContext.requester.get('/api/sessions/current').set('Cookie', testContext.token).then(result => {
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty('data');
      expect(result.body.data).toHaveProperty('firstName');
      expect(result.body.data).toHaveProperty('email');
      expect(result.body.data).toHaveProperty('id');
    });
  });

  test('POST /api/sessions/logout should logout a user', async () => {
    return await testContext.requester.post('/api/sessions/logout').set('Cookie', testContext.token).then(result => {
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty('success');
      expect(result.body.success).toBe(true);
    });
  });
});