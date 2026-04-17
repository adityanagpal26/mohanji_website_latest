import React from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Media | Mohanji',
  description: "Mohanji's teachings on podcast and video — listen and watch directly on this page.",
}

export default async function MediaPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { pageType: { equals: 'media-landing' } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  })

  const page = docs[0] as any
  const cms = page?.mediaLandingContent ?? {}

  const podcastTitle: string       = cms.podcastSectionTitle ?? 'Podcasts'
  const podcastSubtitle: string    = cms.podcastSectionSubtitle ?? "Listen to Mohanji's teachings, conversations, and Q&A sessions — play directly on this page."
  const podbeanUrl: string         = cms.podbeanChannelUrl ?? '#'
  const podcasts: any[]            = cms.podcasts ?? []

  const videoTitle: string         = cms.videoSectionTitle ?? 'Videos'
  const videoSubtitle: string      = cms.videoSectionSubtitle ?? "Watch selected videos from the official Mohanji Foundation YouTube channel."
  const youtubeUrl: string         = cms.youtubeChannelUrl ?? '#'
  const videos: any[]              = cms.videos ?? []

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Media
          </p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Podcasts &amp; Videos
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Listen to Mohanji's teachings on podcast and explore video content — play directly on this page.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <a
              href="#podcast"
              className="bg-[#E2B748] text-[#1a1a1a] px-6 py-2.5 rounded font-semibold hover:bg-[#f0c842] transition-colors text-sm"
            >
              🎙️ Podcasts
            </a>
            <a
              href="#videos"
              className="border border-white/60 text-white px-6 py-2.5 rounded font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              ▶️ Videos
            </a>
          </div>
        </div>
      </section>

      {/* ── Podcast section ───────────────────────────────────────── */}
      <section id="podcast" className="py-20 bg-white scroll-mt-16">
        <div className="container">
          {/* Section heading */}
          <div className="text-center mb-12">
            <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-2">
              Listen
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] font-semibold mb-3">
              {podcastTitle}
            </h2>
            <span className="block w-10 h-0.5 bg-[#E2B748] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">{podcastSubtitle}</p>
          </div>

          {podcasts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-5xl mb-4">🎙️</p>
              <p className="text-lg">Podcast episodes coming soon.</p>
              {podbeanUrl && podbeanUrl !== '#' && (
                <a
                  href={podbeanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[#16697A] hover:underline text-sm"
                >
                  Visit our Podbean channel →
                </a>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {podcasts.map((episode: any, i: number) => (
                  <div
                    key={episode.id ?? i}
                    className="bg-[#F9F9F9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Embed player */}
                    {episode.embedCode ? (
                      <div
                        className="w-full [&>iframe]:w-full [&>iframe]:max-w-full"
                        dangerouslySetInnerHTML={{ __html: episode.embedCode }}
                      />
                    ) : (
                      <div className="h-32 bg-[#16697A]/10 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🎙️</span>
                      </div>
                    )}

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-lg text-[#16697A] leading-snug mb-2">
                        {episode.title}
                      </h3>
                      {episode.description && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {episode.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View All button */}
              {podbeanUrl && podbeanUrl !== '#' && (
                <div className="text-center mt-12">
                  <a
                    href={podbeanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#16697A] text-white px-8 py-3 rounded hover:bg-[#0e4f5c] transition-colors font-medium"
                  >
                    View All Podcasts on Podbean →
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E2B748]/40 to-transparent" />

      {/* ── Video section ─────────────────────────────────────────── */}
      <section id="videos" className="py-20 bg-[#F5F5F5] scroll-mt-16">
        <div className="container">
          {/* Section heading */}
          <div className="text-center mb-12">
            <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-2">
              Watch
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-[#16697A] font-semibold mb-3">
              {videoTitle}
            </h2>
            <span className="block w-10 h-0.5 bg-[#E2B748] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">{videoSubtitle}</p>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-5xl mb-4">▶️</p>
              <p className="text-lg">Videos coming soon.</p>
              {youtubeUrl && youtubeUrl !== '#' && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[#16697A] hover:underline text-sm"
                >
                  Visit our YouTube channel →
                </a>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video: any, i: number) => (
                  <div
                    key={video.id ?? i}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Video embed — 16:9 aspect ratio */}
                    {video.embedCode ? (
                      <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <div
                          className="absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                          dangerouslySetInnerHTML={{ __html: video.embedCode }}
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-[#16697A]/10 flex items-center justify-center">
                        <span className="text-4xl opacity-30">▶️</span>
                      </div>
                    )}

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-lg text-[#16697A] leading-snug mb-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* View All button */}
              {youtubeUrl && youtubeUrl !== '#' && (
                <div className="text-center mt-12">
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#C95D63] text-white px-8 py-3 rounded hover:bg-[#b04a50] transition-colors font-medium"
                  >
                    View All Videos on YouTube →
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
