import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const config = {
  appType: process.env.APP_TYPE,
  dbType: process.env.DB_TYPE,
  dbUri: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  jwtPrivateKey: process.env.PRIVATE_KEY,
  persistanceType: process.env.PERSISTANCE_TYPE,
  mailerUser: process.env.MAILER_USER,
  mailerPass: process.env.MAILER_PASS,
  port: process.env.PORT
}

export default config;