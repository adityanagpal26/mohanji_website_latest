import React from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mohanji Global Council | Mohanji',
  description:
    "Meet the Global Council — dedicated leaders guiding Mohanji's worldwide mission of consciousness, compassion, and service.",
}

function getImageUrl(field: any): string | null {
  if (!field) return null
  if (typeof field === 'string') return field
  if (typeof field === 'object' && field.url) return field.url
  return null
}

export default async function GlobalCouncilPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'global-council' } },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as any
  const cc = page?.councilContent ?? {}

  const introText =
    cc.introText ||
    "The Mohanji Global Council is the governing body overseeing the strategic direction and operations of the Mohanji Foundation worldwide."
  const purposePoints: any[] = cc.purposePoints?.length
    ? cc.purposePoints
    : [
        { title: 'Strategic Governance', description: 'Setting the global direction for the Foundation and ensuring alignment across all platforms and initiatives.' },
        { title: 'Regional Coordination', description: 'Connecting and empowering regional teams, volunteers, and practitioners worldwide.' },
        { title: 'Humanitarian Oversight', description: "Guiding and monitoring the Foundation's charitable programs — feeding, sheltering, and supporting communities in need." },
        { title: 'Values & Integrity', description: "Ensuring all activities remain aligned with Mohanji's core teachings and the Foundation's ethical standards." },
      ]
  const members: any[] = cc.members ?? []
  const regions: any[] = cc.regions ?? []
  const howItWorks: any[] = cc.howItWorks ?? []

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Mohanji Global Council
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Dedicated leaders united in service, guiding the global mission of the Mohanji
            Foundation across five continents.
          </p>
        </div>
      </section>

      {/* Purpose & Role */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl text-[#16697A] mb-2">Purpose &amp; Role</h2>
            <span className="gold-divider gold-divider--center" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed">{introText}</p>
            </div>
            <div className="space-y-4">
              {purposePoints.map((item: any) => (
                <div key={item.title} className="flex gap-4 items-start p-4 bg-[#F5F5F5] rounded-lg">
                  <span className="text-[#E2B748] text-xl flex-shrink-0 mt-0.5">✦</span>
                  <div>
                    <h3 className="font-semibold text-[#16697A] mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Council Members */}
      {members.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl text-[#16697A] mb-2">Council Members</h2>
              <span className="gold-divider gold-divider--center" />
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                The Global Council is composed of dedicated individuals from around the world,
                each serving as a steward of the Foundation&apos;s mission in their region.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {members.map((member: any) => {
                const photoUrl = getImageUrl(member.photo)
                return (
                  <div
                    key={member.name}
                    className="bg-white rounded-lg shadow-sm p-6 text-center border-t-4 border-[#E2B748] flex flex-col"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                      {photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoUrl} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-heading text-2xl text-[#16697A]/60">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg text-[#16697A]">{member.name}</h3>
                    {member.role && (
                      <p className="text-sm text-[#C95D63] font-medium mt-1">{member.role}</p>
                    )}
                    {member.country && (
                      <p className="text-xs text-gray-400 mt-1 mb-3">{member.country}</p>
                    )}
                    {member.bio && (
                      <p className="text-xs text-gray-500 leading-relaxed flex-1">{member.bio}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Global Presence */}
      {regions.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl text-[#16697A] mb-2">Global Presence</h2>
              <span className="gold-divider gold-divider--center" />
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                The Mohanji Foundation is active in over 100 countries. The Global Council
                coordinates five key regions to ensure the mission is carried forward locally
                and authentically.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {regions.map((r: any) => (
                <div
                  key={r.region}
                  className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-heading text-xl text-[#16697A] mb-2">{r.region}</h3>
                  {r.activities && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{r.activities}</p>
                  )}
                  {r.countries && (
                    <p className="text-xs text-gray-400 italic">{r.countries}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {howItWorks.length > 0 && (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl text-[#16697A] mb-2">How It Works</h2>
              <span className="gold-divider gold-divider--center" />
            </div>
            <ol className="space-y-6">
              {howItWorks.map((item: any, i: number) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#16697A] text-white text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{item.step}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container max-w-xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-3">Join the Global Mission</h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-600 leading-relaxed mt-6 mb-8">
            The Mohanji Foundation&apos;s work is carried forward by thousands of dedicated volunteers
            worldwide. If you feel called to serve, explore how you can get involved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/join/volunteer"
              className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
            >
              Become a Volunteer
            </a>
            <a
              href="/about/foundation"
              className="px-8 py-3 border-2 border-[#16697A] text-[#16697A] font-medium rounded hover:bg-[#16697A] hover:text-white transition-colors"
            >
              About the Foundation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
