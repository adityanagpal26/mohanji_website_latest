import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "location" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_location" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "posts" DROP COLUMN IF EXISTS "location";`)
  await db.execute(sql`ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_location";`)
}
