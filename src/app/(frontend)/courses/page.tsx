import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Empowered Courses | Mohanji',
  description:
    'Make your life more purposeful. Empowered courses by Mohanji — online workshops and in-person retreats to reinvent yourself and awaken your highest potential.',
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default async function CoursesPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'courses' } },
    depth: 0,
    limit: 1,
  })

  const page = docs[0] as any
  const cms = page?.coursesLandingContent ?? {}

  const heroTagline: string = cms.heroTagline ?? 'Online Courses & Workshops'
  const heroTitle: string = cms.heroTitle ?? 'EMPOWERED!'
  const heroSubtitle: string = cms.heroSubtitle ?? ''
  const heroCtaLabel: string = cms.heroCtaLabel ?? 'View All Courses'
  const heroCtaUrl: string = cms.heroCtaUrl ?? 'https://mohanji.org/courses/'
  const whatToExpectTitle: string = cms.whatToExpectTitle ?? 'What to Expect'
  const whatToExpectItems: Array<{ title: string; description: string }> = Array.isArray(cms.whatToExpectItems) ? cms.whatToExpectItems : []
  const pathStripTitle: string = cms.pathStripTitle ?? 'Choose Your Path'
  const pathStripBody: string = cms.pathStripBody ?? ''
  const courseCards: Array<{
    title: string
    courseType?: string
    format?: string
    level?: string
    description?: string
    externalUrl?: string
  }> = Array.isArray(cms.courseCards) ? cms.courseCards : []
  const testimonialsTitle: string = cms.testimonialsTitle ?? 'What Participants Say'
  const testimonials: Array<{ quote: string; name: string; course?: string }> = Array.isArray(cms.testimonials) ? cms.testimonials : []
  const ctaTitle: string = cms.ctaTitle ?? ''
  const ctaBody: string = cms.ctaBody ?? ''
  const ctaPrimaryLabel: string = cms.ctaPrimaryLabel ?? ''
  const ctaPrimaryUrl: string = cms.ctaPrimaryUrl ?? ''
  const ctaSecondaryLabel: string = cms.ctaSecondaryLabel ?? ''
  const ctaSecondaryUrl: string = cms.ctaSecondaryUrl ?? ''

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="hero-gradient py-24 text-center">
        <div className="container">
          {heroTagline && (
            <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
              {heroTagline}
            </p>
          )}
          <h1 className="text-white font-heading text-4xl md:text-6xl font-semibold mb-2">
            {heroTitle}
          </h1>
          <span className="gold-divider gold-divider--center" />
          {heroSubtitle && (
            <p className="text-white/85 text-xl max-w-2xl mx-auto leading-relaxed mt-4">
              {heroSubtitle}
            </p>
          )}
          {heroCtaLabel && heroCtaUrl && (
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a
                href={heroCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-3 rounded font-medium transition-colors"
              >
                {heroCtaLabel}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── What to Expect ──────────────────────────────────────────────────── */}
      {whatToExpectItems.length > 0 && (
        <section className="py-14 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl text-[#16697A] mb-1">{whatToExpectTitle}</h2>
              <span className="gold-divider gold-divider--center" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whatToExpectItems.map((item, i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-lg p-5 border-l-4 border-[#16697A]">
                  <h3 className="font-heading text-lg text-[#16697A] mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Path Strip ──────────────────────────────────────────────────────── */}
      {(pathStripTitle || pathStripBody) && (
        <section className="py-12 bg-[#16697A] text-white">
          <div className="container max-w-3xl text-center">
            {pathStripTitle && (
              <h2 className="font-heading text-3xl mb-1">{pathStripTitle}</h2>
            )}
            <span className="gold-divider gold-divider--center" />
            {pathStripBody && (
              <p className="text-white/80 leading-relaxed mt-4">{pathStripBody}</p>
            )}
          </div>
        </section>
      )}

      {/* ── Course Cards ────────────────────────────────────────────────────── */}
      {courseCards.length > 0 && (
        <section className="py-12 bg-[#F5F5F5]">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courseCards.map((card, i) => {
                const levelColor = card.level ? (LEVEL_COLORS[card.level] ?? 'bg-gray-100 text-gray-600') : ''
                const levelLabel = card.level ? (LEVEL_LABELS[card.level] ?? card.level) : ''
                return (
                  <a
                    key={i}
                    href={card.externalUrl ?? 'https://mohanji.org/courses/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    <div className="relative h-12 bg-gradient-to-r from-[#16697A] to-[#5B2D8E] flex items-center px-4 gap-2">
                      {levelLabel && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${levelColor}`}>
                          {levelLabel}
                        </span>
                      )}
                      {card.courseType && (
                        <span className="text-white/70 text-xs uppercase tracking-wider">{card.courseType}</span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors">
                        {card.title}
                      </h3>
                      {card.format && (
                        <p className="text-xs text-gray-400 mb-3">{card.format}</p>
                      )}
                      {card.description && (
                        <p className="text-gray-600 text-sm leading-relaxed flex-1">{card.description}</p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#C95D63] group-hover:underline">
                          Find out more →
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
              {testimonialsTitle}
            </h2>
            <span className="gold-divider gold-divider--center" />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-lg p-6">
                  <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-semibold text-[#16697A] text-sm">{t.name}</p>
                  {t.course && (
                    <p className="text-xs text-[#E2B748] font-semibold">{t.course}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      {(ctaTitle || ctaBody) && (
        <section className="py-16 hero-gradient text-center">
          <div className="container max-w-2xl">
            {ctaTitle && (
              <h2 className="font-heading text-3xl text-white mb-1">{ctaTitle}</h2>
            )}
            <span className="gold-divider gold-divider--center" />
            {ctaBody && (
              <p className="text-white/80 mb-8 mt-4">{ctaBody}</p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {ctaPrimaryLabel && ctaPrimaryUrl && (
                <a
                  href={ctaPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
                >
                  {ctaPrimaryLabel}
                </a>
              )}
              {ctaSecondaryLabel && ctaSecondaryUrl && (
                <Link
                  href={ctaSecondaryUrl}
                  className="px-8 py-3 border-2 border-white text-white font-medium rounded hover:bg-white hover:text-[#16697A] transition-colors"
                >
                  {ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
