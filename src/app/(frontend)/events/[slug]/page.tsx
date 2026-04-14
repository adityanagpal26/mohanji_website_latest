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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const TYPE_LABELS: Record<string, string> = {
  retreat: 'Retreat',
  satsang: 'Satsang',
  pilgrimage: 'Pilgrimage',
  celebration: 'Celebration',
  workshop: 'Workshop',
  online: 'Online',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const event = docs[0] as any
  if (!event) return {}
  return {
    title: event.title,
    description: `Join us for ${event.title}${event.startDate ? ' on ' + formatDate(event.startDate) : ''}.`,
  }
}

export async function generateStaticParams() {
  return []
}
export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    depth: 2,
    limit: 1,
  })
  const event = docs[0] as any
  if (!event) return notFound()

  const imageUrl =
    typeof event.featuredImage === 'object' && event.featuredImage?.url
      ? event.featuredImage.url
      : null

  const venue = typeof event.venue === 'object' && event.venue ? event.venue : null
  const descriptionHtml = event.description ? renderRichText(event.description) : ''

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-end overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="container relative z-10 py-12">
          {event.eventType && (
            <span className="inline-block bg-[#E2B748] text-[#191919] text-xs font-semibold px-3 py-1 rounded mb-3 uppercase tracking-wider">
              {TYPE_LABELS[event.eventType] ?? event.eventType}
            </span>
          )}
          <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold leading-tight max-w-3xl">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Details + Content */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {descriptionHtml ? (
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              ) : (
                <p className="text-gray-500 italic">No description available.</p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-heading text-xl text-[#16697A] mb-3">Event Details</h3>
                <span className="gold-divider" />

                {event.startDate && (
                  <div className="flex gap-3 mb-3">
                    <span className="text-[#C95D63] text-lg">📅</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Date</p>
                      <p className="text-gray-800 text-sm">{formatDate(event.startDate)}</p>
                      {event.endDate && event.endDate !== event.startDate && (
                        <p className="text-gray-600 text-sm">to {formatDate(event.endDate)}</p>
                      )}
                    </div>
                  </div>
                )}

                {venue && (
                  <div className="flex gap-3 mb-3">
                    <span className="text-[#C95D63] text-lg">📍</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Venue</p>
                      <p className="text-gray-800 text-sm font-medium">{venue.name}</p>
                      {venue.address && <p className="text-gray-600 text-sm">{venue.address}</p>}
                      {venue.city && (
                        <p className="text-gray-600 text-sm">
                          {venue.city}{venue.country ? ', ' + venue.country : ''}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {event.eventType && (
                  <div className="flex gap-3 mb-4">
                    <span className="text-[#C95D63] text-lg">✦</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Type</p>
                      <p className="text-gray-800 text-sm">{TYPE_LABELS[event.eventType] ?? event.eventType}</p>
                    </div>
                  </div>
                )}

                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#C95D63] text-white py-3 rounded font-medium hover:bg-[#f4442e] transition-colors"
                  >
                    Register Now
                  </a>
                )}
              </div>

              <Link
                href={event.isPast ? '/events/past' : '/events'}
                className="block text-center text-sm text-[#16697A] border-2 border-[#16697A] rounded py-2.5 hover:bg-[#16697A] hover:text-white transition-colors"
              >
                ← Back to {event.isPast ? 'Past' : 'Upcoming'} Events
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
