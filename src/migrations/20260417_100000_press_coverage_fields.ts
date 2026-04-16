import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create enum for posts.mediaType
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_media_type" AS ENUM (
        'article', 'podcast', 'tv-coverage', 'video', 'press-release', 'interview'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // Create enum for _posts_v version table
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__posts_v_version_media_type" AS ENUM (
        'article', 'podcast', 'tv-coverage', 'video', 'press-release', 'interview'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // Add new columns to posts
  await db.execute(sql`
    ALTER TABLE "posts"
      ADD COLUMN IF NOT EXISTS "publication_name" varchar,
      ADD COLUMN IF NOT EXISTS "media_type" "public"."enum_posts_media_type",
      ADD COLUMN IF NOT EXISTS "external_url" varchar,
      ADD COLUMN IF NOT EXISTS "embed_code" text;
  `)

  // Add new columns to _posts_v (versioned drafts table)
  await db.execute(sql`
    ALTER TABLE "_posts_v"
      ADD COLUMN IF NOT EXISTS "version_publication_name" varchar,
      ADD COLUMN IF NOT EXISTS "version_media_type" "public"."enum__posts_v_version_media_type",
      ADD COLUMN IF NOT EXISTS "version_external_url" varchar,
      ADD COLUMN IF NOT EXISTS "version_embed_code" text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts"
      DROP COLUMN IF EXISTS "publication_name",
      DROP COLUMN IF EXISTS "media_type",
      DROP COLUMN IF EXISTS "external_url",
      DROP COLUMN IF EXISTS "embed_code";
  `)

  await db.execute(sql`
    ALTER TABLE "_posts_v"
      DROP COLUMN IF EXISTS "version_publication_name",
      DROP COLUMN IF EXISTS "version_media_type",
      DROP COLUMN IF EXISTS "version_external_url",
      DROP COLUMN IF EXISTS "version_embed_code";
  `)

  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_posts_media_type";`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum__posts_v_version_media_type";`)
}
