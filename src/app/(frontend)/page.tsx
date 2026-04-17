import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/RenderBlocks'
import { HeroSlider } from '@/components/ui/HeroSlider'
import { CounterBar } from '@/components/ui/CounterBar'
import type { HeroSlide } from '@/components/ui/HeroSlider'

export const dynamic = 'force-dynamic'

/**
 * generateMetadata() is Next.js's async alternative to `export const metadata`.
 * Because it's async, it can fetch data from Payload CMS before returning the
 * title/description/OG tags that get injected into <head>.
 *
 * The CMS source is the SiteSettings global → defaultMeta group.
 * Editors can change title, description and OG image without touching code.
 */
export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null)

  const siteName = (settings as any)?.siteName ?? 'Mohanji'
  const metaTitle = (settings as any)?.defaultMeta?.title ?? `${siteName} — Boundless Love, Timeless Wisdom`
  const metaDesc =
    (settings as any)?.defaultMeta?.description ??
    'Mohanji is a global humanitarian, spiritual master and the founder of numerous platforms committed to the upliftment of all beings through love, compassion and selfless service.'
  const ogImageUrl =
    typeof (settings as any)?.defaultMeta?.image === 'object'
      ? ((settings as any)?.defaultMeta?.image?.url as string | undefined)
      : undefined

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      siteName,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
  }
}

/** Extract URL string from a Payload media field (object after depth resolution). */
function mediaUrl(field: unknown): string | null {
  if (!field || typeof field !== 'object') return null
  const f = field as Record<string, unknown>
  return typeof f.url === 'string' ? f.url : null
}

function formatEventDate(start: string, end?: string | null) {
  const s = new Date(start)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  if (!end) return s.toLocaleDateString('en-GB', opts)
  const e = new Date(end)
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()} – ${e.toLocaleDateString('en-GB', opts)}`
  }
  return `${s.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${e.toLocaleDateString('en-GB', opts)}`
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  // ── Fetch all CMS data in parallel ───────────────────────────────────────
  const [{ docs: homePages }, { docs: featuredEvents }, { docs: awards }, { docs: featuredPosts }] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      depth: 2,
      limit: 1,
    }),
    // Events: prefer CMS-selected (featuredOnHome), fall back to next 3 upcoming
    payload.find({
      collection: 'events',
      where: {
        and: [
          { featuredOnHome: { equals: true } },
          { isPast: { equals: false } },
        ],
      },
      limit: 3,
      depth: 1,
      sort: 'startDate',
    }),
    payload.find({ collection: 'awards', limit: 10, depth: 1 }),
    // Posts: prefer CMS-selected (featuredOnHome), fall back to latest 3
    payload.find({
      collection: 'posts',
      where: { featuredOnHome: { equals: true } },
      limit: 3,
      depth: 1,
      sort: '-publishedAt',
    }),
  ])

  // Fall back to latest upcoming events if none are CMS-selected
  let events = featuredEvents
  if (events.length === 0) {
    const { docs: fallbackEvents } = await payload.find({
      collection: 'events',
      where: { isPast: { equals: false } },
      limit: 3,
      depth: 1,
      sort: 'startDate',
    })
    events = fallbackEvents
  }

  // Fall back to latest posts if none are CMS-selected
  let posts = featuredPosts
  if (posts.length === 0) {
    const { docs: fallbackPosts } = await payload.find({
      collection: 'posts',
      limit: 3,
      depth: 1,
      sort: '-createdAt',
    })
    posts = fallbackPosts
  }

  const homePage = homePages[0] as any

  // If this page uses the generic block builder, render blocks
  if (homePage?.pageType === 'generic' && homePage?.layout?.length > 0) {
    return <RenderBlocks blocks={homePage.layout} />
  }

  // Use structured homeContent from the page document
  const hp = homePage?.homeContent ?? {}

  // ── Derive typed values from page document ────────────────────────────────

  // Hero slides — image URL, alt text and optional click-through link all from CMS
  const heroSlides: HeroSlide[] = ((hp as any)?.heroSlides ?? [])
    .map((s: any) => {
      const url = mediaUrl(s.image)
      if (!url) return null
      return {
        src: url,
        alt: s.alt ?? '',
        link: s.link ?? undefined,
      }
    })
    .filter(Boolean) as HeroSlide[]

  // About section
  const about = (hp as any)?.aboutSection ?? {}
  const aboutImageUrl = mediaUrl(about.image)

  // Where is Mohanji
  const whereLocations: Array<{ country: string; months: string; detail?: string }> =
    (hp as any)?.whereIsMohanji ?? []
  const whereDateRange: string = (hp as any)?.whereIsMohanjiDateRange ?? ''

  // Activity stats
  const stats: Array<{ value: string; label: string; numeric: number }> =
    (hp as any)?.activityStats ?? []

  // Centres
  const centreNames: string[] = ((hp as any)?.centres ?? [])
    .map((c: any) => c.name as string)
    .filter(Boolean)

  // Platforms
  const platformItems: Array<{ name: string; logoUrl: string | null; url: string }> = (
    (hp as any)?.platforms ?? []
  ).map((p: any) => ({
    name: p.name as string,
    logoUrl: mediaUrl(p.logo),
    url: (p.url as string) ?? '/',
  }))

  // Activities section
  const activitiesBody: string = (hp as any)?.activitiesSection?.body ?? ''
  const activitiesImageUrl = mediaUrl((hp as any)?.activitiesSection?.image)

  // Meditations CTA background
  const medCtaBgUrl = mediaUrl((hp as any)?.meditationsCtaImage)

  return (
    <div>
      {/* ── 1. HERO SLIDER ─────────────────────────────────────────────────── */}
      {heroSlides.length > 0 ? (
        <HeroSlider slides={heroSlides} interval={5000} arrows dots />
      ) : (
        /* Fallback: plain teal banner when no slides are seeded yet */
        <section className="py-4 md:py-6 bg-white">
          <div className="container">
            <div className="aspect-video bg-gradient-to-br from-[#16697A] to-[#5B2D8E] rounded-sm flex items-center justify-center">
              <p className="text-white/60 text-sm">No slides configured — visit Admin → Homepage Settings to add slides.</p>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. ABOUT MOHANJI ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — image from CMS */}
            <div className="relative h-80 md:h-[460px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1 bg-[#F5F5F5]">
              {aboutImageUrl ? (
                <Image
                  src={aboutImageUrl}
                  alt={about.heading ?? 'About Mohanji'}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 text-6xl">🙏</div>
              )}
            </div>

            {/* Right — text from CMS */}
            <div className="order-1 md:order-2">
              <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] mb-3">
                {about.heading ?? 'About Mohanji'}
              </h2>
              <span className="block w-14 h-0.5 bg-[#E2B748] mb-6" />
              {about.body && (
                <p className="text-gray-700 leading-relaxed mb-4">{about.body}</p>
              )}
              {about.bodySecond && (
                <p className="text-gray-700 leading-relaxed mb-6">{about.bodySecond}</p>
              )}
              {about.quote && (
                <blockquote className="border-l-4 border-[#E2B748] pl-4 italic text-gray-500 text-sm mb-7">
                  &ldquo;{about.quote}&rdquo;
                </blockquote>
              )}
              <Link
                href={about.ctaLink ?? '/about/who-is-mohanji'}
                className="inline-block px-7 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
              >
                {about.ctaLabel ?? 'Know More'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHERE IS MOHANJI ────────────────────────────────────────────── */}
      {whereLocations.length > 0 && (
        <section className="py-12 bg-[#F5F5F5] border-y border-gray-200">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="md:w-64 flex-shrink-0">
                <h2 className="font-heading text-2xl md:text-3xl text-[#16697A] mb-2">
                  Where is Mohanji?
                </h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-3" />
                {whereDateRange && (
                  <p className="text-gray-500 text-sm">{whereDateRange}</p>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {whereLocations.map((loc) => (
                  <div
                    key={loc.country}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-[#16697A]/30 transition-colors"
                  >
                    <p className="font-semibold text-[#16697A] mb-0.5">{loc.country}</p>
                    <p className="text-xs text-[#E2B748] font-medium mb-1">{loc.months}</p>
                    {loc.detail && <p className="text-xs text-gray-500">{loc.detail}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. ANIMATED STATS ──────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <section className="py-14 bg-[#16697A]">
          <div className="container">
            <CounterBar stats={stats} />
          </div>
        </section>
      )}

      {/* ── 5. AWARDS AND RECOGNITION ──────────────────────────────────────── */}
      {awards.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] text-center mb-3">
              Awards and Recognition
            </h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-10" />

            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
              {awards.map((award: any) => {
                const imgUrl = mediaUrl(award.image)
                return (
                  <div key={award.id} className="flex-none w-44 md:w-52 snap-start group">
                    <div className="relative h-44 md:h-52 bg-[#F5F5F5] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={award.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="208px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full p-4">
                          <span className="text-3xl">🏆</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-2 leading-tight px-1 line-clamp-2">
                      {award.title}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/about/awards"
                className="inline-block px-7 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors"
              >
                View All Awards
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. MOHANJI CENTRES ─────────────────────────────────────────────── */}
      {centreNames.length > 0 && (
        <section className="py-14 bg-[#F5F5F5]">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] text-center mb-3">
              Mohanji Centres
            </h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {centreNames.map((name) => (
                <Link
                  key={name}
                  href="/about/spaces"
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#16697A] hover:text-[#16697A] transition-colors shadow-sm"
                >
                  {name}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/about/spaces"
                className="inline-block px-7 py-3 bg-[#16697A] text-white font-medium rounded hover:bg-[#0f4d59] transition-colors"
              >
                Explore All Centres
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. OUR PLATFORMS ───────────────────────────────────────────────── */}
      {platformItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] text-center mb-3">
              Our Platforms
            </h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-4" />
            <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
              Mohanji has founded and inspired numerous global organisations and platforms dedicated
              to conscious living, humanitarian service and spiritual evolution.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {platformItems.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target={p.url.startsWith('http') ? '_blank' : undefined}
                  rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-[#16697A]/30 hover:shadow-md transition-all"
                >
                  <div className="relative h-16 w-full">
                    {p.logoUrl ? (
                      <Image
                        src={p.logoUrl}
                        alt={p.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                        sizes="160px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300 text-2xl">🌐</div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 text-center leading-tight">{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. OUR ACTIVITIES ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text column */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] mb-3">
                Our Activities
              </h2>
              <span className="block w-14 h-0.5 bg-[#E2B748] mb-6" />
              {activitiesBody ? (
                <p className="text-gray-700 leading-relaxed mb-6">{activitiesBody}</p>
              ) : (
                <>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mohanji Foundation is active across the world working towards a better future.
                    Our global teams conduct <strong>290+ group activities</strong> across{' '}
                    <strong>33 countries</strong> and in <strong>27 languages</strong> every month.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Team Mohanji is driven by a simple motto —{' '}
                    <em>Adding Value to the World.</em>
                  </p>
                </>
              )}
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/join/volunteer"
                  className="px-6 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors text-sm"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/donate"
                  className="px-6 py-3 border border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors text-sm"
                >
                  Support Our Work
                </Link>
              </div>
            </div>

            {/* Image / stats column */}
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[#16697A] to-[#5B2D8E]">
              {activitiesImageUrl && (
                <Image
                  src={activitiesImageUrl}
                  alt="Mohanji Foundation global activities"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              {/* Always-visible overlay — stats grid when no image, semi-transparent when image */}
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  activitiesImageUrl
                    ? 'bg-gradient-to-t from-black/60 to-transparent'
                    : 'bg-gradient-to-br from-[#16697A]/80 to-[#5B2D8E]/80'
                }`}
              >
                {stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 p-8 text-center">
                    {stats.slice(0, 4).map((s) => (
                      <div key={s.label} className="bg-white/90 rounded-lg p-4 shadow">
                        <p className="font-heading text-2xl font-bold text-[#16697A]">{s.value}</p>
                        <p className="text-xs text-gray-600 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. UPCOMING EVENTS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] text-center mb-3">
            Upcoming Events
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-10" />

          {events.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event: any) => {
                const imgUrl = mediaUrl(event.featuredImage)
                return (
                  <div
                    key={event.id}
                    className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col border border-gray-100"
                  >
                    {/* Event image */}
                    <div className="relative h-48 bg-gradient-to-br from-[#16697A] to-[#5B2D8E] flex-shrink-0">
                      {imgUrl && (
                        <Image
                          src={imgUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-3 left-3 text-xs font-bold bg-[#E2B748] text-[#191919] px-2 py-1 rounded uppercase tracking-wide">
                        {event.eventType ?? 'Event'}
                      </span>
                    </div>
                    {/* Event info */}
                    <div className="p-5 flex flex-col flex-1 bg-white">
                      <h3 className="font-heading text-lg text-[#16697A] mb-1 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-[#C95D63] text-sm font-semibold mb-3">
                        {formatEventDate(event.startDate, event.endDate)}
                      </p>
                      {event.description && (
                        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                          {event.description}
                        </p>
                      )}
                      <Link
                        href={`/events/${event.slug}`}
                        className="mt-4 inline-block text-sm text-[#16697A] font-semibold hover:underline"
                      >
                        Find out more &rarr;
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No upcoming events. Check back soon.</p>
          )}

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block px-7 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
            >
              Explore All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. RECENT MEDIA / NEWS ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] text-center mb-3">
            Media
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-10" />

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post: any) => {
                const imgUrl = mediaUrl(post.featuredImage)
                return (
                  <Link
                    key={post.id}
                    href={`/${post.postType === 'news' ? 'news' : 'blog'}/${post.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-gray-100"
                  >
                    <div className="relative h-44 bg-gradient-to-br from-[#16697A]/20 to-[#16697A]/5 flex-shrink-0">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-4xl opacity-30">📰</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-xs font-bold bg-[#16697A] text-white px-2 py-0.5 rounded uppercase">
                        {post.postType}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-base text-[#191919] mb-2 leading-snug group-hover:text-[#16697A] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-3 text-xs text-[#C95D63] font-semibold">READ MORE »</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No recent articles. Check back soon.</p>
          )}

          <div className="text-center mt-10">
            <Link
              href="/news"
              className="inline-block px-7 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. JOIN MOHANJI ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] text-center mb-3">
            Join Mohanji
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-4" />
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-10">
            Join us on the path to a better world ruled by peace, harmony and love.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Youth Club */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#16697A] to-[#0f4d59]" />
              <div className="relative z-10 p-8 text-white">
                <p className="text-[#E2B748] text-xs font-bold uppercase tracking-widest mb-3">Ages 15 – 30</p>
                <h3 className="font-heading text-2xl mb-2">Youth Club</h3>
                <p className="text-sm text-white/70 mb-1">youth@mohanji.org</p>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  Enjoy the benefits of our global programs and workshops for youth. Become a member!
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/join/youth-club"
                    className="px-5 py-2 border border-white/60 text-white text-sm rounded hover:bg-white hover:text-[#16697A] transition-colors font-medium"
                  >
                    Explore
                  </Link>
                  <a
                    href="https://mohanji.org/youth-club/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-[#E2B748] text-[#191919] text-sm rounded hover:bg-[#c9a23f] transition-colors font-semibold"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </div>

            {/* Volunteer */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C95D63] to-[#a0454a]" />
              <div className="relative z-10 p-8 text-white">
                <p className="text-[#E2B748] text-xs font-bold uppercase tracking-widest mb-3">Make a Difference</p>
                <h3 className="font-heading text-2xl mb-2">Volunteer</h3>
                <p className="text-sm text-white/70 mb-1">volunteer@mohanji.org</p>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  Everyone has something to give — a skill, a craft, a hug or our time. Join us!
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/join/volunteer"
                    className="px-5 py-2 border border-white/60 text-white text-sm rounded hover:bg-white hover:text-[#C95D63] transition-colors font-medium"
                  >
                    Explore
                  </Link>
                  <a
                    href="https://forms.gle/f657nFpcmZqvooMu6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-[#E2B748] text-[#191919] text-sm rounded hover:bg-[#c9a23f] transition-colors font-semibold"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. FREE MEDITATIONS CTA ───────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#16697A]">
          {medCtaBgUrl && (
            <Image
              src={medCtaBgUrl}
              alt="Meditation background"
              fill
              className="object-cover object-center mix-blend-overlay opacity-40"
              sizes="100vw"
            />
          )}
        </div>
        <div className="relative z-10 container text-center text-white">
          <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-3">
            Discover Free Guided Meditations
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-6" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Eight powerful meditations, translated into many languages, helping hundreds of
            thousands of people around the world to cleanse, heal and raise awareness.
          </p>
          <Link
            href="/meditations"
            className="inline-block px-9 py-4 bg-[#E2B748] text-[#191919] font-semibold rounded hover:bg-[#c9a23f] transition-colors text-lg"
          >
            Explore Meditations
          </Link>
        </div>
      </section>
    </div>
  )
}
