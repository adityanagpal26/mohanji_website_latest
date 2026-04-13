import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { formatDate } from '@/lib/utils'

type Props = {
  heading?: string
  filter?: 'upcoming' | 'past' | 'all'
  limit?: number
  viewAllUrl?: string
}

export async function EventCarouselBlock({ heading = 'Upcoming Events', filter = 'upcoming', limit = 6, viewAllUrl = '/events' }: Props) {
  const payload = await getPayloadClient()

  const where: Record<string, any> = { status: { equals: 'published' } }
  if (filter === 'upcoming') where.isPast = { equals: false }
  if (filter === 'past') where.isPast = { equals: true }

  const { docs: events } = await payload.find({
    collection: 'events',
    where,
    limit,
    sort: filter === 'past' ? '-startDate' : 'startDate',
    depth: 1,
  })

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-[#16697A]">{heading}</h2>
            <span className="gold-divider" />
          </div>
          <Link href={viewAllUrl} className="text-sm text-[#C95D63] hover:text-[#f4442e] font-medium transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: any) => (
            <Link key={event.id} href={`/events/${event.slug}`} className="group">
              <article className="bg-white rounded shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                {event.featuredImage?.url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={event.featuredImage.url}
                      alt={event.featuredImage.alt ?? event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs font-medium text-[#C95D63] uppercase tracking-wide mb-1">
                    {event.startDate ? formatDate(event.startDate) : ''}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#191919] group-hover:text-[#16697A] transition-colors">
                    {event.title}
                  </h3>
                  {event.venue?.city && (
                    <p className="text-sm text-gray-500 mt-1">{event.venue.city}{event.venue.country ? `, ${event.venue.country}` : ''}</p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
