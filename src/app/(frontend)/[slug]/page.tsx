import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/RenderBlocks'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const page = docs[0] as any
  if (!page) return {}
  return {
    title: page.meta?.title ?? page.title,
    description: page.meta?.description ?? undefined,
  }
}

export async function generateStaticParams() {
  // Return empty — pages are rendered on-demand (ISR) at runtime
  // Avoids DB connection requirement during build
  return []
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 2,
    limit: 1,
  })
  const page = docs[0] as any
  if (!page) return notFound()
  return <RenderBlocks blocks={page.layout as any} />
}
