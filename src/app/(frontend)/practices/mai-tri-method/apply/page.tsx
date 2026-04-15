import React from 'react'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { MaiTriApplyForm } from '@/components/mai-tri/MaiTriApplyForm'

export const revalidate = 3600

export const metadata = {
  title: 'Apply to Become a Mai-Tri Practitioner | Mohanji',
  description:
    "Apply to join the global community of initiated Mai-Tri Method practitioners serving through Mohanji's consciousness.",
}

export default async function MaiTriApplyPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'mai-tri-method' } },
    depth: 0,
    limit: 1,
  })
  const cms = (docs[0] as any)?.maiTriContent ?? {}

  const pageTitle = cms.applyPageTitle || 'Apply to Become a Mai-Tri Practitioner'
  const pageIntro =
    cms.applyPageIntro ||
    'The Mai-Tri Method is a profound path of service. Please complete this application thoughtfully and honestly. All fields marked with an asterisk are required.'

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#16697A] to-[#0d4a56] py-14 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">{pageTitle}</h1>
          <span className="gold-divider gold-divider--center" />
          <p className="mt-5 text-white/85 max-w-2xl mx-auto leading-relaxed">{pageIntro}</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <MaiTriApplyForm />
          <div className="mt-8 text-center">
            <Link href="/practices/mai-tri-method" className="text-sm text-[#16697A] underline underline-offset-2">
              ← Back to Mai-Tri Method
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
