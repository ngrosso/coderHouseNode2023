import mongoose, { Connection } from 'mongoose';
import { logger } from '../../utils/logger.js';

class MongooseAdapter {
  connection?: Connection;

  async init(uri: string, dbName: string): Promise<void> {
    const mongooseInstance = await mongoose.connect(uri, {
      dbName: dbName
    });
    this.connection = mongooseInstance.connection;
    
    if (uri.includes('localhost')) {
      logger.info(`Base de datos Mongo Local conectada en ${uri}`);
    } else {
      logger.info('Base de datos Mongo Atlas conectada');
    }
  }

  async close(): Promise<void> {
    await mongoose.disconnect();
  }
}

export default MongooseAdapter;
