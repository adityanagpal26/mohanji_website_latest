import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mohanji.org'
  const payload = await getPayloadClient()

  // Static pages
  const staticRoutes = [
    '/', '/about', '/about/who-is-mohanji', '/about/foundation', '/about/life-journey',
    '/about/global-council', '/about/acharyas', '/about/spaces', '/about/golden-path',
    '/about/awards', '/meditations', '/practices', '/events', '/events/past',
    '/courses', '/blog', '/news', '/books', '/audios', '/quotes',
    '/kailash', '/kailash/itinerary', '/kailash/application', '/kailash/faqs',
    '/kailash/places', '/kailash/terms', '/join', '/join/volunteer', '/join/youth-club',
    '/contact', '/donate', '/search',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }))

  // Dynamic content - wrap in try/catch so sitemap doesn't fail if DB is unavailable
  const dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const [posts, events, meditations, books, practices, courses] = await Promise.all([
      payload.find({ collection: 'posts', limit: 1000, depth: 0 }),
      payload.find({ collection: 'events', limit: 1000, depth: 0 }),
      payload.find({ collection: 'meditations', limit: 100, depth: 0 }),
      payload.find({ collection: 'books', limit: 200, depth: 0 }),
      payload.find({ collection: 'practices', limit: 100, depth: 0 }),
      payload.find({ collection: 'courses', limit: 100, depth: 0 }),
    ])

    posts.docs.forEach((p: any) => {
      const prefix = p.postType === 'blog' ? '/blog' : '/news'
      dynamicRoutes.push({ url: `${baseUrl}${prefix}/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: 'monthly', priority: 0.7 })
    })
    events.docs.forEach((e: any) => {
      dynamicRoutes.push({ url: `${baseUrl}/events/${e.slug}`, lastModified: new Date(e.updatedAt), changeFrequency: 'weekly', priority: 0.8 })
    })
    meditations.docs.forEach((m: any) => {
      dynamicRoutes.push({ url: `${baseUrl}/meditations/${m.slug}`, lastModified: new Date(m.updatedAt), changeFrequency: 'monthly', priority: 0.7 })
    })
    books.docs.forEach((b: any) => {
      dynamicRoutes.push({ url: `${baseUrl}/books/${b.slug}`, lastModified: new Date(b.updatedAt), changeFrequency: 'yearly', priority: 0.5 })
    })
    practices.docs.forEach((pr: any) => {
      dynamicRoutes.push({ url: `${baseUrl}/practices/${pr.slug}`, lastModified: new Date(pr.updatedAt), changeFrequency: 'monthly', priority: 0.7 })
    })
    courses.docs.forEach((c: any) => {
      dynamicRoutes.push({ url: `${baseUrl}/courses/${c.slug}`, lastModified: new Date(c.updatedAt), changeFrequency: 'monthly', priority: 0.8 })
    })
  } catch (e) {
    console.warn('Sitemap: DB unavailable, returning static routes only')
  }

  return [...staticRoutes, ...dynamicRoutes]
}
