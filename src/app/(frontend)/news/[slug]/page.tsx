import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

// ── Lexical rich text renderer ─────────────────────────────────────────────────
// Handles: paragraphs, headings (h1-h6), bold/italic/underline/code text,
//          unordered & ordered lists, blockquotes, links, inline images, <hr>
function RenderNode({ node }: { node: any }): React.ReactNode {
  if (!node) return null

  // ── Inline text with formatting flags ───────────────────────────────────────
  if (node.type === 'text') {
    if (!node.text) return null
    let content: React.ReactNode = node.text
    const f = node.format ?? 0
    if (f & 1)  content = <strong>{content}</strong>
    if (f & 2)  content = <em>{content}</em>
    if (f & 4)  content = <s>{content}</s>
    if (f & 8)  content = <u>{content}</u>
    if (f & 16) content = <code className="bg-gray-100 px-1 rounded text-sm font-mono">{content}</code>
    return content
  }

  if (node.type === 'linebreak') return <br />
  if (node.type === 'tab') return <span>&emsp;</span>

  // ── Recurse children ────────────────────────────────────────────────────────
  const children = (node.children ?? []).map((child: any, i: number) => (
    <RenderNode key={i} node={child} />
  ))

  switch (node.type) {
    case 'paragraph': {
      // Empty paragraph → spacer
      const isEmpty = !node.children?.length ||
        node.children.every((c: any) => !c.text && c.type !== 'upload' && c.type !== 'link')
      if (isEmpty) return <p className="my-1" />
      return <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    }

    case 'heading': {
      const tag = (node.tag as string) ?? 'h2'
      const styles: Record<string, string> = {
        h1: 'text-3xl font-heading font-semibold text-[#16697A] mt-8 mb-4',
        h2: 'text-2xl font-heading font-semibold text-[#16697A] mt-8 mb-3',
        h3: 'text-xl font-heading font-semibold text-[#16697A] mt-6 mb-2',
        h4: 'text-lg font-heading font-semibold text-[#16697A] mt-5 mb-2',
        h5: 'text-base font-heading font-semibold text-[#16697A] mt-4 mb-1',
        h6: 'text-sm font-heading font-semibold text-[#16697A] mt-4 mb-1',
      }
      const cls = styles[tag] ?? styles.h2
      if (tag === 'h1') return <h1 className={cls}>{children}</h1>
      if (tag === 'h2') return <h2 className={cls}>{children}</h2>
      if (tag === 'h3') return <h3 className={cls}>{children}</h3>
      if (tag === 'h4') return <h4 className={cls}>{children}</h4>
      if (tag === 'h5') return <h5 className={cls}>{children}</h5>
      return <h6 className={cls}>{children}</h6>
    }

    case 'list': {
      const isOrdered = node.listType === 'number'
      if (isOrdered)
        return <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-gray-700">{children}</ol>
      return <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-gray-700">{children}</ul>
    }

    case 'listitem':
      return <li className="leading-relaxed">{children}</li>

    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#E2B748] pl-5 my-6 italic text-gray-600 bg-amber-50/50 py-3 pr-4 rounded-r">
          {children}
        </blockquote>
      )

    case 'link':
    case 'autolink': {
      const url = node.fields?.url ?? node.url ?? '#'
      const newTab = node.fields?.newTab ?? node.newTab ?? false
      return (
        <a
          href={url}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-[#16697A] underline hover:text-[#C95D63] transition-colors"
        >
          {children}
        </a>
      )
    }

    case 'upload': {
      // Inline image embedded in article body
      const val = node.value ?? {}
      const imgUrl = typeof val === 'object' ? (val.url ?? val.filename) : null
      if (!imgUrl) return null
      return (
        <figure className="my-8">
          <img
            src={imgUrl}
            alt={val.alt ?? ''}
            className="w-full rounded-lg shadow-sm object-cover max-h-[500px]"
          />
          {val.alt && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
              {val.alt}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'horizontalrule':
      return <hr className="my-8 border-gray-200" />

    default:
      return <>{children}</>
  }
}

function RichTextContent({ content }: { content: any }) {
  if (!content?.root?.children?.length) return null
  return (
    <>
      {content.root.children.map((node: any, i: number) => (
        <RenderNode key={i} node={node} />
      ))}
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { postType: { equals: 'news' } },
      ],
    },
    depth: 1,
    limit: 1,
  })
  const post = docs[0] as any
  if (!post) return { title: 'News | Mohanji' }
  const img = typeof post.featuredImage === 'object' ? post.featuredImage?.url : null
  const metaImg = typeof post.meta?.image === 'object' ? post.meta?.image?.url : null
  return {
    title: `${post.meta?.title ?? post.title} | Mohanji`,
    description: post.meta?.description ?? post.excerpt ?? undefined,
    openGraph: { images: metaImg ?? img ?? undefined },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
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
  const publishDate = post.publishedAt ?? post.createdAt
  const hasContent = post.content?.root?.children?.some(
    (n: any) => n.children?.length || n.type === 'horizontalrule' || n.type === 'upload'
  )

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[360px] flex items-end overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 pb-10 pt-24">
          <span className="inline-block bg-[#E2B748] text-[#191919] text-xs font-semibold px-3 py-1 rounded mb-4 uppercase tracking-wider">
            News
          </span>
          <h1 className="text-white font-heading text-3xl md:text-4xl font-semibold leading-tight max-w-3xl mb-3">
            {post.title}
          </h1>
          {/* Meta row: date + location */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/75 text-sm">
            {publishDate && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(publishDate)}
              </span>
            )}
            {post.location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {post.location}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Content + Sidebar ─────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Main Article ──────────────────────────────────────────── */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">

                {/* Excerpt as lead paragraph */}
                {post.excerpt && (
                  <p className="text-xl text-[#16697A] font-medium italic border-l-4 border-[#E2B748] pl-5 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Rich text body */}
                {hasContent ? (
                  <div className="news-content">
                    <RichTextContent content={post.content} />
                  </div>
                ) : !post.excerpt ? (
                  <p className="text-gray-400 italic text-sm">Content coming soon.</p>
                ) : null}
              </div>

              {/* Back button */}
              <div className="mt-6">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 text-sm text-[#16697A] border-2 border-[#16697A] px-5 py-2.5 rounded hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  ← Back to News
                </Link>
              </div>
            </article>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="font-heading text-xl text-[#16697A] mb-1">Recent News</h3>
                <span className="gold-divider" />

                {recentPosts.length === 0 ? (
                  <p className="text-sm text-gray-500 mt-3">No other articles yet.</p>
                ) : (
                  <ul className="space-y-4 mt-1">
                    {(recentPosts as any[]).map((recent) => {
                      const recentImg =
                        typeof recent.featuredImage === 'object' && recent.featuredImage?.url
                          ? recent.featuredImage.url
                          : null
                      return (
                        <li key={recent.id}>
                          <Link href={`/news/${recent.slug}`} className="flex gap-3 group">
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#16697A]/10">
                              {recentImg ? (
                                <Image
                                  src={recentImg}
                                  alt={recent.title}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-[#16697A] opacity-20 text-xl">✦</span>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 group-hover:text-[#C95D63] transition-colors leading-snug line-clamp-2">
                                {recent.title}
                              </p>
                              <div className="flex flex-col gap-0.5 mt-0.5">
                                {recent.publishedAt && (
                                  <p className="text-xs text-gray-400">
                                    {formatDate(recent.publishedAt)}
                                  </p>
                                )}
                                {recent.location && (
                                  <p className="text-xs text-gray-400 truncate">
                                    📍 {recent.location}
                                  </p>
                                )}
                              </div>
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
