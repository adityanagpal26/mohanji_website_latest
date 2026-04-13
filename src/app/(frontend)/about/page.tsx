import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About Mohanji | Mohanji',
  description:
    'Learn about Mohanji — spiritual master, humanitarian, and founder of the Mohanji Foundation. Explore his life, teachings, and global mission.',
}

const aboutPages = [
  {
    href: '/about/who-is-mohanji',
    title: 'Who is Mohanji',
    description:
      'Discover the life and essence of Mohanji — a compassionate spiritual master dedicated to uplifting humanity.',
  },
  {
    href: '/about/foundation',
    title: 'Mohanji Foundation',
    description:
      'A global non-profit spreading consciousness, compassion, and service across 60+ countries.',
  },
  {
    href: '/about/life-journey',
    title: "Mohanji's Life Journey",
    description:
      'Trace the remarkable spiritual journey from early life in India to a worldwide movement of awakening.',
  },
  {
    href: '/about/global-council',
    title: 'Global Council',
    description:
      "Meet the dedicated leaders guiding Mohanji's global mission across continents and cultures.",
  },
  {
    href: '/about/acharyas',
    title: 'Mohanji Acharyas',
    description:
      "Trained teachers carrying Mohanji's lineage and transmitting the path of consciousness worldwide.",
  },
  {
    href: '/about/spaces',
    title: 'Mohanji Spaces',
    description:
      'Sacred retreat centres and community spaces around the world dedicated to inner transformation.',
  },
  {
    href: '/about/golden-path',
    title: 'The Golden Path',
    description:
      'An overview of the structured path to self-realisation as taught by Mohanji.',
  },
  {
    href: '/about/awards',
    title: 'Awards & Recognition',
    description:
      "Celebrating Mohanji's global contributions to spirituality, peace, and humanitarian service.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            About Mohanji
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            A spiritual master, humanitarian, and beacon of unconditional love — discover the
            many dimensions of Mohanji's life and mission.
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aboutPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              >
                <h2 className="font-heading text-xl text-[#16697A] mb-2 group-hover:text-[#C95D63] transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.description}</p>
                <span className="mt-4 text-sm font-semibold text-[#C95D63] group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
