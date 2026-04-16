import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 0. Add enum values ────────────────────────────────────────────────────
  await db.execute(sql`ALTER TYPE "enum_pages_page_type" ADD VALUE IF NOT EXISTS 'awakening-yoga-nidra'`)
  await db.execute(sql`ALTER TYPE "enum__pages_v_version_page_type" ADD VALUE IF NOT EXISTS 'awakening-yoga-nidra'`)

  // ── 1. Scalar columns on pages ────────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_hero_title"            varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_tagline"               varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_hero_image_id"         integer,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_intro_text"            varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_devi_mohan_url"        varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_why_section_title"     varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_why_section_text"      varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_why_section_image_id"  integer,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_hsty_url"              varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_download_meditation_url" varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_benefits_section_title" varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_benefits_text"         varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_cta_label"             varchar,
      ADD COLUMN IF NOT EXISTS "awakening_yoga_nidra_content_cta_url"               varchar;
  `)

  // ── 2. FK constraints on pages (idempotent) ───────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_ayn_hero_image_fk"
          FOREIGN KEY ("awakening_yoga_nidra_content_hero_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_ayn_why_image_fk"
          FOREIGN KEY ("awakening_yoga_nidra_content_why_section_image_id") REFERENCES "media"("id")
          ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 3. benefitsList array table ───────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_awakening_yoga_nidra_content_benefits_list" (
      "id"         varchar PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "benefit"    varchar NOT NULL,
      CONSTRAINT "pages_ayn_benefits_list_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)

  // ── 4. Scalar columns on _pages_v ─────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_hero_title"            varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_tagline"               varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_hero_image_id"         integer,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_intro_text"            varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_devi_mohan_url"        varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_why_section_title"     varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_why_section_text"      varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_why_section_image_id"  integer,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_hsty_url"              varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_download_meditation_url" varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_benefits_section_title" varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_benefits_text"         varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_cta_label"             varchar,
      ADD COLUMN IF NOT EXISTS "version_awakening_yoga_nidra_content_cta_url"               varchar;
  `)

  // ── 5. Version benefitsList array table (serial PK + _uuid required) ─────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_awakening_yoga_nidra_content_benefits_list" (
      "id"         serial PRIMARY KEY NOT NULL,
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "benefit"    varchar NOT NULL,
      "_uuid"      varchar,
      CONSTRAINT "_pages_v_ayn_benefits_list_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id")
        ON DELETE cascade ON UPDATE no action
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_awakening_yoga_nidra_content_benefits_list";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_awakening_yoga_nidra_content_benefits_list";`)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_hero_title",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_tagline",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_intro_text",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_devi_mohan_url",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_why_section_title",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_why_section_text",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_why_section_image_id",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_hsty_url",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_download_meditation_url",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_benefits_section_title",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_benefits_text",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_cta_label",
      DROP COLUMN IF EXISTS "version_awakening_yoga_nidra_content_cta_url";
  `)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_hero_title",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_tagline",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_hero_image_id",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_intro_text",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_devi_mohan_url",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_why_section_title",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_why_section_text",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_why_section_image_id",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_hsty_url",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_download_meditation_url",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_benefits_section_title",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_benefits_text",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_cta_label",
      DROP COLUMN IF EXISTS "awakening_yoga_nidra_content_cta_url";
  `)
  // Note: PostgreSQL does not support removing enum values
}
