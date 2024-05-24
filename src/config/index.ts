import 'dotenv/config';

export const ENV_VARS = {
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? '',
};
