import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Add enum values ──────────────────────────────────────────────────────
  await db.execute(sql`
    ALTER TYPE "enum_pages_page_type"
      ADD VALUE IF NOT EXISTS 'courses-landing';
  `)
  await db.execute(sql`
    ALTER TYPE "enum__pages_v_version_page_type"
      ADD VALUE IF NOT EXISTS 'courses-landing';
  `)

  // ── 2. Add scalar columns to pages ─────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "courses_landing_content_hero_tagline"        varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_hero_title"           varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_hero_subtitle"        varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_hero_cta_label"       varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_hero_cta_url"         varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_what_to_expect_title" varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_path_strip_title"     varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_path_strip_body"      varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_testimonials_title"   varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_cta_title"            varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_cta_body"             varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_cta_primary_label"    varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_cta_primary_url"      varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_cta_secondary_label"  varchar,
      ADD COLUMN IF NOT EXISTS "courses_landing_content_cta_secondary_url"    varchar;
  `)

  // ── 3. Add scalar columns to _pages_v ──────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_hero_tagline"        varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_hero_title"           varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_hero_subtitle"        varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_hero_cta_label"       varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_hero_cta_url"         varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_what_to_expect_title" varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_path_strip_title"     varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_path_strip_body"      varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_testimonials_title"   varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_cta_title"            varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_cta_body"             varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_cta_primary_label"    varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_cta_primary_url"      varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_cta_secondary_label"  varchar,
      ADD COLUMN IF NOT EXISTS "version_courses_landing_content_cta_secondary_url"    varchar;
  `)

  // ── 4. What to Expect Items array (pages) ──────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_courses_landing_content_what_to_expect_items" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "description" varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_courses_landing_content_what_to_expect_items"
        ADD CONSTRAINT "pages_courses_landing_content_what_to_expect_items_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 5. What to Expect Items array (_pages_v) ───────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_courses_landing_content_what_to_expect_items" (
      "id"          serial PRIMARY KEY NOT NULL,
      "_uuid"       varchar,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "description" varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_version_courses_landing_content_what_to_expect_items"
        ADD CONSTRAINT "_pages_v_version_courses_landing_content_what_to_expect_items_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 6. Course Cards array (pages) ──────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_courses_landing_content_course_cards" (
      "id"           varchar PRIMARY KEY NOT NULL,
      "_order"       integer NOT NULL,
      "_parent_id"   integer NOT NULL,
      "title"        varchar,
      "course_type"  varchar,
      "format"       varchar,
      "level"        varchar,
      "description"  varchar,
      "external_url" varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_courses_landing_content_course_cards"
        ADD CONSTRAINT "pages_courses_landing_content_course_cards_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 7. Course Cards array (_pages_v) ───────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_courses_landing_content_course_cards" (
      "id"           serial PRIMARY KEY NOT NULL,
      "_uuid"        varchar,
      "_order"       integer NOT NULL,
      "_parent_id"   integer NOT NULL,
      "title"        varchar,
      "course_type"  varchar,
      "format"       varchar,
      "level"        varchar,
      "description"  varchar,
      "external_url" varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_version_courses_landing_content_course_cards"
        ADD CONSTRAINT "_pages_v_version_courses_landing_content_course_cards_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 8. Testimonials array (pages) ──────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_courses_landing_content_testimonials" (
      "id"         varchar PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "quote"      varchar,
      "name"       varchar,
      "course"     varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_courses_landing_content_testimonials"
        ADD CONSTRAINT "pages_courses_landing_content_testimonials_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 9. Testimonials array (_pages_v) ───────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_courses_landing_content_testimonials" (
      "id"         serial PRIMARY KEY NOT NULL,
      "_uuid"      varchar,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "quote"      varchar,
      "name"       varchar,
      "course"     varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_version_courses_landing_content_testimonials"
        ADD CONSTRAINT "_pages_v_version_courses_landing_content_testimonials_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "pages_courses_landing_content_what_to_expect_items";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_courses_landing_content_what_to_expect_items";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_courses_landing_content_course_cards";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_courses_landing_content_course_cards";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_courses_landing_content_testimonials";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_courses_landing_content_testimonials";`)
}
