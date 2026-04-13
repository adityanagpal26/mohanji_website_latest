/**
 * migrate-media.ts
 *
 * Downloads WordPress media files and re-uploads them to Payload CMS.
 * Saves a WP ID → Payload ID mapping to scripts/media-id-map.json so other
 * scripts can patch their references.
 *
 * Usage:
 *   npx tsx scripts/migrate-media.ts           # process all items
 *   npx tsx scripts/migrate-media.ts --limit 10 # test with first 10 items
 *
 * Prerequisites:
 *   - Payload dev server running on http://localhost:3000
 *   - Run migrate-wp-rest.ts first so that scripts/wp-media-list.json exists,
 *     OR the script will fetch media metadata directly from WordPress.
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'
import { URL } from 'url'

// ─── Config ───────────────────────────────────────────────────────────────────

const PAYLOAD_API  = 'http://localhost:3000/api'
const WP_API       = 'https://mohanji.org/wp-json'

const ID_MAP_PATH      = path.resolve(__dirname, 'media-id-map.json')
const WP_MEDIA_LIST    = path.resolve(__dirname, 'wp-media-list.json')

const RATE_LIMIT_MS    = 150   // ms between uploads
const DOWNLOAD_TIMEOUT = 30_000 // 30 s per file

// ─── Types ────────────────────────────────────────────────────────────────────

interface WpMediaItem {
  id: number
  source_url: string
  alt_text: string
  title: { rendered: string } | string
  mime_type: string
}

type MediaIdMap = Record<string, string> // wpId (string) → payloadId

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
}

function loadIdMap(): MediaIdMap {
  if (fs.existsSync(ID_MAP_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(ID_MAP_PATH, 'utf-8')) as MediaIdMap
    } catch {
      return {}
    }
  }
  return {}
}

function saveIdMap(map: MediaIdMap): void {
  fs.writeFileSync(ID_MAP_PATH, JSON.stringify(map, null, 2))
}

/** Derive a safe filename from a URL */
function fileNameFromUrl(sourceUrl: string): string {
  try {
    const u = new URL(sourceUrl)
    const base = path.basename(u.pathname)
    // Keep only safe characters
    return base.replace(/[^a-zA-Z0-9._-]/g, '_') || 'media-file'
  } catch {
    return 'media-file'
  }
}

/** Infer MIME type from extension when not provided */
function mimeFromFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const MAP: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
  }
  return MAP[ext] || 'application/octet-stream'
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  console.log('  Authenticating with Payload...')
  const res = await fetch(`${PAYLOAD_API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@mohanji.org',
      password: 'Mohanji@2026',
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Login failed (${res.status}): ${text}`)
  }
  const data = (await res.json()) as any
  if (!data.token) throw new Error('No token in login response')
  console.log('  Authenticated successfully.')
  return data.token as string
}

// ─── Download ─────────────────────────────────────────────────────────────────

/**
 * Download a remote file and return it as a Buffer.
 * Uses http/https built-in modules (streams) to avoid memory issues on large files.
 */
function downloadFile(sourceUrl: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = sourceUrl.startsWith('https') ? https : http
    const timer = setTimeout(
      () => reject(new Error(`Download timeout: ${sourceUrl}`)),
      DOWNLOAD_TIMEOUT,
    )

    const doRequest = (url: string, redirectCount = 0): void => {
      if (redirectCount > 5) {
        clearTimeout(timer)
        return reject(new Error(`Too many redirects: ${sourceUrl}`))
      }
      protocol.get(url, (response) => {
        // Follow redirects
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          doRequest(response.headers.location, redirectCount + 1)
          return
        }

        if (response.statusCode && response.statusCode >= 400) {
          clearTimeout(timer)
          return reject(
            new Error(
              `HTTP ${response.statusCode} downloading ${url}`,
            ),
          )
        }

        const chunks: Buffer[] = []
        response.on('data', (chunk: Buffer) => chunks.push(chunk))
        response.on('end', () => {
          clearTimeout(timer)
          resolve(Buffer.concat(chunks))
        })
        response.on('error', (err) => {
          clearTimeout(timer)
          reject(err)
        })
      }).on('error', (err) => {
        clearTimeout(timer)
        reject(err)
      })
    }

    doRequest(sourceUrl)
  })
}

// ─── Upload ───────────────────────────────────────────────────────────────────

/**
 * Upload a Buffer to Payload /api/media using multipart/form-data.
 * Node 18+ has FormData and Blob globally available.
 */
async function uploadToPayload(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  altText: string,
  token: string,
): Promise<string> {
  const formData = new FormData()

  // Attach file as Blob (cast to ArrayBuffer to satisfy strict TS Buffer compat)
  const blob = new Blob([buffer as unknown as ArrayBuffer], { type: mimeType })
  formData.append('file', blob, filename)

  // Attach metadata fields as JSON string (Payload expects `_payload` key)
  formData.append(
    '_payload',
    JSON.stringify({ alt: altText || filename }),
  )

  const res = await fetch(`${PAYLOAD_API}/media`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
      // Do NOT set Content-Type — the browser/fetch sets it automatically with
      // the multipart boundary when using FormData.
    },
    body: formData,
  })

  const data = (await res.json()) as any

  if (!res.ok) {
    throw new Error(
      `Upload failed (${res.status}): ${JSON.stringify(data.errors || data.message || data)}`,
    )
  }

  const payloadId = data.doc?.id ?? data.id
  if (!payloadId) {
    throw new Error(`Upload succeeded but no ID returned: ${JSON.stringify(data)}`)
  }
  return payloadId as string
}

// ─── Fetch media list ─────────────────────────────────────────────────────────

async function fetchMediaList(): Promise<WpMediaItem[]> {
  // Prefer the file written by migrate-wp-rest.ts
  if (fs.existsSync(WP_MEDIA_LIST)) {
    console.log(`  Loading media list from ${WP_MEDIA_LIST}`)
    return JSON.parse(fs.readFileSync(WP_MEDIA_LIST, 'utf-8')) as WpMediaItem[]
  }

  console.log(`  ${WP_MEDIA_LIST} not found — fetching from WordPress REST API...`)
  const all: WpMediaItem[] = []
  let page = 1

  while (true) {
    const url = `${WP_API}/wp/v2/media?per_page=100&page=${page}`
    let res: Response
    try {
      res = await fetch(url, {
        headers: { 'User-Agent': 'Mohanji-Migration/1.0' },
      })
    } catch (err: any) {
      console.warn(`  ⚠ Could not fetch media page ${page}: ${err.message}`)
      break
    }
    if (!res.ok || res.status === 400) break
    const data = (await res.json()) as WpMediaItem[]
    if (!Array.isArray(data) || data.length === 0) break
    all.push(...data)
    const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '0')
    if (totalPages > 0 && page >= totalPages) break
    if (data.length < 100) break
    page++
    await sleep(200)
  }

  console.log(`  Fetched ${all.length} media items from WordPress.`)
  return all
}

// ─── CLI argument parsing ─────────────────────────────────────────────────────

function parseArgs(): { limit: number | null } {
  const args = process.argv.slice(2)
  const limitIdx = args.indexOf('--limit')
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    const n = parseInt(args[limitIdx + 1], 10)
    if (!isNaN(n) && n > 0) return { limit: n }
  }
  return { limit: null }
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║       Mohanji — WordPress Media Downloader & Uploader    ║')
  console.log('╚══════════════════════════════════════════════════════════╝')

  const { limit } = parseArgs()
  if (limit) console.log(`\n  ⚙ Running in test mode — processing first ${limit} item(s).`)

  let token: string
  try {
    token = await login()
  } catch (err: any) {
    console.error(`\n✗ Authentication failed: ${err.message}`)
    process.exit(1)
  }

  // Load existing ID map to allow resuming interrupted runs
  const idMap = loadIdMap()
  const alreadyProcessed = Object.keys(idMap).length
  if (alreadyProcessed > 0) {
    console.log(`\n  ↺ Resuming — ${alreadyProcessed} item(s) already in media-id-map.json`)
  }

  let allMedia = await fetchMediaList()

  if (limit !== null) {
    allMedia = allMedia.slice(0, limit)
  }

  const toProcess = allMedia.filter((m) => !idMap[String(m.id)])
  console.log(`\n  Total items  : ${allMedia.length}`)
  console.log(`  Already done : ${alreadyProcessed}`)
  console.log(`  To process   : ${toProcess.length}\n`)

  if (toProcess.length === 0) {
    console.log('  Nothing to do. Exiting.')
    return
  }

  let success = 0
  let failed = 0
  let skipped = 0

  for (let i = 0; i < toProcess.length; i++) {
    const item = toProcess[i]
    const titleRaw =
      typeof item.title === 'string'
        ? item.title
        : item.title?.rendered || ''
    const altText = item.alt_text || stripHtml(titleRaw)
    const filename = fileNameFromUrl(item.source_url)
    const mimeType = item.mime_type || mimeFromFilename(filename)

    const progress = `[${String(i + 1).padStart(4)}/${toProcess.length}]`
    process.stdout.write(`  ${progress} ${filename.slice(0, 50).padEnd(50)} `)

    // Skip non-uploadable types (e.g. video/mpeg — large; keep only images+pdf+audio)
    if (
      !mimeType.startsWith('image/') &&
      !mimeType.startsWith('audio/') &&
      mimeType !== 'application/pdf'
    ) {
      console.log(`SKIP (${mimeType})`)
      idMap[String(item.id)] = '__skipped__'
      skipped++
      saveIdMap(idMap) // persist after each item
      continue
    }

    try {
      // 1. Download
      const buffer = await downloadFile(item.source_url)
      process.stdout.write(`⬇ ${(buffer.length / 1024).toFixed(0).padStart(6)} KB  `)

      // 2. Upload
      const payloadId = await uploadToPayload(
        buffer,
        filename,
        mimeType,
        altText,
        token,
      )
      idMap[String(item.id)] = payloadId
      saveIdMap(idMap) // persist after each item (crash-safe)

      console.log(`✓ ${payloadId}`)
      success++
    } catch (err: any) {
      console.log(`✗ ${err.message.slice(0, 80)}`)
      failed++
      // Still record failure so we can optionally skip on re-run
      idMap[String(item.id)] = '__failed__'
      saveIdMap(idMap)
    }

    await sleep(RATE_LIMIT_MS)
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n──────────────────────────────────────────────────────────')
  console.log('Media migration complete.')
  console.log(`  ✓ Uploaded : ${success}`)
  console.log(`  ⊘ Skipped  : ${skipped}`)
  console.log(`  ✗ Failed   : ${failed}`)
  console.log(`\n  ID map saved to: ${ID_MAP_PATH}`)
  console.log('──────────────────────────────────────────────────────────')

  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error('\n✗ Unhandled error:', err)
  process.exit(1)
})
