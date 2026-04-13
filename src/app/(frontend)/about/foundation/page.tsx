import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mohanji Foundation | Global Non-Profit for Spiritual Growth',
  description:
    'Mohanji Foundation is a global non-profit organization engaged in spreading the timeless message of love, compassion and conscious living.',
}

function getImageUrl(field: any): string | null {
  if (!field) return null
  if (typeof field === 'string') return field
  if (typeof field === 'object' && field.url) return field.url
  return null
}

export default async function FoundationPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'mohanji-foundation' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any
  const fc = page?.foundationContent ?? {}

  const heroUrl = getImageUrl(fc.heroImage)
  const missionStatement = fc.missionStatement || 'Mohanji Foundation is a global non-profit organization, engaged in spreading the timeless message of love, compassion and conscious living.'
  const stats: { value: string; label: string }[] = fc.stats?.length
    ? fc.stats
    : [
        { value: '33+', label: 'Countries' },
        { value: '1M+', label: 'Lives Impacted' },
        { value: '73K+', label: 'Meals Served' },
        { value: '49T', label: 'Tonnes of Food Donated' },
      ]
  const foundedPlatforms: { name: string; logo: any }[] = fc.foundedPlatforms ?? []
  const inspiredPlatforms: { name: string; logo: any }[] = fc.inspiredPlatforms ?? []
  const pillars: { title: string; description: string }[] = fc.pillars?.length
    ? fc.pillars
    : [
        { title: 'Consciousness & Spirituality', description: 'Providing free guided meditations, spiritual retreats, and transformative programs accessible to all.' },
        { title: 'Humanitarian Service', description: 'Food distribution, shelter, education, and emergency relief through ACT Foundation and local chapters.' },
        { title: 'Environmental Responsibility', description: 'Tree-planting drives, clean-up campaigns, and advocacy for conscious, sustainable living.' },
        { title: 'Animal Welfare', description: 'Rescue, rehabilitation, and adoption programs for stray and abandoned animals worldwide.' },
        { title: 'Youth Empowerment', description: 'The Mohanji Youth Club equips young people with values, purpose, and leadership skills.' },
        { title: 'Cultural Preservation', description: 'Celebrating the richness of diverse spiritual traditions and indigenous wisdom.' },
      ]
  const centersText = fc.centersText || 'Mohanji Foundation has set up centers in various cities around the world to conduct meditations and transformative programs on a regular basis, bringing together like-minded people and working towards a more conscious and compassionate world.'

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt="Mohanji Foundation"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            unoptimized={heroUrl.startsWith('http')}
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end pb-8">
          <div className="container">
            <h1 className="font-heading text-4xl md:text-5xl text-white font-semibold drop-shadow-lg">
              Mohanji Foundation
            </h1>
            <span className="block w-16 h-0.5 bg-[#E2B748] mt-4" />
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-14 bg-[#16697A]">
        <div className="container max-w-4xl text-center">
          <p className="font-heading text-xl md:text-2xl text-white leading-relaxed italic">
            {missionStatement}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl md:text-5xl font-semibold text-[#16697A]">
                  {stat.value}
                </p>
                <p className="text-gray-500 mt-2 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founded By Mohanji */}
      {foundedPlatforms.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container">
            <h2 className="font-heading text-3xl text-[#16697A] text-center mb-3">
              Founded By Mohanji
            </h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-10" />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 items-center justify-items-center">
              {foundedPlatforms.map((platform) => {
                const logoUrl = getImageUrl(platform.logo)
                return (
                  <div key={platform.name} className="flex flex-col items-center gap-2">
                    <div className="relative h-16 w-16 bg-white rounded-full shadow-sm p-2 flex items-center justify-center overflow-hidden">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={platform.name}
                          width={56}
                          height={56}
                          className="object-contain"
                          unoptimized={logoUrl.startsWith('http')}
                        />
                      ) : (
                        <span className="text-xs text-gray-400 text-center leading-tight">{platform.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 text-center leading-tight px-1">
                      {platform.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Inspired By Mohanji */}
      {inspiredPlatforms.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="font-heading text-3xl text-[#16697A] text-center mb-3">
              Inspired By Mohanji
            </h2>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-10" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center max-w-2xl mx-auto">
              {inspiredPlatforms.map((platform) => {
                const logoUrl = getImageUrl(platform.logo)
                return (
                  <div key={platform.name} className="flex flex-col items-center gap-2">
                    <div className="relative h-20 w-20 bg-[#F5F5F5] rounded-full shadow-sm p-2 flex items-center justify-center overflow-hidden">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={platform.name}
                          width={64}
                          height={64}
                          className="object-contain"
                          unoptimized={logoUrl.startsWith('http')}
                        />
                      ) : (
                        <span className="text-xs text-gray-400">{platform.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 text-center leading-tight px-1">
                      {platform.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Our Pillars of Work */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-3">
            Our Pillars of Work
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-[#16697A]"
              >
                <h3 className="font-heading text-xl text-[#16697A] mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Centers Description */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl text-center">
          <h2 className="font-heading text-3xl text-[#16697A] mb-3">Global Centers</h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-6" />
          <p className="text-gray-700 leading-relaxed text-lg">{centersText}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#16697A] text-center">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl text-white mb-4">Be Part of the Movement</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Whether through volunteering, donating, or joining a local chapter, you can make a
            meaningful difference in the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/join/volunteer"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-7 py-3 rounded font-medium transition-colors"
            >
              Volunteer with Us
            </Link>
            <Link
              href="/donate"
              className="border-2 border-white text-white hover:bg-white hover:text-[#16697A] px-7 py-3 rounded transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
