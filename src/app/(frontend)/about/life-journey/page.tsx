import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Mohanji's Life Journey | Spiritual Awakening & Transformation",
  description:
    "Trace the remarkable life of Mohanji — from his birth in India to founding a global spiritual movement spanning 33+ countries.",
}

function getImageUrl(field: any): string | null {
  if (!field) return null
  if (typeof field === 'string') return field
  if (typeof field === 'object' && field.url) return field.url
  return null
}

export default async function LifeJourneyPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'life-journey' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any
  const lj = page?.lifeJourneyContent ?? {}

  const heroUrl = getImageUrl(lj.heroImage)
  const introText =
    lj.introText ||
    "From a childhood in Kerala to a global spiritual mission — the remarkable story of one man's journey to serve humanity."
  const chapters: any[] = lj.chapters?.length
    ? lj.chapters
    : [
        {
          title: 'Initial Life',
          period: 'Born February 23, 1965',
          text: 'Mohanji was born smiling on February 23rd, 1965, in Palakkad, Kerala, India. From childhood, he displayed a deep sensitivity and compassion for all beings.',
          image: null,
        },
        {
          title: 'The Inflection Point',
          period: 'A turning point',
          text: "A profound personal tragedy — the loss of his beloved daughter Ammu — became the inflection point in Mohanji's life, driving him deep within himself.",
          image: null,
        },
        {
          title: 'Today',
          period: '2024 – present',
          text: "Today, Mohanji's teachings and charitable work touch lives across 33+ countries in 27 languages, positively impacting over a million lives.",
          image: null,
        },
      ]
  const stats: { value: string; label: string }[] = lj.stats?.length
    ? lj.stats
    : [
        { value: '33+', label: 'Countries' },
        { value: '27', label: 'Languages' },
        { value: '30+', label: 'Books' },
        { value: '1M+', label: 'Lives Touched' },
      ]

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[440px]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt="Mohanji's Life Journey"
            fill
            className="object-cover object-center"
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
            <h1 className="font-heading text-4xl md:text-6xl text-white font-semibold drop-shadow-lg">
              Mohanji&rsquo;s Life Journey
            </h1>
            <span className="block w-16 h-0.5 bg-[#E2B748] mt-4" />
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-10 bg-[#16697A]">
        <div className="container max-w-3xl text-center">
          <p className="font-heading text-lg md:text-xl text-white/90 leading-relaxed italic">
            {introText}
          </p>
        </div>
      </section>

      {/* Timeline Chapters */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-5xl">
          <div className="space-y-20">
            {chapters.map((chapter: any, index: number) => {
              const imgUrl = getImageUrl(chapter.image)
              const isEven = index % 2 === 0

              return (
                <div key={chapter.title + index}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#16697A] text-white flex items-center justify-center font-heading font-semibold text-lg shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 h-0.5 bg-[#16697A]/20" />
                  </div>

                  {imgUrl ? (
                    <div
                      className={`grid md:grid-cols-2 gap-10 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}
                    >
                      <div>
                        <h2 className="font-heading text-2xl md:text-3xl text-[#16697A] mb-2">
                          {chapter.title}
                        </h2>
                        {chapter.period && (
                          <p className="text-[#E2B748] text-sm font-semibold mb-4 uppercase tracking-wide">
                            {chapter.period}
                          </p>
                        )}
                        <span className="block w-10 h-0.5 bg-[#E2B748] mb-5" />
                        <p className="text-gray-700 leading-relaxed">{chapter.text}</p>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={imgUrl}
                          alt={chapter.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized={imgUrl.startsWith('http')}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-8 shadow-sm">
                      <h2 className="font-heading text-2xl md:text-3xl text-[#16697A] mb-2">
                        {chapter.title}
                      </h2>
                      {chapter.period && (
                        <p className="text-[#E2B748] text-sm font-semibold mb-4 uppercase tracking-wide">
                          {chapter.period}
                        </p>
                      )}
                      <span className="block w-10 h-0.5 bg-[#E2B748] mb-5" />
                      <p className="text-gray-700 leading-relaxed">{chapter.text}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-14 bg-[#16697A]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl md:text-5xl font-semibold text-[#E2B748]">
                  {stat.value}
                </p>
                <p className="text-white/80 mt-2 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-3">
            Discover Mohanji&rsquo;s Teachings
          </h2>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto mb-6" />
          <p className="text-gray-600 mb-8 leading-relaxed">
            The best way to understand Mohanji is through his words and practices. Explore his free
            guided meditations, books, and teachings — available in many languages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about/who-is-mohanji"
              className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
            >
              Who is Mohanji
            </Link>
            <Link
              href="/meditations"
              className="px-8 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors"
            >
              Free Meditations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
