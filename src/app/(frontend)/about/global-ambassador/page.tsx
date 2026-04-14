import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Global Ambassador | Mohanji Foundation',
  description:
    'Devi Mohan serves as the Global Ambassador of Mohanji Foundation — a humanitarian, spiritual diplomat, and proponent of traditional yoga representing the Foundation at major international events.',
}

function getImageUrl(field: any): string | null {
  if (!field) return null
  if (typeof field === 'string') return field
  if (typeof field === 'object' && field.url) return field.url
  return null
}

export default async function GlobalAmbassadorPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'global-ambassador' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any
  const ac = page?.ambassadorContent ?? {}

  const heroUrl = getImageUrl(ac.heroImage)
  const photoUrl = getImageUrl(ac.ambassadorPhoto)
  const roleDesc1 =
    ac.roleDesc1 ||
    'A Mohanji Foundation Global Ambassador is the appointed spokesperson and representative of Mohanji Foundation. In terms of appearance, demeanor, values and ethics, the Global Ambassador represents the teachings, ethos and activities of Mohanji Foundation in truthfulness and positive light.'
  const roleDesc2 =
    ac.roleDesc2 ||
    'The Global Ambassador carries the mission of Mohanji Foundation — spreading compassion, conscious living, and humanitarian values — to governments, international organisations, educational institutions, and interfaith gatherings worldwide.'
  const ambassadorName = ac.ambassadorName || 'Devi Mohan'
  const ambassadorTitle =
    ac.ambassadorTitle ||
    'Master of Arts in Peace Studies · Humanitarian · Spiritual Diplomat · Proponent of Traditional Yoga'
  const bio1 =
    ac.bio1 ||
    'Devi Mohan, Master of Arts in Peace Studies, is a multifaceted humanitarian, spiritual diplomat, proponent of traditional yoga, and instrument of healing.'
  const bio2 =
    ac.bio2 ||
    "Devi has been an integral member of Mohanji Foundation since its formation in 2007. Over nearly two decades she has represented the Foundation at major international events, governmental meetings, interfaith gatherings, and educational summits around the world."
  const bio3 =
    ac.bio3 ||
    "Through her work as Global Ambassador, Devi has built bridges between Mohanji Foundation and organisations working in the areas of peace, education, women's empowerment, and conscious living."
  const events: any[] = ac.events ?? []

  return (
    <div>
      {/* Hero */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt="Global Ambassador"
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
            <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-2">
              Mohanji Foundation
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-white font-semibold drop-shadow-lg">
              Global Ambassador
            </h1>
            <span className="block w-16 h-0.5 bg-[#E2B748] mt-4" />
          </div>
        </div>
      </div>

      {/* About the role */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl text-[#16697A] mb-2">The Role</h2>
              <span className="gold-divider" />
              <p className="text-gray-700 leading-relaxed mt-6">{roleDesc1}</p>
              <p className="text-gray-700 leading-relaxed mt-4">{roleDesc2}</p>
            </div>
            <div className="bg-gradient-to-br from-[#16697A]/10 to-[#5B2D8E]/10 rounded-lg p-8 text-center">
              {photoUrl ? (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <Image
                    src={photoUrl}
                    alt={ambassadorName}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized={photoUrl.startsWith('http')}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#16697A]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🌍</span>
                </div>
              )}
              <h3 className="font-heading text-xl text-[#16697A] mb-2">
                Current Global Ambassador
              </h3>
              <p className="font-heading text-2xl text-[#C95D63] font-semibold mb-2">
                {ambassadorName}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{ambassadorTitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Devi Mohan */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            {ambassadorName}
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
            {bio1 && <p>{bio1}</p>}
            {bio2 && <p>{bio2}</p>}
            {bio3 && <p>{bio3}</p>}
          </div>
        </div>
      </section>

      {/* Events timeline */}
      {events.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
              Representation Highlights
            </h2>
            <span className="gold-divider gold-divider--center" />
            <div className="mt-10 space-y-6">
              {events.map((event: any, i: number) => {
                const eventImgUrl = getImageUrl(event.image)
                return (
                  <div
                    key={i}
                    className="flex gap-6 bg-[#F5F5F5] rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    {eventImgUrl && (
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={eventImgUrl}
                          alt={event.title}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                          unoptimized={eventImgUrl.startsWith('http')}
                        />
                      </div>
                    )}
                    <div className="flex-shrink-0 w-2 rounded-full bg-[#16697A]" />
                    <div>
                      <p className="text-xs text-[#E2B748] font-semibold uppercase tracking-wider mb-1">
                        {event.date}
                      </p>
                      <h3 className="font-heading text-lg text-[#16697A] mb-1">{event.title}</h3>
                      {event.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
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
      <section className="py-16 hero-gradient text-white text-center">
        <div className="container max-w-xl">
          <h2 className="font-heading text-3xl font-semibold mb-4">
            Learn More About Mohanji Foundation
          </h2>
          <p className="text-white/90 leading-relaxed mb-8">
            Discover the global humanitarian mission and the values that guide every action
            of Mohanji Foundation worldwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/about/foundation"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
            >
              About the Foundation
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-[#16697A] px-6 py-3 rounded transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
