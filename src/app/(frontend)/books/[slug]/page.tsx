import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

function renderRichText(content: any): string {
  if (!content?.root?.children) return ''
  return content.root.children
    .map((node: any) => {
      if (node.type === 'paragraph')
        return `<p>${node.children?.map((c: any) => c.text || '').join('') || ''}</p>`
      if (node.type === 'heading')
        return `<h${node.tag?.slice(1) || 2}>${node.children?.map((c: any) => c.text || '').join('') || ''}</h${node.tag?.slice(1) || 2}>`
      return ''
    })
    .join('')
}

const TYPE_LABELS: Record<string, string> = {
  'coffee-table': 'Coffee Table Book',
  biography: 'Spiritual / Biography',
  children: "Children's Book",
  translation: 'Translation',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'books',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const book = docs[0] as any
  if (!book) return {}
  return {
    title: `${book.title} | Mohanji Books`,
    description: `${book.title} by ${book.author ?? 'Mohanji'} — available on Mohanji.org`,
  }
}

export async function generateStaticParams() {
  return []
}
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

  const imageUrl =
    typeof book.coverImage === 'object' && book.coverImage?.url
      ? book.coverImage.url
      : null
  const downloadUrl =
    typeof book.downloadFile === 'object' && book.downloadFile?.url
      ? book.downloadFile.url
      : null
  const descriptionHtml = book.description ? renderRichText(book.description) : ''
  const typeLabel = book.bookType ? TYPE_LABELS[book.bookType] : null

  return (
    <div>
      {/* Breadcrumb hero strip */}
      <section className="hero-gradient py-10">
        <div className="container">
          <nav className="text-white/70 text-sm mb-3">
            <Link href="/books" className="hover:text-white transition-colors">Books</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{book.title}</span>
          </nav>
        </div>
      </section>

      {/* Main content: two-column */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Cover image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm aspect-[2/3] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 p-8">
                    <span className="text-6xl mb-4">&#x1F4D6;</span>
                    <p className="text-center text-lg text-[#16697A] font-heading font-semibold">
                      {book.title}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              {typeLabel && (
                <span className="inline-block bg-[#16697A] text-white text-xs font-semibold px-3 py-1 rounded mb-4 uppercase tracking-wider">
                  {typeLabel}
                </span>
              )}
              <h1 className="font-heading text-3xl md:text-4xl text-[#16697A] mb-2 leading-tight">
                {book.title}
              </h1>
              <span className="gold-divider" />

              {book.author && (
                <p className="text-gray-600 mb-1 mt-4">
                  <span className="font-semibold text-gray-700">Author:</span> {book.author}
                </p>
              )}
              {book.publishedYear && (
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-gray-700">Published:</span> {book.publishedYear}
                </p>
              )}
              {book.language && (
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold text-gray-700">Language:</span> {book.language}
                </p>
              )}

              {descriptionHtml ? (
                <div
                  className="prose text-gray-700 leading-relaxed mb-8
                    prose-headings:font-heading prose-headings:text-[#16697A]"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              ) : (
                <p className="text-gray-500 italic mb-8">No description available.</p>
              )}

              <div className="flex flex-wrap gap-4">
                {book.purchaseUrl && (
                  <a
                    href={book.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
                  >
                    Purchase Book
                  </a>
                )}
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download
                    className="px-8 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors"
                  >
                    Free Download (PDF)
                  </a>
                )}
              </div>

              <div className="mt-8">
                <Link href="/books" className="text-sm text-[#16697A] hover:underline">
                  &larr; Back to all books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
