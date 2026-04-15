import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 0. Add 'traditional-yoga' to the pageType enums ───────────────────────
  await db.execute(sql`ALTER TYPE "enum_pages_page_type" ADD VALUE IF NOT EXISTS 'traditional-yoga'`)
  await db.execute(sql`ALTER TYPE "enum__pages_v_version_page_type" ADD VALUE IF NOT EXISTS 'traditional-yoga'`)

  // ── 1. Add scalar columns to pages ──────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_hero_title"             varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_tagline"                varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_hero_image_id"          integer,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_intro_text"             varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_why_section_title"      varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_why_section_text"       varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_why_section_image_id"   integer,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_download_meditation_url" varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_visit_us_url"           varchar,
      ADD COLUMN IF NOT EXISTS "traditional_yoga_content_visit_us_label"         varchar;
  `)

  // ── 2. FK constraints for image uploads (idempotent via exception handling) ──
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_traditional_yoga_hero_image_fk"
          FOREIGN KEY ("traditional_yoga_content_hero_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_traditional_yoga_why_image_fk"
          FOREIGN KEY ("traditional_yoga_content_why_section_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // ── 3. Programs array table ──────────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_traditional_yoga_content_programs" (
      "id"         varchar PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "text"       varchar,
      "_uuid"      varchar,
      CONSTRAINT "pages_traditional_yoga_content_programs_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)

  // ── 4. Version table scalar columns ──────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_hero_title"             varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_tagline"                varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_hero_image_id"          integer,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_intro_text"             varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_why_section_title"      varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_why_section_text"       varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_why_section_image_id"   integer,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_download_meditation_url" varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_visit_us_url"           varchar,
      ADD COLUMN IF NOT EXISTS "version_traditional_yoga_content_visit_us_label"         varchar;
  `)

  // ── 5. Version programs array table ─────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_traditional_yoga_content_programs" (
      "id"         serial PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "text"       varchar,
      "_uuid"      varchar,
      CONSTRAINT "_pages_v_version_traditional_yoga_programs_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_traditional_yoga_content_programs";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_traditional_yoga_content_programs";`)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_hero_title",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_tagline",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_intro_text",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_why_section_title",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_why_section_text",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_why_section_image_id",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_download_meditation_url",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_visit_us_url",
      DROP COLUMN IF EXISTS "version_traditional_yoga_content_visit_us_label";
  `)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "traditional_yoga_content_hero_title",
      DROP COLUMN IF EXISTS "traditional_yoga_content_tagline",
      DROP COLUMN IF EXISTS "traditional_yoga_content_hero_image_id",
      DROP COLUMN IF EXISTS "traditional_yoga_content_intro_text",
      DROP COLUMN IF EXISTS "traditional_yoga_content_why_section_title",
      DROP COLUMN IF EXISTS "traditional_yoga_content_why_section_text",
      DROP COLUMN IF EXISTS "traditional_yoga_content_why_section_image_id",
      DROP COLUMN IF EXISTS "traditional_yoga_content_download_meditation_url",
      DROP COLUMN IF EXISTS "traditional_yoga_content_visit_us_url",
      DROP COLUMN IF EXISTS "traditional_yoga_content_visit_us_label";
  `)
}
