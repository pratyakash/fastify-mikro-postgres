import { Entity, Property } from '@mikro-orm/postgresql';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  first_name!: string;

  @Property()
  last_name!: string;

  @Property()
  email!: string;

  @Property()
  is_active?: boolean = true;
}
