import type { Payload } from 'payload'
import { Pool } from 'pg'

/**
 * Upload an image to the Payload media collection.
 * Tries to download the image first; falls back to storing the CDN URL directly
 * in the database (useful when the CDN blocks server-side downloads).
 */
export async function upsertMedia(
  payload: Payload,
  pool: Pool,
  imageUrl: string,
  alt: string,
): Promise<number | null> {
  // 1. Try to download and upload through Payload (stores locally or in S3)
  try {
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://mohanji.org/',
        Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(12000),
    })
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer())
      const mimeType = res.headers.get('content-type') ?? 'image/jpeg'
      const filename = imageUrl.split('/').pop()?.split('?')[0] ?? 'image.jpg'
      const media = await payload.create({
        collection: 'media',
        data: { alt },
        file: { data: buffer, mimetype: mimeType, name: filename, size: buffer.length },
      })
      return media.id as number
    }
  } catch {
    // fall through to SQL fallback
  }

  // 2. Fallback: insert the CDN URL directly into the media table.
  //    The image will be served from the original CDN — acceptable for staging/production
  //    until a proper media migration is done.
  try {
    const filename = imageUrl.split('/').pop()?.split('?')[0] ?? 'image.jpg'
    const ext = filename.split('.').pop()?.toLowerCase() ?? 'jpg'
    const mimeMap: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg',
      png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml',
    }
    const mime = mimeMap[ext] ?? 'image/jpeg'
    const result = await pool.query(
      `INSERT INTO media (alt, url, filename, mime_type, filesize, width, height, updated_at, created_at)
       VALUES ($1, $2, $3, $4, 0, 1200, 800, NOW(), NOW())
       ON CONFLICT DO NOTHING RETURNING id`,
      [alt, imageUrl, filename, mime],
    )
    if (result.rows[0]) return result.rows[0].id as number
    const existing = await pool.query('SELECT id FROM media WHERE url = $1 LIMIT 1', [imageUrl])
    return existing.rows[0]?.id ?? null
  } catch (e) {
    console.error('[seed] Media insert failed:', imageUrl, e)
    return null
  }
}
