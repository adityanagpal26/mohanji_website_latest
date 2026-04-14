import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sacred Sounds | Mohanji',
  description:
    'Listen to sacred prayers, mantras, chants, and spiritual talks by Mohanji. Nourish your soul with the sacred sounds of the tradition.',
}

const TYPE_LABELS: Record<string, string> = {
  prayer: 'Prayer',
  mantra: 'Mantra',
  chant: 'Chant',
  talk: 'Spiritual Talk',
  meditation: 'Meditation',
  music: 'Sacred Music',
}

const TYPE_COLORS: Record<string, string> = {
  prayer: 'bg-[#16697A] text-white',
  mantra: 'bg-[#5B2D8E] text-white',
  chant: 'bg-[#E2B748] text-[#191919]',
  talk: 'bg-[#C95D63] text-white',
  meditation: 'bg-gray-600 text-white',
  music: 'bg-teal-600 text-white',
}

function formatDuration(duration: string | number | null): string {
  if (!duration) return ''
  if (typeof duration === 'string') return duration
  if (typeof duration === 'number') {
    const mins = Math.floor(duration / 60)
    const secs = duration % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }
  return ''
}

export default async function AudiosPage() {
  const payload = await getPayloadClient()

  const { docs: audios } = await payload.find({
    collection: 'audios',
    sort: 'title',
    depth: 1,
    limit: 20,
  })

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Sacred Sounds
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Prayers, mantras, chants, and sacred music from the Mohanji tradition —
            nourishment for the soul.
          </p>
        </div>
      </section>

      {/* Type legend */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <span
                key={key}
                className={`text-xs font-semibold px-3 py-1 rounded-full ${TYPE_COLORS[key] ?? 'bg-gray-300 text-white'}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Audios grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          {audios.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Audio content is being added. Please check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(audios as any[]).map((audio) => {
                const slug = audio.slug ?? ''
                const title = audio.title ?? 'Untitled'
                const audioType = audio.audioType ?? ''
                const duration = formatDuration(audio.duration)
                const typeLabel = TYPE_LABELS[audioType] ?? audioType
                const typeColor = TYPE_COLORS[audioType] ?? 'bg-gray-400 text-white'

                return (
                  <Link
                    key={audio.id}
                    href={`/audios/${slug}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#16697A]/10 flex items-center justify-center group-hover:bg-[#16697A]/20 transition-colors">
                      <span className="text-[#16697A] text-xl">&#9654;</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors line-clamp-2">
                        {title}
                      </h3>
                      {audio.description && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-2">
                          {audio.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {typeLabel && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${typeColor}`}>
                            {typeLabel}
                          </span>
                        )}
                        {duration && (
                          <span className="text-xs text-gray-400">{duration}</span>
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
