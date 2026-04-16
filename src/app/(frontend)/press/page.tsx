import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Press Coverage | Mohanji',
  description: "Mohanji's presence in global media — newspaper articles, magazine features, TV coverage, podcasts, and interviews.",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const MEDIA_TYPE_CONFIG: Record<string, { label: string; color: string; icon: string; cta: string }> = {
  article:       { label: 'Article',       color: 'bg-blue-100 text-blue-700',   icon: '📰', cta: 'Read Article' },
  podcast:       { label: 'Podcast',       color: 'bg-purple-100 text-purple-700', icon: '🎙️', cta: 'Listen Now' },
  'tv-coverage': { label: 'TV Coverage',   color: 'bg-red-100 text-red-700',     icon: '📺', cta: 'Watch Now' },
  video:         { label: 'Video',         color: 'bg-orange-100 text-orange-700', icon: '▶️', cta: 'Watch Now' },
  'press-release': { label: 'Press Release', color: 'bg-teal-100 text-teal-700', icon: '📋', cta: 'Read More' },
  interview:     { label: 'Interview',     color: 'bg-green-100 text-green-700', icon: '🎤', cta: 'Read Interview' },
}

export default async function PressPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>
}) {
  const { page: pageParam, type: typeParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))
  const limit = 12

  const payload = await getPayloadClient()

  const whereClause: any = {
    and: [
      { postType: { equals: 'press-coverage' } },
      { status: { equals: 'published' } },
    ],
  }

  if (typeParam) {
    whereClause.and.push({ mediaType: { equals: typeParam } })
  }

  const { docs: posts, totalDocs } = await payload.find({
    collection: 'posts',
    where: whereClause,
    sort: '-publishedAt',
    depth: 1,
    limit,
    page: currentPage,
  })

  const totalPages = Math.ceil(totalDocs / limit)

  // Count by media type for filter tabs
  const { docs: allPress } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { postType: { equals: 'press-coverage' } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 0,
  })

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Media
          </p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Press Coverage
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Mohanji's presence in global media — newspaper articles, magazine features, TV coverage, podcasts, and interviews.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <Link
              href="/press"
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !typeParam
                  ? 'bg-[#16697A] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({totalDocs})
            </Link>
            {Object.entries(MEDIA_TYPE_CONFIG).map(([value, config]) => (
              <Link
                key={value}
                href={`/press?type=${value}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  typeParam === value
                    ? 'bg-[#16697A] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {config.icon} {config.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Press grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No press coverage found.</p>
              {typeParam && (
                <Link href="/press" className="mt-4 inline-block text-[#16697A] hover:underline text-sm">
                  ← View all coverage
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {(posts as any[]).map((post) => {
                  const imageUrl =
                    typeof post.featuredImage === 'object' && post.featuredImage?.url
                      ? post.featuredImage.url
                      : null
                  const publishDate = post.publishedAt ?? post.createdAt
                  const typeConfig = post.mediaType ? MEDIA_TYPE_CONFIG[post.mediaType] : null

                  return (
                    <Link
                      key={post.id}
                      href={`/press/${post.slug}`}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative h-52 bg-gradient-to-br from-[#16697A]/10 to-[#5B2D8E]/10 overflow-hidden flex-shrink-0">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[#16697A] text-5xl opacity-20 font-heading">
                              {typeConfig?.icon ?? '📰'}
                            </span>
                          </div>
                        )}
                        {/* Media type badge over image */}
                        {typeConfig && (
                          <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${typeConfig.color}`}>
                            {typeConfig.icon} {typeConfig.label}
                          </span>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Publication + date row */}
                        <div className="flex items-center justify-between mb-2 gap-2">
                          {post.publicationName && (
                            <span className="text-xs font-semibold text-[#E2B748] uppercase tracking-wide truncate">
                              {post.publicationName}
                            </span>
                          )}
                          {publishDate && (
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              {formatDate(publishDate)}
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading text-lg text-[#16697A] leading-snug mb-2 group-hover:text-[#C95D63] transition-colors line-clamp-3">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1 mb-3">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#C95D63] group-hover:underline">
                            {typeConfig?.cta ?? 'Read More'} →
                          </span>
                          {post.externalUrl && (
                            <span className="text-xs text-gray-400 truncate ml-2">
                              🔗 External link
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {currentPage > 1 && (
                    <Link
                      href={`/press?page=${currentPage - 1}${typeParam ? `&type=${typeParam}` : ''}`}
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
                      href={`/press?page=${currentPage + 1}${typeParam ? `&type=${typeParam}` : ''}`}
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
