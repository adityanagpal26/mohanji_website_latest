# Mohanji.org — Migration Implementation Guide
> **Last updated:** April 2026 (session 3) — reflects actual current state of the codebase.

---

## Project Overview

Full migration of mohanji.org from WordPress to **Next.js + Payload CMS + PostgreSQL**.

| Layer | Technology |
|-------|-----------|
| Frontend framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| CMS | Payload CMS 3.x (embedded inside Next.js) |
| Database | PostgreSQL via `@payloadcms/db-postgres` (Drizzle ORM) |
| Media storage | AWS S3 + CloudFront CDN |
| Deployment target | AWS (EC2 + RDS + S3 + CloudFront + Route 53) |

### Source Sites Being Migrated (3 WordPress installs on the same domain)
1. **Main site** (`mohanji.org/*`) — Astra theme + Elementor page builder
2. **Courses sub-site** (`mohanji.org/courses/*`) — LearnDash LMS + WooCommerce
3. **Blog sub-site** (`mohanji.org/blogs/satsangs/*`) — "Thus Spake Mohanji"

**846 total pages** mapped in `scripts/site_map.json`.

---

## Databases

| Environment | URL |
|-------------|-----|
| Staging (used for local dev) | `postgresql://mohanji:aCsHoHQqhlTidW0hOOHK@mohanji-staging-db.cexfbga3kdxv.us-east-1.rds.amazonaws.com:5432/mohanji_db` |
| Production | `postgresql://mohanji:pujPCmhDqem9Zn3GIQvU@mohanji-production-db.cexfbga3kdxv.us-east-1.rds.amazonaws.com:5432/mohanji_db` |

The `.env` file points to **staging** — this is intentional. All local dev and seed work happens against staging so tests are real.

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server — .env already points to staging RDS
npm run dev

# 3. Visit the site
open http://localhost:3000          # Public site
open http://localhost:3000/admin    # Payload CMS admin panel
# Login: admin@mohanji.org / Mohanji@20
```

**No Docker needed** — local dev uses the staging RDS directly (credentials are in `.env`).

**Important:** The `--webpack` flag is required on Apple Silicon (ARM64) because Turbopack is incompatible. This is already set in `.vscode/launch.json`.

---

## Migrations

All schema changes are in `src/migrations/`. They are tracked in the `payload_migrations` table and run **once** per database.

### Migration files (in order)

| Migration | What it does |
|-----------|-------------|
| `20260414_104413_initial` | Full initial schema — all tables, enums, FKs |
| `20260415_134023_meditations_duration` | Adds `duration` column to `meditations` |
| `20260415_140309_meditations_cms_fields` | `meditations_how_to_use` array table; meditations-listing content columns on `pages` + `_pages_v` |
| `20260415_144726_pages_meditations_listing_enum` | Adds `meditations-listing` to `enum_pages_page_type` |
| `20260415_150000_practices_restructure` | Restructures practices fields; adds `practices_benefits` + `practices_how_it_works` array tables; adds `practices-listing` enum value + listing content columns |
| `20260415_160000_mai_tri_content` | Adds `mai-tri-method` enum value; adds `mai_tri_content_*` scalar columns; creates benefits/faqs/testimonials array tables for pages and `_pages_v` |
| `20260415_170000_application_collections` | Creates `mai_tri_applications` + `kriya_applications` tables; adds relation columns to `payload_locked_documents_rels`; adds apply page fields to `practices` + `pages` |
| `20260415_180000_traditional_yoga_page` | Adds `traditional-yoga` enum value; adds `traditional_yoga_content_*` scalar columns; creates `programs` array tables for pages and `_pages_v` |
| `20260416_190000_awakening_yoga_nidra_page` | Adds `awakening-yoga-nidra` enum value; adds `awakening_yoga_nidra_content_*` scalar columns; creates `benefits_list` array tables for pages and `_pages_v` |
| `20260416_200000_youth_club_page` | Adds `youth-club` enum value; adds `youth_club_content_*` scalar columns; creates `activities` array tables for pages and `_pages_v` |
| `20260416_210000_volunteer_page` | Adds `volunteer` enum value; adds `volunteer_content_*` scalar columns; creates `pages_volunteer_content_opportunities` array tables |
| `20260416_220000_events_content_fields` | Adds new columns to `events` table: `display_date`, `location`, `cover_image_id`, `tagline`, `short_description`, `cta_label`, `cta_url`, `cta_external` |

### Rules for writing new migrations

- **All `CREATE TABLE` must use `IF NOT EXISTS`**
- **All `ADD COLUMN` must use `IF NOT EXISTS`**
- **All `ADD VALUE` to enums must use `IF NOT EXISTS`**
- **All `ADD CONSTRAINT ... FOREIGN KEY` must be wrapped in `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object THEN NULL; END $$;`** — Payload tracks migrations but this protects against retries
- Non-version array tables use `"id" varchar PRIMARY KEY NOT NULL` (Payload supplies UUID)
- Version array tables (`_pages_v_version_*`) use `"id" serial PRIMARY KEY NOT NULL` + `"_uuid" varchar` column — Payload passes DEFAULT for id in version inserts
- Every new collection needs `{slug_with_underscores}_id integer` + FK in `payload_locked_documents_rels` (Payload document locking)
- After writing a migration file, **always add it to `src/migrations/index.ts`**

### Running migrations

```bash
# Against staging (uses .env)
npx payload migrate

# Against production (from amplify.yml during deploy — runs automatically)
DATABASE_URI=$DATABASE_URI npx payload migrate
```

Amplify runs `DATABASE_URI=$DATABASE_URI npx payload migrate` as part of `preBuild` — migrations auto-apply on every deploy.

---

## Seeding

The seed script (`src/seed/seed.ts`) populates all globals, pages, practices, and meditations. It is **idempotent** — safe to run multiple times (skips existing records).

### Run seed against staging

```bash
DATABASE_URI="postgresql://mohanji:aCsHoHQqhlTidW0hOOHK@mohanji-staging-db.cexfbga3kdxv.us-east-1.rds.amazonaws.com:5432/mohanji_db" \
DATABASE_URL="postgresql://mohanji:aCsHoHQqhlTidW0hOOHK@mohanji-staging-db.cexfbga3kdxv.us-east-1.rds.amazonaws.com:5432/mohanji_db" \
PAYLOAD_SECRET="cfed63112c7b1c59eb470da42c423df637d2af4e35b597fe7996aa3cc28eaf04" \
npm run seed
```

### Run seed against production (first deploy only)

```bash
DATABASE_URI="postgresql://mohanji:pujPCmhDqem9Zn3GIQvU@mohanji-production-db.cexfbga3kdxv.us-east-1.rds.amazonaws.com:5432/mohanji_db" \
DATABASE_URL="postgresql://mohanji:pujPCmhDqem9Zn3GIQvU@mohanji-production-db.cexfbga3kdxv.us-east-1.rds.amazonaws.com:5432/mohanji_db" \
PAYLOAD_SECRET="<production-secret-from-amplify-env-vars>" \
npm run seed
```

**Seed is NOT run automatically on deploy.** It must be run manually once after first production deployment.

### What the seed creates

1. Admin user (`admin@mohanji.org` / `Mohanji@20`)
2. Header global (full 3-level navigation)
3. Footer global (columns + social links)
4. SiteSettings global
5. All pages (homepage, about pages, etc.) via `seedIfNeeded()`
6. Meditations listing page
7. Practices listing page
8. Mai-Tri Method page (with benefits, FAQs, testimonials)
9. Traditional Yoga (HSTY) page
10. Awakening Yoga Nidra page
11. Mohanji Youth Club page
12. Volunteer page
13. 6 seed events (Silence with Mohanji, Weekly Talk, Kailash 2026, Muktinath 2026, Maha Shivaratri 2026, 61st Birthday celebration)
14. `howToUse` steps on all meditations

---

## Directory Structure

```
mohanji-website/
├── src/
│   ├── app/
│   │   ├── (frontend)/              ← All public-facing pages
│   │   │   ├── layout.tsx           ← Wraps every page: loads Header + Footer
│   │   │   ├── page.tsx             ← Homepage (/)
│   │   │   ├── [slug]/page.tsx      ← Generic CMS-driven pages
│   │   │   │
│   │   │   ├── about/               ← 10 About section pages
│   │   │   │   ├── page.tsx
│   │   │   │   ├── who-is-mohanji/page.tsx
│   │   │   │   ├── foundation/page.tsx
│   │   │   │   ├── life-journey/page.tsx
│   │   │   │   ├── global-council/page.tsx
│   │   │   │   ├── acharyas/page.tsx
│   │   │   │   ├── spaces/page.tsx
│   │   │   │   ├── golden-path/page.tsx
│   │   │   │   ├── global-ambassador/page.tsx
│   │   │   │   └── awards/page.tsx
│   │   │   │
│   │   │   ├── meditations/         ← Meditation pages
│   │   │   │   ├── page.tsx         ← Landing: all 8 meditations
│   │   │   │   ├── [slug]/page.tsx  ← Individual meditation detail
│   │   │   │   └── [slug]/download/page.tsx  ← Language download grid
│   │   │   │
│   │   │   ├── practices/           ← Spiritual practices
│   │   │   │   ├── page.tsx         ← All practices grid
│   │   │   │   ├── [slug]/page.tsx  ← Individual practice (Shaktipat etc.)
│   │   │   │   └── mai-tri-method/page.tsx  ← Dedicated page + session form
│   │   │   │
│   │   │   ├── courses/             ← Empowered course series
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   │
│   │   │   ├── events/              ← Events
│   │   │   │   ├── page.tsx         ← Upcoming events
│   │   │   │   ├── past/page.tsx    ← Past events
│   │   │   │   └── [slug]/page.tsx  ← Event detail
│   │   │   │
│   │   │   ├── kailash/             ← Kailash pilgrimage section
│   │   │   │   ├── page.tsx
│   │   │   │   ├── itinerary/page.tsx
│   │   │   │   ├── places/page.tsx
│   │   │   │   ├── faqs/page.tsx
│   │   │   │   ├── terms/page.tsx
│   │   │   │   └── application/page.tsx   ← Registration form
│   │   │   │
│   │   │   ├── books/               ← 37 books
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   │
│   │   │   ├── audios/              ← Prayers, mantras, chants
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   │
│   │   │   ├── blog/                ← Satsang blogs
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   │
│   │   │   ├── news/                ← News articles
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   │
│   │   │   ├── quotes/page.tsx      ← Mohanji quotes by topic
│   │   │   ├── join/                ← Volunteer + Youth Club
│   │   │   │   ├── page.tsx
│   │   │   │   ├── volunteer/page.tsx
│   │   │   │   └── youth-club/page.tsx
│   │   │   │
│   │   │   ├── contact/page.tsx     ← Contact form + sidebar
│   │   │   ├── donate/page.tsx      ← Region-based donation
│   │   │   ├── search/page.tsx      ← Search with categories
│   │   │   └── (auth)/              ← Login + Register
│   │   │       ├── login/page.tsx
│   │   │       └── register/page.tsx
│   │   │
│   │   └── (payload)/               ← Payload CMS internals (don't touch)
│   │       ├── admin/[[...segments]]/page.tsx   ← Admin UI
│   │       └── api/                 ← REST + GraphQL endpoints
│   │           ├── [...]route.ts    ← Auto-generated by Payload
│   │           ├── dev-seed/route.ts     ← Seeds demo data
│   │           ├── newsletter/route.ts   ← Newsletter signup handler
│   │           └── contact/route.ts      ← Contact form handler
│   │
│   ├── collections/                 ← 17 Payload CMS data types
│   │   ├── Pages.ts, Posts.ts, Meditations.ts, Practices.ts
│   │   ├── Courses.ts, Lessons.ts, Events.ts, Books.ts
│   │   ├── Audios.ts, Quotes.ts, Awards.ts, Media.ts
│   │   ├── Users.ts, Categories.ts, Tags.ts, Venues.ts, Forms.ts
│   │
│   ├── globals/                     ← 3 site-wide settings (header, footer, site config ONLY)
│   │   ├── Header.ts                ← Nav items (3 levels deep)
│   │   ├── Footer.ts                ← Footer columns + social links
│   │   └── SiteSettings.ts         ← Donation URLs, GA ID, metadata
│   │   NOTE: Page-specific content (homepage, who-is-mohanji, etc.) lives in the Pages
│   │         collection as documents with pageType + structured content groups (homeContent,
│   │         wimContent, etc.) — NOT as globals.
│   │
│   ├── blocks/                      ← 18 reusable page-builder blocks
│   │   ├── HeroBanner.ts, RichContent.ts, ImageGallery.ts
│   │   ├── CallToAction.ts, CardGrid.ts, Accordion.ts
│   │   ├── VideoEmbed.ts, Testimonial.ts, DonationLinks.ts
│   │   ├── ContactForm.ts, EventCarousel.ts, PostsGrid.ts
│   │   ├── IconList.ts, SocialIcons.ts, Divider.ts
│   │   ├── ColumnsLayout.ts, AudioPlayer.ts, DownloadGrid.ts
│   │
│   ├── components/
│   │   ├── layout/                  ← Site shell
│   │   │   ├── Header.tsx           ← Desktop nav + logo
│   │   │   ├── Navigation.tsx       ← Multi-level dropdown
│   │   │   ├── MobileMenu.tsx       ← Accordion mobile nav
│   │   │   ├── Footer.tsx           ← 3 columns + social + newsletter
│   │   │   └── Breadcrumbs.tsx
│   │   │
│   │   ├── blocks/                  ← One React renderer per block type
│   │   │   └── [18 block components].tsx
│   │   │
│   │   ├── ui/                      ← Reusable UI atoms
│   │   │   ├── HeroSlider.tsx       ← Auto-rotating hero carousel
│   │   │   └── KriyaNewsletterForm.tsx  ← Kriya newsletter signup
│   │   │
│   │   └── RenderBlocks.tsx         ← Loops over page.layout[] → renders blocks
│   │
│   ├── lib/
│   │   ├── payload.ts               ← Payload Local API singleton
│   │   └── utils.ts                 ← cn() helper + misc utilities
│   │
│   └── styles/globals.css           ← Tailwind v4 @theme tokens
│
├── scripts/                         ← Data migration (run once)
│   ├── migrate-json-templates.ts    ← 21 Elementor JSON → Payload pages
│   ├── migrate-wp-rest.ts           ← WordPress REST API → Payload
│   ├── migrate-media.ts             ← Download WP media → S3 upload
│   └── tsconfig.json
│
├── public/
│   └── images/                      ← Locally downloaded images
│       ├── hero/                    ← hero-1.jpg, hero-2.jpg, hero-3.jpg
│       ├── about/                   ← about-mohanji.webp, golden-path.jpg
│       ├── banners/                 ← Page hero banners
│       ├── awards/                  ← 8 award photos
│       ├── meditations/             ← bg.webp
│       ├── acharyas/                ← banner.jpg
│       └── practices/               ← Practice page images
│
├── payload.config.ts                ← Root Payload configuration
├── next.config.ts                   ← Next.js + image domains + PATH fix
├── docker-compose.yml               ← Local PostgreSQL container
└── CLAUDE.md                        ← This file
```

---

## What Is Already Built ✅

### All 46 Pages — Implemented with Real Content

| Section | Pages | Status |
|---------|-------|--------|
| Homepage | `/` | ✅ Hero slider, about section, stats, awards, events |
| About | `/about/*` (10 pages) | ✅ All pages: who-is-mohanji, foundation, life-journey, global-council, acharyas, spaces, golden-path, global-ambassador, awards |
| Meditations | `/meditations`, `/meditations/[slug]`, `/meditations/[slug]/download` | ✅ 8 meditations + download pages with 26 languages |
| Practices | `/practices`, `/practices/[slug]`, `/practices/mai-tri-method`, `/practices/traditional-yoga`, `/practices/awakening-yoga-nidra`, `/practices/mai-tri-method/apply`, `/practices/consciousness-kriya/apply` | ✅ All practices; dedicated Mai-Tri, Traditional Yoga, and Awakening Yoga Nidra pages; apply forms for Mai-Tri and Consciousness Kriya |
| Courses | `/courses`, `/courses/[slug]` | ✅ Empowered 1.0–5.0 series |
| Events | `/events`, `/events/past`, `/events/[slug]` | ✅ Upcoming + past listings with date-based filtering; detail pages with richText body, cover image, CTA button, sidebar |
| Kailash | 6 pages including application form | ✅ Full pilgrimage section |
| Books | `/books`, `/books/[slug]` | ✅ 25+ books in 3 categories |
| Audios | `/audios`, `/audios/[slug]` | ✅ Real album content |
| Blog | `/blog`, `/blog/[slug]` | ✅ Satsang blogs |
| News | `/news`, `/news/[slug]` | ✅ News articles |
| Quotes | `/quotes` | ✅ 24 real quotes, 12 topics |
| Join | `/join/volunteer`, `/join/youth-club` | ✅ Volunteer page (CMS-driven with opportunities list + Google Form CTA); Youth Club page with brochure download |
| Contact | `/contact` | ✅ Full form with 7 subject options |
| Donate | `/donate` | ✅ 7 regions (needs real payment URLs in CMS) |
| Search | `/search` | ✅ Full-text search + category browse |
| Auth | `/login`, `/register` | ✅ |

### All Forms — Implemented

| Form | Location | Backend | Stored in DB |
|------|----------|---------|--------------|
| Contact form | `/contact` | `POST /api/contact` | No (logs to console) |
| Mai-Tri session request | `/practices/mai-tri-method` | `POST /api/contact` | No (logs to console) |
| Mai-Tri practitioner application | `/practices/mai-tri-method/apply` | `POST /api/mai-tri-apply` | ✅ `mai_tri_applications` table |
| Consciousness Kriya application | `/practices/consciousness-kriya/apply` | `POST /api/kriya-apply` | ✅ `kriya_applications` table |
| Consciousness Kriya newsletter | `/practices/consciousness-kriya` | `POST /api/newsletter` | No (logs to console) |
| Kailash application | `/kailash/application` | `POST /api/contact` | No (logs to console) |
| Footer newsletter | Footer component | `POST /api/newsletter` | No (logs to console) |
| Volunteer | `/join/volunteer` | External Google Form link | — |

> **TODO:** Contact, newsletter, and session request routes log to console. Connect Resend.com before go-live. Application forms (Mai-Tri + Kriya) save to DB and are viewable in the admin panel under "Applications".

### All CMS Infrastructure — Implemented

- ✅ 19 Payload collections configured (17 content + `mai_tri_applications` + `kriya_applications`)
- ✅ 3 Payload globals (Header, Footer, SiteSettings)
- ✅ 18 block types defined and rendered
- ✅ `npm run seed` populates all globals, pages, practices, meditations
- ✅ ISR caching (`revalidate = 3600`) on all static pages
- ✅ SEO: `generateMetadata()` on every page, sitemap.ts, robots.ts
- ✅ JSON-LD structured data on homepage
- ✅ 8 migrations — all safe with `IF NOT EXISTS` / `DO/EXCEPTION` patterns

---

## Known Issues & Fixes Applied

| Issue | Cause | Fix Applied |
|-------|-------|-------------|
| `spawn node ENOENT` | Payload's type-gen subprocess can't find `node` in PATH | `process.env.PATH = '/usr/local/bin:...'` prepended in `next.config.ts` |
| `Multiple relations with name "children"` | Two nested arrays in Header global both named `children` | Renamed 3rd-level array to `subItems` in `Header.ts` |
| PostGIS geometry error | `Venues.ts type: 'point'` requires PostGIS extension | Replaced with `latitude`/`longitude` number fields + `googleMapsUrl` |
| `Invalid src prop does not match localPatterns` | next/image requires `/images/**` in `localPatterns` | Added `{ pathname: '/images/**' }` to `next.config.ts` |
| Turbopack ARM64 crash | Turbopack incompatible with Apple Silicon | Always use `next dev --webpack` |
| `column "_uuid" does not exist` on version array tables | Payload's versioning requires `_uuid varchar` on every `_pages_v_version_*` array table | Added `"_uuid" varchar` to all version array table CREATE TABLE statements |
| `null value in column "id"` on version array tables | Payload passes `DEFAULT` for id in version array inserts — requires `serial` (auto-increment), not `varchar` | All `_pages_v_version_*` array tables use `"id" serial PRIMARY KEY NOT NULL` |
| Admin 500 after adding new collection | `payload_locked_documents_rels` requires `{slug}_id integer` column for every registered collection | Every new collection migration adds the FK column to `payload_locked_documents_rels` |
| Staging DB SSL connection error | Staging RDS doesn't require SSL; `npm run seed` was forcing SSL via pool config | SSL detection in `payload.config.ts` checks `isBuilding` only — migrate CLI uses DATABASE_URI directly without pool SSL |
| `npm run seed` SSL failure | `npm run seed` loads `.env` via dotenv but the DATABASE_URI triggers SSL when pool option is set | Must pass `DATABASE_URI` / `DATABASE_URL` / `PAYLOAD_SECRET` explicitly on the command line (not via `.env`) for seeding |

---

## Design Tokens

### Colors
```css
/* In globals.css using Tailwind v4 @theme syntax */
--color-primary:    #C95D63;   /* Rose   — buttons, CTAs */
--color-secondary:  #16697A;   /* Teal   — headings, hero gradients */
--color-accent:     #E2B748;   /* Gold   — decorative underlines */
--color-hover:      #f4442e;   /* Orange — button hover state */
--color-text:       #191919;   /* Dark   — body text */
--color-bg:         #F5F5F5;   /* Light grey — page background */
```

### Typography
```
Heading font: "EB Garamond" (serif, weight 600)
Body font:    "Lato" (sans-serif, weight 400)
H1: 40px mobile→30px | H2: 32px | H3: 26px | body: 15px
```

### Breakpoints
```
sm: 544px | md: 768px | lg: 922px (nav collapses) | xl: 1200px
Max container width: 1200px, centered
```

---

## CMS Collections (17)

| Collection | Purpose | Key Fields |
|-----------|---------|-----------|
| `pages` | Generic CMS pages (page builder) | title, slug, parent, layout (blocks array), pageType, structured content groups, status |
| `posts` | News + blog + press articles | title, slug, content, postType, categories, author |
| `meditations` | Guided meditation files | title, slug, description, downloads (language + audioFile array), howToUse steps |
| `practices` | Spiritual practices | title, slug, description, benefits[], howItWorks[], tagline, applyPageTitle/Intro, applyFormEmail |
| `courses` | Empowered course series | title, slug, description, level, lessons, registrationUrl |
| `lessons` | Individual course lessons | title, course (relation), order, content, videoUrl |
| `events` | Upcoming + past events | title, slug, startDate, endDate, displayDate, location, coverImage, tagline, shortDescription, description (richText), ctaLabel, ctaUrl, ctaExternal, eventType, status |
| `books` | Mohanji's books | title, slug, description, coverImage, purchaseUrl, bookType |
| `audios` | Prayers, mantras, chants | title, audioFile, duration, audioType |
| `quotes` | Mohanji quotes | text, topic, image |
| `awards` | Awards & recognition | title, description, date, image, organization |
| `media` | All uploaded files | alt, caption — stored on S3 |
| `users` | Admin + editor accounts | role, firstName, lastName |
| `categories` | Hierarchical categories | title, slug, parent (self-ref) |
| `tags` | Flat tags | title, slug |
| `venues` | Event locations | name, address, city, country, latitude, longitude, googleMapsUrl |
| `forms` | Dynamic form builder | title, fields array, emailTo, confirmationMessage |
| `mai_tri_applications` | Practitioner apply form submissions | fullName, email, status, all 6 form sections (viewable in admin under "Applications") |
| `kriya_applications` | Consciousness Kriya apply form submissions | fullName, phone, gender, country, age, email, needsAssistance, status |

## CMS Globals (3) — site-wide singletons ONLY

| Global | Purpose | Key Fields |
|--------|---------|-----------|
| `header` | Site navigation | logo, navItems (3 levels: label + link + subItems[]) |
| `footer` | Footer content | columns (title + links[]), socialLinks, copyrightText, newsletterEnabled |
| `siteSettings` | Site-wide config | siteName, defaultMeta, donationLinks (region + url + label), googleAnalyticsId |

**Rule:** Globals are for site-wide data only. Page-specific content goes in the Pages collection
using the `pageType` field + conditional content groups (`homeContent`, `wimContent`, etc.).

---

## Data Fetching Pattern

All data is fetched using the **Payload Local API** — this runs in the same Node.js process as Next.js (no HTTP round-trip). It's the fastest possible way to query data.

```tsx
// In any Server Component (page.tsx, layout.tsx)
import { getPayloadClient } from '@/lib/payload'

// Get a single item by slug
const payload = await getPayloadClient()
const { docs } = await payload.find({
  collection: 'meditations',
  where: { slug: { equals: params.slug } },
  depth: 2,   // 2 = also resolve nested relations (images, categories etc.)
  limit: 1,
})
const meditation = docs[0]

// Get a global
const header = await payload.findGlobal({ slug: 'header' })
```

**Caching strategy:**
- `export const revalidate = 3600` — page is rebuilt every hour (ISR)
- `afterChange` hooks in collections call `revalidatePath()` to bust cache immediately when content changes in admin
- `export const dynamic = 'force-dynamic'` — used on search and events (real-time data)

---

## Block System

Pages in Payload CMS store content as an array of **blocks** (like LEGO bricks). Each block has a `blockType` field that determines which React component renders it.

```
Payload DB stores:                     RenderBlocks.tsx turns into:
┌─────────────────────────┐            ┌──────────────────────────┐
│ page.layout = [          │    →       │ <HeroBannerBlock />       │
│   { blockType: 'hero'  } │            │ <RichContentBlock />      │
│   { blockType: 'rich'  } │            │ <CardGridBlock />         │
│   { blockType: 'cards' } │            └──────────────────────────┘
│ ]                        │
└─────────────────────────┘
```

**18 available blocks:**
| Block | What it renders |
|-------|----------------|
| `HeroBanner` | Full-width gradient hero with heading + CTA button |
| `RichContent` | Rich text (Lexical editor output) |
| `ImageGallery` | Grid/masonry image gallery |
| `CallToAction` | Highlighted section with heading + button |
| `CardGrid` | Grid of image+title+description cards |
| `Accordion` | Expandable FAQ / content sections |
| `VideoEmbed` | YouTube/Vimeo embed |
| `Testimonial` | Quote + person + image |
| `DonationLinks` | Region-based payment links (India, UK, US, etc.) |
| `ContactForm` | Dynamic form from the Forms collection |
| `EventCarousel` | Horizontal scroll of upcoming events |
| `PostsGrid` | Filterable news/blog grid |
| `IconList` | List with icon + text |
| `SocialIcons` | Row of social media icon links |
| `Divider` | Visual separator line |
| `ColumnsLayout` | Multi-column layout |
| `AudioPlayer` | Audio player + download button |
| `DownloadGrid` | Language download grid (meditation MP3s) |

---

## Navigation Structure

```
HOME | ABOUT ▾ | LEARN ▾ | JOIN ▾ | EVENTS ▾ | COURSES ▾ | MEDIA ▾ | STORE | CONTACT | DONATE
```

**ABOUT** → Who is Mohanji, Mohanji Foundation, Life Journey, Global Council, Acharyas, Spaces, Golden Path, Global Ambassador, Awards

**LEARN** → Free Guided Meditations (8 meditations), Practices (13 practices), Mai-Tri Method, Traditional Yoga, Awakening Yoga Nidra

**JOIN** → Youth Club, Volunteer

**EVENTS** → Upcoming Events, Past Events

**COURSES** → Empowered 1.0–5.2 series

**MEDIA** → Blogs, Press, Podcast, News, Videos, Annual Reports

---

## AWS Deployment Architecture

```
Internet
    │
    ▼
Route 53 (DNS)          ← mohanji.org points here
    │
    ▼
ALB (Load Balancer)     ← SSL termination via ACM cert
    │
    ▼
EC2 (t3.medium)         ← Docker container running Next.js
    │
    ├──► RDS PostgreSQL  ← Managed database (Multi-AZ for reliability)
    │
    └──► S3 Bucket       ← All uploaded images/files
              │
              ▼
         CloudFront CDN  ← Serves S3 assets fast worldwide
```

### Services Needed for Deployment

| Service | Purpose | Cost estimate |
|---------|---------|--------------|
| EC2 t3.medium | App server | ~$30/month |
| RDS db.t3.micro | PostgreSQL | ~$15/month |
| S3 bucket | Media storage | ~$2/month |
| CloudFront | CDN for media | ~$1/month |
| Route 53 | DNS management | ~$1/month |
| ACM | Free SSL certificate | Free |
| **Total** | | **~$50/month** |

### What You Need to Provide for Deployment

1. **AWS Account credentials** (Access Key ID + Secret Access Key)
2. **S3 bucket name** (e.g. `mohanji-media`)
3. **S3 bucket region** (e.g. `ap-south-1` for India or `us-east-1`)
4. **Domain name** (mohanji.org) — access to DNS settings
5. **EC2 key pair** (for SSH access to the server)
6. **Email service API key** — for forms (Resend.com recommended, free tier: 100 emails/day)
7. **Real donation payment URLs** per region (Razorpay India, Stripe EU/US, etc.)

### Environment Variables Needed

```bash
# .env.production (never commit this file!)

# Database
DATABASE_URI=postgresql://user:password@your-rds-host:5432/mohanji

# Payload CMS secret (any random 32+ char string)
PAYLOAD_SECRET=your-very-long-random-secret-here

# S3 for media uploads
S3_BUCKET=mohanji-media
S3_REGION=ap-south-1
S3_ACCESS_KEY_ID=AKIA...
S3_SECRET_ACCESS_KEY=...
NEXT_PUBLIC_CDN_URL=https://d1234abcd.cloudfront.net

# Email (Resend.com)
RESEND_API_KEY=re_...

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Content Migration Scripts (Run Once)

These scripts are in the `scripts/` folder and should be run once to import content from WordPress:

```bash
# 1. Import 21 Elementor page templates
npx ts-node scripts/migrate-json-templates.ts

# 2. Import posts, events, categories from WordPress REST API
npx ts-node scripts/migrate-wp-rest.ts

# 3. Download all WordPress media → upload to S3
npx ts-node scripts/migrate-media.ts
```

---

## Key Conventions (Important for Developers)

1. **Never use the REST API in Server Components** — always use the Payload Local API (`getPayloadClient()`) for zero-latency data fetching.

2. **All images via `<Image>` from `next/image`** — never use `<img>` tags. This gives automatic optimization, lazy loading, WebP conversion.

3. **Local images** go in `public/images/` and are referenced as `/images/hero/hero-1.jpg`

4. **Remote images** from mohanji.org WP CDN are allowed via `remotePatterns` in `next.config.ts`

5. **`use client`** is only added to components that need browser APIs (useState, useEffect, event handlers). Everything else is a Server Component by default.

6. **Design tokens are in `globals.css`** using Tailwind v4's `@theme` directive — no `tailwind.config.js`.

7. **Page pattern:** Try CMS first → fall back to static hardcoded data → `notFound()` if neither exists.

8. **Drizzle relation naming:** Never have two arrays with the same `name` at different nesting levels in a Payload global/collection — it causes a duplicate relation name error.

9. **Pages `pageType` content groups:** Structured content for special pages lives in conditional groups on the `pages` collection, not in globals. Current groups:
   - `homeContent` — Homepage
   - `wimContent` — Who Is Mohanji
   - `mediationsListingContent` — Meditations listing
   - `practicesListingContent` — Practices listing
   - `maiTriContent` — Mai-Tri Method page (hero, intro, benefits, FAQs, testimonials, apply page fields, booking)
   - `traditionalYogaContent` — Traditional Yoga (HSTY) page (hero, tagline, intro, why section, programs, visitUsUrl)

10. **Server component + client component split:** Pages that need forms must be split: `page.tsx` is a Server Component that fetches CMS data and passes it as props; the form itself is a `'use client'` component. **Never put event handlers (`onClick`, `onError`, etc.) directly on `next/image` or other elements in Server Components.**

11. **Migration schema rules for Payload 3.x + Drizzle:**
    - `enum_pages_page_type` and `enum__pages_v_version_page_type` must both be updated when adding new `pageType` values
    - Version array tables need `serial` PK + `_uuid varchar` column
    - Non-version array tables use `varchar` PK (Payload supplies UUID at insert time)
