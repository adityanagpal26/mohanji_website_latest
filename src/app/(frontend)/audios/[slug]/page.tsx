import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return []
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  try {
    const { docs } = await payload.find({
      collection: 'audios',
      where: { slug: { equals: slug } },
      depth: 0,
      limit: 1,
    })
    const audio = docs[0] as any
    if (!audio) return {}
    return {
      title: `${audio.title} | Sacred Sounds | Mohanji`,
      description:
        audio.description ??
        `Listen to ${audio.title} — a sacred ${audio.audioType ?? 'audio'} by Mohanji Foundation.`,
    }
  } catch {
    return {}
  }
}

const TYPE_LABELS: Record<string, string> = {
  prayer: 'Prayer',
  mantra: 'Mantra',
  chant: 'Chant',
  talk: 'Spiritual Talk',
  meditation: 'Meditation',
  music: 'Sacred Music',
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

export default async function AudioDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  let audio: any = null
  try {
    const { docs } = await payload.find({
      collection: 'audios',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    audio = docs[0] as any
  } catch {
    return notFound()
  }

  if (!audio) return notFound()

  const audioUrl =
    typeof audio.audioFile === 'object' && audio.audioFile?.url
      ? audio.audioFile.url
      : typeof audio.audioFile === 'string'
        ? audio.audioFile
        : null

  const downloadUrl = audioUrl
  const typeLabel = TYPE_LABELS[audio.audioType] ?? audio.audioType ?? ''
  const duration = formatDuration(audio.duration)

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          {typeLabel && (
            <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
              {typeLabel}
            </p>
          )}
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">{audio.title}</h1>
          <span className="gold-divider gold-divider--center" />
          {duration && (
            <p className="text-white/70 text-sm mt-3">Duration: {duration}</p>
          )}
        </div>
      </section>

      {/* Audio player */}
      <section className="py-16 bg-white">
        <div className="container max-w-2xl">
          <div className="bg-[#F5F5F5] rounded-2xl p-8 text-center shadow-sm">
            {audioUrl ? (
              <>
                <div className="w-20 h-20 rounded-full bg-[#16697A] text-white flex items-center justify-center text-4xl mx-auto mb-6">
                  ♫
                </div>
                <h2 className="font-heading text-2xl text-[#16697A] mb-6">{audio.title}</h2>
                {/* HTML5 audio player */}
                <audio
                  controls
                  className="w-full mb-6"
                  preload="metadata"
                >
                  <source src={audioUrl} type="audio/mpeg" />
                  <source src={audioUrl} type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>

                {/* Download button */}
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download
                    className="inline-block border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-6 py-3 rounded transition-colors font-medium"
                  >
                    Download Audio
                  </a>
                )}
              </>
            ) : (
              <div className="py-12">
                <div className="w-20 h-20 rounded-full bg-[#16697A]/20 flex items-center justify-center text-4xl mx-auto mb-6 text-[#16697A]/50">
                  ♫
                </div>
                <p className="text-gray-500">Audio file coming soon.</p>
              </div>
            )}
          </div>

          {/* Description */}
          {audio.description && (
            <div className="mt-10">
              <h2 className="font-heading text-2xl text-[#16697A] mb-2">About This Recording</h2>
              <span className="gold-divider" />
              <p className="text-gray-700 leading-relaxed mt-4">
                {typeof audio.description === 'string' ? audio.description : ''}
              </p>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/audios"
              className="border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-5 py-2.5 rounded transition-colors text-sm"
            >
              ← Back to Sacred Sounds
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
