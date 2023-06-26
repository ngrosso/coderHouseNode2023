import config from "./config/index.js";

import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";

void (async () => {
  const db = DbFactory.create(config.dbType);
  db.init(config.dbUri,config.dbName);

  const app = AppFactory.create(config.appType);
  app.init();
  app.build();
  app.listen();
})();