import { Migration } from '@mikro-orm/migrations';

export class Migration20240524121642 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "is_active" boolean not null default true;'
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "is_active";');
  }
}
