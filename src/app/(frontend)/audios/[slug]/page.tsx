import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

// ── Platform brand config ─────────────────────────────────────────────────────
// Matches on lowercased `platform` field value — add more as needed
const PLATFORM_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  spotify: {
    label: 'Spotify',
    bg: '#1DB954',
    text: '#ffffff',
    icon: <SpotifyIcon />,
  },
  'apple music': {
    label: 'Apple Music',
    bg: 'linear-gradient(135deg,#FC3C44,#FF6D63)',
    text: '#ffffff',
    icon: <AppleMusicIcon />,
  },
  'itunes': {
    label: 'iTunes',
    bg: 'linear-gradient(135deg,#EA45CF,#9B59B6)',
    text: '#ffffff',
    icon: <ItunesIcon />,
  },
  'amazon music': {
    label: 'Amazon Music',
    bg: '#232F3E',
    text: '#FF9900',
    icon: <AmazonMusicIcon />,
  },
  amazon: {
    label: 'Amazon',
    bg: '#FF9900',
    text: '#111111',
    icon: <AmazonMusicIcon />,
  },
  'youtube music': {
    label: 'YouTube Music',
    bg: '#FF0000',
    text: '#ffffff',
    icon: <YoutubeIcon />,
  },
  youtube: {
    label: 'YouTube',
    bg: '#FF0000',
    text: '#ffffff',
    icon: <YoutubeIcon />,
  },
  'google play': {
    label: 'Google Play',
    bg: '#4285F4',
    text: '#ffffff',
    icon: <GooglePlayIcon />,
  },
  'google play music': {
    label: 'Google Play',
    bg: '#4285F4',
    text: '#ffffff',
    icon: <GooglePlayIcon />,
  },
  'deezer': {
    label: 'Deezer',
    bg: '#A238FF',
    text: '#ffffff',
    icon: <MusicNoteIcon />,
  },
  'soundcloud': {
    label: 'SoundCloud',
    bg: '#FF5500',
    text: '#ffffff',
    icon: <MusicNoteIcon />,
  },
}

function getPlatformConfig(platform: string) {
  return PLATFORM_CONFIG[platform.toLowerCase()] ?? {
    label: platform,
    bg: '#16697A',
    text: '#ffffff',
    icon: <MusicNoteIcon />,
  }
}

// ── Audio type labels ─────────────────────────────────────────────────────────
const TYPE_LABELS: Record<string, string> = {
  prayer: 'Prayer',
  mantra: 'Mantra',
  chant:  'Chant',
  talk:   'Spiritual Talk',
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateStaticParams() { return [] }

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
      description: `Listen to ${audio.title} — a sacred ${audio.audioType ?? 'audio'} by Mohanji Foundation.`,
    }
  } catch { return {} }
}

// ── Page ──────────────────────────────────────────────────────────────────────
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
    audio = docs[0]
  } catch { return notFound() }

  if (!audio) return notFound()

  const coverUrl =
    typeof audio.featuredImage === 'object' && audio.featuredImage?.url
      ? audio.featuredImage.url
      : null

  const typeLabel = TYPE_LABELS[audio.audioType] ?? audio.audioType ?? ''
  const tracks: { title: string; duration?: string }[] =
    Array.isArray(audio.tracks) ? audio.tracks : []
  const storeLinks: { platform: string; url: string; label?: string }[] =
    Array.isArray(audio.storeLinks) ? audio.storeLinks : []

  // Fallback: if old audioFile field exists but no storeLinks
  const legacyAudioUrl =
    typeof audio.audioFile === 'object' && audio.audioFile?.url
      ? audio.audioFile.url
      : typeof audio.audioFile === 'string'
        ? audio.audioFile
        : null

  return (
    <div>
      {/* ── Breadcrumb strip ─────────────────────────────────────────────── */}
      <section className="hero-gradient py-10">
        <div className="container">
          <nav className="text-white/70 text-sm flex items-center gap-2">
            <Link href="/store" className="hover:text-white transition-colors">Store</Link>
            <span>/</span>
            <Link href="/store?tab=audio" className="hover:text-white transition-colors">Audio</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{audio.title}</span>
          </nav>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 items-start">

            {/* ── Album artwork ────────────────────────────────────────── */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-xs aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={audio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20">
                    <div className="w-20 h-20 rounded-full bg-[#16697A]/20 flex items-center justify-center mb-4">
                      <span className="text-[#16697A] text-4xl">♪</span>
                    </div>
                    <p className="text-center text-sm text-[#16697A] font-heading font-semibold px-6 opacity-60 leading-tight">
                      {audio.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Type + duration pill */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {typeLabel && (
                  <span className="bg-[#16697A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {typeLabel}
                  </span>
                )}
                {audio.duration && (
                  <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {audio.duration}
                  </span>
                )}
              </div>
            </div>

            {/* ── Details ──────────────────────────────────────────────── */}
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-[#16697A] leading-tight mb-3">
                {audio.title}
              </h1>
              <span className="block w-12 h-0.5 bg-[#E2B748] mb-6" />

              {/* Description */}
              {audio.description && typeof audio.description === 'string' && (
                <p className="text-gray-600 leading-relaxed mb-8">{audio.description}</p>
              )}

              {/* ── Track Listing ─────────────────────────────────────── */}
              {tracks.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-xl text-[#16697A] mb-4 flex items-center gap-2">
                    <span className="text-[#E2B748]">♬</span> Track List
                  </h2>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    {tracks.map((track, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-4 px-5 py-3.5 ${
                          i !== tracks.length - 1 ? 'border-b border-gray-100' : ''
                        } hover:bg-[#16697A]/5 transition-colors group`}
                      >
                        <span className="w-7 h-7 rounded-full bg-[#16697A]/10 text-[#16697A] text-xs font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-[#16697A] group-hover:text-white transition-colors">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-sm text-gray-800 font-medium">{track.title}</span>
                        {track.duration && (
                          <span className="text-xs text-gray-400 flex-shrink-0">{track.duration}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Store Links ───────────────────────────────────────── */}
              {storeLinks.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-xl text-[#16697A] mb-4">Listen &amp; Purchase</h2>
                  <div className="flex flex-wrap gap-3">
                    {storeLinks.map((link, i) => {
                      const config = getPlatformConfig(link.platform)
                      return (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: config.bg,
                            color: config.text,
                          }}
                          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:opacity-90 hover:shadow-md transition-all"
                        >
                          <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                            {config.icon}
                          </span>
                          {link.label || config.label}
                          <ExternalIcon color={config.text} />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Legacy HTML5 audio fallback — only shown if no store links */}
              {storeLinks.length === 0 && legacyAudioUrl && (
                <div className="mb-10">
                  <h2 className="font-heading text-xl text-[#16697A] mb-4">Listen</h2>
                  <audio controls className="w-full rounded-lg" preload="metadata">
                    <source src={legacyAudioUrl} type="audio/mpeg" />
                    <source src={legacyAudioUrl} type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <Link href="/store?tab=audio" className="text-sm text-[#16697A] hover:underline flex items-center gap-1">
                ← Back to Store
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Platform SVG icons ────────────────────────────────────────────────────────

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a6.303 6.303 0 00-1.912-.77c-.727-.17-1.46-.244-2.202-.28C16.55.027 16.14 0 12 0S7.45.027 6.54.04C5.8.077 5.066.15 4.339.32c-.738.176-1.396.498-1.962.92C1.498 1.938.875 2.8.56 3.854a9.345 9.345 0 00-.27 2.115C.027 7.457 0 7.867 0 12s.027 4.542.04 5.461c.037.74.11 1.474.28 2.201.317 1.31 1.062 2.31 2.18 3.043a6.303 6.303 0 001.912.77c.727.17 1.46.244 2.202.28.919.015 1.328.04 5.468.04s4.55-.027 5.461-.04c.74-.037 1.474-.11 2.201-.28 1.31-.317 2.31-1.062 3.043-2.18a6.303 6.303 0 00.77-1.912c.17-.727.244-1.46.28-2.202.015-.919.04-1.328.04-5.468s-.027-4.55-.04-5.461zM12 18a6 6 0 110-12 6 6 0 010 12zm6.406-10.845a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>
  )
}

function ItunesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M9.617 3.462L9.617 14.743C9.07 14.427 8.445 14.25 7.782 14.25 5.715 14.25 4.032 15.932 4.032 18 4.032 20.067 5.715 21.75 7.782 21.75 9.85 21.75 11.532 20.067 11.532 18L11.532 6.218 18.75 4.5 18.75 11.743C18.203 11.427 17.578 11.25 16.915 11.25 14.848 11.25 13.165 12.932 13.165 15 13.165 17.067 14.848 18.75 16.915 18.75 18.982 18.75 20.665 17.067 20.665 15L20.665 2.25 9.617 3.462Z"/>
    </svg>
  )
}

function AmazonMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.732 1.767-2.958 2.295-5.204 2.295-2.659 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.099v-.41c0-.753.059-1.642-.383-2.294-.383-.581-1.124-.822-1.775-.822-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.547.582l-3.065-.333c-.259-.057-.548-.267-.473-.663C5.546 2.01 8.394 1.065 10.955 1.065c1.316 0 3.034.349 4.072 1.344 1.316 1.231 1.19 2.876 1.19 4.669v4.231c0 1.271.527 1.829 1.024 2.518.175.245.213.539-.01.719l-2.087 1.25zm4.893 1.819c-2.342 1.614-5.744 2.471-8.672 2.471-4.103 0-7.8-1.517-10.595-4.037-.22-.199-.023-.47.241-.315 3.018 1.754 6.748 2.812 10.599 2.812 2.601 0 5.461-.539 8.094-1.657.397-.169.729.262.333.726z"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M1.22 0c-.603.33-1.022.958-1.022 1.693v20.614c0 .721.402 1.353.992 1.68l11.492-11.992L1.22 0zm21.458 10.063l-3.914-2.231-2.48 2.231 2.48 2.643 3.936-2.254c.65-.372.65-1.655-.022-2.389zM2.834 23.994l13.727-7.76-2.669-2.849-11.058 10.609zm13.727-20.228L2.834.006l11.058 10.609 2.669-2.849z"/>
    </svg>
  )
}

function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M9 3v10.55A4 4 0 107 17V7h8V3H9z"/>
    </svg>
  )
}

function ExternalIcon({ color }: { color: string }) {
  return (
    <svg className="w-3 h-3 opacity-70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
