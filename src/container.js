import config from "./config/index.js";
import { createContainer, asClass, Lifetime } from "awilix";

import ProductMongooseRepository from "./data/repositories/mongoose/productMongooseRepository.js";
import CartMongooseRepository from "./data/repositories/mongoose/cartMongooseRepository.js";
import UserMongooseRepository from "./data/repositories/mongoose/userMongooseRepository.js";
import TicketMongooseRepository from "./data/repositories/mongoose/ticketMongooseRepository.js";

const container = createContainer();

if (config.dbType === 'MongooseAdapter') {
  container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('TicketRepository', asClass(TicketMongooseRepository), { lifetime: Lifetime.SINGLETON });
}
else if (config.dbType === 'FileAdapter') {
  throw new Error('dbType unimplemented yet');
} else {
  throw new Error('Unsupported dbType');
}

export default container;
