import 'dotenv/config';

export const ENV_VARS = {
  PORT: process.env.PORT ?? 300,
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  DATABASE_HOST: process.env.DATABASE_HOST ?? '',
  DATABASE_NAME: process.env.DATABASE_NAME ?? '',
  DATABASE_USER: process.env.DATABASE_USER ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) ?? 5432,
};
