import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { FaqAccordion } from '@/components/mai-tri/FaqAccordion'
import { MaiTriSessionForm } from '@/components/mai-tri/MaiTriSessionForm'

export const revalidate = 3600

export const metadata = {
  title: 'Mai-Tri Method | Mohanji',
  description:
    'A profound method of deep cleansing and harmonizing — removing blockages even from the subtlest layer of existence.',
}

export default async function MaiTriMethodPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'mai-tri-method' } },
    depth: 2,
    limit: 1,
  })
  const page = docs[0] as any
  const cms = page?.maiTriContent ?? {}

  // ── Resolved values (CMS → fallback) ──────────────────────────────────────
  const heroTitle = cms.heroTitle || 'Mai-Tri Method'
  const heroSubtitle =
    cms.heroSubtitle ||
    'Align and heal your body, mind and spirit. A profound method of deep cleansing and harmonizing — removing blockages even from the subtlest layer of existence.'
  const heroImageUrl =
    cms.heroImage?.url ||
    'https://mohanji.org/wp-content/uploads/2021/11/Group-1159.png'

  const applyNowUrl = cms.applyNowUrl || '/practices/mai-tri-method/apply'

  const introText =
    cms.introText ||
    `Mai-Tri Method is a profound method of deep cleansing and harmonizing in which deep-seated subconscious blockages are removed, even from the subtlest layer of our existence — the causal body — where seeds of karmic impressions are stored. While the cleansing reaches deep into the energy records, it is important to note that Mai-Tri Method does not interfere with the destiny aspect of karma (as this is what has been chosen at the soul level, be it pleasant or unpleasant to our mind).

Mai-Tri Method, for the practitioner, is meditation with a purpose. Through extreme concentration (Dharana) during the process, the practitioner reaches the meditative state (Dhyana), where there is no existence of the practitioner as such and he/she only operates as the pure conduit to carry the energy flowing through Mohanji's consciousness, from the Source itself. This enables the healing to happen, depending on the karmic allowance and the client's receptivity and free will. Hence Mai-Tri is a Meditation with purpose and is a sadhana (spiritual practice) for a practitioner.`

  const meaningText =
    cms.meaningText ||
    `The actual word meaning of "Mai-tri" is friendship, companionship, collaboration, or simply togetherness. "Mai" means mother. The word mother represents unconditional love, protection, care, consistency of emotions, continuity, life, creation. Mother also represents levitation, as in the womb experience. A child finds solace, comfort, freedom and peace in the company of its mother. The sheer presence of mother is itself healing for the child. Motherhood has spontaneous healing impacts on the child.

"Tri" represents trinity. The three aspects of creation are BIRTH, LIFE and DEATH. Trinity also represents the three powers — Will Power, Knowledge Power, and Power of Action. Hence, the word tri represents all aspects of existence. When the pure and eternal energy source combines with the power of will for creation, LIFE happens.`

  const mohanjiQuote =
    cms.mohanjiQuote ||
    `Healing is a part of creation. Healing, revitalization and rejuvenation are aspects deeply connected to the very fabric of terrestrial existence. Healing happens automatically, as long as the mind does not prevent it. Spontaneous healing takes place when we allow nature to function without interruption. Healers are just intenders. They intend that healing takes place. The receiver allows it to happen. We all are natural healers; every man, woman and child naturally possess the capacity to heal themselves.`

  const benefitsIntro =
    cms.benefitsIntro ||
    'This method leads to self-healing and restoration of inner balance at all levels. There are three parts to every Mai-Tri session, each with a distinct benefit:'

  const benefits: string[] =
    cms.benefits?.length > 0
      ? cms.benefits.map((b: any) => b.benefit)
      : [
          'Cleansing of the painful impressions and memories and their effects gathered in the present life, starting with early childhood.',
          'Cleansing of the impressions of the past from the subconscious mind.',
          'Cleansing of the central meridian in order to remove blockages and improve the flow of energy through it.',
        ]

  const benefitsExtra =
    cms.benefitsExtra ||
    "As these deep patterns get released, clarity at the level of the mind ensues. The recipient is empowered to become aware of the key impressions causing imbalances, and to understand which unhealthy habits, behavioural and thought patterns need changing. After the practice, when a lot of weight from deep within has dropped, one enters the mode of alignment and self-healing at the level of body, mind and spirit."

  const individualSessionText =
    cms.individualSessionText ||
    "Individual sessions are 30 minutes long. The overall meeting is up to one hour, including explanations and experience sharing. Practitioners place their palms on the recipient's chakras (energy centres) from the front and back of the body, serving as a pure conduit for Mohanji's energy."

  const groupSessionText =
    cms.groupSessionText ||
    "Group sessions are conducted only by selected senior Mai-Tri practitioners. They can be done in-person or online, with invocation of Mohanji's subtle presence for protection and effectiveness. There is no hand-to-chakra application — only energy work based on verbal guidance. Group energy during these sessions is very strong and the cleansing processes are deep."

  const energyExchangeText =
    cms.energyExchangeText ||
    'The honoring of energy exchange is an important aspect of the Mai-Tri Method. Half of the amount that Mai-Tri Practitioners receive is allocated to feeding people and other sentient beings in need. Satiating the hunger of another being through selfless service adds to the depth of the cleansing and balancing effect of the Mai-Tri Method. The amount exchanged needs to be confirmed with the selected Mai-Tri practitioner directly.'

  const faqs =
    cms.faqs?.length > 0
      ? cms.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))
      : [
          {
            question: 'What is Mai-Tri Method?',
            answer:
              'Mai-Tri Method is a profound method of deep cleansing and harmonizing in which deep-seated subconscious blockages are removed, even from the subtlest layer of our existence — the causal body — where seeds of karmic impressions are stored. While the cleansing reaches deep into the energy records, it is important to note that Mai-Tri Method does not interfere with the destiny aspect of karma.',
          },
          {
            question: 'Who can perform Mai-Tri Method?',
            answer:
              "The Mai-Tri Method is performed by initiated Practitioners who connect with the consciousness of Mohanji, passing on the energy through their palms to the recipient's chakras (energy centers) from the front and the back side of the body.",
          },
          {
            question: 'Who can experience Mai-Tri Method?',
            answer:
              'The Mai-Tri Method can be experienced by individuals of all age groups — from small children (5 years of age and above) to senior citizens, in any state of health. For pregnant ladies and children, Mai-Tri is milder and is done primarily for health purposes, rejuvenation and protection.',
          },
          {
            question: 'How long is a session?',
            answer:
              'Individual sessions are 30 minutes long. On the whole, the meeting is up to one hour long, including explanations and experience sharing. Group sessions can be from 60 to 90 minutes long.',
          },
          {
            question: 'Can Mai-Tri be done online?',
            answer:
              "Yes. Group sessions can be done in person or online, with invocation of Mohanji's subtle presence for protection and effectiveness. There is no hand-to-chakra application in group online sessions — only energy work based on verbal guidance.",
          },
          {
            question: 'What is the energy exchange?',
            answer:
              'The honoring of energy exchange is an important aspect of the Mai-Tri Method. Half of the amount that Mai-Tri Practitioners receive is allocated to feeding of people and other sentient beings in need. Satiating the hunger of another being through selfless service adds to the depth of the cleansing and balancing effect. The amount is to be confirmed with the selected practitioner directly.',
          },
        ]

  const testimonials: Array<{ quote: string; name: string; location?: string }> =
    cms.testimonials?.length > 0
      ? cms.testimonials.map((t: any) => ({
          quote: t.quote as string,
          name: t.name as string,
          location: t.location as string | undefined,
        }))
      : [
          {
            quote:
              "As a Mai-Tri practitioner, I was a witness to many amazing miracles. We are so blessed to be connected to Mohanji and to be given this platform to serve. I have felt my faith and surrender grow exponentially since I was initiated into the Mai-Tri Method. My connection to Mohanji's consciousness has become deeper.",
            name: 'Tina Arya',
            location: 'USA',
          },
          {
            quote:
              'Mai-Tri is a soul impressions release system which acts on the deepest layer of our karmic and ancestral impression, the DNA and the neuron, to deliver an "impression-free soul" that can ultimately merge as an energy with the highest consciousness, when the time comes.',
            name: 'Subhasree',
            location: 'UK',
          },
          {
            quote:
              "The Grace that flows during a Mai-Tri session transcends healing — it reaches one's very essence, invoking the sacred inner balance already gifted to each of us by the Source. Love is the path and destination. May we experience a lasting inner transformation through that Love.",
            name: 'Devi Mohan',
            location: 'Slovenia',
          },
        ]

  const bookingText =
    cms.bookingText ||
    'If you would like to book a Mai-Tri session or have any additional questions, please complete the form below and we will connect you with a practitioner in your region.'

  // Split multi-paragraph text fields
  const introParagraphs: string[] = introText.split(/\n\n+/).filter(Boolean)
  const meaningParagraphs: string[] = meaningText.split(/\n\n+/).filter(Boolean)

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized={heroImageUrl.startsWith('http')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 py-14 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-3">
            {heroTitle}
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto mt-4">{heroSubtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="#request-session"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-7 py-3 rounded font-medium transition-colors"
            >
              Request a Session
            </a>
            <a
              href={applyNowUrl}
              className="border-2 border-white text-white hover:bg-white hover:text-[#16697A] px-7 py-3 rounded transition-colors"
            >
              Apply to Become a Practitioner
            </a>
            {cms.brochureUrl && (
              <a
                href={cms.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#E2B748] text-[#E2B748] hover:bg-[#E2B748] hover:text-white px-7 py-3 rounded transition-colors"
              >
                Download Brochure
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── What is Mai-Tri ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">What is Mai-Tri Method?</h2>
          <span className="gold-divider" />
          <div className="mt-6 space-y-5 text-gray-700 leading-relaxed text-[15px]">
            {introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {cms.youtubeUrl && (
            <div className="mt-10 aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src={cms.youtubeUrl}
                title="Mai-Tri Method"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Meaning of the word ───────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">
            Meaning of the Word &ldquo;Mai-Tri&rdquo;
          </h2>
          <span className="gold-divider" />

          {cms.meaningImage?.url ? (
            <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
                {meaningParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                <Image
                  src={cms.meaningImage.url}
                  alt="Meaning of Mai-Tri"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={cms.meaningImage.url.startsWith('http')}
                />
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed text-[15px]">
              {meaningParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">Benefits</h2>
          <span className="gold-divider" />
          {benefitsIntro && (
            <p className="text-gray-700 leading-relaxed mt-6">{benefitsIntro}</p>
          )}
          <ul className="mt-6 space-y-4">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#16697A] text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </li>
            ))}
          </ul>
          {benefitsExtra && (
            <p className="text-gray-700 leading-relaxed mt-6">{benefitsExtra}</p>
          )}
        </div>
      </section>

      {/* ── Mohanji quote ─────────────────────────────────────────────────────── */}
      {mohanjiQuote && (
        <section className="py-14 bg-[#16697A] text-white">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl mb-4">Mohanji on Self-Healing</h2>
            <span className="gold-divider" />
            <blockquote className="mt-6 font-heading text-lg leading-relaxed text-white/90 italic">
              &ldquo;{mohanjiQuote}&rdquo;
            </blockquote>
            <p className="mt-4 text-[#E2B748] font-semibold">— Mohanji</p>
          </div>
        </section>
      )}

      {/* ── Session types ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Individual &amp; Group Sessions
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#16697A]">
              <h3 className="font-heading text-xl text-[#16697A] mb-3">Individual Sessions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{individualSessionText}</p>
              <p className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mt-4">
                In-person or online
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#E2B748]">
              <h3 className="font-heading text-xl text-[#16697A] mb-3">Group Sessions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{groupSessionText}</p>
              <p className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mt-4">
                60–90 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Energy Exchange ───────────────────────────────────────────────────── */}
      {energyExchangeText && (
        <section className="py-12 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl text-[#16697A] mb-2">Energy Exchange</h2>
            <span className="gold-divider" />
            <p className="text-gray-700 leading-relaxed mt-6">{energyExchangeText}</p>
          </div>
        </section>
      )}

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
              Testimonials
            </h2>
            <span className="gold-divider gold-divider--center" />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#E2B748] flex flex-col"
                >
                  <p className="text-gray-700 italic leading-relaxed text-sm flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4">
                    <p className="font-semibold text-[#16697A] text-sm">{t.name}</p>
                    {t.location && <p className="text-xs text-gray-400">{t.location}</p>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section id="faqs" className="py-16 bg-white">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-3xl text-[#16697A] mb-2">FAQs</h2>
            <span className="gold-divider" />
            <div className="mt-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* ── Request a Session ─────────────────────────────────────────────────── */}
      <section id="request-session" className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            How to Book a Mai-Tri Session
          </h2>
          <span className="gold-divider gold-divider--center" />
          {bookingText && (
            <p className="text-gray-600 text-center mt-4 mb-8">{bookingText}</p>
          )}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <MaiTriSessionForm />
          </div>
        </div>
      </section>

      {/* ── Apply to become a practitioner CTA ───────────────────────────────── */}
      <section className="py-16 bg-[#16697A] text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-3xl mb-3">Become a Mai-Tri Practitioner</h2>
          <span className="gold-divider gold-divider--center" />
          <p className="mt-6 text-white/85 leading-relaxed max-w-xl mx-auto">
            Are you called to serve through the Mai-Tri Method? Apply to join our global community
            of initiated practitioners and help people release deep karmic blockages.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={applyNowUrl}
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-3 rounded font-medium transition-colors"
            >
              Apply Now
            </a>
            <Link
              href="/practices"
              className="border-2 border-white text-white hover:bg-white hover:text-[#16697A] px-7 py-3 rounded transition-colors"
            >
              ← All Practices
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
