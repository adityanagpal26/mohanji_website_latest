import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Search | Mohanji',
  description:
    'Search across all content on Mohanji.org — pages, posts, events, meditations, books, courses, and more.',
}

type SearchResult = {
  id: string
  title: string
  slug: string
  excerpt?: string
  type: 'page' | 'post' | 'event' | 'meditation' | 'book' | 'course'
  href: string
  imageUrl?: string
  badge?: string
}

function buildHref(type: string, slug: string): string {
  switch (type) {
    case 'post':
      return `/blog/${slug}`
    case 'event':
      return `/events/${slug}`
    case 'meditation':
      return `/meditations/${slug}`
    case 'book':
      return `/books/${slug}`
    case 'course':
      return `/courses/${slug}`
    default:
      return `/${slug}`
  }
}

const BADGE_COLORS: Record<string, string> = {
  Page: 'bg-gray-500',
  Blog: 'bg-[#16697A]',
  News: 'bg-[#5B2D8E]',
  Event: 'bg-[#C95D63]',
  'Past Event': 'bg-gray-400',
  Meditation: 'bg-[#16697A]',
  Book: 'bg-[#E2B748] text-[#191919]',
  Course: 'bg-[#C95D63]',
}

const suggestedSearches = [
  'Power of Purity',
  'Shaktipat',
  'Empowered',
  'Consciousness Kriya',
  'meditation',
  'retreat',
  'Kailash',
  'Baba',
  'satsang',
  'healing',
]

const browseCategories = [
  {
    label: 'Meditations',
    href: '/meditations',
    description: 'Guided meditations for all levels',
    icon: '🧘',
    color: 'border-[#16697A] hover:bg-[#16697A]',
  },
  {
    label: 'Practices',
    href: '/practices',
    description: 'Transformative spiritual practices',
    icon: '✨',
    color: 'border-[#16697A] hover:bg-[#16697A]',
  },
  {
    label: 'Events',
    href: '/events',
    description: 'Upcoming retreats and programs',
    icon: '📅',
    color: 'border-[#C95D63] hover:bg-[#C95D63]',
  },
  {
    label: 'Courses',
    href: '/courses',
    description: 'Empowered programs and training',
    icon: '🎓',
    color: 'border-[#C95D63] hover:bg-[#C95D63]',
  },
  {
    label: 'Books',
    href: '/books',
    description: "Mohanji's teachings in print",
    icon: '📖',
    color: 'border-[#E2B748] hover:bg-[#E2B748]',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Satsangs and spiritual insights',
    icon: '✍️',
    color: 'border-[#16697A] hover:bg-[#16697A]',
  },
  {
    label: 'News',
    href: '/news',
    description: 'Foundation news and updates',
    icon: '📰',
    color: 'border-[#5B2D8E] hover:bg-[#5B2D8E]',
  },
  {
    label: 'About',
    href: '/about/who-is-mohanji',
    description: 'Learn about Mohanji and his mission',
    icon: '🙏',
    color: 'border-[#16697A] hover:bg-[#16697A]',
  },
]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q: query = '', page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))
  const limit = 12
  const trimmed = query.trim()

  let results: SearchResult[] = []
  let totalResults = 0

  if (trimmed) {
    const payload = await getPayloadClient()

    // Run all searches in parallel
    const searchWhere = { title: { like: trimmed } }

    const [pagesRes, postsRes, eventsRes, meditationsRes, booksRes, coursesRes] =
      await Promise.allSettled([
        payload.find({
          collection: 'pages',
          where: { and: [searchWhere, { status: { equals: 'published' } }] },
          depth: 0,
          limit: 20,
        }),
        payload.find({
          collection: 'posts',
          where: { and: [searchWhere, { status: { equals: 'published' } }] },
          depth: 1,
          limit: 20,
        }),
        payload.find({
          collection: 'events',
          where: { and: [searchWhere, { status: { equals: 'published' } }] },
          depth: 1,
          limit: 20,
        }),
        payload.find({
          collection: 'meditations',
          where: searchWhere,
          depth: 1,
          limit: 20,
        }),
        payload.find({
          collection: 'books',
          where: searchWhere,
          depth: 1,
          limit: 20,
        }),
        payload.find({
          collection: 'courses',
          where: { and: [searchWhere, { status: { equals: 'published' } }] },
          depth: 1,
          limit: 20,
        }),
      ])

    // Map results
    const mapDocs = (res: PromiseSettledResult<any>, type: string) => {
      if (res.status !== 'fulfilled') return []
      return (res.value.docs ?? []).map((doc: any) => {
        const imageUrl =
          typeof doc.featuredImage === 'object' && doc.featuredImage?.url
            ? doc.featuredImage.url
            : typeof doc.coverImage === 'object' && doc.coverImage?.url
              ? doc.coverImage.url
              : undefined
        let badge = type.charAt(0).toUpperCase() + type.slice(1)
        if (type === 'post') badge = doc.postType === 'news' ? 'News' : 'Blog'
        if (type === 'event') badge = doc.isPast ? 'Past Event' : 'Event'
        const href =
          type === 'post' && doc.postType === 'news'
            ? `/news/${doc.slug}`
            : buildHref(type, doc.slug)
        return {
          id: `${type}-${doc.id}`,
          title: doc.title,
          slug: doc.slug,
          excerpt: doc.excerpt ?? undefined,
          type,
          href,
          imageUrl,
          badge,
        } as SearchResult
      })
    }

    const all: SearchResult[] = [
      ...mapDocs(pagesRes, 'page'),
      ...mapDocs(postsRes, 'post'),
      ...mapDocs(eventsRes, 'event'),
      ...mapDocs(meditationsRes, 'meditation'),
      ...mapDocs(booksRes, 'book'),
      ...mapDocs(coursesRes, 'course'),
    ]

    totalResults = all.length
    const start = (currentPage - 1) * limit
    results = all.slice(start, start + limit)
  }

  const totalPages = Math.ceil(totalResults / limit)

  return (
    <div>
      {/* Hero with search form */}
      <section className="hero-gradient py-16 text-center">
        <div className="container">
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Search Mohanji.org
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/80 mb-8 mt-4 max-w-xl mx-auto">
            Explore meditations, practices, events, books, courses, news, and more.
          </p>

          {/* Search form */}
          <form action="/search" method="GET" className="max-w-2xl mx-auto">
            <div className="flex rounded-lg overflow-hidden shadow-lg">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search for meditations, events, books…"
                className="flex-1 px-5 py-4 text-gray-800 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#C95D63] text-white px-7 py-4 font-medium hover:bg-[#f4442e] transition-colors whitespace-nowrap text-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Suggested searches (shown only on empty state) */}
          {!trimmed && (
            <div className="mt-6">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-3">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedSearches.map((term) => (
                  <a
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-4 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs rounded-full transition-colors"
                  >
                    {term}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results or browse categories */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {!trimmed ? (
            <>
              {/* Browse by category */}
              <div className="text-center mb-10">
                <h2 className="font-heading text-2xl text-[#16697A] mb-2">Browse by Category</h2>
                <span className="gold-divider gold-divider--center" />
                <p className="text-gray-500 mt-4 text-sm">
                  Not sure what you&apos;re looking for? Explore our content sections below.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {browseCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className={`group border-2 ${cat.color} text-[#16697A] hover:text-white rounded-lg p-5 flex flex-col gap-2 transition-all`}
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="font-heading text-lg font-semibold leading-snug">{cat.label}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-white/80 leading-relaxed">
                      {cat.description}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Quick links */}
              <div className="mt-14 text-center">
                <h2 className="font-heading text-xl text-[#16697A] mb-4">Quick Links</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { label: 'Free Meditations', href: '/meditations' },
                    { label: 'Upcoming Events', href: '/events' },
                    { label: 'Empowered Courses', href: '/courses' },
                    { label: 'Conscious Practices', href: '/practices' },
                    { label: 'Books by Mohanji', href: '/books' },
                    { label: 'Donate', href: '/donate' },
                    { label: 'Volunteer', href: '/join/volunteer' },
                    { label: 'Contact', href: '/contact' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 text-sm text-[#16697A] border border-[#16697A]/40 rounded hover:bg-[#16697A] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : totalResults === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-700 text-xl font-heading mb-2">
                No results found for &ldquo;{trimmed}&rdquo;
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Try different keywords, check spelling, or browse our sections below.
              </p>

              {/* Suggestions */}
              <div className="mb-8">
                <p className="text-gray-500 text-sm mb-3">Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedSearches.map((term) => (
                    <a
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="px-4 py-1.5 bg-white border border-[#16697A]/30 text-[#16697A] text-xs rounded-full hover:bg-[#16697A] hover:text-white transition-colors"
                    >
                      {term}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Events', href: '/events' },
                  { label: 'Meditations', href: '/meditations' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Books', href: '/books' },
                  { label: 'Courses', href: '/courses' },
                  { label: 'Practices', href: '/practices' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded text-sm hover:bg-[#16697A] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">{totalResults}</span>{' '}
                  result{totalResults !== 1 ? 's' : ''} for &ldquo;{trimmed}&rdquo;
                </p>
                <a
                  href="/search"
                  className="text-xs text-[#16697A] hover:underline"
                >
                  Clear search
                </a>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    {result.imageUrl && (
                      <div className="relative h-44 overflow-hidden bg-gray-100">
                        <Image
                          src={result.imageUrl}
                          alt={result.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    {!result.imageUrl && (
                      <div className="h-2 bg-gradient-to-r from-[#16697A] to-[#5B2D8E]" />
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {result.badge && (
                        <span
                          className={`inline-block text-xs ${BADGE_COLORS[result.badge] ?? 'bg-[#16697A]'} text-white px-2 py-0.5 rounded mb-2 self-start`}
                        >
                          {result.badge}
                        </span>
                      )}
                      <h3 className="font-heading text-lg text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors">
                        {result.title}
                      </h3>
                      {result.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
                          {result.excerpt}
                        </p>
                      )}
                      <p className="text-xs text-[#C95D63] mt-3 font-medium group-hover:underline">
                        Read more →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {currentPage > 1 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(trimmed)}&page=${currentPage - 1}`}
                      className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="px-4 py-2 text-gray-600 text-sm self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/search?q=${encodeURIComponent(trimmed)}&page=${currentPage + 1}`}
                      className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
