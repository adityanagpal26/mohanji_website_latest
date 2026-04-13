import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedGoldenPath(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:golden-path]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero',       url: 'https://mohanji.org/wp-content/uploads/2023/10/golden-path-23.jpg',                alt: 'The Golden Path — hero' },
    { key: 'section1',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1175.png',                    alt: 'The Path of Pathlessness' },
    { key: 'section2',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1176.png',                    alt: 'The Golden Path — Complete Dissolution' },
    { key: 'section3',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1177.png',                    alt: 'Roadsigns on the Path' },
    { key: 'section4',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1179.png',                    alt: 'The Guru Tattva' },
    { key: 'section5',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1181.png',                    alt: 'Faith is the Key' },
    { key: 'section6',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1184.png',                    alt: 'The Golden Tradition of Liberation' },
    { key: 'section7',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1186.png',                    alt: 'Living the Golden Path' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const goldenPathContent = {
    heroImage: mediaMap.hero ?? undefined,
    introText1: "The mysterious path of spirituality is a path to the intangible. Human beings are used to the tangible. From tangible to intangible and knowing to the unknowable, the path is quite treacherous and often winding. There are many trials and errors possible. Many falls and rises. Tenacity and conviction plus the will to survive against all odds will keep us going.",
    introText2: "Many people choose comfortable spirituality which makes them feel good without any fundamental change in their being, behaviour or expression. Many people choose spiritual entertainment. Mohanji's path is the Golden Path — a path of complete dissolution, liberation, and conscious evolution.",
    quote: 'The path is within you. The path is you. Walk it with totality.',
    stages: [
      {
        number: '01',
        title: 'The Path of Pathlessness',
        description: "Mohanji's path is called the 'Path of Pathlessness' because it has no rigid structure, dogma, or binding system. It is fluid, alive, and entirely tailored to the individual seeker. The only requirement is authenticity — being completely yourself. Many paths bind the seeker to practices, timings, rituals, and rules. The path of pathlessness liberates from all binding while simultaneously going deeper than any structured path.",
      },
      {
        number: '02',
        title: 'The Golden Path — Complete Dissolution',
        description: "The Golden Path is the path of complete dissolution — dissolution of ego, dissolution of karmas, dissolution of conditioning and identifications. It is not about acquiring spiritual experiences or powers. It is about becoming progressively lighter — until the inner light shines without obstruction. Liberation is both a state and a process: a gradual peeling away of all that is not the true self, and a sudden recognition of what was always there.",
      },
      {
        number: '03',
        title: 'Roadsigns on the Path of Pathlessness',
        description: "Do everything with full application, total involvement, and unconditional love — then detach completely from the result. Live a selfless life operating from the spine — rooted, stable, unshakeable. Practice non-violence in thoughts, words and actions towards all beings. Serve selflessly. Lead a simple life — avoid all unnecessary bindings, possessions and entanglements. Stay away from gossip, comparison, judgment, and the drama of the ego. Maintain equanimity in all situations.",
      },
      {
        number: '04',
        title: 'The Guru Tattva',
        description: "The Guru is not a person — the Guru is a principle. The Guru Tattva (Guru Principle) is the inner guide, the inner master that awakens within us when we are ready. It may manifest through an outer teacher, a book, a dream, nature, or an unexpected event — but fundamentally, the Guru is the voice of the higher self calling us home. Mohanji represents this principle — guiding, liberating, never binding.",
      },
      {
        number: '05',
        title: 'FAITH is the Key',
        description: "Faith — not blind belief, but the living, felt certainty of the heart — is the key that opens the door of the Golden Path. Faith in the tradition, faith in the process, and faith in oneself. Without faith, the path becomes a philosophical exercise. With faith, it becomes a lived transformation. Welcome to the Golden Path. Welcome home.",
      },
      {
        number: '06',
        title: 'The Golden Tradition of Liberation',
        description: "The Golden Tradition spans across time and all spiritual lineages — from Jesus, Zoroaster and Buddha to Shirdi Sai Baba, Ramana Maharshi, and Babaji. Each Master expressed a different aspect of the same universal truth. Mohanji represents this living tradition — making the esoteric wisdom of the ancients available to a contemporary audience without diluting their depth or import. The tradition has only one purpose: liberation.",
      },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'The Golden Path',
      slug: 'golden-path',
      pageType: 'golden-path',
      goldenPathContent,
      status: 'published',
    } as any,
  })
  log('Golden Path page created ✅')
}
