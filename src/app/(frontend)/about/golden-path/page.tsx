import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'The Golden Path | Mohanji',
  description:
    "The Golden Path is Mohanji's structured approach to self-realisation — a journey from unconscious living to full awakening through practice, service, and surrender.",
}

function getImageUrl(field: any): string | null {
  if (!field) return null
  if (typeof field === 'string') return field
  if (typeof field === 'object' && field.url) return field.url
  return null
}

export default async function GoldenPathPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'golden-path' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any
  const gp = page?.goldenPathContent ?? {}

  const heroUrl = getImageUrl(gp.heroImage)
  const introText1 =
    gp.introText1 ||
    "The Golden Path is Mohanji's structured approach to self-realisation — a journey inward through layers of conditioning, habit, and unconscious patterns, toward the light of pure awareness and liberation."
  const introText2 =
    gp.introText2 ||
    "Rooted in the ancient tradition of Masters, The Golden Path offers a clear, progressive framework that anyone can follow — regardless of religion, background, or prior spiritual experience."
  const quote =
    gp.quote ||
    'The Golden Path is not about reaching a destination. It is about becoming fully alive in every step of the journey.'
  const stages: any[] = gp.stages?.length
    ? gp.stages
    : [
        { number: '01', title: 'Awareness', description: 'The journey begins with recognising the suffering caused by unconscious patterns, habits, and identifications.' },
        { number: '02', title: 'Acceptance', description: 'True transformation begins with accepting oneself as one is — without judgment.' },
        { number: '03', title: 'Practice', description: 'Regular spiritual practice purifies the mind, body, and subtle body, removing accumulated karmas.' },
        { number: '04', title: 'Service', description: 'Selfless service without expectation burns karmic residue and cultivates genuine compassion.' },
        { number: '05', title: 'Surrender', description: 'As the ego softens through practice and service, one learns to surrender to the flow of life.' },
        { number: '06', title: 'Liberation', description: 'Complete freedom from all conditioning, identifications, and the cycle of karma.' },
      ]

  return (
    <div>
      {/* Hero */}
      <div className="relative w-full h-[300px] md:h-[440px]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt="The Golden Path"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            unoptimized={heroUrl.startsWith('http')}
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-10">
          <div className="container">
            <h1 className="font-heading text-4xl md:text-5xl text-white font-semibold drop-shadow-lg">
              The Golden Path
            </h1>
            <span className="block w-16 h-0.5 bg-[#E2B748] mt-4" />
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">{introText1}</p>
          <p className="text-gray-700 leading-relaxed text-lg">{introText2}</p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 bg-[#16697A]">
        <div className="container max-w-3xl text-center">
          <blockquote className="font-heading text-xl md:text-2xl text-white italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <p className="text-white/60 mt-3">— Mohanji</p>
        </div>
      </section>

      {/* Stages */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl text-[#16697A] mb-2">Stages of The Golden Path</h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stages.map((stage: any, i: number) => (
              <div
                key={stage.number || i}
                className="bg-white rounded-xl p-8 shadow-sm border-b-4 border-[#E2B748] hover:shadow-md transition-shadow"
              >
                <div className="text-5xl font-heading font-semibold text-[#16697A]/15 mb-3 leading-none">
                  {stage.number}
                </div>
                <h3 className="font-heading text-xl text-[#16697A] mb-3">{stage.title}</h3>
                <span className="block w-8 h-0.5 bg-[#E2B748] mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-3">Begin Your Journey</h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-6" />
          <p className="text-gray-600 mb-8 leading-relaxed">
            The Golden Path begins with a single step — a moment of genuine inner turn. Explore
            Mohanji&apos;s free meditations and practices as your starting point.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/meditations"
              className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
            >
              Free Meditations
            </Link>
            <Link
              href="/practices"
              className="px-8 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors"
            >
              Explore Practices
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
