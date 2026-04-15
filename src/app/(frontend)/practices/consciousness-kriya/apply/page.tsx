import React from 'react'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { KriyaApplyForm } from '@/components/practices/KriyaApplyForm'

export const revalidate = 3600

export const metadata = {
  title: 'Apply for Consciousness Kriya | Mohanji',
  description:
    'Apply for Consciousness Kriya initiation — a powerful pranayama-based practice transmitted by Mohanji.',
}

export default async function KriyaApplyPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'practices',
    where: { slug: { equals: 'consciousness-kriya' } },
    depth: 0,
    limit: 1,
  })
  const practice = docs[0] as any

  const pageTitle = practice?.applyPageTitle || 'Apply for Consciousness Kriya'
  const pageIntro =
    practice?.applyPageIntro ||
    'Consciousness Kriya is transmitted through initiation. Please complete the form below and our team will be in touch to guide you through the next steps.'

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#16697A] to-[#0d4a56] py-14 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">{pageTitle}</h1>
          <span className="gold-divider gold-divider--center" />
          <p className="mt-5 text-white/85 max-w-xl mx-auto leading-relaxed">{pageIntro}</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container max-w-xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <KriyaApplyForm />
          </div>
          <div className="mt-6 text-center">
            <Link href="/practices/consciousness-kriya" className="text-sm text-[#16697A] underline underline-offset-2">
              ← Back to Consciousness Kriya
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
