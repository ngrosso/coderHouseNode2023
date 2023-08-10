import config from './config/index.js';
import { createContainer, asClass, Lifetime } from 'awilix';

import ProductMongooseRepository from './data/repositories/mongoose/productMongooseRepository.js';
import CartMongooseRepository from './data/repositories/mongoose/cartMongooseRepository.js';
import UserMongooseRepository from './data/repositories/mongoose/userMongooseRepository.js';
import TicketMongooseRepository from './data/repositories/mongoose/ticketMongooseRepository.js';

const container = createContainer();

if (config.DB_TYPE === 'MongooseAdapter') {
  container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('TicketRepository', asClass(TicketMongooseRepository), { lifetime: Lifetime.SINGLETON });
}
else if (config.DB_TYPE === 'FileAdapter') {
  throw new Error('DB_TYPE unimplemented yet');
} else {
  throw new Error('Unsupported DB_TYPE');
}

export default container;
