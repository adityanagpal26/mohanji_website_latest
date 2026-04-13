import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedSpaces(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:mohanji-spaces]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero',       url: 'https://mohanji.org/wp-content/uploads/2022/05/Rectangle@.webp',               alt: 'Mohanji Spaces' },
    { key: 'australia',  url: 'https://mohanji.org/wp-content/uploads/2022/12/image5.jpg',                        alt: 'Mohanji Centre of Benevolence — Walpole, Australia' },
    { key: 'ganeshpuri', url: 'https://mohanji.org/wp-content/uploads/2022/12/baba-9.jpg',                        alt: 'Mohanji Datta Tapovan Ashram — Ganeshpuri, India' },
    { key: 'vrindavan',  url: 'https://mohanji.org/wp-content/uploads/2022/12/sr-1.1.jpg',                        alt: 'Vrindavan Guruvayurappan Temple' },
    { key: 'shirdi',     url: 'https://mohanji.org/wp-content/uploads/2022/12/image18.jpg',                       alt: 'Mohanji Datta Tapovan Ashram — Shirdi' },
    { key: 'seniors',    url: 'https://mohanji.org/wp-content/uploads/2022/12/old.jpg',                           alt: 'Mohanji Home for Seniors — Tiruvannamalai' },
    { key: 'canada',     url: 'https://mohanji.org/wp-content/uploads/2022/12/gr-1.1.jpg',                        alt: 'Mohanji Datta Tapovan Ashram — Canada' },
    { key: 'safrica',    url: 'https://mohanji.org/wp-content/uploads/2022/12/sa-main.jpg',                       alt: 'Mohanji Centre of Benevolence — South Africa' },
    { key: 'serbia',     url: 'https://mohanji.org/wp-content/uploads/2025/08/MCB-Serbia.jpg',                    alt: 'Mohanji Centre of Benevolence — Serbia' },
    { key: 'slovenia',   url: 'https://mohanji.org/wp-content/uploads/2025/06/MPC-Slovania.jpg',                  alt: 'Mohanji Centre of Benevolence — Slovenia' },
    { key: 'scotland',   url: 'https://mohanji.org/wp-content/uploads/2023/05/mohanji-uk.jpg',                    alt: 'Mohanji Centre of Benevolence — Aberdeenshire, Scotland' },
    { key: 'usa',        url: 'https://mohanji.org/wp-content/uploads/2023/08/usa-mcb-1024x1024.jpg',             alt: 'Mohanji Centre of Benevolence — USA' },
    { key: 'bosnia',     url: 'https://mohanji.org/wp-content/uploads/2025/06/MPC-Bosnia.jpg',                    alt: 'Mohanji Peace Centre — Bosnia' },
    { key: 'up',         url: 'https://mohanji.org/wp-content/uploads/2022/12/up-main-1.jpg',                     alt: 'Mohanji Datta Tapovan — Uttar Pradesh' },
    { key: 'southeast',  url: 'https://mohanji.org/wp-content/uploads/2022/12/se-main.jpg',                       alt: 'Mohanji Space — South East' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const spacesContent = {
    heroImage: mediaMap.hero ?? undefined,
    introQuote: 'A space where you can experience a deep sense of connection with your SELF, nature and divine consciousness.',
    introText1: "Mohanji Spaces are sacred retreat centres, ashrams, temples, and community hubs established around the world under Mohanji's guidance. Each space serves as a hub for meditation, selfless service, conscious living, and community transformation.",
    introText2: "From 54-acre nature sanctuaries in Australia to vibrant peace centres in Serbia and care homes in India, these spaces embody the Foundation's mission of benevolence, kindness, and elevation of human consciousness. Welcome to Mohanji Spaces.",
    spaces: [
      {
        name: 'Mohanji Centre of Benevolence',
        location: 'Walpole, WA, Australia',
        type: 'Centre of Benevolence',
        description: "Located by the Frankland river in Walpole, Western Australia, this 54-acre property opened on 2.2.22. It offers a unique experience for visitors to align with their ultimate purpose through detachment, kindness, and elevation of awareness.",
        contact: 'australia@mohanji.org',
        image: mediaMap.australia ?? undefined,
      },
      {
        name: 'Mohanji Datta Tapovan Ashram',
        location: 'Ganeshpuri, Maharashtra, India',
        type: 'Datta Tapovan Ashram',
        description: "Shaping up to be the main base location in India, this ashram encompasses meditation, yoga, silence zones, places of worship, plant-based food, and sacred forests — centred on respect for nature and benevolence.",
        contact: '',
        image: mediaMap.ganeshpuri ?? undefined,
      },
      {
        name: 'Vrindavan Guruvayurappan Temple',
        location: 'Vrindavan, Uttar Pradesh, India',
        type: 'Sacred Temple Project',
        description: "A momentous project to recreate the Guruvayurappan (Krishna) temple in Vrindavan — a space for rejuvenation and alignment in an environment of devotion and tranquility.",
        contact: '',
        image: mediaMap.vrindavan ?? undefined,
      },
      {
        name: 'Mohanji Datta Tapovan Ashram',
        location: 'Shirdi, Maharashtra, India',
        type: 'Himalayan School Campus',
        description: "Situated across from Shirdi International Airport, this land is envisioned as the headquarters of the Himalayan School — with yoga, music, dance, Sanskrit, and martial arts.",
        contact: '',
        image: mediaMap.shirdi ?? undefined,
      },
      {
        name: 'Mohanji Home for Seniors',
        location: 'Tiruvannamalai, Tamil Nadu, India',
        type: 'Care Home',
        description: "A home for seniors where anyone abandoned by family or society can feel belonging, nurtured, and loved. Daily annadaan reaches 3,000 people every month through supporting institutions.",
        contact: '',
        image: mediaMap.seniors ?? undefined,
      },
      {
        name: 'Mohanji Datta Tapovan Ashram',
        location: 'Amaranth, Ontario, Canada',
        type: 'Datta Tapovan Ashram',
        description: "The first of its kind in Canada — a 100-acre space inaugurated in 2018 with idols of Lord Ganesha, Shirdi Sai Baba, and Lord Dattatreya. Home to many indigenous trees, a natural pond, and teeming wildlife.",
        contact: '',
        image: mediaMap.canada ?? undefined,
      },
      {
        name: 'Mohanji Centre of Benevolence',
        location: 'Nonoti, KwaZulu-Natal, South Africa',
        type: 'Centre of Benevolence',
        description: "Set on 12 hectares of beautiful farming land, this centre serves a neglected community with food and the uplifting energy of the Shirdi Sai Baba Temple, where four Artis are conducted daily.",
        contact: 'southafrica@mohanji.org',
        image: mediaMap.safrica ?? undefined,
      },
      {
        name: 'Mohanji Centre of Benevolence',
        location: 'Serbia',
        type: 'Centre of Benevolence',
        description: "A vibrant sanctuary radiating the energy of selfless service, meditation, and conscious living — bringing together the Mohanji community across the region.",
        contact: '',
        image: mediaMap.serbia ?? undefined,
      },
      {
        name: 'Mohanji Centre of Benevolence',
        location: 'Slovenia',
        type: 'Centre of Benevolence',
        description: "A serene sanctuary in Slovenia's natural beauty featuring a vegan café, rescued animals (including Raja the deer), regular youth programs, and a deeply healing community environment.",
        contact: 'slovenia@mohanji.org',
        image: mediaMap.slovenia ?? undefined,
      },
      {
        name: 'Mohanji Centre of Benevolence',
        location: 'Aberdeenshire, Scotland, UK',
        type: 'Centre of Benevolence',
        description: "Set in fourteen acres of Scottish farmland bordering the Highlands, this centre radiates transformative power through its Shirdi Sai Baba Temple, Lord Dattatreya Temple, and Sadhana Room.",
        contact: '',
        image: mediaMap.scotland ?? undefined,
      },
      {
        name: 'Mohanji Centre of Benevolence',
        location: 'USA',
        type: 'Centre of Benevolence',
        description: "Growing presence in North America, providing a space for meditation, service, and community for Mohanji's growing family in the United States.",
        contact: '',
        image: mediaMap.usa ?? undefined,
      },
      {
        name: 'Mohanji Peace Centre',
        location: 'Bosnia',
        type: 'Peace Centre',
        description: "A Peace Centre established in Bosnia to serve as a hub for meditation, conscious living, and community service — bringing Mohanji's teachings to the heart of the Balkans.",
        contact: '',
        image: mediaMap.bosnia ?? undefined,
      },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Mohanji Spaces',
      slug: 'mohanji-spaces',
      pageType: 'mohanji-spaces',
      spacesContent,
      status: 'published',
    } as any,
  })
  log('Mohanji Spaces page created ✅')
}
