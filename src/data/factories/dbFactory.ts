import MongooseAdapter from './mongooseAdapter.js';

class DbFactory {
  static create(DB_TYPE: string): MongooseAdapter {
    const dbs = new Map<string, typeof MongooseAdapter>();
    dbs.set('MongooseAdapter', MongooseAdapter);

    if (!dbs.has(DB_TYPE)) {
      throw Error('DbAdapter not found');
    }

    const db = dbs.get(DB_TYPE)!;
    return new db();
  }
}

export default DbFactory;
