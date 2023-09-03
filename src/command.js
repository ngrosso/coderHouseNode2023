import { exit } from 'shelljs';
import { program } from 'commander';
import config from './config/index.js';

import AddUser from "./presentation/commands/addUser.js";
import DbFactory from './data/factories/dbFactory.js';

void (async () => {
  try {
    const db = DbFactory.create(config.DB_TYPE);
    db.init(config.DB_URI, config.DB_NAME);

    program.addCommand(AddUser);

    await program.parseAsync(process.argv);

    exit();
  }
  catch (error) {
    await console.log(error);
    exit();
  }
})();
