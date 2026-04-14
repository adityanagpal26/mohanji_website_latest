import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function renderRichText(content: any): string {
  if (!content?.root?.children) return ''
  return content.root.children
    .map((node: any) => {
      if (node.type === 'paragraph')
        return `<p>${node.children?.map((c: any) => c.text || '').join('') || ''}</p>`
      if (node.type === 'heading')
        return `<h${node.tag?.slice(1) || 2}>${node.children?.map((c: any) => c.text || '').join('') || ''}</h${node.tag?.slice(1) || 2}>`
      if (node.type === 'list') {
        const tag = node.listType === 'number' ? 'ol' : 'ul'
        const items = node.children?.map((li: any) =>
          `<li>${li.children?.map((c: any) => c.text || '').join('') || ''}</li>`
        ).join('') || ''
        return `<${tag}>${items}</${tag}>`
      }
      return ''
    })
    .join('')
}

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
    title: med.meta?.title ?? `${med.title} | Mohanji`,
    description: med.meta?.description ?? `Free guided meditation by Mohanji: ${med.title}`,
  }
}

export async function generateStaticParams() {
  return []
}
export default async function MeditationDetailPage({ params }: Props) {
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

  const imageUrl =
    typeof meditation.featuredImage === 'object' && meditation.featuredImage?.url
      ? meditation.featuredImage.url
      : null
  const descriptionHtml = meditation.description ? renderRichText(meditation.description) : ''
  const benefitsHtml = meditation.benefits ? renderRichText(meditation.benefits) : ''
  const instructionsHtml = meditation.instructions ? renderRichText(meditation.instructions) : ''
  const downloads: any[] = meditation.downloads ?? []

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[380px] flex items-end overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={meditation.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="container relative z-10 py-12 text-center">
          <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold mb-3">
            {meditation.title}
          </h1>
          <span className="gold-divider gold-divider--center" />
          {downloads.length > 0 && (
            <p className="text-white/80 text-sm">
              Available in {downloads.length} language{downloads.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: description + benefits + instructions */}
            <div className="lg:col-span-2 space-y-8">
              {descriptionHtml && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-1">About This Meditation</h2>
                  <span className="gold-divider" />
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                      prose-headings:font-heading prose-headings:text-[#16697A]"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </div>
              )}
              {benefitsHtml && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-1">Benefits</h2>
                  <span className="gold-divider" />
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                      prose-ul:list-disc prose-ul:pl-5 prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: benefitsHtml }}
                  />
                </div>
              )}
              {instructionsHtml && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-1">How to Practice</h2>
                  <span className="gold-divider" />
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: instructionsHtml }}
                  />
                </div>
              )}
              {!descriptionHtml && !benefitsHtml && !instructionsHtml && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-gray-500 text-center">
                  Detailed content for this meditation is being added. Please check back soon.
                </div>
              )}
            </div>

            {/* Right: downloads */}
            <aside>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-heading text-xl text-[#16697A] mb-1">Download</h3>
                <span className="gold-divider" />
                {downloads.length === 0 ? (
                  <p className="text-sm text-gray-500 mt-4">Downloads coming soon.</p>
                ) : (
                  <div className="space-y-3 mt-4">
                    {downloads.map((dl: any, idx: number) => {
                      const fileUrl =
                        typeof dl.audioFile === 'object' && dl.audioFile?.url
                          ? dl.audioFile.url
                          : null
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between border border-gray-100 rounded p-3 hover:border-[#16697A]/30 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{dl.language}</p>
                            {dl.fileSize && (
                              <p className="text-xs text-gray-400">{dl.fileSize}</p>
                            )}
                          </div>
                          {fileUrl ? (
                            <a
                              href={fileUrl}
                              download
                              className="text-xs bg-[#C95D63] text-white px-3 py-1.5 rounded hover:bg-[#f4442e] transition-colors whitespace-nowrap"
                            >
                              Download
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">N/A</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
                {typeof meditation.audioPreview === 'object' &&
                  meditation.audioPreview?.url && (
                    <div className="mt-6">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
                        Audio Preview
                      </p>
                      <audio controls src={meditation.audioPreview.url} className="w-full" />
                    </div>
                  )}
              </div>
              <div className="mt-4">
                <Link
                  href={`/meditations/${slug}/download`}
                  className="block text-center text-sm bg-[#16697A] text-white rounded py-2.5 hover:bg-[#125567] transition-colors font-semibold"
                >
                  All Language Downloads
                </Link>
              </div>
              <div className="mt-3">
                <Link
                  href="/meditations"
                  className="block text-center text-sm text-[#16697A] border-2 border-[#16697A] rounded py-2.5 hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  &larr; All Meditations
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white text-center">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-2xl text-[#16697A] mb-3">Explore More Meditations</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Mohanji offers free guided meditations, each addressing a different dimension of
            inner growth. Each one is a gift — freely available in multiple languages.
          </p>
          <Link
            href="/meditations"
            className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-3 rounded font-medium transition-colors"
          >
            View All Meditations
          </Link>
        </div>
      </section>
    </div>
  )
}
