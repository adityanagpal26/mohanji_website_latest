import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Spiritual Practices | Mohanji',
  description:
    'Explore the transformative spiritual practices taught by Mohanji — from Consciousness Kriya and Shaktipat to Mai-Tri Method and Conscious Dancing.',
}

function getDescriptionText(richText: any): string {
  if (!richText?.root?.children) return ''
  return richText.root.children
    .filter((n: any) => n.type === 'paragraph')
    .map((n: any) => n.children?.map((c: any) => c.text || '').join('') || '')
    .filter(Boolean)
    .join(' ')
}

export default async function PracticesPage() {
  const payload = await getPayloadClient()

  // Fetch the practices listing page from CMS
  const { docs: pageResults } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'practices-listing' } },
    depth: 1,
    limit: 1,
  })
  const cms = (pageResults[0] as any)?.practicesListingContent ?? {}
  const heroImageUrl = typeof cms.heroImage === 'object' ? cms.heroImage?.url : null

  // Fetch all practices
  const { docs: practices } = await payload.find({
    collection: 'practices',
    sort: 'title',
    depth: 1,
    limit: 30,
  })

  const regularPractices = (practices as any[]).filter((p) => !p.isExternalPractice)
  const externalPractices = (practices as any[]).filter((p) => p.isExternalPractice)

  return (
    <div>
      {/* Hero — only renders if heroTitle exists in CMS */}
      {cms.heroTitle && (
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0">
            {heroImageUrl ? (
              <Image src={heroImageUrl} alt={cms.heroTitle} fill className="object-cover" priority sizes="100vw" />
            ) : (
              <div className="absolute inset-0 hero-gradient" />
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

      {/* Practices grid */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container">
          {practices.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Practices are being added. Please check back soon.
            </p>
          ) : (
            <>
              {/* Regular practices */}
              {regularPractices.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {regularPractices.map((practice: any) => {
                    const imageUrl =
                      typeof practice.featuredImage === 'object' && practice.featuredImage?.url
                        ? practice.featuredImage.url
                        : null
                    const descText = getDescriptionText(practice.description)

                    return (
                      <div
                        key={practice.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                      >
                        <Link href={`/practices/${practice.slug}`} className="group block">
                          <div className="relative h-48 bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 overflow-hidden">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={practice.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-5xl opacity-20">🕉</span>
                              </div>
                            )}
                            {practice.category && (
                              <div className="absolute top-3 left-3 bg-[#16697A] text-white text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide">
                                {practice.category}
                              </div>
                            )}
                            {practice.duration && (
                              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">
                                {practice.duration}
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="p-5 flex flex-col flex-1">
                          <Link href={`/practices/${practice.slug}`} className="group">
                            <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors">
                              {practice.title}
                            </h3>
                          </Link>
                          {practice.tagline && (
                            <p className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mb-2">
                              {practice.tagline}
                            </p>
                          )}
                          {descText && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                              {descText}
                            </p>
                          )}
                          <div className="mt-auto">
                            <Link
                              href={`/practices/${practice.slug}`}
                              className="block text-center text-sm border-2 border-[#16697A] text-[#16697A] py-2 rounded hover:bg-[#16697A] hover:text-white transition-colors font-medium"
                            >
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* External practices */}
              {externalPractices.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-heading text-2xl text-[#16697A] text-center mb-2">
                    More Practices
                  </h2>
                  <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-8" />
                  <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
                    {externalPractices.map((practice: any) => {
                      const descText = getDescriptionText(practice.description)
                      const href = practice.externalPageUrl || practice.primaryCta?.url || '#'

                      return (
                        <a
                          key={practice.id}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col border-t-4 border-[#E2B748]"
                        >
                          {practice.category && (
                            <span className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mb-1">
                              {practice.category}
                            </span>
                          )}
                          <h3 className="font-heading text-xl text-[#16697A] mb-1 group-hover:text-[#C95D63] transition-colors">
                            {practice.title}
                          </h3>
                          {practice.tagline && (
                            <p className="text-xs text-gray-500 italic mb-2">{practice.tagline}</p>
                          )}
                          {descText && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                              {descText}
                            </p>
                          )}
                          <span className="mt-auto text-sm font-semibold text-[#C95D63] group-hover:underline">
                            Visit external site →
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA — only renders if ctaHeading exists in CMS */}
      {cms.ctaHeading && (
        <section className="py-16 bg-[#16697A] text-white text-center">
          <div className="container max-w-2xl">
            <h2 className="font-heading text-3xl mb-1">{cms.ctaHeading}</h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-4" />
            {cms.ctaText && (
              <p className="text-white/85 leading-relaxed mb-8">{cms.ctaText}</p>
            )}
            {cms.ctaLinkLabel && cms.ctaLinkUrl && (
              <Link
                href={cms.ctaLinkUrl}
                className="inline-block bg-[#E2B748] text-[#191919] font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors"
              >
                {cms.ctaLinkLabel}
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
