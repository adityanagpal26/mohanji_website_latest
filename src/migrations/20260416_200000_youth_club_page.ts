import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 0. Add enum values ────────────────────────────────────────────────────
  await db.execute(sql`ALTER TYPE "enum_pages_page_type" ADD VALUE IF NOT EXISTS 'youth-club'`)
  await db.execute(sql`ALTER TYPE "enum__pages_v_version_page_type" ADD VALUE IF NOT EXISTS 'youth-club'`)

  // ── 1. Scalar columns on pages ────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "youth_club_content_hero_title"        varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_hero_image_id"     integer,
      ADD COLUMN IF NOT EXISTS "youth_club_content_intro_text"        varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_pull_quote"        varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_activities_title"  varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_awards_title"      varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_awards_text"       varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_awards_image_id"   integer,
      ADD COLUMN IF NOT EXISTS "youth_club_content_areas_title"       varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_areas_text"        varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_areas_image_id"    integer,
      ADD COLUMN IF NOT EXISTS "youth_club_content_eligibility_text"  varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_join_button_label" varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_join_button_url"   varchar,
      ADD COLUMN IF NOT EXISTS "youth_club_content_brochure_url"      varchar;
  `)

  // ── 2. FK constraints on pages (idempotent) ───────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_yc_hero_image_fk"
          FOREIGN KEY ("youth_club_content_hero_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_yc_awards_image_fk"
          FOREIGN KEY ("youth_club_content_awards_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_yc_areas_image_fk"
          FOREIGN KEY ("youth_club_content_areas_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 3. Activities array table ─────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_youth_club_content_activities" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar NOT NULL,
      "description" varchar NOT NULL,
      "image_id"    integer,
      CONSTRAINT "pages_yc_activities_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)

  // ── 4. Scalar columns on _pages_v ─────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_hero_title"        varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_hero_image_id"     integer,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_intro_text"        varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_pull_quote"        varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_activities_title"  varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_awards_title"      varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_awards_text"       varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_awards_image_id"   integer,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_areas_title"       varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_areas_text"        varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_areas_image_id"    integer,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_eligibility_text"  varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_join_button_label" varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_join_button_url"   varchar,
      ADD COLUMN IF NOT EXISTS "version_youth_club_content_brochure_url"      varchar;
  `)

  // ── 5. Version activities array table ────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_youth_club_content_activities" (
      "id"          serial PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar NOT NULL,
      "description" varchar NOT NULL,
      "image_id"    integer,
      "_uuid"       varchar,
      CONSTRAINT "_pages_v_yc_activities_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_youth_club_content_activities";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_youth_club_content_activities";`)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_youth_club_content_hero_title",
      DROP COLUMN IF EXISTS "version_youth_club_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_youth_club_content_intro_text",
      DROP COLUMN IF EXISTS "version_youth_club_content_pull_quote",
      DROP COLUMN IF EXISTS "version_youth_club_content_activities_title",
      DROP COLUMN IF EXISTS "version_youth_club_content_awards_title",
      DROP COLUMN IF EXISTS "version_youth_club_content_awards_text",
      DROP COLUMN IF EXISTS "version_youth_club_content_awards_image_id",
      DROP COLUMN IF EXISTS "version_youth_club_content_areas_title",
      DROP COLUMN IF EXISTS "version_youth_club_content_areas_text",
      DROP COLUMN IF EXISTS "version_youth_club_content_areas_image_id",
      DROP COLUMN IF EXISTS "version_youth_club_content_eligibility_text",
      DROP COLUMN IF EXISTS "version_youth_club_content_join_button_label",
      DROP COLUMN IF EXISTS "version_youth_club_content_join_button_url",
      DROP COLUMN IF EXISTS "version_youth_club_content_brochure_url";
  `)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "youth_club_content_hero_title",
      DROP COLUMN IF EXISTS "youth_club_content_hero_image_id",
      DROP COLUMN IF EXISTS "youth_club_content_intro_text",
      DROP COLUMN IF EXISTS "youth_club_content_pull_quote",
      DROP COLUMN IF EXISTS "youth_club_content_activities_title",
      DROP COLUMN IF EXISTS "youth_club_content_awards_title",
      DROP COLUMN IF EXISTS "youth_club_content_awards_text",
      DROP COLUMN IF EXISTS "youth_club_content_awards_image_id",
      DROP COLUMN IF EXISTS "youth_club_content_areas_title",
      DROP COLUMN IF EXISTS "youth_club_content_areas_text",
      DROP COLUMN IF EXISTS "youth_club_content_areas_image_id",
      DROP COLUMN IF EXISTS "youth_club_content_eligibility_text",
      DROP COLUMN IF EXISTS "youth_club_content_join_button_label",
      DROP COLUMN IF EXISTS "youth_club_content_join_button_url",
      DROP COLUMN IF EXISTS "youth_club_content_brochure_url";
  `)
  // Note: PostgreSQL does not support removing enum values
}
