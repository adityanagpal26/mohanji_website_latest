import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog & Satsangs | Mohanji',
  description: "Read Mohanji's satsangs, teachings, and spiritual insights on the path of consciousness.",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage({
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
        { postType: { equals: 'blog' } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-createdAt',
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
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Blog &amp; Satsangs
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Teachings, reflections, and spiritual insights from Mohanji and the global sangha.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Blog posts are being added. Please check back soon.
            </p>
          ) : (
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
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    <div className="relative h-52 bg-[#16697A]/10 overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[#16697A] text-5xl opacity-20 font-heading">✦</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {publishDate && (
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                          {formatDate(publishDate)}
                        </p>
                      )}
                      <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-2 group-hover:text-[#C95D63] transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-4 text-sm font-semibold text-[#C95D63] group-hover:underline">
                        Read more &rarr;
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  &larr; Previous
                </Link>
              )}
              <span className="px-4 py-2 text-gray-600 text-sm self-center">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 border border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  Next &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
