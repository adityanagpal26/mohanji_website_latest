import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Spiritual Practices | Mohanji',
  description:
    'Explore the transformative spiritual practices taught by Mohanji — from Consciousness Kriya and Shaktipat to Mai-Tri Method and Conscious Dancing.',
}

export default async function PracticesPage() {
  const payload = await getPayloadClient()

  const { docs: practices } = await payload.find({
    collection: 'practices',
    sort: 'title',
    depth: 1,
    limit: 20,
  })

  const withImage = (practices as any[]).filter((p) => {
    const imageUrl =
      typeof p.featuredImage === 'object' && p.featuredImage?.url ? p.featuredImage.url : null
    return !!imageUrl
  })
  const withoutImage = (practices as any[]).filter((p) => {
    const imageUrl =
      typeof p.featuredImage === 'object' && p.featuredImage?.url ? p.featuredImage.url : null
    return !imageUrl
  })

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Spiritual Practices
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Transformative tools for inner growth — grounded in ancient wisdom and accessible
            to all who seek.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl text-center">
          <p className="text-gray-700 leading-relaxed text-lg">
            Mohanji offers a rich array of spiritual practices, each designed to address specific
            aspects of human suffering and liberation. From powerful energy transmissions and healing
            methods to movement-based practices and daily techniques, these tools meet you exactly
            where you are.
          </p>
        </div>
      </section>

      {practices.length === 0 ? (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container text-center">
            <p className="text-gray-500 py-12">
              Practices are being added. Please check back soon.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured practices with images */}
          {withImage.length > 0 && (
            <section className="py-4 bg-[#F5F5F5]">
              <div className="container">
                <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2 pt-10">
                  Featured Practices
                </h2>
                <span className="gold-divider gold-divider--center" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                  {withImage.map((practice: any) => {
                    const imageUrl =
                      typeof practice.featuredImage === 'object' && practice.featuredImage?.url
                        ? practice.featuredImage.url
                        : null
                    const descriptionText =
                      typeof practice.description === 'string'
                        ? practice.description
                        : ''

                    return (
                      <Link
                        key={practice.id}
                        href={`/practices/${practice.slug}`}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                      >
                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={practice.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          {practice.category && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-[#16697A] text-white text-xs font-semibold px-2 py-1 rounded">
                                {practice.category}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          {practice.tagline && (
                            <p className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mb-1">
                              {practice.tagline}
                            </p>
                          )}
                          <h3 className="font-heading text-xl text-[#16697A] mb-2 group-hover:text-[#C95D63] transition-colors">
                            {practice.title}
                          </h3>
                          {descriptionText && (
                            <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                              {descriptionText}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-4">
                            {practice.duration && (
                              <span className="text-xs text-gray-400">{practice.duration}</span>
                            )}
                            <span className="text-sm font-semibold text-[#C95D63] group-hover:underline ml-auto">
                              Learn more &rarr;
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Practices without images */}
          {withoutImage.length > 0 && (
            <section className="py-12 bg-white">
              <div className="container">
                <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
                  More Practices
                </h2>
                <span className="gold-divider gold-divider--center" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {withoutImage.map((practice: any) => {
                    const descriptionText =
                      typeof practice.description === 'string'
                        ? practice.description
                        : ''

                    return (
                      <Link
                        key={practice.id}
                        href={`/practices/${practice.slug}`}
                        className="group bg-[#F5F5F5] rounded-lg hover:shadow-md transition-shadow p-6 flex flex-col border-t-4 border-[#16697A]"
                      >
                        {practice.category && (
                          <span className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mb-1">
                            {practice.category}
                          </span>
                        )}
                        <h3 className="font-heading text-xl text-[#16697A] mb-1 group-hover:text-[#C95D63] transition-colors">
                          {practice.title}
                        </h3>
                        {practice.tagline && (
                          <p className="text-xs text-gray-500 italic mb-2">{practice.tagline}</p>
                        )}
                        {descriptionText && (
                          <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
                            {descriptionText}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-4">
                          {practice.duration && (
                            <span className="text-xs text-gray-400">{practice.duration}</span>
                          )}
                          <span className="text-sm font-semibold text-[#C95D63] group-hover:underline ml-auto">
                            Learn more &rarr;
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#16697A] text-white text-center">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl mb-3">Free Guided Meditations</h2>
          <p className="text-white/85 leading-relaxed mb-8">
            Complement your practice with Mohanji's free guided meditations — available in
            multiple languages and ready to download.
          </p>
          <Link
            href="/meditations"
            className="bg-[#E2B748] text-[#191919] font-semibold px-8 py-4 rounded hover:bg-yellow-400 transition-colors"
          >
            Explore Meditations
          </Link>
        </div>
      </section>
    </div>
  )
}
