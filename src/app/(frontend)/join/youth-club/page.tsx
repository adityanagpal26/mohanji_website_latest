import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mohanji Youth Club | Mohanji',
  description:
    'Mohanji Youth Club is a global youth network which exists to empower and inspire fellow youngsters to live authentic, positive and purpose-driven lives. Inspired by the teachings of Mohanji to "Be good. Do Good."',
}

const activities = [
  {
    title: 'Educational Programs & Trainings',
    description:
      'Seminars, workshops, and trainings in unique skills — including mid-brain activation, communication, and personal growth — designed to unlock youth potential.',
    icon: '🎓',
  },
  {
    title: 'Summits & Meetings',
    description:
      'Working on personal growth and spreading awareness about sustainable living through summits, group meetings, and collaborative projects.',
    icon: '🌟',
  },
  {
    title: 'Picnics & Festivals',
    description:
      'On the basis of compassion and non-violence, opening doors to fresh knowledge, vegan food, and lots of fun — celebrating life consciously.',
    icon: '🌿',
  },
  {
    title: 'Selfless Service',
    description:
      'Learning to give more than we take — creating good people through acts of kindness, humanitarian service, and compassionate action.',
    icon: '🤝',
  },
  {
    title: 'MYC Awards',
    description:
      'MYC Awards are given to youngsters excelling and innovating in writing, acting, and film-making — based on compassion, kindness, and selflessness.',
    icon: '🏆',
  },
  {
    title: 'Global Community',
    description:
      'All youngsters aged 14–29 are welcome to join existing youth clubs around the world and become part of this global family-like community.',
    icon: '🌍',
  },
]

const areasOfInterest = [
  'Education', 'Social Impact', 'Non-Violence', 'Yoga', 'Meditation',
  'Communication', 'Organic Agriculture', 'Recycling', 'Nutrition', 'Sports',
  'Ecology', 'Natural Cosmetics', 'Social Games', 'Technology', 'Spiritual Literature',
  'Networking', 'Dancing', 'Languages', 'Leadership', 'Journalism',
  'Creative Writing', 'Music',
]

export default function YouthClubPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Mohanji Youth Club
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            A global youth network empowering youngsters to live authentic, positive, and
            purpose-driven lives. Inspired by Mohanji&apos;s teaching: &ldquo;Be good. Do Good.&rdquo;
          </p>
          <div className="mt-8">
            <a
              href="https://mohanji.org/youth-club/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-3 rounded font-medium transition-colors"
            >
              Join the Youth Club
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Who We Are
          </h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-700 leading-relaxed mt-6">
            Mohanji Youth Club (MYC) is a global youth network which exists to empower and inspire
            fellow youngsters to live authentic, positive and purpose-driven lives. It is inspired
            by the work and teachings of Mohanji to &ldquo;Be good. Do Good.&rdquo;
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We serve as a platform for youth to break their boundaries. Our aim is to empower youth
            to explore and express their full potential beyond the limitations of the mind.
          </p>
          <blockquote className="mt-6 border-l-4 border-[#E2B748] pl-6 py-2">
            <p className="font-heading text-xl text-[#16697A] italic">
              &ldquo;Break your boundaries!!&rdquo;
            </p>
            <p className="text-gray-500 text-sm mt-1">— Mohanji Youth Club</p>
          </blockquote>
          <p className="text-gray-700 leading-relaxed mt-4">
            All youngsters aged 14–29 are welcome to join existing youth clubs and become part of
            this global family-like community.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#16697A] text-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '60+', label: 'Active Countries' },
              { value: '14–29', label: 'Age Range' },
              { value: '500+', label: 'Projects Completed' },
              { value: '22+', label: 'Areas of Interest' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-5xl font-semibold text-[#E2B748]">{stat.value}</p>
                <p className="text-white/80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            What We Do
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-4xl block mb-4">{activity.icon}</span>
                <h3 className="font-heading text-xl text-[#16697A] mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to join */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            How to Join
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid sm:grid-cols-3 gap-8 mt-10 text-center">
            {[
              { step: '1', title: 'Express Interest', description: 'Send us a message with your name, age, country, and why you want to join MYC.' },
              { step: '2', title: 'Connect with Your Chapter', description: 'We\'ll connect you with the MYC chapter in your region — or help you start one!' },
              { step: '3', title: 'Get Involved', description: 'Start attending events, joining projects, and building lifelong friendships.' },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-12 h-12 rounded-full bg-[#5B2D8E] text-white font-heading font-semibold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-heading text-lg text-[#16697A] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="bg-[#5B2D8E] text-white hover:bg-[#4a2275] px-8 py-4 rounded font-medium transition-colors text-lg"
            >
              Join Mohanji Youth Club
            </Link>
          </div>
        </div>
      </section>

      {/* Areas of interest */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container max-w-4xl text-center">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">Areas of Interest</h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-600 mt-4 mb-8">
            MYC embraces a wide range of interests to support every young person&apos;s unique path.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {areasOfInterest.map((area) => (
              <span
                key={area}
                className="bg-white border border-[#16697A]/20 text-[#16697A] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#16697A] hover:text-white transition-colors cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 hero-gradient text-white text-center">
        <div className="container max-w-2xl">
          <blockquote className="font-heading text-xl italic leading-relaxed text-white/90">
            &ldquo;Be good. Do Good.&rdquo;
          </blockquote>
          <p className="mt-3 text-[#E2B748] text-sm font-semibold uppercase tracking-widest">— Mohanji</p>
          <p className="text-white/80 mt-4 text-sm">
            The guiding philosophy of Mohanji Youth Club worldwide.
          </p>
        </div>
      </section>
    </div>
  )
}
