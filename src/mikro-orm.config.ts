import { existsSync, readFileSync } from 'node:fs';
import {
  defineConfig,
  GeneratedCacheAdapter,
  Options,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

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
  dbName: 'mikro-db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  dynamicImportProvider: (id) => import(id),
  extensions: [Migrator],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  ...options,
});
