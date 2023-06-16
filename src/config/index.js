import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const config = {
  mongoAtlasUri: process.env.MONGO_ATLAS_URI,
  mongoDBName: process.env.MONGO_DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  jwtPrivateKey: process.env.PRIVATE_KEY,
  persistanceType: process.env.PERSISTANCE_TYPE,
  port: process.env.PORT
}

export default config;