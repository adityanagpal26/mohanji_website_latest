import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Past Events | Mohanji',
  description: 'Browse past Mohanji retreats, satsangs, pilgrimages, and celebrations from around the world.',
}

function formatDay(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit' })
}

function formatMonth(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
}

function formatDateRange(startDate: string, endDate?: string | null, displayDate?: string | null): string {
  if (displayDate) return displayDate
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const start = new Date(startDate).toLocaleDateString('en-GB', opts)
  if (!endDate) return start
  const end = new Date(endDate).toLocaleDateString('en-GB', opts)
  return `${start} – ${end}`
}

function groupByYear(events: any[]) {
  const groups: Record<string, any[]> = {}
  for (const event of events) {
    const year = new Date(event.startDate).getFullYear().toString()
    if (!groups[year]) groups[year] = []
    groups[year].push(event)
  }
  return groups
}

const TYPE_LABELS: Record<string, string> = {
  retreat: 'Retreat',
  satsang: 'Satsang',
  pilgrimage: 'Pilgrimage',
  celebration: 'Celebration',
  workshop: 'Workshop',
  online: 'Online',
}

export default async function PastEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))
  const limit = 12

  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const { docs: events, totalDocs } = await payload.find({
    collection: 'events',
    where: {
      and: [
        { startDate: { less_than: now } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-startDate',
    depth: 1,
    limit,
    page: currentPage,
  })

  const totalPages = Math.ceil(totalDocs / limit)
  const grouped = groupByYear(events as any[])

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Past Events
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            A treasury of retreats, satsangs, pilgrimages, and celebrations held around the world.
          </p>
          <div className="mt-6">
            <Link
              href="/events"
              className="inline-block px-6 py-2 border-2 border-white text-white rounded hover:bg-white/10 transition-colors text-sm"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Events grouped by year */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {events.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No past events found.</p>
          ) : (
            Object.entries(grouped).map(([year, yearEvents]) => (
              <div key={year} className="mb-12">
                <h2 className="font-heading text-2xl text-[#16697A] mb-1">{year}</h2>
                <span className="gold-divider" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                  {yearEvents.map((event: any) => {
                    const imageUrl =
                      (typeof event.coverImage === 'object' && event.coverImage?.url)
                        ? event.coverImage.url
                        : (typeof event.featuredImage === 'object' && event.featuredImage?.url)
                        ? event.featuredImage.url
                        : null

                    const dateLabel = formatDateRange(event.startDate, event.endDate, event.displayDate)

                    return (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col opacity-90 hover:opacity-100"
                      >
                        <div className="relative h-44 bg-gray-100 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={event.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-gray-400 text-4xl">✦</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-white rounded shadow px-3 py-1 text-center min-w-[52px]">
                            <span className="block font-heading font-bold text-[#C95D63] text-xl leading-none">
                              {formatDay(event.startDate)}
                            </span>
                            <span className="block text-xs text-[#16697A] font-semibold tracking-wide">
                              {formatMonth(event.startDate)}
                            </span>
                          </div>
                          {event.eventType && (
                            <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
                              {TYPE_LABELS[event.eventType] ?? event.eventType}
                            </div>
                          )}
                          <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs text-center py-1">
                            Past Event
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-heading text-lg text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-1">{dateLabel}</p>
                          {event.location && (
                            <p className="text-sm text-gray-600">
                              <span className="mr-1">📍</span>
                              {event.location}
                            </p>
                          )}
                          {event.shortDescription && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                              {event.shortDescription}
                            </p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {currentPage > 1 && (
                <Link
                  href={`/events/past?page=${currentPage - 1}`}
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
                  href={`/events/past?page=${currentPage + 1}`}
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
