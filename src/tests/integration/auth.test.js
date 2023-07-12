import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';
import { test } from 'shelljs';

describe('POST /api/sessions/ signup', () => {
  let app;
  let db;
  let requester;

  beforeAll(async () => {
    app = (await initServer()).app;
    db = (await initServer()).db;
    const application = app.callback();
    requester = supertest.agent(application);
  });
  afterAll(async () => {
    await db.close();
    requester.app.close(() => {
      console.log('server closed');
    })
  });

  test('should create a user', async () => {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    return await requester.post('/api/sessions/signup').send(user).then(result => {
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty('firstName');
      expect(result.body).toHaveProperty('email');
      expect(result.body).toHaveProperty('id');
    });
  });
});