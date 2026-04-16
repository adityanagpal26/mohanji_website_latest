import React from 'react'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata = {
  title: 'Mohanji Youth Club | Mohanji',
  description:
    'Mohanji Youth Club is a global youth network which exists to empower and inspire fellow youngsters to live authentic, positive and purpose-driven lives.',
}

const DEFAULT_HERO_TITLE = 'Mohanji Youth Club'

const DEFAULT_INTRO =
  "Mohanji Youth Club is a global youth network which exists to empower and inspire fellow youngsters to live authentic, positive and purpose-driven lives.\n\nIt is inspired by the work and teachings of Mohanji to 'Be good. Do Good.'\n\nWe serve as a platform for youth to break their boundaries. Our aim is to empower youth to explore and express their full potential beyond the limitations of the mind."

const DEFAULT_PULL_QUOTE = 'Break your boundaries !!'

const DEFAULT_ACTIVITIES_TITLE = 'What We Do'

const DEFAULT_ACTIVITIES = [
  {
    title: 'Educational Programs & Trainings',
    description:
      "Youth-focused workshops, seminars, and training sessions grounded in Mohanji's teachings. Programs cover leadership, mindfulness, and conscious living to equip young people with tools for purposeful growth.",
  },
  {
    title: 'Picnics & Festivals',
    description:
      'Joyful outdoor gatherings and cultural celebrations that bring young people together in a spirit of fun, friendship, and community. These events nurture bonds across backgrounds, cultures, and borders.',
  },
  {
    title: 'Selfless Service',
    description:
      "Volunteering and seva (selfless service) activities — from feeding the hungry to environmental care and community support. Service is the heart of MYC, reflecting the principle of 'Be good. Do Good.'",
  },
]

const DEFAULT_AWARDS_TITLE = 'MYC Awards & Areas of Interest'

const DEFAULT_AWARDS_TEXT =
  'The MYC Awards recognize exceptional contributions by young members who demonstrate outstanding commitment to service, leadership, and personal development. Each year, youth clubs from around the world are celebrated for their impactful activities and initiatives that uplift communities and inspire others.'

const DEFAULT_AREAS_TITLE = 'Areas of Interest'

const DEFAULT_AREAS_TEXT =
  'Arts & Culture\nEnvironment & Sustainability\nHealth & Wellness\nEducation & Mentoring\nAnimal Welfare\nCommunity Development\nSpirituality & Inner Growth'

const DEFAULT_ELIGIBILITY =
  'All youngsters (aged 14-29) are welcome to join existing youth clubs and therefore join the global family-like community.'

const DEFAULT_JOIN_LABEL = 'Join the Youth Club'
const DEFAULT_JOIN_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd8v541hsenk652wuQnmhjS6XyTJNmRKa-bb6i9vRdKjRZpSQ/viewform'

const DEFAULT_BROCHURE_URL = 'https://mohanji.org/wp-content/uploads/2026/04/MYC-Brochure.pdf'

export default async function YouthClubPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'youth-club' } },
    depth: 1,
    limit: 1,
  })
  const cms = (docs[0] as any)?.youthClubContent ?? {}

  const heroTitle: string = cms.heroTitle || DEFAULT_HERO_TITLE
  const heroImageUrl: string | null = cms.heroImage?.url || null
  const introText: string = cms.introText || DEFAULT_INTRO
  const pullQuote: string = cms.pullQuote || DEFAULT_PULL_QUOTE
  const activitiesTitle: string = cms.activitiesTitle || DEFAULT_ACTIVITIES_TITLE
  const activities: { title: string; description: string; imageUrl?: string }[] =
    cms.activities?.length
      ? cms.activities.map((a: any) => ({
          title: a.title,
          description: a.description,
          imageUrl: a.image?.url as string | undefined,
        }))
      : DEFAULT_ACTIVITIES
  const awardsTitle: string = cms.awardsTitle || DEFAULT_AWARDS_TITLE
  const awardsText: string = cms.awardsText || DEFAULT_AWARDS_TEXT
  const areasTitle: string = cms.areasTitle || DEFAULT_AREAS_TITLE
  const areasText: string = cms.areasText || DEFAULT_AREAS_TEXT
  const eligibilityText: string = cms.eligibilityText || DEFAULT_ELIGIBILITY
  const joinButtonLabel: string = cms.joinButtonLabel || DEFAULT_JOIN_LABEL
  const joinButtonUrl: string = cms.joinButtonUrl || DEFAULT_JOIN_URL
  const brochureUrl: string = cms.brochureUrl || DEFAULT_BROCHURE_URL

  const introParagraphs = introText.split('\n\n').filter(Boolean)
  const areasList = areasText.split('\n').filter(Boolean)

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-gradient-to-r from-[#16697A] to-[#0d4a56] py-20 text-center text-white overflow-hidden"
        style={
          heroImageUrl
            ? {
                backgroundImage: `url(${heroImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        {heroImageUrl && <div className="absolute inset-0 bg-[#16697A]/70" />}
        <div className="container relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">{heroTitle}</h1>
          <span className="gold-divider gold-divider--center" />
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center space-y-4">
          {introParagraphs.map((para, i) => (
            <p key={i} className="text-[#2B2828] leading-relaxed text-[15px]">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── Pull Quote ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#16697A] text-white text-center">
        <div className="container max-w-3xl">
          <p className="font-heading text-2xl md:text-3xl italic leading-relaxed">
            &ldquo;{pullQuote}&rdquo;
          </p>
        </div>
      </section>

      {/* ── Activities ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold text-center mb-2">
            {activitiesTitle}
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {activities.map((act, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {act.imageUrl ? (
                  <div className="relative aspect-[4/3]">
                    <Image src={act.imageUrl} alt={act.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-[#16697A]/10 flex items-center justify-center">
                    <span className="text-[#16697A] font-heading text-4xl font-semibold">
                      {i + 1}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-xl text-[#16697A] font-semibold mb-3">
                    {act.title}
                  </h3>
                  <p className="text-[#2B2828] text-[15px] leading-relaxed">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards & Areas of Interest ────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold text-center mb-2">
            {awardsTitle}
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="mt-10 grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
            {/* Awards */}
            <div>
              <p className="text-[#2B2828] leading-relaxed text-[15px]">{awardsText}</p>
            </div>
            {/* Areas */}
            <div>
              <h3 className="font-heading text-xl text-[#16697A] font-semibold mb-4">
                {areasTitle}
              </h3>
              <ul className="space-y-2">
                {areasList.map((area, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#E2B748] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path
                          d="M10 3L5 8.5 2 5.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    <span className="text-[#2B2828] text-[15px] leading-relaxed">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Eligibility + CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5] text-center">
        <div className="container max-w-2xl">
          <p className="text-[#2B2828] leading-relaxed text-[15px] mb-8">{eligibilityText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={joinButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C95D63] text-white px-10 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#f4442e] transition-colors"
            >
              {joinButtonLabel}
            </a>
            {brochureUrl && (
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#16697A] text-[#16697A] px-10 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#16697A] hover:text-white transition-colors"
              >
                Download Brochure
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
