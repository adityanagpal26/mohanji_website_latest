import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mohanji Spaces | Mohanji',
  description:
    'Mohanji Spaces are sacred retreat centres and community hubs around the world dedicated to inner transformation, conscious living, and selfless service.',
}

function getImageUrl(field: any): string | null {
  if (!field) return null
  if (typeof field === 'string') return field
  if (typeof field === 'object' && field.url) return field.url
  return null
}

export default async function SpacesPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'mohanji-spaces' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any
  const sc = page?.spacesContent ?? {}

  const heroUrl = getImageUrl(sc.heroImage)
  const introQuote =
    sc.introQuote ||
    'Our spaces are not just physical locations — they are sanctuaries of transformation, where seekers can align with their highest purpose.'
  const introText1 =
    sc.introText1 ||
    "Mohanji Spaces are sacred retreat centres, ashrams, temples, and community hubs established around the world under Mohanji's guidance."
  const introText2 =
    sc.introText2 ||
    "Each space serves as a hub for meditation, selfless service, conscious living, and community transformation — embodying the Foundation's mission of benevolence and kindness."
  const spaces: any[] = sc.spaces ?? []

  return (
    <div>
      {/* Hero */}
      <div className="relative w-full h-[300px] md:h-[420px]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt="Mohanji Spaces"
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
              Mohanji Spaces
            </h1>
            <span className="block w-16 h-0.5 bg-[#E2B748] mt-4" />
          </div>
        </div>
      </div>

      {/* Intro Quote */}
      <section className="py-10 bg-[#16697A]">
        <div className="container max-w-3xl text-center">
          <p className="font-heading text-lg md:text-xl text-white/90 leading-relaxed italic">
            &ldquo;{introQuote}&rdquo;
          </p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">{introText1}</p>
          <p className="text-gray-700 leading-relaxed text-lg">{introText2}</p>
        </div>
      </section>

      {/* Spaces Grid */}
      {spaces.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl text-[#16697A] mb-2">Our Spaces Worldwide</h2>
              <span className="gold-divider gold-divider--center" />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {spaces.map((space: any, i: number) => {
                const imgUrl = getImageUrl(space.image)
                return (
                  <div
                    key={space.name + i}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {imgUrl ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={space.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          unoptimized={imgUrl.startsWith('http')}
                        />
                      </div>
                    ) : (
                      <div className="h-32 bg-gradient-to-br from-[#16697A]/10 to-[#5B2D8E]/10 flex items-center justify-center">
                        <span className="text-4xl opacity-40">🏡</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-heading text-lg text-[#16697A] leading-tight">
                          {space.name}
                        </h3>
                      </div>
                      {space.type && (
                        <p className="text-xs text-[#E2B748] font-semibold uppercase tracking-wide mb-2">
                          {space.type}
                        </p>
                      )}
                      {space.location && (
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                          <span>📍</span> {space.location}
                        </p>
                      )}
                      {space.description && (
                        <p className="text-gray-600 text-sm leading-relaxed flex-1">
                          {space.description}
                        </p>
                      )}
                      {space.contact && (
                        <a
                          href={`mailto:${space.contact}`}
                          className="text-[#16697A] text-xs mt-3 hover:underline"
                        >
                          {space.contact}
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#16697A] text-center text-white">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold mb-4">
            Experience a Mohanji Space
          </h2>
          <p className="text-white/80 leading-relaxed mb-8">
            Each of our spaces welcomes seekers, volunteers, and all who wish to connect with
            Mohanji&apos;s teachings and the energy of selfless service.
          </p>
          <a
            href="/contact"
            className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-3 rounded font-medium transition-colors inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
