import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/RenderBlocks'
import { KriyaNewsletterForm } from '@/components/ui/KriyaNewsletterForm'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

function getDescriptionText(richText: any): string {
  if (!richText) return ''
  if (typeof richText === 'string') return richText
  if (!richText?.root?.children) return ''
  return richText.root.children
    .filter((n: any) => n.type === 'paragraph')
    .map((n: any) => n.children?.map((c: any) => c.text || '').join('') || '')
    .filter(Boolean)
    .join(' ')
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'practices',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const practice = docs[0] as any
  if (!practice) return {}
  const descText = getDescriptionText(practice.description)
  return {
    title: `${practice.title} | Mohanji`,
    description:
      practice.meta?.description ||
      descText.slice(0, 160) ||
      `Learn about ${practice.title} — a transformative spiritual practice taught by Mohanji.`,
  }
}

export default async function PracticeDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'practices',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  const practice = docs[0] as any
  if (!practice) return notFound()

  const descText = getDescriptionText(practice.description)
  const imageUrl =
    typeof practice.featuredImage === 'object' && practice.featuredImage?.url
      ? practice.featuredImage.url
      : null

  // Normalise benefits and howItWorks from the new array schema
  const benefits: string[] = Array.isArray(practice.benefits)
    ? practice.benefits.map((b: any) => b.benefit ?? b.text ?? '').filter(Boolean)
    : []
  const howItWorks: string[] = Array.isArray(practice.howItWorks)
    ? practice.howItWorks.map((h: any) => h.step ?? h.text ?? '').filter(Boolean)
    : []

  // CTA buttons from CMS
  const primaryCtaLabel = practice.primaryCta?.label || practice.applicationFormUrl ? 'Register / Apply' : null
  const primaryCtaUrl = practice.primaryCta?.url || practice.applicationFormUrl || null

  // External practice — show a redirect page
  if (practice.isExternalPractice && practice.externalPageUrl) {
    return (
      <div>
        {/* Hero */}
        <section className="relative min-h-[320px] flex items-end overflow-hidden">
          {imageUrl ? (
            <Image src={imageUrl} alt={practice.title} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 hero-gradient" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="container relative z-10 py-12 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3 text-white">
              {practice.title}
            </h1>
            <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-4" />
          </div>
        </section>

        <section className="py-20 bg-white text-center">
          <div className="container max-w-2xl">
            {practice.category && (
              <span className="inline-block bg-[#16697A] text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide mb-4">
                {practice.category}
              </span>
            )}
            {descText && (
              <p className="text-gray-700 leading-relaxed text-lg mb-8">{descText}</p>
            )}
            <a
              href={practice.externalPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#C95D63] text-white font-semibold px-8 py-4 rounded hover:bg-[#f4442e] transition-colors text-lg"
            >
              {practice.primaryCta?.label || 'Visit the Practice Website'} →
            </a>
            <div className="mt-6">
              <Link href="/practices" className="text-sm text-[#16697A] hover:underline">
                ← Back to all practices
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={practice.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="container relative z-10 py-12 text-center">
          {practice.category && (
            <span className="inline-block bg-[#E2B748] text-[#191919] text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide mb-4">
              {practice.category}
            </span>
          )}
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-2 text-white">
            {practice.title}
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-4" />
          {practice.tagline && (
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {practice.tagline}
            </p>
          )}
          {practice.duration && (
            <p className="text-white/60 text-sm mt-2">{practice.duration}</p>
          )}
        </div>
      </section>

      {/* CMS blocks take priority if they exist */}
      {practice.layout?.length > 0 && <RenderBlocks blocks={practice.layout} />}

      {/* Structured content — shown when no CMS blocks are set */}
      {(!practice.layout || practice.layout.length === 0) && (
        <>
          {/* Description */}
          {descText && (
            <section className="py-16 bg-white">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl text-[#16697A] mb-2">About This Practice</h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-6" />
                <p className="text-gray-700 leading-relaxed text-lg">{descText}</p>
              </div>
            </section>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <section className="py-16 bg-[#F5F5F5]">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl text-[#16697A] mb-2">Benefits</h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-6" />
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#16697A] text-white text-xs flex items-center justify-center font-bold">
                        ✓
                      </span>
                      <p className="text-gray-700 leading-relaxed">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* How It Works */}
          {howItWorks.length > 0 && (
            <section className="py-16 bg-white">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl text-[#16697A] mb-2">How It Works</h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-6" />
                <ol className="space-y-5">
                  {howItWorks.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E2B748] text-[#191919] text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* Newsletter signup */}
          {practice.showNewsletterForm && (
            <section className="py-14 bg-[#F5F5F5]">
              <div className="container max-w-2xl">
                <h2 className="font-heading text-2xl text-[#16697A] mb-2">
                  {practice.newsletterLabel ?? 'Sign up for the Newsletter'}
                </h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-6" />
                <p className="text-gray-600 leading-relaxed mb-6">
                  Register to receive news, events, practice tips and inspiration.
                </p>
                <KriyaNewsletterForm />
              </div>
            </section>
          )}

          {/* Contact form */}
          {practice.showContactForm && (
            <section className="py-14 bg-white">
              <div className="container max-w-2xl">
                <h2 className="font-heading text-2xl text-[#16697A] mb-2">Write to Us</h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-6" />
                <p className="text-gray-600 leading-relaxed mb-6">
                  Have a question or would like to learn more? We&apos;d love to hear from you.
                </p>
                <PracticeContactForm
                  practiceTitle={practice.title}
                  contactEmail={practice.contactEmail}
                />
              </div>
            </section>
          )}

          {/* CTA section */}
          <section className="py-16 bg-[#F5F5F5] text-center">
            <div className="container max-w-xl">
              <h2 className="font-heading text-3xl text-[#16697A] mb-4">
                Experience {practice.title}
              </h2>
              <span className="block w-10 h-0.5 bg-[#E2B748] mx-auto mb-6" />
              <p className="text-gray-600 leading-relaxed mb-8">
                Join a program or session to experience this practice directly with a trained
                Mohanji Acharya.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {primaryCtaLabel && primaryCtaUrl && (
                  <a
                    href={primaryCtaUrl}
                    target={primaryCtaUrl.startsWith('http') ? '_blank' : undefined}
                    rel={primaryCtaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
                  >
                    {primaryCtaLabel}
                  </a>
                )}
                {practice.brochureUrl && (
                  <a
                    href={practice.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E2B748] text-[#191919] hover:bg-yellow-400 px-6 py-3 rounded font-medium transition-colors"
                  >
                    Download Brochure
                  </a>
                )}
                <Link
                  href="/practices"
                  className="border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-6 py-3 rounded transition-colors"
                >
                  All Practices
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

// Inline contact form component (server-safe, progressive enhancement via API route)
function PracticeContactForm({
  practiceTitle,
  contactEmail,
}: {
  practiceTitle: string
  contactEmail?: string
}) {
  return (
    <form
      action="/api/contact"
      method="POST"
      className="space-y-4 bg-[#F5F5F5] p-6 rounded-lg"
    >
      <input type="hidden" name="subject" value={`Enquiry: ${practiceTitle}`} />
      {contactEmail && <input type="hidden" name="to" value={contactEmail} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#16697A]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#16697A]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#16697A]"
          placeholder={`I would like to know more about ${practiceTitle}...`}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#16697A] text-white py-3 rounded font-medium hover:bg-[#0e4f5c] transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}
