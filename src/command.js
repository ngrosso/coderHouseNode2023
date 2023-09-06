import { exit } from 'shelljs';
import { program } from 'commander';
import config from './config/index.js';
import { logger } from './utils/logger.js';

import AddUser from "./presentation/commands/addUser.js";
import AddProduct from "./presentation/commands/addProduct.js";
import DbFactory from './data/factories/dbFactory.js';

void (async () => {
  try {
    const db = DbFactory.create(config.DB_TYPE);
    db.init(config.DB_URI, config.DB_NAME);

    program.addCommand(AddUser);
    program.addCommand(AddProduct)

    await program.parseAsync(process.argv);

    exit();
  }
  catch (error) {
    logger.error(error.message)
    exit();
  }
})();
