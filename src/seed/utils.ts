import type { Payload } from 'payload'
import { Pool } from 'pg'

/**
 * Insert an image reference into the media table using its CDN URL directly.
 * No downloading — the image is served from the original CDN.
 * This is idempotent: returns the existing ID if the URL was already inserted.
 */
export async function upsertMedia(
  payload: Payload,
  pool: Pool,
  imageUrl: string,
  alt: string,
): Promise<number | null> {
  try {
    const filename = imageUrl.split('/').pop()?.split('?')[0] ?? 'image.jpg'
    const ext = filename.split('.').pop()?.toLowerCase() ?? 'jpg'
    const mimeMap: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg',
      png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml',
    }
    const mime = mimeMap[ext] ?? 'image/jpeg'

    // Insert or ignore if filename already exists (media_filename_idx is the unique constraint)
    const result = await pool.query(
      `INSERT INTO media (alt, url, filename, mime_type, filesize, width, height, updated_at, created_at)
       VALUES ($1, $2, $3, $4, 0, 1200, 800, NOW(), NOW())
       ON CONFLICT (filename) DO NOTHING RETURNING id`,
      [alt, imageUrl, filename, mime],
    )
    if (result.rows[0]) return result.rows[0].id as number

    // Already exists — look it up
    const existing = await pool.query('SELECT id FROM media WHERE url = $1 LIMIT 1', [imageUrl])
    return existing.rows[0]?.id ?? null
  } catch (e) {
    console.error('[seed] Media insert failed:', imageUrl, e)
    return null
  }
}
