import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Drop old richText (jsonb) columns from practices ───────────────────
  await db.execute(sql`
    ALTER TABLE "practices"
      DROP COLUMN IF EXISTS "benefits",
      DROP COLUMN IF EXISTS "how_it_works";
  `)

  // ── 2. Add new scalar columns to practices ────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "practices"
      ADD COLUMN IF NOT EXISTS "tagline"                varchar,
      ADD COLUMN IF NOT EXISTS "category"               varchar,
      ADD COLUMN IF NOT EXISTS "duration"               varchar,
      ADD COLUMN IF NOT EXISTS "youtube_url"            varchar,
      ADD COLUMN IF NOT EXISTS "primary_cta_label"      varchar,
      ADD COLUMN IF NOT EXISTS "primary_cta_url"        varchar,
      ADD COLUMN IF NOT EXISTS "brochure_url"           varchar,
      ADD COLUMN IF NOT EXISTS "show_contact_form"      boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "contact_email"          varchar,
      ADD COLUMN IF NOT EXISTS "show_newsletter_form"   boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "newsletter_label"       varchar,
      ADD COLUMN IF NOT EXISTS "is_external_practice"   boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "external_page_url"      varchar;
  `)

  // ── 3. Create practices_benefits array table ──────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "practices_benefits" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "benefit"    varchar NOT NULL
    );
  `)
  await db.execute(sql`
    ALTER TABLE "practices_benefits"
      ADD CONSTRAINT "practices_benefits_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "practices"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // ── 4. Create practices_how_it_works array table ──────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "practices_how_it_works" (
      "_order"     integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id"         varchar PRIMARY KEY NOT NULL,
      "step"       varchar NOT NULL
    );
  `)
  await db.execute(sql`
    ALTER TABLE "practices_how_it_works"
      ADD CONSTRAINT "practices_how_it_works_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "practices"("id") ON DELETE cascade ON UPDATE no action;
  `)

  // ── 5. Add 'practices-listing' to the pages pageType enum ─────────────────
  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_page_type"
    ADD VALUE IF NOT EXISTS 'practices-listing';
  `)
  await db.execute(sql`
    ALTER TYPE "public"."enum__pages_v_version_page_type"
    ADD VALUE IF NOT EXISTS 'practices-listing';
  `)

  // ── 6. Add practicesListingContent columns to pages ───────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "practices_listing_content_hero_title"      varchar,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_hero_subtitle"    varchar,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_hero_image_id"    integer,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_intro_text"       varchar,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_cta_heading"      varchar,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_cta_text"         varchar,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_cta_link_label"   varchar,
      ADD COLUMN IF NOT EXISTS "practices_listing_content_cta_link_url"     varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD CONSTRAINT "pages_practices_listing_content_hero_image_id_media_id_fk"
      FOREIGN KEY ("practices_listing_content_hero_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
  `)

  // ── 7. Same columns on _pages_v (versions/drafts) ─────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_hero_title"      varchar,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_hero_subtitle"    varchar,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_hero_image_id"    integer,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_intro_text"       varchar,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_cta_heading"      varchar,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_cta_text"         varchar,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_cta_link_label"   varchar,
      ADD COLUMN IF NOT EXISTS "version_practices_listing_content_cta_link_url"     varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD CONSTRAINT "_pages_v_version_practices_listing_content_hero_image_id_media_id_fk"
      FOREIGN KEY ("version_practices_listing_content_hero_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "practices_benefits";`)
  await db.execute(sql`DROP TABLE IF EXISTS "practices_how_it_works";`)

  await db.execute(sql`
    ALTER TABLE "practices"
      DROP COLUMN IF EXISTS "tagline",
      DROP COLUMN IF EXISTS "category",
      DROP COLUMN IF EXISTS "duration",
      DROP COLUMN IF EXISTS "youtube_url",
      DROP COLUMN IF EXISTS "primary_cta_label",
      DROP COLUMN IF EXISTS "primary_cta_url",
      DROP COLUMN IF EXISTS "brochure_url",
      DROP COLUMN IF EXISTS "show_contact_form",
      DROP COLUMN IF EXISTS "contact_email",
      DROP COLUMN IF EXISTS "show_newsletter_form",
      DROP COLUMN IF EXISTS "newsletter_label",
      DROP COLUMN IF EXISTS "is_external_practice",
      DROP COLUMN IF EXISTS "external_page_url";
  `)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "practices_listing_content_hero_title",
      DROP COLUMN IF EXISTS "practices_listing_content_hero_subtitle",
      DROP COLUMN IF EXISTS "practices_listing_content_hero_image_id",
      DROP COLUMN IF EXISTS "practices_listing_content_intro_text",
      DROP COLUMN IF EXISTS "practices_listing_content_cta_heading",
      DROP COLUMN IF EXISTS "practices_listing_content_cta_text",
      DROP COLUMN IF EXISTS "practices_listing_content_cta_link_label",
      DROP COLUMN IF EXISTS "practices_listing_content_cta_link_url";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_practices_listing_content_hero_title",
      DROP COLUMN IF EXISTS "version_practices_listing_content_hero_subtitle",
      DROP COLUMN IF EXISTS "version_practices_listing_content_hero_image_id",
      DROP COLUMN IF EXISTS "version_practices_listing_content_intro_text",
      DROP COLUMN IF EXISTS "version_practices_listing_content_cta_heading",
      DROP COLUMN IF EXISTS "version_practices_listing_content_cta_text",
      DROP COLUMN IF EXISTS "version_practices_listing_content_cta_link_label",
      DROP COLUMN IF EXISTS "version_practices_listing_content_cta_link_url";
  `)

  // Note: PostgreSQL does not support removing enum values — down is a no-op for enums
}
