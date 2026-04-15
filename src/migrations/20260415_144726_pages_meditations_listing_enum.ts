import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add 'meditations-listing' to the pages pageType enum
  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_page_type"
    ADD VALUE IF NOT EXISTS 'meditations-listing';
  `)
  // Mirror on the versions table enum
  await db.execute(sql`
    ALTER TYPE "public"."enum__pages_v_version_page_type"
    ADD VALUE IF NOT EXISTS 'meditations-listing';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // PostgreSQL does not support removing enum values — down is a no-op
}
