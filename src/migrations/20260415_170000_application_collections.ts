import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Create mai_tri_applications table ──────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "mai_tri_applications" (
      "id"                           serial PRIMARY KEY NOT NULL,
      "status"                       varchar DEFAULT 'new',
      "full_name"                    varchar NOT NULL,
      "email"                        varchar NOT NULL,
      "phone"                        varchar,
      "date_of_birth"                varchar,
      "country"                      varchar,
      "city"                         varchar,
      "mohanji_connection"           varchar,
      "years_with_mohanji"           varchar,
      "attended_retreats"            varchar,
      "practices_followed"           varchar,
      "meditation_practice"          varchar,
      "dietary_practice"             varchar,
      "smoking_alcohol"              varchar,
      "health_conditions"            varchar,
      "hours_per_week"               varchar,
      "session_mode"                 varchar,
      "languages"                    varchar,
      "why_mai_tri"                  varchar,
      "inner_motivation"             varchar,
      "previous_healing_experience"  varchar,
      "signature_date"               varchar,
      "signature_place"              varchar,
      "signature_name"               varchar,
      "updated_at"                   timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at"                   timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // ── 2. Create kriya_applications table ────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "kriya_applications" (
      "id"               serial PRIMARY KEY NOT NULL,
      "status"           varchar DEFAULT 'new',
      "full_name"        varchar NOT NULL,
      "phone"            varchar,
      "gender"           varchar,
      "country"          varchar,
      "age"              numeric,
      "email"            varchar NOT NULL,
      "needs_assistance" varchar,
      "updated_at"       timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at"       timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // ── 3. Add apply page fields to practices ────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "practices"
      ADD COLUMN IF NOT EXISTS "apply_page_title" varchar,
      ADD COLUMN IF NOT EXISTS "apply_page_intro"  varchar,
      ADD COLUMN IF NOT EXISTS "apply_form_email"  varchar;
  `)

  // ── 4. Add apply page fields to pages (maiTriContent group) ─────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "mai_tri_content_apply_page_title" varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_apply_page_intro"  varchar,
      ADD COLUMN IF NOT EXISTS "mai_tri_content_apply_form_email"  varchar;
  `)

  // ── 5. Same columns on _pages_v ───────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_apply_page_title" varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_apply_page_intro"  varchar,
      ADD COLUMN IF NOT EXISTS "version_mai_tri_content_apply_form_email"  varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "mai_tri_applications";`)
  await db.execute(sql`DROP TABLE IF EXISTS "kriya_applications";`)

  await db.execute(sql`
    ALTER TABLE "practices"
      DROP COLUMN IF EXISTS "apply_page_title",
      DROP COLUMN IF EXISTS "apply_page_intro",
      DROP COLUMN IF EXISTS "apply_form_email";
  `)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "mai_tri_content_apply_page_title",
      DROP COLUMN IF EXISTS "mai_tri_content_apply_page_intro",
      DROP COLUMN IF EXISTS "mai_tri_content_apply_form_email";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_mai_tri_content_apply_page_title",
      DROP COLUMN IF EXISTS "version_mai_tri_content_apply_page_intro",
      DROP COLUMN IF EXISTS "version_mai_tri_content_apply_form_email";
  `)
}
