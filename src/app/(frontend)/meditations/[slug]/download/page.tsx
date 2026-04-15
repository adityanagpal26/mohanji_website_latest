import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { MeditationPlayerClient } from '@/components/meditations/MeditationPlayerClient'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'meditations',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const med = docs[0] as any
  if (!med) return {}
  return {
    title: `Download ${med.title} | Mohanji`,
    description: `Download ${med.title} free in multiple languages — guided meditation by Mohanji.`,
  }
}

export async function generateStaticParams() {
  return []
}

export default async function MeditationDownloadPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'meditations',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  const meditation = docs[0] as any
  if (!meditation) return notFound()

  const title = meditation.title ?? 'Meditation'
  const bannerImageUrl =
    typeof meditation.featuredImage === 'object' && meditation.featuredImage?.url
      ? meditation.featuredImage.url
      : null

  const downloads = (meditation.downloads ?? []).map((dl: any) => ({
    language: dl.language,
    url: typeof dl.audioFile === 'object' && dl.audioFile?.url ? dl.audioFile.url : null,
    duration: dl.fileSize ?? undefined,  // fileSize stores the duration text e.g. "52:52"
  }))

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative min-h-[300px] flex items-end overflow-hidden">
        {bannerImageUrl ? (
          <Image
            src={bannerImageUrl}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#16697A] to-[#5B2D8E]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 py-10 text-center">
          <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold mb-3 uppercase">
            {title}
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-4" />
          <p className="text-white/80">
            {downloads.length > 0
              ? `Available in ${downloads.length} language${downloads.length !== 1 ? 's' : ''}`
              : 'Free download — guided meditation by Mohanji'}
            {meditation.duration && ` · ${meditation.duration}`}
          </p>
        </div>
      </section>

      {/* Player + Download Grid */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl text-[#16697A] text-center mb-2">
            Play or Download in Your Language
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-3" />
          <p className="text-center text-gray-500 text-sm mb-8">
            Click ▶ to listen in your browser, or ↓ to save the file to your device.
          </p>

          {downloads.length > 0 ? (
            <MeditationPlayerClient downloads={downloads} title={title} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                Download links coming soon. Visit mohanji.org for immediate access.
              </p>
              <a
                href="https://mohanji.org/free-guided-meditation/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#C95D63] text-white rounded font-medium hover:bg-[#f4442e] transition-colors"
              >
                Visit mohanji.org for Downloads
              </a>
            </div>
          )}
        </div>
      </section>

      {/* How to Use — from CMS (howToUse array on meditation record) */}
      {meditation.howToUse?.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl text-[#16697A] text-center mb-2">
              How to Use This Meditation
            </h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-8" />
            <div className={`grid gap-6 text-center ${meditation.howToUse.length === 3 ? 'sm:grid-cols-3' : meditation.howToUse.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-4'}`}>
              {(meditation.howToUse as any[]).map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#16697A] text-white flex items-center justify-center font-heading font-semibold text-lg mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-[#16697A] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 bg-[#F5F5F5] border-t border-gray-200">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/meditations/${slug}`}
            className="text-sm text-[#16697A] font-semibold hover:underline"
          >
            ← About This Meditation
          </Link>
          <Link
            href="/meditations"
            className="text-sm text-[#16697A] border border-[#16697A] px-5 py-2 rounded hover:bg-[#16697A] hover:text-white transition-colors font-semibold"
          >
            All Meditations
          </Link>
        </div>
      </section>
    </div>
  )
}
