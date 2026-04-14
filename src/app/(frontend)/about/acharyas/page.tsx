import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/RenderBlocks'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mohanji Acharyas | Mohanji',
  description:
    "Mohanji Acharyas are trained teachers who carry Mohanji's lineage and transmit transformative spiritual practices worldwide.",
}

const featuredAcharyas = [
  {
    name: 'Milica Golubovic',
    country: 'Serbia',
    region: 'Europe',
    speciality: 'Consciousness Kriya & Retreats',
    initials: 'MG',
  },
  {
    name: 'Rajesh Kamath',
    country: 'India',
    region: 'South Asia',
    speciality: 'Vedic Practices & Satsangs',
    initials: 'RK',
  },
  {
    name: 'Monika Gulati',
    country: 'Germany',
    region: 'Europe',
    speciality: 'Yoga & Conscious Dancing',
    initials: 'MG',
  },
  {
    name: 'Preeti Duggal',
    country: 'USA',
    region: 'North America',
    speciality: 'Mai-Tri Method & Healing',
    initials: 'PD',
  },
  {
    name: 'Nishant Bhardwaj',
    country: 'India',
    region: 'South Asia',
    speciality: 'Power of Purity Meditation',
    initials: 'NB',
  },
  {
    name: 'Ana Misic',
    country: 'UK',
    region: 'Europe',
    speciality: 'Conscious Walking & Cleansing',
    initials: 'AM',
  },
  {
    name: 'Marco Ferreira',
    country: 'Brazil',
    region: 'South America',
    speciality: 'Conscious Dancing & Chanting',
    initials: 'MF',
  },
  {
    name: 'Dragana Kaurin',
    country: 'Australia',
    region: 'Oceania',
    speciality: 'Retreats & Group Programs',
    initials: 'DK',
  },
  {
    name: 'Satsangi Saraswati',
    country: 'South Africa',
    region: 'Africa',
    speciality: 'Shaktipat & Energy Work',
    initials: 'SS',
  },
]

const programTypes = [
  {
    title: 'Meditations',
    description:
      'Guided sessions of Power of Purity, Bliss of Silence, and Mohanji-transmitted meditations for deep inner cleansing and peace.',
    icon: '🧘',
  },
  {
    title: 'Retreats',
    description:
      'Multi-day immersive programs combining various practices, satsangs, conscious dancing, and community service.',
    icon: '🏔️',
  },
  {
    title: 'Consciousness Kriya',
    description:
      'Initiation and ongoing training in this powerful breathing technique that accelerates spiritual evolution.',
    icon: '🌬️',
  },
  {
    title: 'Mai-Tri Method',
    description:
      'Deep healing sessions working on physical, emotional, and karmic layers by trained and authorised healers.',
    icon: '✋',
  },
  {
    title: 'Satsangs',
    description:
      'Group gatherings for teachings, question-and-answer sessions, and shared spiritual practice in the tradition of Mohanji.',
    icon: '🙏',
  },
  {
    title: 'Corporate & Institutional',
    description:
      'Tailored programs for universities, schools, prisons, senior facilities, and corporate environments worldwide.',
    icon: '🏢',
  },
]

export default async function AcharyasPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'acharyas' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any

  return (
    <div>
      {/* Hero with real image */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image
          src="/images/acharyas/banner.jpg"
          alt="Mohanji Acharyas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 py-16 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-3">
            Mohanji Acharyas
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Living His Teachings — trained spiritual teachers who embody love, service, and
            transformation, sharing Mohanji's path worldwide.
          </p>
        </div>
      </section>

      {/* CMS content or fallback */}
      {page?.layout?.length > 0 ? (
        <RenderBlocks blocks={page.layout} />
      ) : (
        <>
          {/* What is an Acharya */}
          <section className="py-16 bg-white">
            <div className="container max-w-4xl">
              <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
                What is an Acharya?
              </h2>
              <span className="gold-divider gold-divider--center" />
              <div className="grid md:grid-cols-2 gap-10 mt-10 items-start">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    The word <em>Acharya</em> comes from Sanskrit, meaning "one who teaches by
                    example." More fundamentally, an Acharya is "the one who practices" — someone
                    who practices what they believe in with conviction, clarity, and consistency,
                    transforming people towards positivity.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    A Mohanji Acharya has committed to embodying Mohanji's principles through
                    compassion, kindness, and selflessness — living out a non-violent existence in
                    thought, word, and action. They are not just teachers but living examples of the
                    transformation that Mohanji's path offers.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Acharyas undergo rigorous training in Mohanji's practices and philosophy and are
                    authorised to represent the lineage and offer programs in their regions.
                    Training includes continuous mentorship to ensure the authenticity and purity of
                    the teachings transmitted.
                  </p>
                </div>
                <div className="bg-[#F5F5F5] rounded-lg p-8 border-l-4 border-[#E2B748]">
                  <h3 className="font-heading text-xl text-[#16697A] mb-4">Program Settings</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Acharya programs are delivered across diverse environments, using universal
                    techniques accessible to people of all faiths:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      'Universities and schools',
                      'Corporate organisations',
                      'Senior care facilities',
                      'Prisons and rehabilitation centres',
                      'Sports organisations',
                      'Trauma survivors and people with disabilities',
                      'Online, worldwide',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#E2B748] mt-0.5">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Programs Offered */}
          <section className="py-16 bg-[#F5F5F5]">
            <div className="container">
              <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
                Programs Offered
              </h2>
              <span className="gold-divider gold-divider--center" />
              <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-10">
                Each Acharya offers a range of programs — from local satsangs to international
                retreats — making Mohanji's teachings accessible globally.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programTypes.map((program) => (
                  <div
                    key={program.title}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl block mb-3">{program.icon}</span>
                    <h3 className="font-heading text-xl text-[#16697A] mb-2">{program.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Acharyas grid */}
          <section className="py-16 bg-white">
            <div className="container">
              <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
                Our Acharyas
              </h2>
              <span className="gold-divider gold-divider--center" />
              <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-10">
                Active in over 40 countries, Mohanji Acharyas bring the path of consciousness to
                communities worldwide.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAcharyas.map((acharya) => (
                  <div
                    key={acharya.name}
                    className="bg-[#F5F5F5] rounded-lg p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#16697A] to-[#5B2D8E] flex-shrink-0 flex items-center justify-center">
                      <span className="font-heading text-sm font-semibold text-white">
                        {acharya.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-[#16697A]">{acharya.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {acharya.country} · {acharya.region}
                      </p>
                      <p className="text-sm text-[#C95D63] font-medium mt-1">
                        {acharya.speciality}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm mt-8">
                Find the complete directory of Mohanji Acharyas at{' '}
                <a
                  href="https://mohanjiacharyas.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#16697A] underline hover:text-[#C95D63]"
                >
                  mohanjiacharyas.org
                </a>
              </p>
            </div>
          </section>

          {/* Goals / Benefits */}
          <section className="py-16 bg-[#16697A] text-white">
            <div className="container max-w-4xl">
              <h2 className="font-heading text-3xl text-center mb-2">
                What Acharya Programs Achieve
              </h2>
              <span className="gold-divider gold-divider--center" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-center">
                {[
                  'Relaxation and reduced anxiety',
                  'Gratitude and forgiveness',
                  'Deep self-connection',
                  'Relief from accumulated emotions',
                  'Inner peace and stillness',
                  'Stress reduction and clarity',
                ].map((goal) => (
                  <div
                    key={goal}
                    className="bg-white/10 rounded-lg p-5 backdrop-blur-sm"
                  >
                    <span className="text-[#E2B748] text-2xl block mb-2">✦</span>
                    <p className="text-white/90 text-sm leading-relaxed">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-white text-center">
            <div className="container max-w-xl">
              <h2 className="font-heading text-3xl text-[#16697A] mb-4">
                Become a Mohanji Acharya
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Are you called to serve and share the path of consciousness? Applications for
                Acharya Training are open to dedicated practitioners who have established their
                own sadhana and wish to serve the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://mohanjiacharyas.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
                >
                  Explore Acharya Programs
                </a>
                <Link
                  href="/contact"
                  className="border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-6 py-3 rounded font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
