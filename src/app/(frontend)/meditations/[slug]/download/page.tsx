import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

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

  const downloads: Array<{ language: string; url: string | null; fileSize?: string }> =
    (meditation.downloads ?? []).map((dl: any) => ({
      language: dl.language,
      url: typeof dl.audioFile === 'object' && dl.audioFile?.url ? dl.audioFile.url : null,
      fileSize: dl.fileSize ?? undefined,
    }))

  const audioPreviewUrl =
    typeof meditation.audioPreview === 'object' && meditation.audioPreview?.url
      ? meditation.audioPreview.url
      : null

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative min-h-[340px] flex items-end overflow-hidden">
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
        <div className="container relative z-10 py-12 text-center">
          <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold mb-3">
            {title}
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-4" />
          <p className="text-white/80">
            Free download
            {downloads.length > 0
              ? ` — available in ${downloads.length} language${downloads.length !== 1 ? 's' : ''}`
              : ''}
          </p>
        </div>
      </section>

      {/* Audio Preview */}
      {audioPreviewUrl && (
        <section className="py-8 bg-[#16697A]">
          <div className="container max-w-2xl text-center">
            <p className="text-white/80 text-sm uppercase tracking-wider font-semibold mb-4">
              Audio Preview
            </p>
            <audio controls src={audioPreviewUrl} className="w-full rounded" />
          </div>
        </section>
      )}

      {/* Download Grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl text-[#16697A] text-center mb-2">
            Download in Your Language
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-4" />
          <p className="text-center text-gray-500 text-sm mb-10">
            This meditation is offered freely as a gift. Click your language to download.
          </p>

          {downloads.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {downloads.map((lang, idx) => (
                lang.url ? (
                  <a
                    key={idx}
                    href={lang.url}
                    download
                    className="group flex flex-col items-center justify-center gap-2 bg-white rounded-lg p-5 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#16697A]/30 transition-all text-center"
                  >
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[#16697A] transition-colors">
                      {lang.language}
                    </span>
                    <span className="text-xs text-white bg-[#C95D63] group-hover:bg-[#f4442e] px-3 py-1 rounded-full transition-colors font-medium">
                      Download
                    </span>
                    {lang.fileSize && (
                      <span className="text-xs text-gray-400">{lang.fileSize}</span>
                    )}
                  </a>
                ) : (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg p-5 shadow-sm border border-gray-100 text-center opacity-50"
                  >
                    <span className="text-sm font-semibold text-gray-600">{lang.language}</span>
                    <span className="text-xs text-gray-400">Coming soon</span>
                  </div>
                )
              ))}
            </div>
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

      {/* Usage Guidelines */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl text-[#16697A] text-center mb-2">
            How to Use This Meditation
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-8" />
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              {
                step: '1',
                title: 'Find a Quiet Space',
                desc: 'Sit or lie comfortably in a place where you will not be disturbed.',
              },
              {
                step: '2',
                title: 'Use Headphones',
                desc: 'For the best experience, listen with headphones and close your eyes.',
              },
              {
                step: '3',
                title: 'Practise Regularly',
                desc: 'Each session deepens the cleansing. Regular practice brings lasting transformation.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#16697A] text-white flex items-center justify-center font-heading font-semibold text-lg mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#16697A] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-[#F5F5F5] border-t border-gray-200">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/meditations/${slug}`}
            className="text-sm text-[#16697A] font-semibold hover:underline"
          >
            &larr; About This Meditation
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
