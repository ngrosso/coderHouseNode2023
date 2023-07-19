if(process.env.NODE_ENV !== "production"){
  const dotenv = await import('dotenv')
  dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
}

const config = {
  APP_TYPE: process.env.APP_TYPE,
  DB_TYPE: process.env.DB_TYPE,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  MAILER_USER: process.env.MAILER_USER,
  MAILER_PASS: process.env.MAILER_PASS,
  PORT: process.env.PORT
}

export default config;