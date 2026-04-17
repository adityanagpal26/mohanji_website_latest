import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Store | Mohanji Foundation',
  description:
    "Browse and purchase books by Mohanji — spiritual wisdom, coffee table books, children's books — and sacred audio recordings including chants, mantras, and prayers.",
}

// ── Design helpers ─────────────────────────────────────────────────────────────
const BOOK_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  'coffee-table': { label: 'Coffee Table', color: 'bg-[#16697A] text-white' },
  biography:      { label: 'Spiritual',    color: 'bg-[#5B2D8E] text-white' },
  children:       { label: "Children's",   color: 'bg-[#E2B748] text-[#191919]' },
  translation:    { label: 'Translation',  color: 'bg-gray-500 text-white' },
}

const AUDIO_TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  prayer:  { label: 'Prayer',  color: 'bg-[#16697A] text-white' },
  mantra:  { label: 'Mantra',  color: 'bg-[#5B2D8E] text-white' },
  chant:   { label: 'Chant',   color: 'bg-[#E2B748] text-[#191919]' },
  talk:    { label: 'Talk',    color: 'bg-[#C95D63] text-white' },
}

type SearchParams = { tab?: string }

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const activeTab = sp.tab === 'audio' ? 'audio' : 'books'

  const payload = await getPayloadClient()

  // Fetch both in parallel
  const [{ docs: books }, { docs: audios }] = await Promise.all([
    payload.find({
      collection: 'books',
      sort: '-publishedYear',
      depth: 1,
      limit: 100,
    }),
    payload.find({
      collection: 'audios',
      sort: 'title',
      depth: 1,
      limit: 100,
    }),
  ])

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Mohanji Foundation
          </p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Store
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Books of wisdom, sacred chants, and spiritual audio — carry the teachings home.
          </p>
        </div>
      </section>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container">
          <nav className="flex gap-0">
            <Link
              href="/store"
              className={`flex items-center gap-2 px-8 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === 'books'
                  ? 'border-[#16697A] text-[#16697A]'
                  : 'border-transparent text-gray-500 hover:text-[#16697A] hover:border-[#16697A]/40'
              }`}
            >
              <BookIcon />
              Books
            </Link>
            <Link
              href="/store?tab=audio"
              className={`flex items-center gap-2 px-8 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === 'audio'
                  ? 'border-[#16697A] text-[#16697A]'
                  : 'border-transparent text-gray-500 hover:text-[#16697A] hover:border-[#16697A]/40'
              }`}
            >
              <MusicIcon />
              Audio
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5] min-h-[60vh]">
        <div className="container">
          {activeTab === 'books' ? (
            <BooksGrid books={books as any[]} />
          ) : (
            <AudioGrid audios={audios as any[]} />
          )}
        </div>
      </section>
    </div>
  )
}

// ── Books grid ────────────────────────────────────────────────────────────────
function BooksGrid({ books }: { books: any[] }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="font-heading text-2xl text-[#16697A] mb-2">Books Coming Soon</h2>
        <p className="text-gray-500">
          Our catalogue is being updated. Browse all books on the current site.
        </p>
        <a
          href="https://mohanji.org/book/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-3 bg-[#C95D63] text-white rounded font-medium hover:bg-[#f4442e] transition-colors"
        >
          Browse on Mohanji.org
        </a>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-8">{books.length} books available</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  )
}

function BookCard({ book }: { book: any }) {
  const coverUrl =
    typeof book.coverImage === 'object' && book.coverImage?.url
      ? book.coverImage.url
      : null
  const typeConfig = book.bookType ? BOOK_TYPE_CONFIG[book.bookType] : null
  const primaryLink = book.purchaseUrl
    || (Array.isArray(book.storeLinks) && book.storeLinks[0]?.url)
    || null
  const downloadUrl =
    typeof book.downloadFile === 'object' && book.downloadFile?.url
      ? book.downloadFile.url
      : null

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
      {/* Cover */}
      <Link href={`/books/${book.slug}`} className="block relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#16697A]/10 to-[#5B2D8E]/10 flex-shrink-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <span className="text-4xl mb-2 opacity-30">📖</span>
            <p className="text-center text-sm text-[#16697A] font-heading font-semibold leading-tight opacity-60">
              {book.title}
            </p>
          </div>
        )}
        {typeConfig && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {book.series && (
          <p className="text-xs text-[#E2B748] font-semibold uppercase tracking-wider mb-1">
            {book.series}
          </p>
        )}
        <Link href={`/books/${book.slug}`}>
          <h3 className="font-heading text-base text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>
        {book.author && (
          <p className="text-xs text-gray-400 mb-1">by {book.author}</p>
        )}
        {book.language && book.language !== 'English' && (
          <p className="text-xs text-gray-400 mb-2">{book.language}</p>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-3 flex gap-2 flex-wrap">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-semibold bg-[#C95D63] text-white py-2 px-3 rounded hover:bg-[#f4442e] transition-colors"
            >
              Buy Now
            </a>
          ) : null}
          {downloadUrl ? (
            <a
              href={downloadUrl}
              download
              className="flex-1 text-center text-sm font-semibold border border-[#16697A] text-[#16697A] py-2 px-3 rounded hover:bg-[#16697A] hover:text-white transition-colors"
            >
              Free PDF
            </a>
          ) : null}
          {!primaryLink && !downloadUrl && (
            <Link
              href={`/books/${book.slug}`}
              className="flex-1 text-center text-sm font-semibold border border-[#16697A] text-[#16697A] py-2 px-3 rounded hover:bg-[#16697A] hover:text-white transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Audio grid ────────────────────────────────────────────────────────────────
function AudioGrid({ audios }: { audios: any[] }) {
  if (audios.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="font-heading text-2xl text-[#16697A] mb-2">Audio Coming Soon</h2>
        <p className="text-gray-500">
          Sacred audio albums are being added. Check back soon.
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-8">{audios.length} audio {audios.length === 1 ? 'album' : 'albums'} available</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {audios.map((audio) => (
          <AudioCard key={audio.id} audio={audio} />
        ))}
      </div>
    </>
  )
}

function AudioCard({ audio }: { audio: any }) {
  const coverUrl =
    typeof audio.featuredImage === 'object' && audio.featuredImage?.url
      ? audio.featuredImage.url
      : null
  const typeConfig = audio.audioType ? AUDIO_TYPE_CONFIG[audio.audioType] : null
  const primaryLink =
    (Array.isArray(audio.storeLinks) && audio.storeLinks[0]?.url) || null
  const trackCount = Array.isArray(audio.tracks) ? audio.tracks.length : 0

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
      {/* Cover */}
      <Link href={`/audios/${audio.slug}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-[#16697A]/10 to-[#5B2D8E]/10 flex-shrink-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={audio.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-2">
            <div className="w-16 h-16 rounded-full bg-[#16697A]/20 flex items-center justify-center">
              <span className="text-[#16697A] text-3xl opacity-60">♪</span>
            </div>
            <p className="text-center text-xs text-[#16697A] font-heading font-semibold opacity-50 leading-tight">
              {audio.title}
            </p>
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
            <span className="text-[#16697A] text-2xl pl-1">▶</span>
          </div>
        </div>
        {typeConfig && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/audios/${audio.slug}`}>
          <h3 className="font-heading text-base text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors line-clamp-2">
            {audio.title}
          </h3>
        </Link>
        {trackCount > 0 && (
          <p className="text-xs text-gray-400 mb-1">{trackCount} track{trackCount !== 1 ? 's' : ''}</p>
        )}
        {audio.duration && (
          <p className="text-xs text-gray-400 mb-2">{audio.duration}</p>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-3 flex gap-2 flex-wrap">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-semibold bg-[#C95D63] text-white py-2 px-3 rounded hover:bg-[#f4442e] transition-colors"
            >
              Buy Now
            </a>
          ) : null}
          <Link
            href={`/audios/${audio.slug}`}
            className="flex-1 text-center text-sm font-semibold border border-[#16697A] text-[#16697A] py-2 px-3 rounded hover:bg-[#16697A] hover:text-white transition-colors"
          >
            {primaryLink ? 'Listen' : 'View'}
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
function BookIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

function MusicIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  )
}
