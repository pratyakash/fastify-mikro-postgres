import {
  MikroORM,
  Options,
  EntityManager,
  EntityRepository,
} from '@mikro-orm/postgresql';

import { User } from '../src/entities/user/user.entity';

import config from './mikro-orm.config';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  user: EntityRepository<User>;
}

let cache: Services;

export async function init_ORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  // allow overriding config options for testing
  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    user: orm.em.getRepository(User),
  });
}
