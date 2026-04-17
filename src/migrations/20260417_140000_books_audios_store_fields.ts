import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Add series + format columns to books ───────────────────────────────
  await db.execute(sql`
    ALTER TABLE "books"
      ADD COLUMN IF NOT EXISTS "series"  varchar,
      ADD COLUMN IF NOT EXISTS "format"  varchar;
  `)

  // ── 2. books_store_links array table ─────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "books_store_links" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "platform"    varchar,
      "url"         varchar,
      "label"       varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "books_store_links"
        ADD CONSTRAINT "books_store_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "books"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // ── 3. audios_tracks array table ──────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "audios_tracks" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "duration"    varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "audios_tracks"
        ADD CONSTRAINT "audios_tracks_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "audios"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // ── 4. audios_store_links array table ─────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "audios_store_links" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "platform"    varchar,
      "url"         varchar,
      "label"       varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "audios_store_links"
        ADD CONSTRAINT "audios_store_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "audios"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "books_store_links";`)
  await db.execute(sql`DROP TABLE IF EXISTS "audios_tracks";`)
  await db.execute(sql`DROP TABLE IF EXISTS "audios_store_links";`)
  await db.execute(sql`
    ALTER TABLE "books"
      DROP COLUMN IF EXISTS "series",
      DROP COLUMN IF EXISTS "format";
  `)
}
