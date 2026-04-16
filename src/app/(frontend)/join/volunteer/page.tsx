import React from 'react'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata = {
  title: 'Volunteer for a Greater Good | Mohanji',
  description:
    'Find out about opportunities to create a better tomorrow. Volunteer with the Mohanji Foundation and contribute to a global mission of love and compassion.',
}

const DEFAULT_HERO_TITLE = 'Volunteer for a Greater Good'
const DEFAULT_HERO_SUBTITLE = 'Find out about opportunities to create a better tomorrow'

const DEFAULT_WHY_TITLE = 'Why Volunteer?'

const DEFAULT_WHY_TEXT =
  "Giving selflessly to all beings, one's community, animals and birds, as well as serving the Earth with an attitude of gratitude is the pillar of Mohanji's teachings. Mohanji says that volunteering makes us complete only if it is done selflessly. Volunteering should become our lifestyle, then it truly becomes extremely powerful and uplifting.\n\nSocial service or selfless action of any kind gives us a chance to unhook from the accumulating dues and karmas of life and helps us live a more purposeful life.\n\nMohanji Foundation brings people together in a mission to make this world a better place. Guided by love and compassion, we strive to give our best to every living being who needs help and support, be it material, emotional or spiritual. We believe that in this way we contribute to the establishment of harmony in the society and the world.\n\nEveryone has something to give. It can be a skill (writing, translating, graphic design, video editing), a craft (knitting, embroidery), or our time, our smiles and hugs, or the willingness of our hands to pack or carry, etc. Your 'little' can mean a lot to someone! No matter how small our deeds may seem, when we do them with pure intention, their effect spreads through the entire universe."

const DEFAULT_PULL_QUOTE =
  'Believe in what you do, believe in volunteering, believe in being selfless, have no expectation – then, volunteering becomes your strength.'

const DEFAULT_OPPORTUNITIES_TITLE = 'Current Opportunities'

const DEFAULT_OPPORTUNITIES = [
  { role: 'Microsoft Azure Administrator' },
  { role: 'Digital Marketing Specialist (Podcasts)' },
  { role: 'Web Copy Writer' },
  { role: 'UI / UX Designer' },
]

const DEFAULT_JOIN_LABEL = 'Volunteer'
const DEFAULT_JOIN_URL = 'https://forms.gle/f657nFpcmZqvooMu6'

export default async function VolunteerPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'volunteer' } },
    depth: 1,
    limit: 1,
  })
  const cms = (docs[0] as any)?.volunteerContent ?? {}

  const heroTitle: string = cms.heroTitle || DEFAULT_HERO_TITLE
  const heroSubtitle: string = cms.heroSubtitle || DEFAULT_HERO_SUBTITLE
  const heroImageUrl: string | null = cms.heroImage?.url || null
  const whySectionTitle: string = cms.whySectionTitle || DEFAULT_WHY_TITLE
  const whySectionText: string = cms.whySectionText || DEFAULT_WHY_TEXT
  const pullQuote: string = cms.pullQuote || DEFAULT_PULL_QUOTE
  const opportunitiesTitle: string = cms.opportunitiesTitle || DEFAULT_OPPORTUNITIES_TITLE
  const opportunities: { role: string }[] =
    cms.opportunities?.length ? cms.opportunities : DEFAULT_OPPORTUNITIES
  const joinButtonLabel: string = cms.joinButtonLabel || DEFAULT_JOIN_LABEL
  const joinButtonUrl: string = cms.joinButtonUrl || DEFAULT_JOIN_URL

  const whyParagraphs = whySectionText.split('\n\n').filter(Boolean)

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
          <p className="mt-5 text-white/85 max-w-2xl mx-auto leading-relaxed text-lg">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── Why Volunteer ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold text-center mb-2">
            {whySectionTitle}
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="mt-8 space-y-4">
            {whyParagraphs.map((para, i) => (
              <p key={i} className="text-[#2B2828] leading-relaxed text-[15px]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull Quote ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#16697A] text-white text-center">
        <div className="container max-w-3xl">
          <p className="font-heading text-xl md:text-2xl italic leading-relaxed">
            &ldquo;{pullQuote}&rdquo;
          </p>
        </div>
      </section>

      {/* ── Current Opportunities ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] font-semibold text-center mb-2">
            {opportunitiesTitle}
          </h2>
          <span className="gold-divider gold-divider--center" />
          <ul className="mt-8 space-y-3">
            {opportunities.map((opp, i) => (
              <li
                key={i}
                className="flex items-center gap-4 bg-white rounded-lg px-6 py-4 shadow-sm"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E2B748] flex items-center justify-center text-white font-semibold text-sm">
                  {i + 1}
                </span>
                <span className="text-[#2B2828] font-medium text-[15px] uppercase tracking-wide">
                  {opp.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white text-center">
        <div className="container max-w-2xl">
          <p className="text-[#2B2828] leading-relaxed text-[15px] mb-8">
            Ready to make a difference? Fill out the form and join our global volunteer community.
          </p>
          <a
            href={joinButtonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C95D63] text-white px-10 py-3 rounded font-semibold text-sm uppercase tracking-wide hover:bg-[#f4442e] transition-colors"
          >
            {joinButtonLabel}
          </a>
        </div>
      </section>
    </div>
  )
}
