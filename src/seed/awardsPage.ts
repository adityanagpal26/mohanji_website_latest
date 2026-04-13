import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedAwardsPage(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:awards-page]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero', url: 'https://mohanji.org/wp-content/uploads/2022/05/Who-is-Mohanji-1.jpg', alt: 'Awards & Recognition — hero' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const awardsPageContent = {
    heroImage: mediaMap.hero ?? undefined,
    introText: 'Over the years, Mohanji and the Mohanji Foundation have been honoured with numerous awards recognising their transformative work in spirituality, humanitarian service, animal welfare, environmental protection, and peace — spanning 93+ countries.',
    closingQuote: 'I have no desire for recognition. I only desire that the path remains pure and accessible to all who seek liberation.',
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Awards & Recognition',
      slug: 'awards',
      pageType: 'awards',
      awardsPageContent,
      status: 'published',
    } as any,
  })
  log('Awards page created ✅')
}
