import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the `prefix` column to the `media` table.
 * Required by @payloadcms/storage-s3 — the plugin stores the S3 key prefix
 * (e.g. "media") per file so it can reconstruct the full S3 path.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "prefix" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";`)
}
