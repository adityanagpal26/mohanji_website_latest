import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. Add 'media-landing' to the page type enums ───────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum_pages_page_type" ADD VALUE IF NOT EXISTS 'media-landing';
    EXCEPTION WHEN undefined_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum__pages_v_version_page_type" ADD VALUE IF NOT EXISTS 'media-landing';
    EXCEPTION WHEN undefined_object THEN NULL;
    END $$;
  `)

  // ── 2. Add scalar columns to pages ──────────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "media_landing_content_podcast_section_title"    varchar,
      ADD COLUMN IF NOT EXISTS "media_landing_content_podcast_section_subtitle" varchar,
      ADD COLUMN IF NOT EXISTS "media_landing_content_podbean_channel_url"      varchar,
      ADD COLUMN IF NOT EXISTS "media_landing_content_video_section_title"      varchar,
      ADD COLUMN IF NOT EXISTS "media_landing_content_video_section_subtitle"   varchar,
      ADD COLUMN IF NOT EXISTS "media_landing_content_youtube_channel_url"      varchar;
  `)

  // ── 3. Add scalar columns to _pages_v ───────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_media_landing_content_podcast_section_title"    varchar,
      ADD COLUMN IF NOT EXISTS "version_media_landing_content_podcast_section_subtitle" varchar,
      ADD COLUMN IF NOT EXISTS "version_media_landing_content_podbean_channel_url"      varchar,
      ADD COLUMN IF NOT EXISTS "version_media_landing_content_video_section_title"      varchar,
      ADD COLUMN IF NOT EXISTS "version_media_landing_content_video_section_subtitle"   varchar,
      ADD COLUMN IF NOT EXISTS "version_media_landing_content_youtube_channel_url"      varchar;
  `)

  // ── 4. Podcast episodes array table (live) ───────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_media_landing_content_podcasts" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "description" varchar,
      "embed_code"  text
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_media_landing_content_podcasts"
        ADD CONSTRAINT "pages_media_landing_content_podcasts_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 5. Podcast episodes array table (versions) ───────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_media_landing_content_podcasts" (
      "id"          serial PRIMARY KEY NOT NULL,
      "_uuid"       varchar,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "description" varchar,
      "embed_code"  text
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_version_media_landing_content_podcasts"
        ADD CONSTRAINT "_pages_v_version_media_landing_content_podcasts_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 6. Videos array table (live) ─────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_media_landing_content_videos" (
      "id"          varchar PRIMARY KEY NOT NULL,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "description" varchar,
      "embed_code"  text
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_media_landing_content_videos"
        ADD CONSTRAINT "pages_media_landing_content_videos_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ── 7. Videos array table (versions) ─────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_version_media_landing_content_videos" (
      "id"          serial PRIMARY KEY NOT NULL,
      "_uuid"       varchar,
      "_order"      integer NOT NULL,
      "_parent_id"  integer NOT NULL,
      "title"       varchar,
      "description" varchar,
      "embed_code"  text
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_version_media_landing_content_videos"
        ADD CONSTRAINT "_pages_v_version_media_landing_content_videos_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "pages_media_landing_content_podcasts";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_media_landing_content_podcasts";`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_media_landing_content_videos";`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_version_media_landing_content_videos";`)

  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "media_landing_content_podcast_section_title",
      DROP COLUMN IF EXISTS "media_landing_content_podcast_section_subtitle",
      DROP COLUMN IF EXISTS "media_landing_content_podbean_channel_url",
      DROP COLUMN IF EXISTS "media_landing_content_video_section_title",
      DROP COLUMN IF EXISTS "media_landing_content_video_section_subtitle",
      DROP COLUMN IF EXISTS "media_landing_content_youtube_channel_url";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_media_landing_content_podcast_section_title",
      DROP COLUMN IF EXISTS "version_media_landing_content_podcast_section_subtitle",
      DROP COLUMN IF EXISTS "version_media_landing_content_podbean_channel_url",
      DROP COLUMN IF EXISTS "version_media_landing_content_video_section_title",
      DROP COLUMN IF EXISTS "version_media_landing_content_video_section_subtitle",
      DROP COLUMN IF EXISTS "version_media_landing_content_youtube_channel_url";
  `)
}
