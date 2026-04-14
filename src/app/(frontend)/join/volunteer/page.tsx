import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Volunteer with Mohanji Foundation | Mohanji',
  description:
    'Volunteer your time and skills with the Mohanji Foundation. Join thousands of volunteers worldwide in serving humanity through love, compassion, and conscious action.',
}

const opportunities = [
  {
    title: 'Microsoft Azure Administrator',
    category: 'Technology',
    description:
      'Support the Foundation\'s cloud infrastructure, manage Azure resources, and help ensure reliable digital services for global programs.',
    skills: 'Azure, Cloud Infrastructure, DevOps',
    icon: '☁️',
  },
  {
    title: 'Digital Marketing Specialist (Podcasts)',
    category: 'Media & Communications',
    description:
      "Help grow Mohanji's podcast presence — manage distribution, create promotional content, and grow audiences across platforms.",
    skills: 'Podcast Platforms, Social Media, Audio Content',
    icon: '🎙️',
  },
  {
    title: 'Web Copy Writer',
    category: 'Writing & Content',
    description:
      "Write compelling, spiritually resonant content for mohanji.org — from program descriptions to blog posts and social media.",
    skills: 'Copywriting, SEO, Spiritual Sensitivity',
    icon: '✍️',
  },
  {
    title: 'UI/UX Designer',
    category: 'Design',
    description:
      "Help design beautiful, accessible digital experiences for the Foundation's websites, apps, and online programs.",
    skills: 'Figma, User Research, Accessibility',
    icon: '🎨',
  },
  {
    title: 'Humanitarian Service',
    category: 'On-ground Service',
    description:
      'Join food distribution drives, shelter support, education programs, and emergency relief efforts through ACT Foundation in your region.',
    skills: 'Compassion, Physical energy, Teamwork',
    icon: '🤝',
  },
  {
    title: 'Event Support',
    category: 'Events & Logistics',
    description:
      'Help organise and manage retreats, satsangs, workshops, and public events in your city or country alongside local coordinators.',
    skills: 'Organisation, Logistics, Communication',
    icon: '📅',
  },
  {
    title: 'Translation & Outreach',
    category: 'Languages',
    description:
      "Help translate Mohanji's teachings, books, and content into your native language, reaching thousands who might otherwise never encounter these teachings.",
    skills: 'Languages, Writing, Attention to detail',
    icon: '🌐',
  },
  {
    title: 'Environmental Projects',
    category: 'Eco-Service',
    description:
      'Participate in tree planting, clean-up drives, and awareness campaigns for environmental consciousness in partnership with AmmuFoundation.',
    skills: 'Environmental awareness, Physical activity',
    icon: '🌿',
  },
  {
    title: 'Teaching Support',
    category: 'Spiritual Programs',
    description:
      'Assist trained Acharyas in running meditation sessions, yoga classes, and spiritual programs — a beautiful service opportunity for established practitioners.',
    skills: 'Teaching, Meditation practice, Patience',
    icon: '🙏',
  },
]

const areasOfInterest = [
  'Education',
  'Social Impact',
  'Non-Violence',
  'Yoga & Meditation',
  'Organic Agriculture',
  'Sustainability',
  'Sports',
  'Creative Fields',
  'Animal Welfare',
  'Environmental Protection',
  'Youth Leadership',
  'Healthcare',
]

export default function VolunteerPage() {
  return (
    <div>
      {/* Hero with real image */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image
          src="/images/volunteer/banner.jpg"
          alt="Volunteer with Mohanji Foundation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 py-16 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-3">
            Volunteer for a Greater Good
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Find out about opportunities to create a better tomorrow — and discover yourself in
            the process.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Why Volunteer?
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid md:grid-cols-2 gap-10 mt-10 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed">
                Giving selflessly to all beings — one's community, animals and birds, as well as
                serving the Earth with an attitude of gratitude — is the pillar of Mohanji's
                teachings. Social service is one of the most effective paths to inner freedom.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Volunteer service helps individuals unhook from the accumulating dues and karmas of
                life, enabling them to live with greater purpose. When done with selfless intent,
                service becomes transformative for both the giver and the receiver.
              </p>
              <blockquote className="mt-6 pl-4 border-l-4 border-[#E2B748] italic text-[#16697A] font-heading text-lg">
                "Believe in what you do, believe in volunteering, believe in being selfless, have
                no expectation — then, volunteering becomes your strength."
                <cite className="block mt-2 text-sm not-italic text-gray-500">— Mohanji</cite>
              </blockquote>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: '🌍',
                  title: 'Global Reach',
                  description: 'Your contribution reaches people in 93+ countries across all continents.',
                },
                {
                  icon: '🌱',
                  title: 'Personal Growth',
                  description: 'Selfless service dissolves the ego and accelerates spiritual evolution.',
                },
                {
                  icon: '❤️',
                  title: 'Community',
                  description: 'Connect with a global sangha of like-minded souls dedicated to service.',
                },
                {
                  icon: '✨',
                  title: 'Purpose',
                  description: "Everyone has something to give — discover your unique contribution.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start bg-[#F5F5F5] rounded-lg p-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-heading text-lg text-[#16697A]">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Volunteering Opportunities
          </h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-10">
            We welcome volunteers of all backgrounds and skill levels. There is always a role that
            fits your unique gifts.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#16697A] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{opp.icon}</span>
                  <div>
                    <span className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide">
                      {opp.category}
                    </span>
                    <h3 className="font-heading text-lg text-[#16697A] leading-tight">{opp.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{opp.description}</p>
                <p className="text-xs text-gray-400">
                  <span className="font-semibold text-gray-500">Skills:</span> {opp.skills}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Interest */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl text-[#16697A] text-center mb-2">
            Areas of Interest
          </h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-600 text-center mt-4 mb-8">
            We work across a wide range of domains. If you have skills or passion in any of these
            areas, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {areasOfInterest.map((area) => (
              <span
                key={area}
                className="bg-[#F5F5F5] text-[#16697A] border border-[#16697A]/20 px-4 py-2 rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            How to Get Started
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid sm:grid-cols-3 gap-8 mt-10 text-center">
            {[
              { step: '1', title: 'Express Interest', description: 'Complete the volunteer application form with your location, skills, and areas of interest.' },
              { step: '2', title: 'Connect Locally', description: "We'll connect you with your nearest Mohanji chapter or the right team for your skills." },
              { step: '3', title: 'Start Serving', description: 'Begin contributing — and watch how selfless service transforms both the world and yourself.' },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-12 h-12 rounded-full bg-[#16697A] text-white font-heading font-semibold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-heading text-lg text-[#16697A] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="https://forms.gle/f657nFpcmZqvooMu6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-4 rounded font-medium transition-colors text-lg"
            >
              Apply to Volunteer
            </a>
            <Link
              href="/contact"
              className="border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-8 py-4 rounded font-medium transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* MYC Awards mention */}
      <section className="py-12 bg-[#16697A] text-white text-center">
        <div className="container max-w-2xl">
          <h3 className="font-heading text-2xl mb-3">MYC Awards</h3>
          <p className="text-white/85 leading-relaxed">
            The Mohanji Youth Club recognises young volunteers excelling in writing, acting, and
            filmmaking — based on the values of compassion and selflessness. Volunteer with the
            Youth Club to be eligible.
          </p>
          <Link
            href="/join/youth-club"
            className="inline-block mt-6 bg-[#E2B748] text-[#191919] font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors"
          >
            Join the Youth Club
          </Link>
        </div>
      </section>
    </div>
  )
}
