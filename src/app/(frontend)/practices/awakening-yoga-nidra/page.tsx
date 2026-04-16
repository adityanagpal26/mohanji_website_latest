import React from 'react'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata = {
  title: 'Awakening Yoga Nidra Meditation | Mohanji',
  description:
    'Experience deep gratitude, inner richness and get empowered to face any challenge of life more effectively through Awakening Yoga Nidra Meditation guided by Mohanji and conducted by Devi Mohan.',
}

const DEFAULT_TAGLINE =
  'Experience deep gratitude, inner richness and get empowered to face any challenge of life more effectively'

const DEFAULT_INTRO =
  'Awakening Yoga Nidra Meditation is a method guided by Mohanji and conducted by Devi Mohan. It is based on the ancient method of effective, progressive relaxation called Yoga Nidra (self-induced, conscious yogic sleep).'

const DEFAULT_WHY_TITLE = 'Why Awakening Yoga Nidra Meditation'

const DEFAULT_WHY_TEXT =
  'Yoga Nidra is a beautiful method of inner cleansing, balancing and empowerment done in the alpha, receptive state of the mind.\n\nAwakening Yoga Nidra however goes a step further than the standard guided Yoga Nidra Meditation: the Grace of Guru Tattwa (the Guru Principle within) is invoked and, as Devi connects with the higher consciousness through her spiritual guide, Mohanji, she guides the group through a process of intense inner cleansing, bringing back the memory of the Soul\'s journey and the Light beyond all the veils of illusion.\n\nWhat emerges from the unconscious mind during the cleansing part of the process is exactly what one is ready to face, integrate and absorb at that moment in time.\n\nLove and gratitude which are experienced are immense and are the key to the inner healing process.\n\nIt is important to note that this is not a hypnotic state, as one is partially aware that he/she is lying on the floor in Shavasana (i.e. the "corpse pose") and following the guidance. However, a vivid and profound inner journey is experienced through the inner senses as they are fully active in this deeply relaxed state.\n\nThe process is very intense but completely safe.\n\nAwakening Yoga Nidra can be done comfortably by people of any age group and fitness level and requires no specific preparation. After light warm up exercises of Traditional Yoga (HSTY), one relaxes in the comfortable lying position of Shavasana and simply follows the guidance provided.'

const DEFAULT_BENEFITS_TITLE = 'Benefits'

const DEFAULT_BENEFITS_TEXT =
  'Through guided Awakening Yoga Nidra meditation one gets empowered to face any life challenges by strengthening the connection with the inner witness (sakshi bhaav), the key to our ability to rise above pain in any challenging moment of life.\n\nOther benefits include balancing of the left and right side of the brain and speeding up the process of self-healing and spiritual awakening.\n\nMost importantly, the intense inner thirst for spiritual liberation in this life is enhanced many times over!\n\nEven if one only briefly touches on the "no-mind" state (a timeless state devoid of thoughts), they may emerge from the Awakening Yoga Nidra session birthed into a new reality — blessed with a deep, palpable feeling of inner richness, gratitude and empowerment.'

const DEFAULT_BENEFITS_LIST = [
  'Sincere gratitude and calmness',
  'Increased awareness',
  'Integration with the Self',
]

export default async function AwakeningYogaNidraPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'awakening-yoga-nidra' } },
    depth: 1,
    limit: 1,
  })
  const cms = (docs[0] as any)?.awakeningYogaNidraContent ?? {}

  const heroTitle: string = cms.heroTitle || 'Awakening Yoga Nidra Meditation'
  const tagline: string = cms.tagline || DEFAULT_TAGLINE
  const introText: string = cms.introText || DEFAULT_INTRO
  const deviMohanUrl: string = cms.deviMohanUrl || 'https://www.devimohan.com'
  const whySectionTitle: string = cms.whySectionTitle || DEFAULT_WHY_TITLE
  const whySectionText: string = cms.whySectionText || DEFAULT_WHY_TEXT
  const hstyUrl: string = cms.hstyUrl || 'https://himalayanschool.com'
  const downloadMeditationUrl: string | null = cms.downloadMeditationUrl || null
  const benefitsSectionTitle: string = cms.benefitsSectionTitle || DEFAULT_BENEFITS_TITLE
  const benefitsText: string = cms.benefitsText || DEFAULT_BENEFITS_TEXT
  const benefitsList: string[] = cms.benefitsList?.length
    ? cms.benefitsList.map((b: any) => b.benefit)
    : DEFAULT_BENEFITS_LIST
  const ctaLabel: string = cms.ctaLabel || 'Contact Us'
  const ctaUrl: string = cms.ctaUrl || '/contact'

  const heroImageUrl: string | null = cms.heroImage?.url || null
  const whyImageUrl: string = cms.whySectionImage?.url || '/images/practices/awakening-yoga-nidra.jpg'

  // Build Why section paragraphs — replace HSTY mention with a link
  const whyParagraphs = whySectionText.split('\n\n').filter(Boolean)

  // Build benefits text paragraphs
  const benefitsParagraphs = benefitsText.split('\n\n').filter(Boolean)

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

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <p className="text-[#2B2828] leading-relaxed text-[15px]">
            {introText.replace('Devi Mohan', '').trim()}
            {/* Inject Devi Mohan as a link */}
            {introText.includes('Devi Mohan') && (
              <>
                {introText.split('Devi Mohan')[0]}
                <a
                  href={deviMohanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#16697A] underline hover:text-[#C95D63] transition-colors"
                >
                  Devi Mohan
                </a>
                {introText.split('Devi Mohan')[1]}
              </>
            )}
          </p>
        </div>
      </section>

      {/* ── Why Section ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
              <Image
                src={whyImageUrl}
                alt={whySectionTitle}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl text-[#16697A] font-semibold mb-2">
                {whySectionTitle}
              </h2>
              <span className="gold-divider" />
              <div className="mt-5 space-y-4">
                {whyParagraphs.map((para, i) => {
                  // Linkify HSTY reference
                  if (para.includes('HSTY')) {
                    const parts = para.split('HSTY')
                    return (
                      <p key={i} className="text-[#2B2828] leading-relaxed text-[15px]">
                        {parts[0]}
                        <a
                          href={hstyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16697A] underline hover:text-[#C95D63] transition-colors"
                        >
                          HSTY
                        </a>
                        {parts[1]}
                      </p>
                    )
                  }
                  return (
                    <p key={i} className="text-[#2B2828] leading-relaxed text-[15px]">
                      {para}
                    </p>
                  )
                })}
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

      {/* ── Pull Quote ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#16697A] text-white text-center">
        <div className="container max-w-3xl">
          <p className="font-heading text-2xl md:text-3xl italic leading-relaxed">
            "{tagline}"
          </p>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold text-center mb-2">
            {benefitsSectionTitle}
          </h2>
          <span className="gold-divider gold-divider--center" />

          <div className="mt-8 space-y-4">
            {benefitsParagraphs.map((para, i) => (
              <p key={i} className="text-[#2B2828] leading-relaxed text-[15px]">
                {para}
              </p>
            ))}
          </div>

          {benefitsList.length > 0 && (
            <ul className="mt-6 space-y-2">
              {benefitsList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#E2B748] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                  <span className="text-[#2B2828] text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F5F5F5] text-center">
        <div className="container">
          <a
            href={ctaUrl}
            className="inline-block bg-[#C95D63] text-white px-10 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#f4442e] transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </section>
    </div>
  )
}
