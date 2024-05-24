import { Migration } from '@mikro-orm/migrations';

export class Migration20240524121925 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "is_active" type boolean using ("is_active"::boolean);'
    );
    this.addSql('alter table "user" alter column "is_active" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "is_active" type boolean using ("is_active"::boolean);'
    );
    this.addSql('alter table "user" alter column "is_active" set not null;');
  }
}
