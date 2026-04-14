import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Join the Movement | Mohanji',
  description:
    'Join the Mohanji movement — volunteer your time and skills, or become part of the Mohanji Youth Club. Be the change you wish to see in the world.',
}

export default function JoinPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Join the Movement
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Every great movement is built by ordinary people doing extraordinary things with love.
            Find your place in Mohanji's global community.
          </p>
        </div>
      </section>

      {/* Two cards */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Volunteer */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-2 bg-[#16697A]" />
              <div className="p-8 flex flex-col flex-1">
                <div className="w-16 h-16 rounded-full bg-[#16697A]/10 flex items-center justify-center mb-6 text-3xl">
                  🤝
                </div>
                <h2 className="font-heading text-2xl text-[#16697A] mb-3">Volunteer</h2>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  Share your time, skills, and love in service of humanity. From local food
                  distribution drives to international retreats, there are countless ways to
                  contribute. Every act of selfless service is a step on the path to liberation.
                </p>
                <ul className="space-y-2 mb-8">
                  {['Event support', 'Humanitarian service', 'Digital & communications', 'Translation & outreach', 'Environmental projects'].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[#16697A] font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/join/volunteer"
                  className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors text-center"
                >
                  Become a Volunteer
                </Link>
              </div>
            </div>

            {/* Youth Club */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-2 bg-[#5B2D8E]" />
              <div className="p-8 flex flex-col flex-1">
                <div className="w-16 h-16 rounded-full bg-[#5B2D8E]/10 flex items-center justify-center mb-6 text-3xl">
                  🌟
                </div>
                <h2 className="font-heading text-2xl text-[#16697A] mb-3">Mohanji Youth Club</h2>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  A global community of young people (ages 13–35) committed to conscious living,
                  service, and making a positive impact in the world. Build lifelong friendships,
                  develop leadership skills, and discover your true purpose.
                </p>
                <ul className="space-y-2 mb-8">
                  {['Meditation & mindfulness', 'Community service projects', 'Leadership workshops', 'Eco-consciousness drives', 'Cultural exchange programs'].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[#5B2D8E] font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/join/youth-club"
                  className="bg-[#5B2D8E] text-white hover:bg-[#4a2275] px-6 py-3 rounded font-medium transition-colors text-center"
                >
                  Join Youth Club
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-white text-center">
        <div className="container max-w-2xl">
          <blockquote className="font-heading text-2xl text-[#16697A] italic leading-relaxed">
            "Service is the highest form of expression of unconditional love. When we serve without
            expectation, we connect with the divine in every being."
          </blockquote>
          <p className="mt-4 text-gray-500 text-sm">— Mohanji</p>
        </div>
      </section>
    </div>
  )
}
