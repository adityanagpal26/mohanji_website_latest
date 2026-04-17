import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Status enum ────────────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_annual_reports_status" AS ENUM ('published', 'draft');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // ── 2. annual_reports table ───────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "annual_reports" (
      "id"           serial PRIMARY KEY NOT NULL,
      "title"        varchar NOT NULL,
      "year"         integer NOT NULL,
      "description"  varchar,
      "file_id"      integer,
      "cover_image_id" integer,
      "status"       "public"."enum_annual_reports_status" DEFAULT 'published',
      "updated_at"   timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at"   timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // ── 3. FK: file → media ───────────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "annual_reports"
        ADD CONSTRAINT "annual_reports_file_id_fk"
        FOREIGN KEY ("file_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // ── 4. FK: coverImage → media ─────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "annual_reports"
        ADD CONSTRAINT "annual_reports_cover_image_id_fk"
        FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // ── 5. Register collection in payload_locked_documents_rels ───────────────
  // Every new collection needs an FK column in the document-locking join table
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "annual_reports_id" integer;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_annual_reports_id_fk"
        FOREIGN KEY ("annual_reports_id") REFERENCES "annual_reports"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "annual_reports";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_annual_reports_status";`)
}
