import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Journey to Kailash | Mohanji',
  description:
    'Join Mohanji on a sacred pilgrimage to Mount Kailash and Lake Mansarovar — one of the most profound spiritual journeys on Earth.',
}

export default function KailashPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden text-white">
        <Image
          src="https://mohanji.org/wp-content/uploads/2025/03/Kailash-with-Mohanji-2024.jpg"
          alt="Kailash with Mohanji 2024"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#16697A]/70" />
        <div className="relative z-10 container text-center py-24">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Sacred Pilgrimage
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold mb-3 leading-tight">
            Journey to Kailash
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Walk the sacred parikrama of Mount Kailash with Mohanji — a pilgrimage that transforms
            the soul and dissolves the barriers between the earthly and the divine.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href="/kailash/itinerary"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
            >
              View Itinerary
            </Link>
            <Link
              href="/kailash/application"
              className="border-2 border-white text-white hover:bg-white hover:text-[#16697A] px-6 py-3 rounded transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* About the pilgrimage */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl text-[#16697A] mb-2">
                The Sacred Mountain
              </h2>
              <span className="gold-divider" />
              <p className="text-gray-700 leading-relaxed mt-6">
                Mount Kailash, standing at 6,638 metres in the remote Tibetan plateau, is revered
                by four of the world's great religions — Hinduism, Buddhism, Jainism, and Bon.
                Hindus consider it the abode of Lord Shiva; Buddhists see it as the dwelling place
                of Chakrasamvara; Jains call it Mount Ashtapada.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                No one has ever climbed to the summit of Mount Kailash — it is considered too sacred.
                Instead, pilgrims walk the 52-kilometre parikrama (circumambulation), a journey
                traditionally completed in three days, believed to erase the sins of a lifetime.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Lake Mansarovar, located at the base of Kailash at an altitude of 4,590 metres, is
                one of the highest freshwater lakes in the world. A dip in its sacred waters is
                said to purify the soul of all impurities.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden aspect-square relative">
              <Image
                src="https://mohanji.org/wp-content/uploads/2025/03/Kailash-darsan-2025.jpg"
                alt="Kailash Darsan 2025"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="py-8 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: 'https://mohanji.org/wp-content/uploads/2025/03/kailash-yatra-2024.jpg', alt: 'Kailash Yatra 2024' },
              { src: 'https://mohanji.org/wp-content/uploads/2025/03/Kailash-Darsan-2024.jpg', alt: 'Kailash Darsan 2024' },
              { src: 'https://mohanji.org/wp-content/uploads/2025/03/Kailash-2024.jpg', alt: 'Kailash 2024' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why go with Mohanji */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Why Journey with Mohanji
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: 'Spiritual Guidance',
                description:
                  'Travel with Mohanji himself or under the guidance of senior Acharyas, ensuring a deeply transformative inner journey.',
              },
              {
                title: 'Energy Transmissions',
                description:
                  'Daily meditations, Shaktipat sessions, and energy work at the most sacred sites amplify the impact of the pilgrimage.',
              },
              {
                title: 'Safe & Supported',
                description:
                  'Experienced logistics support, altitude acclimatisation protocols, and a caring community make the journey safe and comfortable.',
              },
              {
                title: 'Small Sacred Group',
                description:
                  'Limited to a small group of sincere seekers to ensure an intimate, focussed, and deeply personal experience.',
              },
              {
                title: 'Complete Itinerary',
                description:
                  'All permits, accommodation, meals, transportation, and sacred site visits are carefully arranged for you.',
              },
              {
                title: 'Lifelong Impact',
                description:
                  'Pilgrims consistently report this as a life-defining experience — a turning point on their spiritual journey.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-heading text-xl text-[#16697A] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Explore the Pilgrimage
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { href: '/kailash/itinerary', title: 'Day-by-Day Itinerary', icon: '📋' },
              { href: '/kailash/places', title: 'Sacred Places', icon: '⛰️' },
              { href: '/kailash/faqs', title: 'FAQs', icon: '❓' },
              { href: '/kailash/terms', title: 'Terms & Conditions', icon: '📄' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-[#F5F5F5] rounded-lg p-6 text-center hover:bg-[#16697A] transition-colors"
              >
                <span className="text-3xl block mb-3">{link.icon}</span>
                <p className="font-heading text-lg text-[#16697A] group-hover:text-white transition-colors">
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient text-white text-center">
        <div className="container max-w-xl">
          <h2 className="font-heading text-3xl font-semibold mb-4">
            Ready for the Journey of a Lifetime?
          </h2>
          <p className="text-white/90 leading-relaxed mb-8">
            Places are limited. Submit your application to begin the process.
          </p>
          <Link
            href="/kailash/application"
            className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-4 rounded font-medium transition-colors text-lg"
          >
            Apply for Kailash Pilgrimage
          </Link>
        </div>
      </section>
    </div>
  )
}
