if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
}

export interface IConfig {
  APP_TYPE: string;
  DB_TYPE: string;
  DB_URI: string;
  DB_NAME: string;
  SESSION_SECRET: string;
  JWT_PRIVATE_KEY: string;
  MAILER_USER: string;
  MAILER_PASS: string;
  STRIPE_SECRET: string;
  HOST_URL: string;
  PORT: string;
  ACCOUNT_EXPIRE_MINUTES: string;
}

const config: IConfig = {
  APP_TYPE: process.env.APP_TYPE || '',
  DB_TYPE: process.env.DB_TYPE || '',
  DB_URI: process.env.DB_URI || '',
  DB_NAME: process.env.DB_NAME || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || '',
  MAILER_USER: process.env.MAILER_USER || '',
  MAILER_PASS: process.env.MAILER_PASS || '',
  STRIPE_SECRET: process.env.STRIPE_SECRET || '',
  HOST_URL: process.env.HOST_URL || '',
  PORT: process.env.PORT || '',
  ACCOUNT_EXPIRE_MINUTES: process.env.ACCOUNT_EXPIRE_MINUTES || ''
};

export default config;
