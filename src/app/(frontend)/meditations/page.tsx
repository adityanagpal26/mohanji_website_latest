import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Free Guided Meditations | Mohanji',
  description: 'Free guided meditations by Mohanji, available in multiple languages.',
}

function getDescriptionText(richText: any): string {
  if (!richText?.root?.children) return ''
  return richText.root.children
    .filter((n: any) => n.type === 'paragraph')
    .map((n: any) => n.children?.map((c: any) => c.text || '').join('') || '')
    .filter(Boolean)
    .join(' ')
}

export default async function MeditationsPage() {
  const payload = await getPayloadClient()

  // Fetch the meditations listing page from CMS
  const { docs: pageResults } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'meditations-listing' } },
    depth: 1,
    limit: 1,
  })
  const cms = (pageResults[0] as any)?.meditationsListingContent ?? {}

  const heroImageUrl = typeof cms.heroImage === 'object' ? cms.heroImage?.url : null

  // Fetch all meditations
  const { docs: meditations } = await payload.find({
    collection: 'meditations',
    sort: 'title',
    depth: 1,
    limit: 20,
  })

  return (
    <div>
      {/* Hero — only renders if heroTitle exists in CMS */}
      {cms.heroTitle && (
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0">
            {heroImageUrl ? (
              <Image src={heroImageUrl} alt={cms.heroTitle} fill className="object-cover" priority sizes="100vw" />
            ) : (
              // Local fallback image — not text content, just a background
              <Image src="/images/meditations/bg.webp" alt="" fill className="object-cover" priority sizes="100vw" />
            )}
            <div className="absolute inset-0 bg-[#16697A]/80" />
          </div>
          <div className="relative z-10 container">
            <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
              {cms.heroTitle}
            </h1>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
            {cms.heroSubtitle && (
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                {cms.heroSubtitle}
              </p>
            )}
            {cms.brochureUrl && (
              <a
                href={cms.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 px-7 py-3 bg-[#E2B748] text-[#191919] font-semibold rounded hover:bg-[#c9a23f] transition-colors"
              >
                Download Brochure
              </a>
            )}
          </div>
        </section>
      )}

      {/* Intro — only renders if introText exists in CMS */}
      {cms.introText && (
        <section className="py-10 bg-white">
          <div className="container max-w-3xl text-center">
            <p className="text-gray-600 leading-relaxed text-lg">{cms.introText}</p>
          </div>
        </section>
      )}

      {/* Meditation cards */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container">
          {meditations.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Meditations are being added. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {(meditations as any[]).map((meditation) => {
                const imageUrl =
                  typeof meditation.featuredImage === 'object' && meditation.featuredImage?.url
                    ? meditation.featuredImage.url
                    : null
                const downloadCount = meditation.downloads?.length ?? 0
                const descText = getDescriptionText(meditation.description)

                return (
                  <div
                    key={meditation.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    <Link href={`/meditations/${meditation.slug}`} className="group block">
                      <div className="relative h-52 bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={meditation.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl opacity-30">☯</span>
                          </div>
                        )}
                        {meditation.duration && (
                          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide">
                            {meditation.duration}
                          </div>
                        )}
                        {downloadCount > 0 && (
                          <div className="absolute bottom-3 right-3 bg-[#E2B748] text-[#191919] text-xs font-semibold px-2 py-1 rounded">
                            {downloadCount} language{downloadCount !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <Link href={`/meditations/${meditation.slug}`} className="group">
                        <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-2 group-hover:text-[#C95D63] transition-colors">
                          {meditation.title}
                        </h3>
                      </Link>
                      {descText && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {descText}
                        </p>
                      )}
                      <div className="mt-auto flex gap-3">
                        <Link
                          href={`/meditations/${meditation.slug}`}
                          className="flex-1 text-center text-sm border-2 border-[#16697A] text-[#16697A] py-2 rounded hover:bg-[#16697A] hover:text-white transition-colors font-medium"
                        >
                          Read More
                        </Link>
                        <Link
                          href={`/meditations/${meditation.slug}/download`}
                          className="flex-1 text-center text-sm bg-[#C95D63] text-white py-2 rounded hover:bg-[#f4442e] transition-colors font-medium"
                        >
                          Download
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA — only renders if ctaHeading exists in CMS */}
      {cms.ctaHeading && (
        <section className="py-16 bg-white text-center">
          <div className="container max-w-2xl">
            <h2 className="font-heading text-3xl text-[#16697A] mb-1">{cms.ctaHeading}</h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-4" />
            {cms.ctaText && <p className="text-gray-600 mb-8">{cms.ctaText}</p>}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses" className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors">
                Explore Courses
              </Link>
              <Link href="/events" className="px-8 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors">
                Upcoming Events
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
