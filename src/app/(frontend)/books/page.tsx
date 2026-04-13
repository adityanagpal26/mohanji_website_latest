import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Books by Mohanji',
  description:
    "Browse spiritual books, coffee table books, and children's books by Mohanji. Free downloads and purchase links available.",
}

const TYPE_LABELS: Record<string, string> = {
  'coffee-table': 'Coffee Table',
  biography: 'Spiritual / Biography',
  children: "Children's Book",
  translation: 'Translation',
}

const TYPE_COLORS: Record<string, string> = {
  'coffee-table': 'bg-[#16697A] text-white',
  biography: 'bg-[#5B2D8E] text-white',
  children: 'bg-[#E2B748] text-[#191919]',
  translation: 'bg-gray-500 text-white',
}

export default async function BooksPage() {
  const payload = await getPayloadClient()

  const { docs: books } = await payload.find({
    collection: 'books',
    sort: '-publishedYear',
    depth: 1,
    limit: 50,
  })

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Books by Mohanji
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Spiritual wisdom captured in beautiful books — available for download and purchase.
          </p>
        </div>
      </section>

      {/* Books grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {books.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                Books are being added to the catalogue. Please check back soon.
              </p>
              <a
                href="https://mohanji.org/book/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#C95D63] text-white rounded font-medium hover:bg-[#f4442e] transition-colors"
              >
                Browse All Books on Mohanji.org
              </a>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(books as any[]).map((book) => {
                const imageUrl =
                  typeof book.coverImage === 'object' && book.coverImage?.url
                    ? book.coverImage.url
                    : null
                const hasDownload =
                  typeof book.downloadFile === 'object' && book.downloadFile?.url
                const hasPurchase = !!book.purchaseUrl
                const typeLabel = book.bookType ? TYPE_LABELS[book.bookType] : null
                const typeColor = book.bookType
                  ? (TYPE_COLORS[book.bookType] ?? 'bg-gray-400 text-white')
                  : ''

                return (
                  <Link
                    key={book.id}
                    href={`/books/${book.slug}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={book.title}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 p-4">
                          <span className="text-3xl mb-2">&#x1F4D6;</span>
                          <p className="text-center text-sm text-[#16697A] font-heading font-semibold leading-tight">
                            {book.title}
                          </p>
                        </div>
                      )}
                      {typeLabel && (
                        <div className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded ${typeColor}`}>
                          {typeLabel}
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-heading text-base text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors">
                        {book.title}
                      </h3>
                      {book.author && (
                        <p className="text-xs text-gray-500 mb-1">by {book.author}</p>
                      )}
                      {book.language && (
                        <p className="text-xs text-gray-400 mb-2">{book.language}</p>
                      )}
                      <div className="mt-auto flex gap-2">
                        {hasPurchase && (
                          <span className="text-xs bg-[#C95D63] text-white px-2 py-1 rounded">
                            Buy
                          </span>
                        )}
                        {hasDownload && (
                          <span className="text-xs border border-[#16697A] text-[#16697A] px-2 py-1 rounded">
                            Free PDF
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
