import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Awards & Recognition | Mohanji's Global Honors",
  description:
    "Celebrating Mohanji's global contributions to spirituality, peace, humanitarian service, and environmental responsibility.",
}

export default async function AwardsPage() {
  const payload = await getPayloadClient()

  const [{ docs: awards }, { docs: awardPages }] = await Promise.all([
    payload.find({
      collection: 'awards',
      sort: '-date',
      depth: 1,
      limit: 20,
    }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'awards' } },
      depth: 2,
      limit: 1,
    }),
  ])

  const awardPage = awardPages[0] as any
  const ap = awardPage?.awardsPageContent ?? {}
  const introText =
    ap.introText ||
    'Over the years, Mohanji and the Mohanji Foundation have been honoured with numerous awards recognising their transformative work in spirituality, humanitarian service, animal welfare, environmental protection, and peace — spanning 93+ countries.'
  const closingQuote =
    ap.closingQuote ||
    'I have no desire for recognition. I only desire that the path remains pure and accessible to all who seek liberation.'

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Awards &amp; Recognition
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Celebrating Mohanji&apos;s global contributions to humanity, peace, and conscious living —
            as recognised by governments, foundations, and international organisations.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl text-center">
          <p className="text-gray-700 leading-relaxed text-lg">{introText}</p>
        </div>
      </section>

      {/* Awards grid */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container">
          {awards.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Award information is being added. Please check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(awards as any[]).map((award, index) => {
                const title = award.title ?? ''
                const org = award.organization ?? ''
                const year = award.year ?? (award.date ? new Date(award.date).getFullYear() : '')
                const description = award.description ?? ''
                const imageUrl =
                  typeof award.image === 'object' && award.image?.url
                    ? award.image.url
                    : typeof award.image === 'string'
                      ? award.image
                      : null

                return (
                  <div
                    key={award.id ?? index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#E2B748]/30 hover:shadow-md transition-shadow flex flex-col"
                  >
                    {imageUrl && (
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      {!imageUrl && (
                        <div className="w-12 h-12 rounded-full bg-[#E2B748]/20 flex items-center justify-center mb-4">
                          <span className="text-[#E2B748] text-2xl">&#9733;</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        {year && (
                          <span className="bg-[#E2B748]/20 text-[#C95D63] text-xs font-semibold px-2 py-0.5 rounded">
                            {year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl text-[#16697A] mb-1">{title}</h3>
                      {org && (
                        <p className="text-sm text-[#C95D63] font-medium mb-3">{org}</p>
                      )}
                      {description && (
                        <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-[#16697A] text-white text-center">
        <div className="container max-w-3xl">
          <blockquote className="font-heading text-2xl italic leading-relaxed">
            &ldquo;{closingQuote}&rdquo;
          </blockquote>
          <p className="mt-4 text-white/70">&mdash; Mohanji</p>
        </div>
      </section>
    </div>
  )
}
