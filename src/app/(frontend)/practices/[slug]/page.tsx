import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/RenderBlocks'
import { KriyaNewsletterForm } from '@/components/ui/KriyaNewsletterForm'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function extractTextFromRichText(content: any): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (!content?.root?.children) return ''
  return content.root.children
    .map((node: any) => {
      if (node.children) return node.children.map((c: any) => c.text || '').join('')
      return node.text || ''
    })
    .join(' ')
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'practices',
    limit: 100,
    depth: 0,
  })
  return (docs as any[]).filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
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
  return {
    title: `${practice.title} | Mohanji`,
    description:
      typeof practice.description === 'string'
        ? practice.description
        : `Learn about ${practice.title} — a transformative spiritual practice taught by Mohanji.`,
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

  const descriptionText =
    typeof practice.description === 'string'
      ? practice.description
      : extractTextFromRichText(practice.description)

  const benefits: string[] = Array.isArray(practice.benefits)
    ? practice.benefits.map((b: any) => (typeof b === 'string' ? b : b.benefit ?? b.text ?? ''))
    : []

  const howItWorks: string[] = Array.isArray(practice.howItWorks)
    ? practice.howItWorks.map((h: any) => (typeof h === 'string' ? h : h.step ?? h.text ?? ''))
    : []

  const imageUrl =
    typeof practice.featuredImage === 'object' && practice.featuredImage?.url
      ? practice.featuredImage.url
      : null

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
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3 text-white">
            {practice.title}
          </h1>
          <span className="gold-divider gold-divider--center" />
          {descriptionText && (
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 line-clamp-3">
              {descriptionText}
            </p>
          )}
        </div>
      </section>

      {/* CMS blocks */}
      {practice.layout?.length > 0 && <RenderBlocks blocks={practice.layout} />}

      {/* Fallback content when no CMS blocks */}
      {(!practice.layout || practice.layout.length === 0) && (
        <>
          {descriptionText && (
            <section className="py-16 bg-white">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl text-[#16697A] mb-2">About This Practice</h2>
                <span className="gold-divider" />
                <p className="text-gray-700 leading-relaxed mt-6 text-lg">{descriptionText}</p>
              </div>
            </section>
          )}

          {benefits.length > 0 && (
            <section className="py-16 bg-[#F5F5F5]">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl text-[#16697A] mb-2">Benefits</h2>
                <span className="gold-divider" />
                <ul className="mt-6 space-y-3">
                  {benefits.filter(Boolean).map((benefit, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#16697A] text-white text-xs flex items-center justify-center font-semibold">
                        ✓
                      </span>
                      <p className="text-gray-700 leading-relaxed">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {howItWorks.length > 0 && (
            <section className="py-16 bg-white">
              <div className="container max-w-3xl">
                <h2 className="font-heading text-3xl text-[#16697A] mb-2">How It Works</h2>
                <span className="gold-divider" />
                <ol className="mt-6 space-y-4">
                  {howItWorks.filter(Boolean).map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E2B748] text-white text-sm font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* Newsletter signup for practices that have it enabled */}
          {practice.showNewsletterForm && (
            <section className="py-14 bg-white">
              <div className="container max-w-2xl">
                <h2 className="font-heading text-2xl text-[#16697A] mb-2">
                  {practice.newsletterLabel ?? 'Sign up for the Newsletter'}
                </h2>
                <span className="gold-divider" />
                <p className="text-gray-600 leading-relaxed mt-4 mb-6">
                  Register to find out what is happening — including events, tips, stories and
                  much more.
                </p>
                <KriyaNewsletterForm />
              </div>
            </section>
          )}

          <section className="py-16 bg-[#F5F5F5] text-center">
            <div className="container max-w-xl">
              <h2 className="font-heading text-3xl text-[#16697A] mb-4">
                Experience {practice.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Join a program or session to experience this practice directly with a trained
                Mohanji Acharya.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={practice.applicationFormUrl ?? '/contact'}
                  target={practice.applicationFormUrl ? '_blank' : undefined}
                  rel={practice.applicationFormUrl ? 'noopener noreferrer' : undefined}
                  className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
                >
                  Register / Apply
                </a>
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
