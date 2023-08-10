import config from '../../config/index.js';

import AppFactory from '../../presentation/factories/appFactory.js';
import DbFactory from '../../data/factories/dbFactory.js';

const initServer = async () => {
  const db = DbFactory.create(config.DB_TYPE);
  db.init(config.DB_URI, config.DB_NAME);

  const app = AppFactory.create(config.APP_TYPE);

  app.init();
  app.build();

  return {
    app,
    db
  }
};

export default initServer;
