/**
 * migrate-wp-rest.ts
 *
 * Migrates content from the WordPress REST API (https://mohanji.org/wp-json/)
 * to Payload CMS via the local REST API.
 *
 * Migration order:
 *   Pass 1 — Categories, Tags, Media (independent content)
 *   Pass 2 — Posts  (news / blog / press-coverage)
 *   Pass 3 — Events (via The Events Calendar REST API, if available)
 *
 * Usage:
 *   npx tsx scripts/migrate-wp-rest.ts
 *
 * Prerequisites: Payload dev server running on http://localhost:3000
 */

import * as fs from 'fs'
import * as path from 'path'

// ─── Config ───────────────────────────────────────────────────────────────────

const WP_API = 'https://mohanji.org/wp-json'
const PAYLOAD_API = 'http://localhost:3000/api'

const RATE_LIMIT_MS = 100   // delay between Payload writes
const WP_FETCH_DELAY = 200  // delay between WP paginated fetches

// ─── Types ────────────────────────────────────────────────────────────────────

interface MigrationStats {
  categories: { success: number; failed: number }
  tags:       { success: number; failed: number }
  media:      { success: number; failed: number }
  posts:      { success: number; failed: number }
  events:     { success: number; failed: number }
}

interface WpCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
}

interface WpTag {
  id: number
  name: string
  slug: string
}

interface WpMedia {
  id: number
  source_url: string
  alt_text: string
  title: { rendered: string }
  mime_type: string
}

interface WpPost {
  id: number
  title:     { rendered: string }
  slug:      string
  excerpt:   { rendered: string }
  content:   { rendered: string }
  date:      string
  status:    string
  categories: number[]
  tags:      number[]
  featured_media: number
}

interface WpEvent {
  id: number
  title:       string
  slug:        string
  description: string
  start_date:  string
  end_date:    string
  venue?:      { venue: string; city: string; country: string }
  url?:        string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Strip HTML tags, decode common entities */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

/**
 * Convert an HTML string to a minimal Payload Lexical document.
 * Preserves paragraph structure. Does not require external libraries.
 */
function htmlToLexical(html: string): Record<string, any> {
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .trim()

  const paragraphs = text
    .split(/\n{1,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  const nodes =
    paragraphs.length > 0
      ? paragraphs.map((p) => ({
          type: 'paragraph',
          version: 1,
          children: [{ type: 'text', version: 1, text: p }],
        }))
      : [
          {
            type: 'paragraph',
            version: 1,
            children: [{ type: 'text', version: 1, text: '' }],
          },
        ]

  return {
    root: {
      type: 'root',
      version: 1,
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
    },
  }
}

/**
 * Fetch all pages of a WP REST endpoint.
 * Automatically handles `X-WP-Total` header and falls back to length-based detection.
 */
async function paginatedFetch<T>(
  baseUrl: string,
  perPage = 100,
): Promise<T[]> {
  const all: T[] = []
  let page = 1

  while (true) {
    const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}per_page=${perPage}&page=${page}`
    let res: Response
    try {
      res = await fetch(url, {
        headers: { 'User-Agent': 'Mohanji-Migration/1.0' },
      })
    } catch (err: any) {
      console.warn(`    ⚠ Network error fetching ${url}: ${err.message}`)
      break
    }

    if (res.status === 400 || res.status === 404) break
    if (!res.ok) {
      console.warn(`    ⚠ HTTP ${res.status} fetching ${url}`)
      break
    }

    let data: T[]
    try {
      data = (await res.json()) as T[]
    } catch {
      break
    }

    if (!Array.isArray(data) || data.length === 0) break
    all.push(...data)

    const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '0')
    if (totalPages > 0 && page >= totalPages) break
    if (data.length < perPage) break

    page++
    await sleep(WP_FETCH_DELAY)
  }

  return all
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

// ─── Pass 1a: Categories ──────────────────────────────────────────────────────

async function migrateCategories(
  token: string,
  stats: MigrationStats,
): Promise<Map<number, string>> {
  console.log('\n── Pass 1a: Categories ──────────────────────────────────')
  const wpCategories = await paginatedFetch<WpCategory>(
    `${WP_API}/wp/v2/categories`,
  )
  console.log(`  Fetched ${wpCategories.length} WP categories.`)

  /** wp_id → payload_id mapping */
  const idMap = new Map<number, string>()

  // First pass: create without parent relationships
  for (const cat of wpCategories) {
    try {
      const res = await fetch(`${PAYLOAD_API}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          title: stripHtml(cat.name),
          slug: cat.slug || slugify(cat.name),
        }),
      })
      const data = (await res.json()) as any
      if (!res.ok) {
        // Duplicate slug — try to find existing
        if (res.status === 400 || res.status === 409) {
          const existing = await fetch(
            `${PAYLOAD_API}/categories?where[slug][equals]=${cat.slug}&limit=1`,
            { headers: { Authorization: `JWT ${token}` } },
          )
          const exData = (await existing.json()) as any
          if (exData.docs?.[0]?.id) {
            idMap.set(cat.id, exData.docs[0].id)
            console.log(`    ↺ Category "${cat.name}" already exists, reusing.`)
            stats.categories.success++
            continue
          }
        }
        console.error(`    ✗ Category "${cat.name}": ${JSON.stringify(data.errors || data.message)}`)
        stats.categories.failed++
      } else {
        const payloadId = data.doc?.id ?? data.id
        idMap.set(cat.id, payloadId)
        console.log(`    ✓ Category "${cat.name}" (${payloadId})`)
        stats.categories.success++
      }
    } catch (err: any) {
      console.error(`    ✗ Category "${cat.name}": ${err.message}`)
      stats.categories.failed++
    }
    await sleep(RATE_LIMIT_MS)
  }

  // Second pass: set parent relationships
  for (const cat of wpCategories.filter((c) => c.parent > 0)) {
    const payloadId = idMap.get(cat.id)
    const parentPayloadId = idMap.get(cat.parent)
    if (!payloadId || !parentPayloadId) continue

    try {
      await fetch(`${PAYLOAD_API}/categories/${payloadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ parent: parentPayloadId }),
      })
    } catch {
      // Non-critical; continue
    }
  }

  return idMap
}

// ─── Pass 1b: Tags ────────────────────────────────────────────────────────────

async function migrateTags(
  token: string,
  stats: MigrationStats,
): Promise<Map<number, string>> {
  console.log('\n── Pass 1b: Tags ────────────────────────────────────────')
  const wpTags = await paginatedFetch<WpTag>(`${WP_API}/wp/v2/tags`)
  console.log(`  Fetched ${wpTags.length} WP tags.`)

  const idMap = new Map<number, string>()

  for (const tag of wpTags) {
    try {
      const res = await fetch(`${PAYLOAD_API}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          title: stripHtml(tag.name),
          slug: tag.slug || slugify(tag.name),
        }),
      })
      const data = (await res.json()) as any
      if (!res.ok) {
        if (res.status === 400 || res.status === 409) {
          const existing = await fetch(
            `${PAYLOAD_API}/tags?where[slug][equals]=${tag.slug}&limit=1`,
            { headers: { Authorization: `JWT ${token}` } },
          )
          const exData = (await existing.json()) as any
          if (exData.docs?.[0]?.id) {
            idMap.set(tag.id, exData.docs[0].id)
            stats.tags.success++
            continue
          }
        }
        console.error(`    ✗ Tag "${tag.name}": ${JSON.stringify(data.errors || data.message)}`)
        stats.tags.failed++
      } else {
        const payloadId = data.doc?.id ?? data.id
        idMap.set(tag.id, payloadId)
        console.log(`    ✓ Tag "${tag.name}" (${payloadId})`)
        stats.tags.success++
      }
    } catch (err: any) {
      console.error(`    ✗ Tag "${tag.name}": ${err.message}`)
      stats.tags.failed++
    }
    await sleep(RATE_LIMIT_MS)
  }

  return idMap
}

// ─── Pass 1c: Media (metadata only) ──────────────────────────────────────────

async function migrateMediaMetadata(
  token: string,
  stats: MigrationStats,
): Promise<Map<number, string>> {
  console.log('\n── Pass 1c: Media (metadata reference) ──────────────────')
  console.log('  Note: Only storing source_url references.')
  console.log('  Run migrate-media.ts to download and re-upload files.\n')

  const wpMedia = await paginatedFetch<WpMedia>(`${WP_API}/wp/v2/media`)
  console.log(`  Fetched ${wpMedia.length} WP media items.`)

  // Save the list to disk so migrate-media.ts can consume it
  const mediaListPath = path.resolve(__dirname, 'wp-media-list.json')
  fs.writeFileSync(mediaListPath, JSON.stringify(wpMedia, null, 2))
  console.log(`  Saved media list to: ${mediaListPath}`)
  stats.media.success = wpMedia.length

  // Return empty map — actual IDs are created by migrate-media.ts
  return new Map()
}

// ─── Determine post type from WP category names ───────────────────────────────

function resolvePostType(
  categoryIds: number[],
  categoryMap: Map<number, string>,
  wpCategories: WpCategory[],
): 'news' | 'blog' | 'press-coverage' | 'interview' {
  const categoryNames = categoryIds
    .map((id) => {
      const wpCat = wpCategories.find((c) => c.id === id)
      return (wpCat?.name || '').toLowerCase()
    })
    .join(' ')

  if (/press|coverage|media/.test(categoryNames)) return 'press-coverage'
  if (/interview/.test(categoryNames)) return 'interview'
  if (/satsang|blog|teaching|wisdom/.test(categoryNames)) return 'blog'
  return 'news'
}

// ─── Pass 2: Posts ────────────────────────────────────────────────────────────

async function migratePosts(
  token: string,
  stats: MigrationStats,
  categoryIdMap: Map<number, string>,
  tagIdMap: Map<number, string>,
  wpCategoriesList: WpCategory[],
): Promise<void> {
  console.log('\n── Pass 2: Posts ────────────────────────────────────────')
  const wpPosts = await paginatedFetch<WpPost>(`${WP_API}/wp/v2/posts`)
  console.log(`  Fetched ${wpPosts.length} WP posts.`)

  for (const post of wpPosts) {
    const title = stripHtml(post.title?.rendered || 'Untitled')
    try {
      const postType = resolvePostType(
        post.categories || [],
        categoryIdMap,
        wpCategoriesList,
      )

      const categories = (post.categories || [])
        .map((id) => categoryIdMap.get(id))
        .filter(Boolean) as string[]

      const tags = (post.tags || [])
        .map((id) => tagIdMap.get(id))
        .filter(Boolean) as string[]

      const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 500)
      const content = htmlToLexical(post.content?.rendered || '')

      const payloadPost = {
        title,
        slug: post.slug || slugify(title),
        excerpt,
        content,
        publishedAt: post.date || undefined,
        postType,
        categories,
        tags,
        status: post.status === 'publish' ? 'published' : 'draft',
      }

      const res = await fetch(`${PAYLOAD_API}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(payloadPost),
      })
      const data = (await res.json()) as any

      if (!res.ok) {
        if (res.status === 400 || res.status === 409) {
          // Duplicate slug — append WP ID and retry
          const retrySlug = `${post.slug || slugify(title)}-${post.id}`
          const retryRes = await fetch(`${PAYLOAD_API}/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${token}`,
            },
            body: JSON.stringify({ ...payloadPost, slug: retrySlug }),
          })
          const retryData = (await retryRes.json()) as any
          if (!retryRes.ok) {
            console.error(`    ✗ Post "${title}": ${JSON.stringify(retryData.errors || retryData.message)}`)
            stats.posts.failed++
          } else {
            console.log(`    ✓ Post "${title}" [${postType}] (slug: ${retrySlug})`)
            stats.posts.success++
          }
        } else {
          console.error(`    ✗ Post "${title}": ${JSON.stringify(data.errors || data.message)}`)
          stats.posts.failed++
        }
      } else {
        const payloadId = data.doc?.id ?? data.id
        console.log(`    ✓ Post "${title}" [${postType}] (${payloadId})`)
        stats.posts.success++
      }
    } catch (err: any) {
      console.error(`    ✗ Post "${title}": ${err.message}`)
      stats.posts.failed++
    }
    await sleep(RATE_LIMIT_MS)
  }
}

// ─── Pass 3: Events (The Events Calendar) ────────────────────────────────────

async function migrateEvents(
  token: string,
  stats: MigrationStats,
): Promise<void> {
  console.log('\n── Pass 3: Events (The Events Calendar) ─────────────────')

  // Check if the TEC REST API is available
  let events: WpEvent[] = []
  try {
    events = await paginatedFetch<WpEvent>(
      `${WP_API}/tribe/events/v1/events`,
      50,
    )
  } catch {
    // Not available
  }

  if (events.length === 0) {
    console.log('  No events found via /wp-json/tribe/events/v1/events — trying /wp/v2/tribe_events...')
    try {
      // Fallback: custom post type via standard WP v2 endpoint
      const fallback = await paginatedFetch<any>(
        `${WP_API}/wp/v2/tribe_events`,
      )
      if (fallback.length > 0) {
        events = fallback.map((e: any) => ({
          id: e.id,
          title: stripHtml(e.title?.rendered || ''),
          slug: e.slug,
          description: e.content?.rendered || '',
          start_date: e.meta?._EventStartDate || e.date || '',
          end_date: e.meta?._EventEndDate || '',
          venue: undefined,
          url: e.meta?._EventURL || '',
        }))
      }
    } catch {
      // Silently continue
    }
  }

  if (events.length === 0) {
    console.log('  No events API available or no events found. Skipping.')
    return
  }

  console.log(`  Fetched ${events.length} event(s).`)

  for (const event of events) {
    const title =
      typeof event.title === 'string'
        ? event.title
        : stripHtml((event as any).title?.rendered || 'Untitled Event')
    try {
      if (!event.start_date) {
        console.warn(`    ⚠ Event "${title}" has no start_date, skipping.`)
        stats.events.failed++
        continue
      }

      const description = htmlToLexical(
        typeof event.description === 'string'
          ? event.description
          : (event as any).content?.rendered || '',
      )

      const payloadEvent: Record<string, any> = {
        title,
        slug: event.slug || slugify(title),
        description,
        startDate: event.start_date,
        status: 'published',
      }

      if (event.end_date) payloadEvent.endDate = event.end_date
      if (event.url) payloadEvent.registrationUrl = event.url

      // Determine event type heuristic
      const titleLower = title.toLowerCase()
      if (/retreat/.test(titleLower)) payloadEvent.eventType = 'retreat'
      else if (/satsang/.test(titleLower)) payloadEvent.eventType = 'satsang'
      else if (/pilgrim/.test(titleLower)) payloadEvent.eventType = 'pilgrimage'
      else if (/celebr|festival/.test(titleLower)) payloadEvent.eventType = 'celebration'
      else if (/workshop/.test(titleLower)) payloadEvent.eventType = 'workshop'
      else if (/online|virtual/.test(titleLower)) payloadEvent.eventType = 'online'

      const res = await fetch(`${PAYLOAD_API}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(payloadEvent),
      })
      const data = (await res.json()) as any

      if (!res.ok) {
        console.error(`    ✗ Event "${title}": ${JSON.stringify(data.errors || data.message)}`)
        stats.events.failed++
      } else {
        const payloadId = data.doc?.id ?? data.id
        console.log(`    ✓ Event "${title}" (${payloadId})`)
        stats.events.success++
      }
    } catch (err: any) {
      console.error(`    ✗ Event "${title}": ${err.message}`)
      stats.events.failed++
    }
    await sleep(RATE_LIMIT_MS)
  }
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║       Mohanji — WordPress REST API Migrator              ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`\nSource  : ${WP_API}`)
  console.log(`Target  : ${PAYLOAD_API}`)

  const stats: MigrationStats = {
    categories: { success: 0, failed: 0 },
    tags:       { success: 0, failed: 0 },
    media:      { success: 0, failed: 0 },
    posts:      { success: 0, failed: 0 },
    events:     { success: 0, failed: 0 },
  }

  let token: string
  try {
    token = await login()
  } catch (err: any) {
    console.error(`\n✗ Authentication failed: ${err.message}`)
    process.exit(1)
  }

  // ── Pass 1 ───────────────────────────────────────────────────────────────
  const categoryIdMap = await migrateCategories(token, stats)
  const tagIdMap = await migrateTags(token, stats)

  // Re-fetch WP categories for postType resolution
  const wpCategoriesList = await paginatedFetch<WpCategory>(
    `${WP_API}/wp/v2/categories`,
  )

  await migrateMediaMetadata(token, stats)

  // ── Pass 2 ───────────────────────────────────────────────────────────────
  await migratePosts(token, stats, categoryIdMap, tagIdMap, wpCategoriesList)

  // ── Pass 3 ───────────────────────────────────────────────────────────────
  await migrateEvents(token, stats)

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════════')
  console.log('Migration Summary')
  console.log('══════════════════════════════════════════════════════════')
  const entries: [string, { success: number; failed: number }][] = [
    ['Categories', stats.categories],
    ['Tags',       stats.tags],
    ['Media',      stats.media],
    ['Posts',      stats.posts],
    ['Events',     stats.events],
  ]
  for (const [label, s] of entries) {
    console.log(`  ${label.padEnd(12)} ✓ ${String(s.success).padStart(4)}   ✗ ${String(s.failed).padStart(4)}`)
  }
  console.log('══════════════════════════════════════════════════════════')

  const totalFailed = Object.values(stats).reduce((n, s) => n + s.failed, 0)
  if (totalFailed > 0) {
    console.warn(`\n⚠ ${totalFailed} item(s) failed. Review the output above for details.`)
    process.exit(1)
  } else {
    console.log('\n✓ All items migrated successfully.')
  }
}

main().catch((err) => {
  console.error('\n✗ Unhandled error:', err)
  process.exit(1)
})
