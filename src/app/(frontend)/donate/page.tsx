import React from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Donate — Support Mohanji Foundation',
  description: 'Your donation supports humanitarian activities, free programs, and the spread of consciousness worldwide. Donate from India, Europe, USA, or globally.',
}

// Fallback donation options — reflects real mohanji.org/donate/ region selector
const FALLBACK_DONATIONS = [
  {
    region: 'India',
    flag: '🇮🇳',
    description: 'Donate via Indian payment methods. Note: Donations to India can only receive payments from within India.',
    url: 'https://mohanji.org/donate/',
    currency: 'INR',
    note: 'Indian donors only',
  },
  {
    region: 'Canada',
    flag: '🇨🇦',
    description: 'Canadian donors can contribute to Mohanji Foundation\'s humanitarian and spiritual activities in Canada.',
    url: 'https://mohanji.org/donate/',
    currency: 'CAD',
    note: 'Registered Canadian organisation',
  },
  {
    region: 'Netherlands',
    flag: '🇳🇱',
    description: 'Netherlands-based donors can support Mohanji Foundation through our registered European entity.',
    url: 'https://mohanji.org/donate/',
    currency: 'EUR',
    note: 'Registered in the Netherlands',
  },
  {
    region: 'South Africa',
    flag: '🇿🇦',
    description: 'South African donors can contribute to Mohanji Foundation\'s Centre of Benevolence and community programs.',
    url: 'https://mohanji.org/donate/',
    currency: 'ZAR',
    note: 'Registered South African NGO',
  },
  {
    region: 'United Kingdom',
    flag: '🇬🇧',
    description: 'UK-based donors can support the Foundation through our registered UK charity.',
    url: 'https://mohanji.org/donate/',
    currency: 'GBP',
    note: 'UK registered charity',
  },
  {
    region: 'United States',
    flag: '🇺🇸',
    description: 'US-based donors can contribute via our registered US partner organisation.',
    url: 'https://mohanji.org/donate/',
    currency: 'USD',
    note: 'Tax-deductible for US donors',
  },
  {
    region: 'Other Countries',
    flag: '🌍',
    description: 'Donate from any other country — please contact us at info@mohanji.org for the most suitable payment method.',
    url: 'https://mohanji.org/donate/',
    currency: 'Multi',
    note: 'Contact info@mohanji.org for details',
  },
]

export default async function DonatePage() {
  const payload = await getPayloadClient()

  // Attempt to load donation links from SiteSettings global
  let donationLinks: any[] = []
  try {
    const settings = await payload.findGlobal({ slug: 'siteSettings', depth: 0 })
    if ((settings as any)?.donationLinks?.length) {
      donationLinks = (settings as any).donationLinks
    }
  } catch {
    // fall through to defaults
  }

  const options = donationLinks.length > 0 ? donationLinks : FALLBACK_DONATIONS

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-24 text-center">
        <div className="container">
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Support Our Mission
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-xl max-w-2xl mx-auto leading-relaxed">
            Your generosity enables free meditations, humanitarian activities, and the spread
            of consciousness across the world.
          </p>
        </div>
      </section>

      {/* Impact section */}
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl text-[#16697A] mb-1">Your Donation Matters</h2>
            <span className="gold-divider gold-divider--center" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mohanji Foundation is a global non-profit organisation committed to spreading
              love, compassion, and conscious living through programs, events, Centres of Benevolence,
              and service projects in 60+ countries.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { stat: '60+', label: 'Countries Reached' },
              { stat: '15+', label: 'Centres of Benevolence Worldwide' },
              { stat: '170+', label: 'Events Held Globally' },
            ].map((item) => (
              <div key={item.label} className="bg-[#F5F5F5] rounded-lg p-6">
                <p className="font-heading text-4xl text-[#C95D63] font-semibold mb-1">{item.stat}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          {/* What donations fund */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🏠', label: 'Centres of Benevolence', desc: 'Sacred retreat centres and community hubs in Australia, South Africa, Canada, USA, Scotland, Slovenia, Serbia, and more.' },
              { icon: '🍱', label: 'Annadaan (Food Service)', desc: 'Daily food service to thousands — a core humanitarian activity of Mohanji Foundation worldwide.' },
              { icon: '🧘', label: 'Free Programs & Meditations', desc: 'Free guided meditations, conscious walking sessions, and spiritual programs available globally.' },
              { icon: '👶', label: 'Care for Vulnerable', desc: 'Support for orphanages, seniors\' homes, animal welfare, and underprivileged communities.' },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 bg-[#F5F5F5] rounded-lg p-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-[#16697A] text-sm mb-0.5">{item.label}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation options */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl text-[#16697A] mb-1">Choose Your Region</h2>
            <span className="gold-divider gold-divider--center" />
            <p className="text-gray-600 mb-2">
              Select the option best suited for your location to ensure your donation is processed securely.
            </p>
            <p className="text-sm text-[#C95D63] font-medium">
              Please use the appropriate section for your region. If your region is not listed, contact{' '}
              <a href="mailto:info@mohanji.org" className="underline hover:text-[#f4442e]">info@mohanji.org</a>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {options.map((option: any, idx: number) => (
              <a
                key={option.region ?? idx}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-transparent hover:border-[#16697A]/30 transition-all p-6 text-center flex flex-col"
              >
                <span className="text-5xl mb-3">{option.flag ?? '🌐'}</span>
                <h3 className="font-heading text-xl text-[#16697A] mb-2 group-hover:text-[#C95D63] transition-colors">
                  {option.region ?? option.label}
                </h3>
                {option.currency && (
                  <span className="inline-block text-xs bg-[#E2B748] text-[#191919] font-semibold px-2 py-0.5 rounded mb-3 self-center">
                    {option.currency}
                  </span>
                )}
                {option.description && (
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                    {option.description}
                  </p>
                )}
                {option.note && (
                  <p className="text-xs text-gray-400 italic mb-4">{option.note}</p>
                )}
                <span className="block mt-auto bg-[#C95D63] text-white text-sm font-medium px-5 py-2 rounded group-hover:bg-[#f4442e] transition-colors">
                  Donate Now
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-14 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl text-[#16697A] mb-1">Transparent & Trusted</h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-600 leading-relaxed mb-6">
            Mohanji Foundation is a registered non-profit organisation. All donations are used
            for charitable activities including free programs, humanitarian aid, and educational content.
            Annual reports are published on our website.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/about/mohanji-foundation"
              className="px-6 py-2.5 border-2 border-[#16697A] text-[#16697A] rounded hover:bg-[#16697A] hover:text-white transition-colors text-sm font-medium"
            >
              About the Foundation
            </a>
            <a
              href="/contact"
              className="px-6 py-2.5 bg-[#C95D63] text-white rounded hover:bg-[#f4442e] transition-colors text-sm font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
