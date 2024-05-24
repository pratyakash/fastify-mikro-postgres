import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/postgresql';

export abstract class BaseEntity<Optional = never> {
  [OptionalProps]?: 'created_at' | 'updated_at' | Optional;

  @PrimaryKey()
  id!: string;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}
