import mongoose from "mongoose";

class MongooseAdapter
{
    async init(uri,dbName)
    {
        this.connection = await mongoose.connect(uri, {
          dbName: dbName,
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log("Base de datos Mongo Atlas conectada");
    }

    async close()
    {
      await this.connection.disconnect();
    }
}

export default MongooseAdapter;
