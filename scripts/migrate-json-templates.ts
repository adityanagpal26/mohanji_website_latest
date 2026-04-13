/**
 * migrate-json-templates.ts
 *
 * Migrates Elementor JSON page templates from ../mohanji.org/ (relative to
 * this scripts/ directory) into Payload CMS pages via the REST API.
 *
 * Usage:
 *   npx tsx scripts/migrate-json-templates.ts
 *
 * Prerequisites: Payload dev server running on http://localhost:3000
 */

import * as fs from 'fs'
import * as path from 'path'

// ─── Config ──────────────────────────────────────────────────────────────────

const API_BASE = 'http://localhost:3000'

/**
 * Resolve templates directory relative to this script file.
 * scripts/ lives inside mohanji-website/, so ../../mohanji.org/ is correct.
 */
const TEMPLATES_DIR = path.resolve(__dirname, '..', '..', 'mohanji.org')

// ─── Types ───────────────────────────────────────────────────────────────────

interface ElementorWidget {
  id: string
  elType: 'widget' | 'section' | 'column' | 'container'
  widgetType?: string
  settings: Record<string, any>
  elements: ElementorWidget[]
  isInner?: boolean
}

interface PayloadBlock {
  blockType: string
  [key: string]: any
}

// Simple Lexical paragraph node for plain-text / HTML fallback
function lexicalFromHtml(html: string): Record<string, any> {
  // Strip HTML tags for a plain-text node — a full HTML→Lexical parser would
  // require additional deps; this keeps the script self-contained while still
  // preserving readable content.
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .trim()

  const paragraphs = text
    .split(/\n+/)
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

// ─── Widget → Block Mapping ───────────────────────────────────────────────────

/**
 * Determine if a section/container is a hero banner candidate.
 * Heuristic: has a background image OR a large min-height and is a top-level
 * section (not isInner).
 */
function isBannerSection(el: ElementorWidget): boolean {
  const s = el.settings
  if (el.isInner) return false
  const hasBgImage =
    s.background_background === 'classic' &&
    (s.background_image?.url || s.background_image?.id)
  const hasBgColor = s.background_color || s.background_background === 'gradient'
  const hasLargeHeight =
    s.custom_height?.size && Number(s.custom_height.size) >= 300
  return !!(hasBgImage || (hasBgColor && hasLargeHeight))
}

/**
 * Recursively collect all widgets from an element tree.
 */
function collectWidgets(elements: ElementorWidget[]): ElementorWidget[] {
  const widgets: ElementorWidget[] = []
  for (const el of elements) {
    if (el.elType === 'widget') {
      widgets.push(el)
    }
    if (el.elements?.length) {
      widgets.push(...collectWidgets(el.elements))
    }
  }
  return widgets
}

/**
 * Map a single Elementor widget to a Payload block, or null to skip.
 */
function mapWidget(widget: ElementorWidget): PayloadBlock | null {
  const s = widget.settings

  switch (widget.widgetType) {
    // ── Rich text content ──────────────────────────────────────────────────
    case 'heading': {
      const tag = s.header_size || 'h2'
      const title = s.title || ''
      const html = `<${tag}>${title}</${tag}>`
      return {
        blockType: 'richContent',
        content: lexicalFromHtml(html),
        containerWidth: 'normal',
      }
    }

    case 'text-editor': {
      const html: string = s.editor || ''
      return {
        blockType: 'richContent',
        content: lexicalFromHtml(html),
        containerWidth: 'normal',
      }
    }

    // ── Button / CTA ──────────────────────────────────────────────────────
    case 'button': {
      const text: string = s.text || 'Learn More'
      const url: string = s.link?.url || '#'
      return {
        blockType: 'callToAction',
        heading: text,
        primaryLabel: text,
        primaryUrl: url,
        style: 'teal',
      }
    }

    // ── Image ─────────────────────────────────────────────────────────────
    // Individual images become a single-item imageGallery block
    case 'image': {
      const imgUrl: string = s.image?.url || ''
      const alt: string = s.image?.alt || ''
      const caption: string = s.caption || ''
      if (!imgUrl) return null
      return {
        blockType: 'imageGallery',
        // We store the source URL as a caption note since we cannot create
        // Payload media records without downloading the file first.
        // Run migrate-media.ts afterwards to replace these with real IDs.
        images: [{ caption: alt || caption || imgUrl }],
        layout: 'grid',
        columns: '1',
        _sourceUrl: imgUrl, // non-standard, used for reference
      }
    }

    // ── Accordion ─────────────────────────────────────────────────────────
    case 'accordion': {
      const rawItems: any[] = s.tabs || []
      const items = rawItems.map((tab: any) => ({
        question: tab.tab_title || '',
        answer: lexicalFromHtml(tab.tab_content || ''),
      }))
      if (items.length === 0) return null
      return {
        blockType: 'accordion',
        heading: s.title || '',
        items,
      }
    }

    // ── Video ─────────────────────────────────────────────────────────────
    case 'video': {
      let url = ''
      if (s.video_type === 'youtube' && s.youtube_url) {
        url = s.youtube_url
      } else if (s.video_type === 'vimeo' && s.vimeo_url) {
        url = s.vimeo_url
      } else {
        url = s.external_url || s.url || ''
      }
      if (!url) return null
      return {
        blockType: 'videoEmbed',
        url,
        caption: s.caption || '',
        aspectRatio: '16:9',
      }
    }

    // ── Icon list ─────────────────────────────────────────────────────────
    case 'icon-list': {
      const rawItems: any[] = s.icon_list || []
      const items = rawItems.map((item: any) => ({
        icon: item.selected_icon?.value || item.icon || '',
        label: item.text || '',
        url: item.link?.url || '',
        description: '',
      }))
      if (items.length === 0) return null
      return {
        blockType: 'iconList',
        heading: '',
        items,
        layout: 'vertical',
      }
    }

    // ── Social icons ──────────────────────────────────────────────────────
    case 'social-icons': {
      const PLATFORM_MAP: Record<string, string> = {
        facebook: 'facebook',
        youtube: 'youtube',
        instagram: 'instagram',
        twitter: 'twitter',
        linkedin: 'linkedin',
      }
      const rawItems: any[] = s.social_icon_list || []
      const items = rawItems
        .map((item: any) => {
          const iconLib: string =
            (item.social_icon?.library || '').toLowerCase()
          const platform =
            PLATFORM_MAP[iconLib] ||
            Object.keys(PLATFORM_MAP).find((k) =>
              iconLib.includes(k),
            ) ||
            ''
          return { platform, url: item.link?.url || '' }
        })
        .filter((i: { platform: string; url: string }) => i.platform && i.url)
      if (items.length === 0) return null
      return { blockType: 'socialIcons', items }
    }

    default:
      return null
  }
}

/**
 * Traverse the Elementor content tree and produce a flat list of Payload blocks.
 */
function traverseContent(elements: ElementorWidget[]): PayloadBlock[] {
  const blocks: PayloadBlock[] = []

  for (const el of elements) {
    // Section / container-level: check for hero banner first
    if (
      (el.elType === 'section' || el.elType === 'container') &&
      isBannerSection(el)
    ) {
      // Find the first heading widget inside to use as banner heading
      const innerWidgets = collectWidgets(el.elements)
      const headingWidget = innerWidgets.find(
        (w) => w.widgetType === 'heading',
      )
      const btnWidget = innerWidgets.find((w) => w.widgetType === 'button')

      const heading = headingWidget?.settings?.title || ''
      const subheading =
        innerWidgets.find((w) => w.widgetType === 'text-editor')?.settings
          ?.editor
          ? innerWidgets
              .find((w) => w.widgetType === 'text-editor')!
              .settings.editor.replace(/<[^>]+>/g, '')
              .trim()
          : ''

      blocks.push({
        blockType: 'heroBanner',
        heading: heading || 'Welcome',
        subheading,
        overlayStyle: el.settings.background_overlay_background
          ? 'dark'
          : 'gradient',
        ctaLabel: btnWidget?.settings?.text || '',
        ctaUrl: btnWidget?.settings?.link?.url || '',
        alignment: el.settings.content_align || 'center',
      })

      // Skip further recursion into this section — we've consumed its widgets
      continue
    }

    // Recurse into non-banner sections / columns / containers
    if (el.elType !== 'widget' && el.elements?.length) {
      blocks.push(...traverseContent(el.elements))
      continue
    }

    // Individual widgets
    if (el.elType === 'widget') {
      const block = mapWidget(el)
      if (block) blocks.push(block)
    }
  }

  return blocks
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  console.log('  Authenticating with Payload...')
  const res = await fetch(`${API_BASE}/api/users/login`, {
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
  if (!data.token) {
    throw new Error('Login succeeded but no token returned: ' + JSON.stringify(data))
  }
  console.log('  Authenticated successfully.')
  return data.token as string
}

// ─── File discovery ───────────────────────────────────────────────────────────

/** Recursively find all .json files under a directory */
function findJsonFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findJsonFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      results.push(fullPath)
    }
  }
  return results
}

// ─── Slug helpers ─────────────────────────────────────────────────────────────

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function fileNameToTitle(filePath: string): string {
  return path.basename(filePath, '.json')
}

// ─── Migration ────────────────────────────────────────────────────────────────

async function migrateTemplate(
  filePath: string,
  token: string,
): Promise<'success' | 'skipped' | 'error'> {
  const title = fileNameToTitle(filePath)
  const slug = slugify(title)
  console.log(`\n  → Migrating: "${title}"`)

  let json: any
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    json = JSON.parse(raw)
  } catch (err: any) {
    console.error(`    ✗ Failed to parse JSON: ${err.message}`)
    return 'error'
  }

  // Elementor templates can be an array (exported template list) or an object
  // with a `content` property (page export).
  const contentArray: ElementorWidget[] = Array.isArray(json)
    ? json
    : Array.isArray(json.content)
      ? json.content
      : []

  if (contentArray.length === 0) {
    console.warn(`    ⚠ No Elementor content found in "${title}", skipping.`)
    return 'skipped'
  }

  const layout = traverseContent(contentArray)
  console.log(`    Mapped ${layout.length} block(s) from Elementor content.`)

  if (layout.length === 0) {
    // Still create the page but with an empty layout
    console.warn(`    ⚠ No blocks mapped — page will be created with empty layout.`)
  }

  const payload = {
    title,
    slug,
    layout,
    status: 'draft',
  }

  try {
    const res = await fetch(`${API_BASE}/api/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = (await res.json()) as any

    if (!res.ok) {
      console.error(`    ✗ API error (${res.status}): ${JSON.stringify(data.errors || data.message || data)}`)
      return 'error'
    }

    console.log(`    ✓ Created page "${title}" (id: ${data.doc?.id ?? data.id})`)
    return 'success'
  } catch (err: any) {
    console.error(`    ✗ Network error: ${err.message}`)
    return 'error'
  }
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║       Mohanji — Elementor JSON Template Migrator         ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`\nTemplates directory: ${TEMPLATES_DIR}`)

  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error(`\n✗ Templates directory not found: ${TEMPLATES_DIR}`)
    console.error('  Ensure mohanji.org/ lives alongside the mohanji-website/ repo.')
    process.exit(1)
  }

  let token: string
  try {
    token = await login()
  } catch (err: any) {
    console.error(`\n✗ Authentication failed: ${err.message}`)
    process.exit(1)
  }

  const files = findJsonFiles(TEMPLATES_DIR)
  console.log(`\nFound ${files.length} JSON template(s):\n`)
  files.forEach((f) => console.log(`  ${path.relative(TEMPLATES_DIR, f)}`))

  const stats = { success: 0, skipped: 0, error: 0 }

  for (const file of files) {
    const result = await migrateTemplate(file, token)
    stats[result]++
  }

  console.log('\n──────────────────────────────────────────────────────────')
  console.log('Migration complete.')
  console.log(`  ✓ Success : ${stats.success}`)
  console.log(`  ⚠ Skipped : ${stats.skipped}`)
  console.log(`  ✗ Errors  : ${stats.error}`)
  console.log('──────────────────────────────────────────────────────────')

  if (stats.error > 0) process.exit(1)
}

main().catch((err) => {
  console.error('\n✗ Unhandled error:', err)
  process.exit(1)
})
