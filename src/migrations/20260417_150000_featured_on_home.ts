import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds `featured_on_home` boolean column to:
 *   - events          — to CMS-select which events appear on the home page
 *   - posts           — to CMS-select which posts appear in the Media section on home
 *   - _posts_v        — version shadow table must mirror posts
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // events
  await db.execute(sql`
    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "featured_on_home" boolean DEFAULT false;
  `)

  // posts (current + versioned)
  await db.execute(sql`
    ALTER TABLE "posts"
      ADD COLUMN IF NOT EXISTS "featured_on_home" boolean DEFAULT false;
  `)

  await db.execute(sql`
    ALTER TABLE "_posts_v"
      ADD COLUMN IF NOT EXISTS "version_featured_on_home" boolean DEFAULT false;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "events" DROP COLUMN IF EXISTS "featured_on_home";`)
  await db.execute(sql`ALTER TABLE "posts" DROP COLUMN IF EXISTS "featured_on_home";`)
  await db.execute(sql`ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_featured_on_home";`)
}
