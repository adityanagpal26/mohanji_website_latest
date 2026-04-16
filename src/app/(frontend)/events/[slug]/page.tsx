import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 1800

type Props = { params: Promise<{ slug: string }> }

// ── Lexical richText renderer ────────────────────────────────────────────────
function renderNode(node: any): string {
  if (!node) return ''
  switch (node.type) {
    case 'root':
      return (node.children || []).map(renderNode).join('')
    case 'paragraph':
      return `<p>${(node.children || []).map(renderNode).join('')}</p>`
    case 'heading': {
      const tag = node.tag || 'h2'
      return `<${tag}>${(node.children || []).map(renderNode).join('')}</${tag}>`
    }
    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${(node.children || []).map(renderNode).join('')}</${tag}>`
    }
    case 'listitem':
      return `<li>${(node.children || []).map(renderNode).join('')}</li>`
    case 'quote':
      return `<blockquote>${(node.children || []).map(renderNode).join('')}</blockquote>`
    case 'link': {
      const href = node.fields?.url || node.url || '#'
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${(node.children || []).map(renderNode).join('')}</a>`
    }
    case 'text': {
      let text = node.text || ''
      if (node.format & 1) text = `<strong>${text}</strong>`
      if (node.format & 2) text = `<em>${text}</em>`
      if (node.format & 8) text = `<u>${text}</u>`
      return text
    }
    case 'linebreak':
      return '<br />'
    default:
      return (node.children || []).map(renderNode).join('')
  }
}

function renderRichText(content: any): string {
  if (!content?.root) return ''
  return renderNode(content.root)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatDateRange(startDate: string, endDate?: string | null, displayDate?: string | null): string {
  if (displayDate) return displayDate
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const start = new Date(startDate).toLocaleDateString('en-GB', opts)
  if (!endDate) return start
  const end = new Date(endDate).toLocaleDateString('en-GB', opts)
  return `${start} – ${end}`
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
    title: `${event.title} | Mohanji`,
    description:
      event.shortDescription ||
      `Join us for ${event.title}${event.startDate ? ' on ' + formatDate(event.startDate) : ''}.`,
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
    depth: 1,
    limit: 1,
  })
  const event = docs[0] as any
  if (!event) return notFound()

  // Support both old (featuredImage) and new (coverImage) fields
  const imageUrl: string | null =
    event.coverImage?.url || event.featuredImage?.url || null

  const bodyHtml = event.description ? renderRichText(event.description) : ''

  const dateLabel = formatDateRange(event.startDate, event.endDate, event.displayDate)
  const isPast = event.startDate && new Date(event.startDate) < new Date()

  // CTA — new fields take priority, fall back to legacy registrationUrl
  const ctaLabel: string = event.ctaLabel || (event.registrationUrl ? 'Register Now' : '')
  const ctaUrl: string = event.ctaUrl || event.registrationUrl || ''
  const ctaExternal: boolean = event.ctaExternal ?? true

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#16697A] to-[#0d4a56]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 py-14">
          <p className="text-[#E2B748] text-sm font-semibold uppercase tracking-widest mb-3">
            {dateLabel}
            {event.location && <span className="text-white/60 ml-3">· {event.location}</span>}
          </p>
          <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold leading-tight max-w-3xl">
            {event.title}
          </h1>
          {event.tagline && (
            <p className="text-white/80 mt-3 text-lg max-w-2xl">{event.tagline}</p>
          )}
        </div>
      </section>

      {/* ── Content + Sidebar ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main body */}
            <div className="lg:col-span-2">
              {bodyHtml ? (
                <div
                  className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#16697A] prose-a:text-[#16697A] prose-strong:text-[#2B2828] prose-blockquote:border-[#E2B748] prose-blockquote:italic prose-li:text-[#2B2828]"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
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
                  <div className="flex gap-3 mb-4 mt-4">
                    <span className="text-[#E2B748] text-lg mt-0.5">📅</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Date</p>
                      <p className="text-gray-800 text-sm">{dateLabel}</p>
                    </div>
                  </div>
                )}

                {event.location && (
                  <div className="flex gap-3 mb-4">
                    <span className="text-[#E2B748] text-lg mt-0.5">📍</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Location</p>
                      <p className="text-gray-800 text-sm">{event.location}</p>
                    </div>
                  </div>
                )}

                {ctaUrl && (
                  <a
                    href={ctaUrl}
                    target={ctaExternal ? '_blank' : '_self'}
                    rel={ctaExternal ? 'noopener noreferrer' : undefined}
                    className="block w-full text-center bg-[#C95D63] text-white py-3 rounded font-semibold hover:bg-[#f4442e] transition-colors mt-2"
                  >
                    {ctaLabel || 'Register Now'}
                  </a>
                )}
              </div>

              <Link
                href={isPast ? '/past-events' : '/future-events'}
                className="block text-center text-sm text-[#16697A] border-2 border-[#16697A] rounded py-2.5 hover:bg-[#16697A] hover:text-white transition-colors"
              >
                ← Back to {isPast ? 'Past' : 'Upcoming'} Events
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
