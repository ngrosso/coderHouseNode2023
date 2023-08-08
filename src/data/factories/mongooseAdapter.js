import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";

class MongooseAdapter {
  async init(uri, dbName) {
    this.connection = await mongoose.connect(uri, {
      dbName: dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info("Base de datos Mongo Atlas conectada");
  }

  async close() {
    await this.connection.disconnect();
  }
}

export default MongooseAdapter;
