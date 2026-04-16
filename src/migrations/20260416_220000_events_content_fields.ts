import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add new content fields to the existing events table
  await db.execute(sql`
    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "display_date"       varchar,
      ADD COLUMN IF NOT EXISTS "location"           varchar,
      ADD COLUMN IF NOT EXISTS "cover_image_id"     integer,
      ADD COLUMN IF NOT EXISTS "tagline"            varchar,
      ADD COLUMN IF NOT EXISTS "short_description"  varchar,
      ADD COLUMN IF NOT EXISTS "cta_label"          varchar,
      ADD COLUMN IF NOT EXISTS "cta_url"            varchar,
      ADD COLUMN IF NOT EXISTS "cta_external"       boolean DEFAULT false;
  `)

  // FK: cover_image → media (idempotent)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "events"
        ADD CONSTRAINT "events_cover_image_id_media_id_fk"
          FOREIGN KEY ("cover_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "events"
      DROP COLUMN IF EXISTS "display_date",
      DROP COLUMN IF EXISTS "location",
      DROP COLUMN IF EXISTS "cover_image_id",
      DROP COLUMN IF EXISTS "tagline",
      DROP COLUMN IF EXISTS "short_description",
      DROP COLUMN IF EXISTS "cta_label",
      DROP COLUMN IF EXISTS "cta_url",
      DROP COLUMN IF EXISTS "cta_external";
  `)
}
