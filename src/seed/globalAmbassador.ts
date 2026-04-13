import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedGlobalAmbassador(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:global-ambassador]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero',         url: 'https://mohanji.org/wp-content/uploads/2022/01/Banner-7.jpg',                              alt: 'Global Ambassador — hero banner' },
    { key: 'devi',         url: 'https://mohanji.org/wp-content/uploads/2022/07/1658047653318-3-214x300.jpg',               alt: 'Devi Mohan — Global Ambassador' },
    { key: 'president',    url: 'https://mohanji.org/wp-content/uploads/2019/09/PresidentofIndia1-300x251.jpg',             alt: 'Devi Mohan meeting President of India' },
    { key: 'serbian_amb',  url: 'https://mohanji.org/wp-content/uploads/2019/11/20191113_210515-2-300x218.jpg',             alt: 'Meeting the Serbian Ambassador in Doha' },
    { key: 'varanasi',     url: 'https://mohanji.org/wp-content/uploads/2019/11/20191128_162343-1-300x173.jpg',             alt: 'Mohanji Foundation at the Varanasi Convergence' },
    { key: 'qatar',        url: 'https://mohanji.org/wp-content/uploads/2019/11/F626D3B8-74FB-4222-9F1C-722FABEF5F81-300x225.jpeg', alt: 'Devi Mohan with Qatar Foundation' },
    { key: 'parliament',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Parliament-of-World-Religions-flyer-300x169.jpeg', alt: "Parliament of the World's Religions" },
    { key: 'kumbha',       url: 'https://mohanji.org/wp-content/uploads/2021/11/Banner-9-300x169.png',                     alt: "Women's Empowerment Summit at Kumbha Mela" },
    { key: 'sarajevo',     url: 'https://mohanji.org/wp-content/uploads/2022/07/Devi-Mohan-meets-Mayor-of-Sarajevo-189x300.jpg', alt: 'Devi Mohan meets Mayor of Sarajevo' },
    { key: 'vodnjan',      url: 'https://mohanji.org/wp-content/uploads/2022/08/devi-2-gA-300x200.jpg',                    alt: 'Devi Mohan meets Mayor of Vodnjan' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const ambassadorContent = {
    heroImage: mediaMap.hero ?? undefined,
    roleDesc1: 'A Mohanji Foundation Global Ambassador is the appointed spokesperson and representative of Mohanji Foundation. In terms of appearance, demeanor, values and ethics, the Global Ambassador represents the teachings, ethos and activities of Mohanji Foundation in truthfulness and positive light.',
    roleDesc2: 'The Global Ambassador carries the mission of Mohanji Foundation — spreading compassion, conscious living, and humanitarian values — to governments, international organisations, educational institutions, and interfaith gatherings worldwide.',
    ambassadorName: 'Devi Mohan',
    ambassadorTitle: 'Master of Arts in Peace Studies · Humanitarian · Spiritual Diplomat · Proponent of Traditional Yoga',
    ambassadorPhoto: mediaMap.devi ?? undefined,
    bio1: 'Devi Mohan, Master of Arts in Peace Studies, is a multifaceted humanitarian, spiritual diplomat, proponent of traditional yoga, and instrument of healing.',
    bio2: "Devi has been an integral member of Mohanji Foundation, the international spiritual mission of her husband and spiritual guide Mohanji, since its formation in 2007. Over nearly two decades she has represented the Foundation at major international events, governmental meetings, interfaith gatherings, and educational summits around the world.",
    bio3: "Through her work as Global Ambassador, Devi has built bridges between Mohanji Foundation and organisations working in the areas of peace, education, women's empowerment, and conscious living — establishing the Foundation as a respected voice in international humanitarian and spiritual dialogue.",
    events: [
      {
        date: 'August 31, 2022',
        title: 'Devi Mohan meets Mayor of Vodnjan',
        description: 'Devi Mohan, Global Ambassador of Mohanji Foundation, visited the city of Vodnjan along with Dalila Lakomica and Sanela Fekovic to strengthen ties and explore collaboration opportunities.',
        image: mediaMap.vodnjan ?? undefined,
      },
      {
        date: 'July 18, 2022',
        title: 'Devi Mohan meets Mayor of Sarajevo',
        description: '"You really made my day. I look forward to our future cooperation." — words of Ms. Benjamina Karic, Mayor of Sarajevo, following her meeting with Devi Mohan.',
        image: mediaMap.sarajevo ?? undefined,
      },
      {
        date: 'November 29, 2019',
        title: 'Mohanji Foundation at the Varanasi Convergence',
        description: 'Mohanji Foundation was presented at the Unity Earth "Varanasi Convergence" event in Varanasi (Kashi), India — connecting global changemakers committed to peace and consciousness.',
        image: mediaMap.varanasi ?? undefined,
      },
      {
        date: 'November 21, 2019',
        title: 'Devi Mohan with Qatar Foundation at Education City, Doha',
        description: 'On 16 November 2019, Devi Mohan visited the Education City — the flagship initiative of Qatar Foundation established by HH Sheikh Hamad — to explore shared values in education.',
        image: mediaMap.qatar ?? undefined,
      },
      {
        date: 'November 14, 2019',
        title: 'Meeting the Serbian Ambassador in Doha',
        description: 'Devi Mohan, Global Ambassador of Mohanji Foundation, met with HE Mr. Jasminko Pozderac, Serbian Ambassador to Qatar, ahead of her weekend program in Doha.',
        image: mediaMap.serbian_amb ?? undefined,
      },
      {
        date: 'September 16, 2019',
        title: 'Historic Moment — Meeting the President of India',
        description: 'Devi Mohan had the honour of meeting the President of India, Mr. Ram Nath Kovind, representing Mohanji Foundation at a landmark international occasion.',
        image: mediaMap.president ?? undefined,
      },
      {
        date: 'February 2, 2019',
        title: "Devi Mohan at Women's Empowerment Summit at Kumbha Mela",
        description: '"She is the Solution: The Summit of Grace" — Devi Mohan represented Mohanji Foundation at the world\'s largest public gathering at the Kumbha Mela in Prayagraj, India.',
        image: mediaMap.kumbha ?? undefined,
      },
      {
        date: 'October 25, 2018',
        title: "Mohanji Foundation at the Parliament of the World's Religions",
        description: "Mohanji Foundation participated in the 2018 Parliament of the World's Religions featuring over 500 programs and events, sharing the Foundation's vision of compassion and conscious living.",
        image: mediaMap.parliament ?? undefined,
      },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Global Ambassador',
      slug: 'global-ambassador',
      pageType: 'global-ambassador',
      ambassadorContent,
      status: 'published',
    } as any,
  })
  log('Global Ambassador page created ✅')
}
