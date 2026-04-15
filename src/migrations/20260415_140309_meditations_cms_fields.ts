import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. How-to-use steps array table for meditations (same pattern as meditations_downloads)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "meditations_how_to_use" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "title"      varchar NOT NULL,
      "description" varchar
    );
  `)
  await db.execute(sql`
    ALTER TABLE "meditations_how_to_use"
      ADD CONSTRAINT "meditations_how_to_use_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "meditations"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // 2. Meditations listing content columns on pages table
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_hero_title"     varchar,
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_hero_subtitle"   varchar,
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_hero_image_id"   integer,
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_brochure_url"    varchar,
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_intro_text"      varchar,
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_cta_heading"     varchar,
      ADD COLUMN IF NOT EXISTS "meditations_listing_content_cta_text"        varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD CONSTRAINT "pages_meditations_listing_content_hero_image_id_media_id_fk"
      FOREIGN KEY ("meditations_listing_content_hero_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
  `)

  // 3. Same columns on _pages_v (versions/drafts table)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_hero_title"     varchar,
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_hero_subtitle"   varchar,
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_hero_image_id"   integer,
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_brochure_url"    varchar,
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_intro_text"      varchar,
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_cta_heading"     varchar,
      ADD COLUMN IF NOT EXISTS "version_meditations_listing_content_cta_text"        varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD CONSTRAINT "_pages_v_version_meditations_listing_content_hero_image_id_media_id_fk"
      FOREIGN KEY ("version_meditations_listing_content_hero_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
  `)

  // 4. Drop orphaned featured_image_id column (field was removed from Pages collection)
  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "featured_image_id";
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_featured_image_id";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "meditations_how_to_use";`)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "meditations_listing_content_hero_title",
      DROP COLUMN IF EXISTS "meditations_listing_content_hero_subtitle",
      DROP COLUMN IF EXISTS "meditations_listing_content_hero_image_id",
      DROP COLUMN IF EXISTS "meditations_listing_content_brochure_url",
      DROP COLUMN IF EXISTS "meditations_listing_content_intro_text",
      DROP COLUMN IF EXISTS "meditations_listing_content_cta_heading",
      DROP COLUMN IF EXISTS "meditations_listing_content_cta_text";
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_meditations_listing_content_hero_title",
      DROP COLUMN IF EXISTS "version_meditations_listing_content_hero_subtitle",
      DROP COLUMN IF EXISTS "version_meditations_listing_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_meditations_listing_content_brochure_url",
      DROP COLUMN IF EXISTS "version_meditations_listing_content_intro_text",
      DROP COLUMN IF EXISTS "version_meditations_listing_content_cta_heading",
      DROP COLUMN IF EXISTS "version_meditations_listing_content_cta_text";
  `)
}
