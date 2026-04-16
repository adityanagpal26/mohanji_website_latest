import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

const MEDIA_TYPE_CONFIG: Record<string, { label: string; color: string; icon: string; ctaLabel: string }> = {
  article:         { label: 'Article',         color: 'bg-blue-100 text-blue-700',     icon: '📰', ctaLabel: 'Read Original Article' },
  podcast:         { label: 'Podcast',          color: 'bg-purple-100 text-purple-700', icon: '🎙️', ctaLabel: 'Listen to Original Podcast' },
  'tv-coverage':   { label: 'TV Coverage',      color: 'bg-red-100 text-red-700',       icon: '📺', ctaLabel: 'Watch Original Coverage' },
  video:           { label: 'Video',            color: 'bg-orange-100 text-orange-700', icon: '▶️', ctaLabel: 'Watch Original Video' },
  'press-release': { label: 'Press Release',    color: 'bg-teal-100 text-teal-700',     icon: '📋', ctaLabel: 'Read Full Press Release' },
  interview:       { label: 'Interview',        color: 'bg-green-100 text-green-700',   icon: '🎤', ctaLabel: 'Read Full Interview' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { postType: { equals: 'press-coverage' } },
      ],
    },
    depth: 1,
    limit: 1,
  })
  const post = docs[0] as any
  if (!post) return { title: 'Press Coverage | Mohanji' }

  return {
    title: `${post.title} | Press Coverage | Mohanji`,
    description: post.excerpt ?? post.meta?.description ?? '',
    openGraph: {
      images: post.meta?.image?.url ?? post.featuredImage?.url ?? undefined,
    },
  }
}

export default async function PressDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { postType: { equals: 'press-coverage' } },
      ],
    },
    depth: 2,
    limit: 1,
  })

  const post = docs[0] as any
  if (!post) notFound()

  const imageUrl =
    typeof post.featuredImage === 'object' && post.featuredImage?.url
      ? post.featuredImage.url
      : null

  const publishDate = post.publishedAt ?? post.createdAt
  const typeConfig = post.mediaType ? MEDIA_TYPE_CONFIG[post.mediaType] : null

  // Safely render Lexical rich text root nodes as HTML-like content
  const hasContent = post.content?.root?.children?.length > 0

  return (
    <div>
      {/* Hero */}
      {imageUrl ? (
        <section className="relative h-72 md:h-96 overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 container">
            {typeConfig && (
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${typeConfig.color}`}>
                {typeConfig.icon} {typeConfig.label}
              </span>
            )}
            <h1 className="text-white font-heading text-3xl md:text-4xl font-semibold leading-snug max-w-3xl">
              {post.title}
            </h1>
          </div>
        </section>
      ) : (
        <section className="hero-gradient py-16 text-center">
          <div className="container max-w-3xl">
            {typeConfig && (
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${typeConfig.color}`}>
                {typeConfig.icon} {typeConfig.label}
              </span>
            )}
            <h1 className="text-white font-heading text-3xl md:text-4xl font-semibold leading-snug">
              {post.title}
            </h1>
          </div>
        </section>
      )}

      {/* Meta bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container max-w-3xl py-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <Link
            href="/press"
            className="text-[#16697A] hover:underline flex items-center gap-1"
          >
            ← Press Coverage
          </Link>
          <span className="text-gray-200">|</span>
          {post.publicationName && (
            <>
              <span className="font-semibold text-[#E2B748] uppercase tracking-wide text-xs">
                {post.publicationName}
              </span>
              <span className="text-gray-200">|</span>
            </>
          )}
          {publishDate && <span>{formatDate(publishDate)}</span>}
        </div>
      </div>

      {/* Article body */}
      <article className="py-12 bg-white">
        <div className="container max-w-3xl">

          {/* Excerpt / intro */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[#E2B748] pl-5 mb-8 italic">
              {post.excerpt}
            </p>
          )}

          {/* Rich text content */}
          {hasContent && (
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#16697A] prose-a:text-[#C95D63]">
              <RichTextRenderer content={post.content} />
            </div>
          )}

          {/* Embed section */}
          {post.embedCode && (
            <div className="my-10 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: post.embedCode }}
              />
            </div>
          )}

          {/* External link CTA */}
          {post.externalUrl && (
            <div className="mt-10 p-6 bg-[#F5F5F5] rounded-xl text-center">
              <p className="text-gray-600 mb-4 text-sm">
                This content was originally published by{' '}
                <strong>{post.publicationName || 'an external source'}</strong>.
              </p>
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#C95D63] text-white px-8 py-3 rounded hover:bg-[#f4442e] transition-colors font-medium"
              >
                {typeConfig?.ctaLabel ?? 'View Original'} →
              </a>
            </div>
          )}
        </div>
      </article>

      {/* Back link */}
      <div className="bg-[#F5F5F5] py-8">
        <div className="container max-w-3xl">
          <Link
            href="/press"
            className="text-[#16697A] hover:underline text-sm font-medium"
          >
            ← Back to all Press Coverage
          </Link>
        </div>
      </div>
    </div>
  )
}

// Simple Lexical rich text renderer
function RichTextRenderer({ content }: { content: any }) {
  if (!content?.root?.children) return null

  function renderNode(node: any, key: number): React.ReactNode {
    if (node.type === 'text') {
      let el: React.ReactNode = node.text
      if (node.format & 1) el = <strong key={key}>{el}</strong>
      if (node.format & 2) el = <em key={key}>{el}</em>
      if (node.format & 8) el = <u key={key}>{el}</u>
      return el
    }

    const children = node.children?.map((child: any, i: number) => renderNode(child, i))

    switch (node.type) {
      case 'paragraph':
        return <p key={key}>{children}</p>
      case 'heading': {
        const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4'
        return <Tag key={key}>{children}</Tag>
      }
      case 'list':
        return node.listType === 'bullet'
          ? <ul key={key}>{children}</ul>
          : <ol key={key}>{children}</ol>
      case 'listitem':
        return <li key={key}>{children}</li>
      case 'link':
        return (
          <a key={key} href={node.url} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      case 'quote':
        return <blockquote key={key}>{children}</blockquote>
      default:
        return <React.Fragment key={key}>{children}</React.Fragment>
    }
  }

  return <>{content.root.children.map((node: any, i: number) => renderNode(node, i))}</>
}
