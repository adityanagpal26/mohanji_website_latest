import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

// ── Rich-text renderer (Lexical) ──────────────────────────────────────────────
function RenderNode({ node }: { node: any }): React.ReactNode {
  if (!node) return null

  if (node.type === 'text') {
    let content: React.ReactNode = node.text || ''
    const f = node.format ?? 0
    if (f & 1)  content = <strong>{content}</strong>
    if (f & 2)  content = <em>{content}</em>
    if (f & 8)  content = <u>{content}</u>
    if (f & 4)  content = <s>{content}</s>
    if (f & 16) content = <code className="bg-gray-100 px-1 rounded text-sm font-mono">{content}</code>
    return content
  }

  const children = node.children?.map((child: any, i: number) => (
    <RenderNode key={i} node={child} />
  ))

  switch (node.type) {
    case 'root':        return <>{children}</>
    case 'paragraph':   return <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    case 'heading': {
      const level = parseInt(node.tag?.replace('h', '') || '2', 10)
      const cls = 'font-heading text-[#16697A] mt-6 mb-3 font-semibold'
      if (level === 1) return <h1 className={cls}>{children}</h1>
      if (level === 3) return <h3 className={cls}>{children}</h3>
      if (level === 4) return <h4 className={cls}>{children}</h4>
      if (level === 5) return <h5 className={cls}>{children}</h5>
      if (level === 6) return <h6 className={cls}>{children}</h6>
      return <h2 className={cls}>{children}</h2>
    }
    case 'list':
      return node.listType === 'bullet'
        ? <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">{children}</ul>
        : <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700">{children}</ol>
    case 'listitem':    return <li>{children}</li>
    case 'quote':       return <blockquote className="border-l-4 border-[#E2B748] pl-4 italic text-gray-600 my-4">{children}</blockquote>
    case 'link':
    case 'autolink': {
      const href = node.fields?.url ?? node.url ?? '#'
      return <a href={href} className="text-[#16697A] underline hover:text-[#C95D63]" target="_blank" rel="noopener noreferrer">{children}</a>
    }
    case 'linebreak':   return <br />
    default:            return <>{children}</>
  }
}

function RichText({ content }: { content: any }) {
  if (!content?.root) return null
  return (
    <div className="prose prose-sm max-w-none">
      <RenderNode node={content.root} />
    </div>
  )
}

// ── Book type labels ──────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  'coffee-table': { label: 'Coffee Table Book', color: 'bg-[#16697A] text-white' },
  biography:      { label: 'Spiritual / Biography', color: 'bg-[#5B2D8E] text-white' },
  children:       { label: "Children's Book", color: 'bg-[#E2B748] text-[#191919]' },
  translation:    { label: 'Translation', color: 'bg-gray-500 text-white' },
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'books', where: { slug: { equals: slug } }, depth: 0, limit: 1 })
  const book = docs[0] as any
  if (!book) return {}
  return {
    title: `${book.title} | Mohanji Books`,
    description: `${book.title} by ${book.author ?? 'Mohanji'} — available on Mohanji Foundation.`,
  }
}

export async function generateStaticParams() { return [] }

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'books',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  const book = docs[0] as any
  if (!book) return notFound()

  const coverUrl =
    typeof book.coverImage === 'object' && book.coverImage?.url
      ? book.coverImage.url
      : null

  const downloadUrl =
    typeof book.downloadFile === 'object' && book.downloadFile?.url
      ? book.downloadFile.url
      : null

  const typeConfig = book.bookType ? TYPE_CONFIG[book.bookType] : null

  // Collect all store links: prefer storeLinks array, then fall back to purchaseUrl
  const storeLinks: { platform: string; url: string; label?: string }[] =
    Array.isArray(book.storeLinks) && book.storeLinks.length > 0
      ? book.storeLinks
      : book.purchaseUrl
        ? [{ platform: 'Buy Now', url: book.purchaseUrl }]
        : []

  return (
    <div>
      {/* ── Breadcrumb strip ─────────────────────────────────────────────── */}
      <section className="hero-gradient py-10">
        <div className="container">
          <nav className="text-white/70 text-sm flex items-center gap-2">
            <Link href="/store" className="hover:text-white transition-colors">Store</Link>
            <span>/</span>
            <Link href="/store" className="hover:text-white transition-colors">Books</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{book.title}</span>
          </nav>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 items-start">

            {/* Cover image */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-xs aspect-[2/3] bg-white rounded-xl shadow-lg overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 p-8">
                    <span className="text-6xl mb-4">📖</span>
                    <p className="text-center text-base text-[#16697A] font-heading font-semibold">{book.title}</p>
                  </div>
                )}
              </div>

              {/* Free download on mobile shows under cover */}
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download
                  className="w-full max-w-xs text-center py-2.5 border-2 border-[#16697A] text-[#16697A] rounded-lg font-semibold text-sm hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  ↓ Free Download (PDF)
                </a>
              )}
            </div>

            {/* Book details */}
            <div>
              {/* Type badge */}
              {typeConfig && (
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 ${typeConfig.color}`}>
                  {typeConfig.label}
                </span>
              )}

              {/* Series */}
              {book.series && (
                <p className="text-[#E2B748] font-semibold uppercase tracking-wider text-xs mb-2">{book.series}</p>
              )}

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl text-[#16697A] leading-tight mb-3">
                {book.title}
              </h1>
              <span className="block w-12 h-0.5 bg-[#E2B748] mb-5" />

              {/* Meta: author / year / language / format */}
              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                {book.author && (
                  <>
                    <dt className="font-semibold text-gray-600">Author</dt>
                    <dd className="text-gray-700">{book.author}</dd>
                  </>
                )}
                {book.publishedYear && (
                  <>
                    <dt className="font-semibold text-gray-600">Year</dt>
                    <dd className="text-gray-700">{book.publishedYear}</dd>
                  </>
                )}
                {book.language && (
                  <>
                    <dt className="font-semibold text-gray-600">Language</dt>
                    <dd className="text-gray-700">{book.language}</dd>
                  </>
                )}
                {book.format && (
                  <>
                    <dt className="font-semibold text-gray-600">Format</dt>
                    <dd className="text-gray-700">{book.format}</dd>
                  </>
                )}
              </dl>

              {/* Description */}
              {book.description ? (
                <div className="mb-8">
                  <RichText content={book.description} />
                </div>
              ) : (
                <p className="text-gray-500 italic mb-8">No description available.</p>
              )}

              {/* ── Store Links ──────────────────────────────────────────── */}
              {storeLinks.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-heading text-xl text-[#16697A] mb-3">Purchase</h2>
                  <div className="flex flex-wrap gap-3">
                    {storeLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C95D63] text-white text-sm font-semibold rounded-lg hover:bg-[#f4442e] transition-colors"
                      >
                        <CartIcon />
                        {link.label || link.platform}
                        <ExternalIcon />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Free download (desktop) */}
              {downloadUrl && (
                <div className="mb-8">
                  <a
                    href={downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#16697A] text-[#16697A] text-sm font-semibold rounded-lg hover:bg-[#16697A] hover:text-white transition-colors"
                  >
                    ↓ Free Download (PDF)
                  </a>
                </div>
              )}

              <Link href="/store" className="text-sm text-[#16697A] hover:underline flex items-center gap-1">
                ← Back to Store
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CartIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
