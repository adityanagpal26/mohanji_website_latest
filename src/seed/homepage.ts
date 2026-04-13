import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedHomepage(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:homepage]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero_silence',        url: 'https://mohanji.org/wp-content/uploads/2025/11/Weekly-Talk-with-Mohanji_1920x1080px-6-pm-IST-_-1.jpg', alt: 'Silence with Mohanji — Weekly Session' },
    { key: 'hero_kailash',        url: 'https://mohanji.org/wp-content/uploads/2025/11/E74FF85F-07EB-4B84-9752-EDCDE0C00B1A.jpg',               alt: 'Kailash with Mohanji 2026' },
    { key: 'hero_zlatibor',       url: 'https://mohanji.org/wp-content/uploads/2025/10/Zlatibor-October-18-2022081816.jpg',                     alt: 'Mohanji with devotees' },
    { key: 'hero_muktinath',      url: 'https://mohanji.org/wp-content/uploads/2024/09/Muktinath-2024-1024x536.jpg',                           alt: 'Muktinath Yatra 2024' },
    { key: 'about',               url: 'https://mohanji.org/wp-content/uploads/2023/07/about-mohanji.webp',                                    alt: 'About Mohanji' },
    { key: 'platform_foundation', url: 'https://mohanji.org/wp-content/uploads/2022/02/Group-1318.png',                                        alt: 'Mohanji Foundation' },
    { key: 'platform_ammucare',   url: 'https://mohanji.org/wp-content/uploads/2025/09/Ammucare-Logo-2024.png',                                alt: 'Ammucare' },
    { key: 'platform_acharyas',   url: 'https://mohanji.org/wp-content/uploads/2022/02/Group-1187.png',                                        alt: 'Mohanji Acharyas' },
    { key: 'platform_act4hunger', url: 'https://mohanji.org/wp-content/uploads/2022/02/Group-1188.png',                                        alt: 'Act4Hunger' },
    { key: 'platform_myc',        url: 'https://mohanji.org/wp-content/uploads/2022/02/Group-1190.png',                                        alt: 'Mohanji Youth Club' },
    { key: 'platform_wca',        url: 'https://mohanji.org/wp-content/uploads/2022/02/Group-1191.png',                                        alt: 'World Consciousness Alliance' },
    { key: 'platform_ebc',        url: 'https://mohanji.org/wp-content/uploads/2022/12/ebc-kids.png',                                         alt: 'Early Birds Club' },
    { key: 'platform_centres',    url: 'https://mohanji.org/wp-content/uploads/2022/02/Group-1196.png',                                        alt: 'Mohanji Centres' },
    { key: 'med_cta',             url: 'https://mohanji.org/wp-content/uploads/2021/11/Bliss-of-Silence-Poster-2048x1366-1.jpg',               alt: 'Free Guided Meditations' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const homeContent = {
    heroSlides: [
      ...(mediaMap.hero_silence   ? [{ image: mediaMap.hero_silence,   alt: 'Silence with Mohanji — Weekly 30-minute silence practice', link: '/events/silence-with-mohanji-2026' }] : []),
      ...(mediaMap.hero_kailash   ? [{ image: mediaMap.hero_kailash,   alt: 'Kailash with Mohanji 2026 — Sacred Pilgrimage',            link: '/kailash' }] : []),
      ...(mediaMap.hero_zlatibor  ? [{ image: mediaMap.hero_zlatibor,  alt: 'Mohanji with devotees — A global community of love',       link: '/about/who-is-mohanji' }] : []),
      ...(mediaMap.hero_muktinath ? [{ image: mediaMap.hero_muktinath, alt: 'Muktinath Yatra 2026 — The abode of liberation',           link: '/events/muktinath-yatra-2026' }] : []),
    ],
    aboutSection: {
      image: mediaMap.about ?? undefined,
      heading: 'About Mohanji',
      body: 'Mohanji is a global humanitarian, committed to raise the awareness of generations from selfishness to selflessness. His mission is to wake up kindness in the hearts of people. Mohanji firmly believes that humanity is the best religion for human beings and the best spiritual practice is ahimsa (non-violence) in thoughts, words or actions.',
      bodySecond: 'His core teaching is simply "Be You" — understand, accept and express your uniqueness in the world. Mohanji has founded various global organisations and platforms for people to express themselves through acts of compassion and kindness.',
      quote: 'I have never had any desire to be a teacher or a Guru. I just happened to be available for those who came for guidance.',
      ctaLabel: 'Know More',
      ctaLink: '/about/who-is-mohanji',
    },
    whereIsMohanjiDateRange: 'February – May, 2026',
    whereIsMohanji: [
      { country: 'India',           months: 'February – April 2026', detail: 'Maharashtra, Kerala, Gujarat' },
      { country: 'UAE',             months: 'February 2026',         detail: 'Dubai — AYUSH Conference' },
      { country: 'Europe',          months: 'April – May 2026',      detail: 'Serbia, Slovenia, Croatia' },
      { country: 'Kailash',         months: 'August 2026',           detail: 'Sacred Pilgrimage' },
      { country: 'Muktinath',       months: 'September 2026',        detail: 'Nepal Himalayan Pilgrimage' },
      { country: 'Global (Online)', months: 'Every Sunday',          detail: 'Weekly Talk with Mohanji' },
    ],
    activityStats: [
      { value: '33+',     label: 'Countries',        numeric: 33 },
      { value: '290+',    label: 'Group Activities',  numeric: 290 },
      { value: '27',      label: 'Languages',         numeric: 27 },
      { value: '73,000+', label: 'Meals Served',      numeric: 73000 },
    ],
    centres: [
      { name: 'Australia' }, { name: 'Canada' },      { name: 'India' },
      { name: 'Scotland' },  { name: 'Serbia' },      { name: 'Slovenia' },
      { name: 'South Africa' }, { name: 'USA' },      { name: 'Denmark' },
      { name: 'Mauritius' }, { name: 'Montenegro' },  { name: 'Macedonia' },
      { name: 'Bosnia' },    { name: 'Sri Lanka' },   { name: 'Croatia' },
    ],
    platforms: [
      { name: 'Mohanji Foundation',          logo: mediaMap.platform_foundation  ?? undefined, url: '/about/foundation' },
      { name: 'Ammucare',                    logo: mediaMap.platform_ammucare    ?? undefined, url: 'https://ammucare.org' },
      { name: 'Mohanji Acharyas',            logo: mediaMap.platform_acharyas   ?? undefined, url: '/about/acharyas' },
      { name: 'Act4Hunger',                  logo: mediaMap.platform_act4hunger ?? undefined, url: 'https://act4hunger.org' },
      { name: 'Mohanji Youth Club',          logo: mediaMap.platform_myc        ?? undefined, url: '/join/youth-club' },
      { name: 'World Consciousness Alliance',logo: mediaMap.platform_wca        ?? undefined, url: 'https://worldconsciousnessalliance.org' },
      { name: 'Early Birds Club',            logo: mediaMap.platform_ebc        ?? undefined, url: 'https://earlybirdsclub.org' },
      { name: 'Mohanji Centres',             logo: mediaMap.platform_centres    ?? undefined, url: '/about/spaces' },
    ],
    activitiesSection: {
      body: 'Mohanji Foundation is active across the world working towards a better future. Our global teams conduct 290+ group activities across 33 countries and in 27 languages every month. Team Mohanji is driven by a simple motto — Adding Value to the World.',
    },
    meditationsCtaImage: mediaMap.med_cta ?? undefined,
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      pageType: 'home',
      homeContent,
      status: 'published',
    } as any,
  })

  log('Homepage page created ✅')
}
