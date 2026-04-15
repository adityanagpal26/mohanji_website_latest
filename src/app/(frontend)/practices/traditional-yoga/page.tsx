import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata = {
  title: 'Himalayan School of Traditional Yoga | Mohanji',
  description:
    'Himalayan School of Traditional Yoga (HSTY) is dedicated to propagating traditional yoga as per the original teachings of Maharishi Patanjali, under the guidance of Mohanji.',
}

const DEFAULT_TAGLINE =
  'Yoga is the science of staying liberated, through conscious connection with oneself, maintaining sensitivity, fluidity and flexibility'

const DEFAULT_INTRO =
  'Himalayan School of Traditional Yoga (HSTY) is dedicated to propagating traditional yoga, i.e. the essence of yoga as per the original teachings codified in the scriptures by Maharishi Patanjali. Set up under the inspiration and guidance of Mohanji, HSTY\'s mission is to promote a culture of yoga and make it accessible to all of mankind, beyond boundaries of country, religion, gender, class and wealth.'

const DEFAULT_WHY_TITLE = 'Why Himalayan School Of Traditional Yoga?'

const DEFAULT_WHY_TEXT =
  'HSTY offers authentic yoga rooted in the Patanjali tradition — not just postures, but a complete path of living. Our teachers are trained to transmit the full depth of yoga philosophy alongside the physical practice.\n\nEvery program at HSTY is designed to take you beyond the physical, into the subtler dimensions of breath, energy, and awareness. Rooted in tradition yet practical for modern life.\n\nThrough individual and group programs, HSTY serves seekers across the world, offering tools for sustained wellbeing, inner balance, and spiritual growth — accessible to everyone regardless of background or ability.'

const DEFAULT_PROGRAMS = [
  'Yoga Teacher Training — A comprehensive residential program rooted in classical yoga, covering asana, pranayama, philosophy, meditation, and teaching methodology.',
  'Wellness Retreats — Immersive programs combining traditional yoga, meditation, and conscious living practices in serene natural settings.',
  'Online Programs — Live and recorded courses bringing traditional yoga teachings to practitioners worldwide, with direct teacher guidance.',
  'Children\'s Yoga — Age-appropriate programs introducing children to yoga\'s physical, mental, and ethical dimensions through play and awareness.',
]

export default async function TraditionalYogaPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'traditional-yoga' } },
    depth: 1,
    limit: 1,
  })
  const cms = (docs[0] as any)?.traditionalYogaContent ?? {}

  const heroTitle = cms.heroTitle || 'Himalayan School Of Traditional Yoga'
  const tagline = cms.tagline || DEFAULT_TAGLINE
  const introText = cms.introText || DEFAULT_INTRO
  const whySectionTitle = cms.whySectionTitle || DEFAULT_WHY_TITLE
  const whySectionText: string = cms.whySectionText || DEFAULT_WHY_TEXT
  const whyParagraphs = whySectionText.split('\n\n').filter(Boolean)
  const downloadMeditationUrl: string | null = cms.downloadMeditationUrl || null
  const programs: string[] = cms.programs?.length
    ? cms.programs.map((p: any) => p.text)
    : DEFAULT_PROGRAMS
  const visitUsUrl: string = cms.visitUsUrl || 'https://himalayanschool.com/yoga'
  const visitUsLabel: string = cms.visitUsLabel || 'Visit Us'

  const heroImageUrl: string | null = cms.heroImage?.url || null

  const whyImageUrl: string | null =
    cms.whySectionImage?.url || `/images/practices/why-traditional-yoga.jpg`

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-gradient-to-r from-[#16697A] to-[#0d4a56] py-20 text-center text-white overflow-hidden"
        style={
          heroImageUrl
            ? { backgroundImage: `url(${heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}
        }
      >
        {heroImageUrl && <div className="absolute inset-0 bg-[#16697A]/70" />}
        <div className="container relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">{heroTitle}</h1>
          <span className="gold-divider gold-divider--center" />
          <p className="mt-5 text-white/85 max-w-2xl mx-auto leading-relaxed italic text-lg">
            "{tagline}"
          </p>
        </div>
      </section>

      {/* ── Intro / Mission ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <p className="text-[#2B2828] leading-relaxed text-[15px]">{introText}</p>
        </div>
      </section>

      {/* ── Why HSTY ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
              <Image
                src={whyImageUrl}
                alt={whySectionTitle}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="font-heading text-3xl text-[#16697A] font-semibold mb-2">
                {whySectionTitle}
              </h2>
              <span className="gold-divider" />
              <div className="mt-5 space-y-4">
                {whyParagraphs.map((para, i) => (
                  <p key={i} className="text-[#2B2828] leading-relaxed text-[15px]">
                    {para}
                  </p>
                ))}
              </div>
              {downloadMeditationUrl && (
                <a
                  href={downloadMeditationUrl}
                  className="mt-6 inline-block bg-[#C95D63] text-white px-6 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#f4442e] transition-colors"
                >
                  Download Meditation
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull Quote ───────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#16697A] text-white text-center">
        <div className="container max-w-3xl">
          <p className="font-heading text-2xl md:text-3xl italic leading-relaxed">
            "{tagline}"
          </p>
        </div>
      </section>

      {/* ── Programs ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold text-center mb-2">
            Our Programs
          </h2>
          <span className="gold-divider gold-divider--center" />
          <ol className="mt-10 space-y-6">
            {programs.map((program, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#16697A] text-white flex items-center justify-center font-semibold text-sm">
                  {i + 1}
                </span>
                <p className="text-[#2B2828] leading-relaxed text-[15px] pt-1">{program}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Visit Us CTA ─────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F5F5F5] text-center">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold mb-4">
            Learn More About HSTY
          </h2>
          <span className="gold-divider gold-divider--center" />
          <p className="mt-5 text-[#2B2828] max-w-xl mx-auto leading-relaxed mb-8">
            Explore the full range of programs, courses, and teacher training offered by the
            Himalayan School of Traditional Yoga.
          </p>
          <a
            href={visitUsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C95D63] text-white px-10 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#f4442e] transition-colors"
          >
            {visitUsLabel}
          </a>
        </div>
      </section>
    </div>
  )
}
