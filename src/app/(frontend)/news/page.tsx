import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'News | Mohanji',
  description: 'Latest news, press coverage, and announcements from Mohanji Foundation.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))
  const limit = 9

  const payload = await getPayloadClient()

  const { docs: posts, totalDocs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { postType: { equals: 'news' } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
    depth: 1,
    limit,
    page: currentPage,
  })

  const totalPages = Math.ceil(totalDocs / limit)

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Media
          </p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            News
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Latest news and announcements from Mohanji Foundation — stories of service, transformation, and global impact.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">
              News articles are being added. Please check back soon.
            </p>
          ) : (
            <>
              {/* Article count */}
              <p className="text-sm text-gray-500 mb-8">
                Showing {(currentPage - 1) * limit + 1}–{Math.min(currentPage * limit, totalDocs)} of {totalDocs} articles
              </p>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {(posts as any[]).map((post) => {
                  const imageUrl =
                    typeof post.featuredImage === 'object' && post.featuredImage?.url
                      ? post.featuredImage.url
                      : null
                  const publishDate = post.publishedAt ?? post.createdAt

                  return (
                    <Link
                      key={post.id}
                      href={`/news/${post.slug}`}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Featured image */}
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
                            <span className="text-[#16697A] text-5xl opacity-15 font-heading">✦</span>
                          </div>
                        )}
                        {/* News badge */}
                        <span className="absolute top-3 left-3 bg-[#E2B748] text-[#191919] text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide">
                          News
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Date + location */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-2">
                          {publishDate && (
                            <span className="text-xs text-gray-400 uppercase tracking-wide">
                              {formatDate(publishDate)}
                            </span>
                          )}
                          {post.location && (
                            <span className="text-xs text-gray-400">
                              📍 {post.location}
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-2 group-hover:text-[#C95D63] transition-colors line-clamp-3">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-3">
                            {post.excerpt}
                          </p>
                        )}

                        <span className="mt-auto text-sm font-semibold text-[#C95D63] group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  {currentPage > 1 && (
                    <Link
                      href={`/news?page=${currentPage - 1}`}
                      className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors text-sm"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="px-4 py-2 text-gray-600 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/news?page=${currentPage + 1}`}
                      className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors text-sm"
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
