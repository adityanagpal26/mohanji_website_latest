import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function renderRichText(content: any): string {
  if (!content?.root?.children) return ''
  return content.root.children
    .map((node: any) => {
      if (node.type === 'paragraph')
        return `<p>${node.children?.map((c: any) => c.text || '').join('') || ''}</p>`
      if (node.type === 'heading')
        return `<h${node.tag?.slice(1) || 2}>${node.children?.map((c: any) => c.text || '').join('') || ''}</h${node.tag?.slice(1) || 2}>`
      if (node.type === 'quote')
        return `<blockquote>${node.children?.map((c: any) => c.text || '').join('') || ''}</blockquote>`
      return ''
    })
    .join('')
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, postType: { equals: 'news' } },
    depth: 0,
    limit: 1,
  })
  const post = docs[0] as any
  if (!post) return {}
  return {
    title: post.meta?.title ?? post.title,
    description: post.meta?.description ?? post.excerpt ?? undefined,
  }
}

export async function generateStaticParams() {
  return []
}
export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const [{ docs }, { docs: recentPosts }] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        and: [
          { slug: { equals: slug } },
          { postType: { equals: 'news' } },
          { status: { equals: 'published' } },
        ],
      },
      depth: 2,
      limit: 1,
    }),
    payload.find({
      collection: 'posts',
      where: {
        and: [
          { postType: { equals: 'news' } },
          { status: { equals: 'published' } },
          { slug: { not_equals: slug } },
        ],
      },
      sort: '-publishedAt',
      depth: 1,
      limit: 5,
    }),
  ])

  const post = docs[0] as any
  if (!post) return notFound()

  const imageUrl =
    typeof post.featuredImage === 'object' && post.featuredImage?.url
      ? post.featuredImage.url
      : null
  const contentHtml = post.content ? renderRichText(post.content) : ''
  const publishDate = post.publishedAt ?? post.createdAt

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[340px] flex items-end overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="container relative z-10 py-10">
          <span className="inline-block bg-[#E2B748] text-[#191919] text-xs font-semibold px-3 py-1 rounded mb-3 uppercase tracking-wider">
            News
          </span>
          <h1 className="text-white font-heading text-3xl md:text-4xl font-semibold leading-tight max-w-3xl">
            {post.title}
          </h1>
          {publishDate && (
            <p className="text-white/70 text-sm mt-2">{formatDate(publishDate)}</p>
          )}
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main article */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                {post.excerpt && (
                  <p className="text-lg text-[#16697A] font-medium italic border-l-4 border-[#E2B748] pl-4 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                {contentHtml ? (
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                      prose-headings:font-heading prose-headings:text-[#16697A]
                      prose-blockquote:border-l-4 prose-blockquote:border-[#E2B748] prose-blockquote:italic"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                ) : (
                  <p className="text-gray-500 italic">Content coming soon.</p>
                )}
              </div>

              <div className="mt-6">
                <Link
                  href="/news"
                  className="text-sm text-[#16697A] border-2 border-[#16697A] px-5 py-2.5 rounded hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  ← Back to News
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-heading text-xl text-[#16697A] mb-1">Recent News</h3>
                <span className="gold-divider" />
                {recentPosts.length === 0 ? (
                  <p className="text-sm text-gray-500">No other articles yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {(recentPosts as any[]).map((recent) => {
                      const recentImg =
                        typeof recent.featuredImage === 'object' && recent.featuredImage?.url
                          ? recent.featuredImage.url
                          : null
                      return (
                        <li key={recent.id}>
                          <Link href={`/news/${recent.slug}`} className="flex gap-3 group">
                            <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              {recentImg ? (
                                <Image
                                  src={recentImg}
                                  alt={recent.title}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-[#16697A]/10" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 group-hover:text-[#C95D63] transition-colors leading-snug line-clamp-2">
                                {recent.title}
                              </p>
                              {recent.publishedAt && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {formatDate(recent.publishedAt)}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
