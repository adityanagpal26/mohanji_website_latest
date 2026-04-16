import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 0. Add enum values ────────────────────────────────────────────────────
  await db.execute(sql`ALTER TYPE "enum_pages_page_type" ADD VALUE IF NOT EXISTS 'volunteer'`)
  await db.execute(sql`ALTER TYPE "enum__pages_v_version_page_type" ADD VALUE IF NOT EXISTS 'volunteer'`)

  // ── 1. Scalar columns on pages ────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "volunteer_content_hero_title"          varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_hero_subtitle"       varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_hero_image_id"       integer,
      ADD COLUMN IF NOT EXISTS "volunteer_content_why_section_title"   varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_why_section_text"    varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_pull_quote"          varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_opportunities_title" varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_join_button_label"   varchar,
      ADD COLUMN IF NOT EXISTS "volunteer_content_join_button_url"     varchar;
  `)

  // ── 2. FK constraints on pages (idempotent) ───────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_vol_hero_image_fk"
          FOREIGN KEY ("volunteer_content_hero_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 3. Opportunities array table ──────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_volunteer_content_opportunities" (
      "id"         varchar PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "role"       varchar NOT NULL,
      CONSTRAINT "pages_vol_opportunities_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)

  // ── 4. Scalar columns on _pages_v ─────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_hero_title"          varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_hero_subtitle"       varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_hero_image_id"       integer,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_why_section_title"   varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_why_section_text"    varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_pull_quote"          varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_opportunities_title" varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_join_button_label"   varchar,
      ADD COLUMN IF NOT EXISTS "version_volunteer_content_join_button_url"     varchar;
  `)

  // ── 5. Version opportunities array table ──────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_volunteer_content_opportunities" (
      "id"         serial PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "role"       varchar NOT NULL,
      "_uuid"      varchar,
      CONSTRAINT "_pages_v_vol_opportunities_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_volunteer_content_opportunities";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_volunteer_content_opportunities";`)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_volunteer_content_hero_title",
      DROP COLUMN IF EXISTS "version_volunteer_content_hero_subtitle",
      DROP COLUMN IF EXISTS "version_volunteer_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_volunteer_content_why_section_title",
      DROP COLUMN IF EXISTS "version_volunteer_content_why_section_text",
      DROP COLUMN IF EXISTS "version_volunteer_content_pull_quote",
      DROP COLUMN IF EXISTS "version_volunteer_content_opportunities_title",
      DROP COLUMN IF EXISTS "version_volunteer_content_join_button_label",
      DROP COLUMN IF EXISTS "version_volunteer_content_join_button_url";
  `)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "volunteer_content_hero_title",
      DROP COLUMN IF EXISTS "volunteer_content_hero_subtitle",
      DROP COLUMN IF EXISTS "volunteer_content_hero_image_id",
      DROP COLUMN IF EXISTS "volunteer_content_why_section_title",
      DROP COLUMN IF EXISTS "volunteer_content_why_section_text",
      DROP COLUMN IF EXISTS "volunteer_content_pull_quote",
      DROP COLUMN IF EXISTS "volunteer_content_opportunities_title",
      DROP COLUMN IF EXISTS "volunteer_content_join_button_label",
      DROP COLUMN IF EXISTS "volunteer_content_join_button_url";
  `)
  // Note: PostgreSQL does not support removing enum values
}
