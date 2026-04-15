import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Add 'mai-tri-method' to pages pageType enum ────────────────────────
  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_page_type"
    ADD VALUE IF NOT EXISTS 'mai-tri-method';
  `)
  await db.execute(sql`
    ALTER TYPE "public"."enum__pages_v_version_page_type"
    ADD VALUE IF NOT EXISTS 'mai-tri-method';
  `)

  // ── 2. Add scalar maiTriContent columns to pages ──────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "mai_tri_content_hero_title"              varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_hero_subtitle"           varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_hero_image_id"           integer,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_apply_now_url"           varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_brochure_url"            varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_intro_text"              varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_youtube_url"             varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_meaning_text"            varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_meaning_image_id"        integer,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_mohanji_quote"           varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_benefits_intro"          varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_benefits_extra"          varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_individual_session_text" varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_group_session_text"      varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_energy_exchange_text"    varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_booking_text"            varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_booking_form_email"      varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD CONSTRAINT "pages_mai_tri_content_hero_image_id_media_id_fk"
        FOREIGN KEY ("mai_tri_content_hero_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action,
      ADD CONSTRAINT "pages_mai_tri_content_meaning_image_id_media_id_fk"
        FOREIGN KEY ("mai_tri_content_meaning_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
  `)

  // ── 3. Same columns on _pages_v ───────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_hero_title"              varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_hero_subtitle"           varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_hero_image_id"           integer,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_apply_now_url"           varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_brochure_url"            varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_intro_text"              varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_youtube_url"             varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_meaning_text"            varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_meaning_image_id"        integer,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_mohanji_quote"           varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_benefits_intro"          varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_benefits_extra"          varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_individual_session_text" varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_group_session_text"      varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_energy_exchange_text"    varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_booking_text"            varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_booking_form_email"      varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD CONSTRAINT "_pages_v_version_mai_tri_content_hero_image_id_media_id_fk"
        FOREIGN KEY ("version_mai_tri_content_hero_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action,
      ADD CONSTRAINT "_pages_v_version_mai_tri_content_meaning_image_id_media_id_fk"
        FOREIGN KEY ("version_mai_tri_content_meaning_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
  `)

  // ── 4. Create pages_mai_tri_content_benefits array table ──────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_mai_tri_content_benefits" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "benefit"    varchar NOT NULL
    );
  `)
  await db.execute(sql`
    ALTER TABLE "pages_mai_tri_content_benefits"
      ADD CONSTRAINT "pages_mai_tri_content_benefits_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // ── 5. Create pages_mai_tri_content_faqs array table ─────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_mai_tri_content_faqs" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "question"   varchar NOT NULL,
      "answer"     varchar NOT NULL
    );
  `)
  await db.execute(sql`
    ALTER TABLE "pages_mai_tri_content_faqs"
      ADD CONSTRAINT "pages_mai_tri_content_faqs_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // ── 6. Create pages_mai_tri_content_testimonials array table ──────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_mai_tri_content_testimonials" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "quote"      varchar NOT NULL,
      "name"       varchar NOT NULL,
      "location"   varchar
    );
  `)
  await db.execute(sql`
    ALTER TABLE "pages_mai_tri_content_testimonials"
      ADD CONSTRAINT "pages_mai_tri_content_testimonials_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // ── 7. Create _pages_v version array tables ────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_mai_tri_content_benefits" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "benefit"    varchar NOT NULL,
      "_uuid"      varchar
    );
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_version_mai_tri_content_benefits"
      ADD CONSTRAINT "_pages_v_version_mai_tri_content_benefits_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_mai_tri_content_faqs" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "question"   varchar NOT NULL,
      "answer"     varchar NOT NULL,
      "_uuid"      varchar
    );
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_version_mai_tri_content_faqs"
      ADD CONSTRAINT "_pages_v_version_mai_tri_content_faqs_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_mai_tri_content_testimonials" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "quote"      varchar NOT NULL,
      "name"       varchar NOT NULL,
      "location"   varchar,
      "_uuid"      varchar
    );
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_version_mai_tri_content_testimonials"
      ADD CONSTRAINT "_pages_v_version_mai_tri_content_testimonials_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "pages_mai_tri_content_benefits";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_mai_tri_content_faqs";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_mai_tri_content_testimonials";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_mai_tri_content_benefits";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_mai_tri_content_faqs";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_mai_tri_content_testimonials";`)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "mai_tri_content_hero_title",
      DROP COLUMN IF EXISTS "mai_tri_content_hero_subtitle",
      DROP COLUMN IF EXISTS "mai_tri_content_hero_image_id",
      DROP COLUMN IF EXISTS "mai_tri_content_apply_now_url",
      DROP COLUMN IF EXISTS "mai_tri_content_brochure_url",
      DROP COLUMN IF EXISTS "mai_tri_content_intro_text",
      DROP COLUMN IF EXISTS "mai_tri_content_youtube_url",
      DROP COLUMN IF EXISTS "mai_tri_content_meaning_text",
      DROP COLUMN IF EXISTS "mai_tri_content_meaning_image_id",
      DROP COLUMN IF EXISTS "mai_tri_content_mohanji_quote",
      DROP COLUMN IF EXISTS "mai_tri_content_benefits_intro",
      DROP COLUMN IF EXISTS "mai_tri_content_benefits_extra",
      DROP COLUMN IF EXISTS "mai_tri_content_individual_session_text",
      DROP COLUMN IF EXISTS "mai_tri_content_group_session_text",
      DROP COLUMN IF EXISTS "mai_tri_content_energy_exchange_text",
      DROP COLUMN IF EXISTS "mai_tri_content_booking_text",
      DROP COLUMN IF EXISTS "mai_tri_content_booking_form_email";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_mai_tri_content_hero_title",
      DROP COLUMN IF EXISTS "version_mai_tri_content_hero_subtitle",
      DROP COLUMN IF EXISTS "version_mai_tri_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_mai_tri_content_apply_now_url",
      DROP COLUMN IF EXISTS "version_mai_tri_content_brochure_url",
      DROP COLUMN IF EXISTS "version_mai_tri_content_intro_text",
      DROP COLUMN IF EXISTS "version_mai_tri_content_youtube_url",
      DROP COLUMN IF EXISTS "version_mai_tri_content_meaning_text",
      DROP COLUMN IF EXISTS "version_mai_tri_content_meaning_image_id",
      DROP COLUMN IF EXISTS "version_mai_tri_content_mohanji_quote",
      DROP COLUMN IF EXISTS "version_mai_tri_content_benefits_intro",
      DROP COLUMN IF EXISTS "version_mai_tri_content_benefits_extra",
      DROP COLUMN IF EXISTS "version_mai_tri_content_individual_session_text",
      DROP COLUMN IF EXISTS "version_mai_tri_content_group_session_text",
      DROP COLUMN IF EXISTS "version_mai_tri_content_energy_exchange_text",
      DROP COLUMN IF EXISTS "version_mai_tri_content_booking_text",
      DROP COLUMN IF EXISTS "version_mai_tri_content_booking_form_email";
  `)
  // Note: PostgreSQL does not support removing enum values
}
