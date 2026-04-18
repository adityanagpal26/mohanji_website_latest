import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds `favicon_id` to `site_settings`, referencing the media table.
 * The logo field already lives on the `header` global — this only adds favicon to site settings.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings"
      ADD COLUMN IF NOT EXISTS "favicon_id" integer;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "site_settings"
        ADD CONSTRAINT "site_settings_favicon_id_media_id_fk"
        FOREIGN KEY ("favicon_id") REFERENCES "media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "favicon_id";`)
}
