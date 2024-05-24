import 'dotenv/config';
import { existsSync, readFileSync } from 'node:fs';
import {
  defineConfig,
  GeneratedCacheAdapter,
  Options,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ENV_VARS } from './config';

const options = {} as Options;

if (
  process.env.NODE_ENV === 'production' &&
  existsSync('./temp/metadata.json')
) {
  options.metadataCache = {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    options: {
      data: JSON.parse(
        readFileSync('./temp/metadata.json', { encoding: 'utf8' })
      ),
    },
  };
}

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: ENV_VARS.DATABASE_NAME,
  user: ENV_VARS.DATABASE_USER,
  password: ENV_VARS.DATABASE_PASSWORD,
  host: ENV_VARS.DATABASE_HOST,
  port: ENV_VARS.DATABASE_PORT,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  debug: true,
  dynamicImportProvider: (id) => import(id),
  extensions: [Migrator],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  ...options,
});
