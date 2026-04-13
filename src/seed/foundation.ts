import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedFoundation(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:foundation]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    // Hero: real foundation banner from WP
    { key: 'hero',          url: 'https://mohanji.org/wp-content/uploads/2022/01/Mohanji-foundation.jpg',          alt: 'Mohanji Foundation' },
    // Founded-by logos
    { key: 'logo_myc',      url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1190.png',                  alt: 'ACT 4 Hunger' },
    { key: 'logo_act',      url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1187.png',                  alt: 'ACT Foundation' },
    { key: 'logo_ammucare', url: 'https://mohanji.org/wp-content/uploads/2025/03/Ammucare-Logo-2024-updated.png',  alt: 'Ammucare Charitable Trust' },
    { key: 'logo_ebc1',     url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1188.png',                  alt: 'Early Birds Club' },
    { key: 'logo_ebc2',     url: 'https://mohanji.org/wp-content/uploads/2022/12/ebc-kids.png',                   alt: 'Early Birds Club Kids' },
    { key: 'logo_ebc3',     url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1191.png',                  alt: 'Early Birds Club Teens' },
    { key: 'logo_gurulight',url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1193.png',                  alt: 'Gurulight' },
    { key: 'logo_hstd',     url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1194.png',                  alt: 'Himalayan School of Traditional Dance' },
    { key: 'logo_hsty',     url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1195.png',                  alt: 'Himalayan School of Traditional Yoga' },
    { key: 'logo_hstl',     url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1196.png',                  alt: 'Himalayan School of Traditional Languages' },
    { key: 'logo_hwb',      url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1198.png',                  alt: 'Healers Without Boundaries' },
    { key: 'logo_myc2',     url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1197.png',                  alt: 'Mohanji Youth Club' },
    { key: 'logo_wca',      url: 'https://mohanji.org/wp-content/uploads/2023/01/WCA.png',                         alt: 'World Consciousness Alliance' },
    // Inspired-by logos
    { key: 'logo_divine',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1203.png',                  alt: 'Divine M Heritage' },
    { key: 'logo_ahimsa',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1201.png',                  alt: 'Ahimsa Vegan Cafe' },
    { key: 'logo_vegan',    url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1200.png',                  alt: 'Vegan First' },
    { key: 'logo_ahimsa2',  url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1202.png',                  alt: 'The Ahimsa Space' },
    { key: 'logo_analemma', url: 'https://mohanji.org/wp-content/uploads/2024/06/ANALEMMA.webp',                   alt: 'Analemma Water' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const foundationContent = {
    heroImage: mediaMap.hero ?? undefined,
    missionStatement: 'Mohanji Foundation is a global non-profit organization, engaged in spreading the timeless message of love, compassion and conscious living.',
    stats: [
      { value: '33+',  label: 'Countries' },
      { value: '1M+',  label: 'Lives Impacted' },
      { value: '73K+', label: 'Meals Served' },
      { value: '49T',  label: 'Tonnes of Food Donated' },
    ],
    foundedPlatforms: [
      { name: 'ACT 4 Hunger',                              logo: mediaMap.logo_myc       ?? undefined },
      { name: 'ACT Foundation',                            logo: mediaMap.logo_act       ?? undefined },
      { name: 'Ammucare Charitable Trust',                 logo: mediaMap.logo_ammucare  ?? undefined },
      { name: 'Early Birds Club',                          logo: mediaMap.logo_ebc1      ?? undefined },
      { name: 'Early Birds Club Kids',                     logo: mediaMap.logo_ebc2      ?? undefined },
      { name: 'Early Birds Club Teens',                    logo: mediaMap.logo_ebc3      ?? undefined },
      { name: 'Gurulight',                                 logo: mediaMap.logo_gurulight ?? undefined },
      { name: 'Himalayan School of Traditional Dance',     logo: mediaMap.logo_hstd      ?? undefined },
      { name: 'Himalayan School of Traditional Yoga',      logo: mediaMap.logo_hsty      ?? undefined },
      { name: 'Himalayan School of Traditional Languages', logo: mediaMap.logo_hstl      ?? undefined },
      { name: 'Healers Without Boundaries',                logo: mediaMap.logo_hwb       ?? undefined },
      { name: 'Mohanji Youth Club',                        logo: mediaMap.logo_myc2      ?? undefined },
      { name: 'World Consciousness Alliance',              logo: mediaMap.logo_wca       ?? undefined },
    ],
    inspiredPlatforms: [
      { name: 'Divine M Heritage', logo: mediaMap.logo_divine  ?? undefined },
      { name: 'Ahimsa Vegan Cafe', logo: mediaMap.logo_ahimsa  ?? undefined },
      { name: 'Vegan First',       logo: mediaMap.logo_vegan   ?? undefined },
      { name: 'The Ahimsa Space',  logo: mediaMap.logo_ahimsa2 ?? undefined },
      { name: 'Analemma Water',    logo: mediaMap.logo_analemma ?? undefined },
    ],
    pillars: [
      { title: 'Consciousness & Spirituality',  description: 'Providing free guided meditations, spiritual retreats, and transformative programs accessible to all.' },
      { title: 'Humanitarian Service',          description: 'Food distribution, shelter, education, and emergency relief through ACT Foundation and local chapters.' },
      { title: 'Environmental Responsibility',  description: 'Tree-planting drives, clean-up campaigns, and advocacy for conscious, sustainable living.' },
      { title: 'Animal Welfare',                description: 'Rescue, rehabilitation, and adoption programs for stray and abandoned animals worldwide.' },
      { title: 'Youth Empowerment',             description: 'The Mohanji Youth Club equips young people with values, purpose, and leadership skills.' },
      { title: 'Cultural Preservation',         description: 'Celebrating the richness of diverse spiritual traditions and indigenous wisdom.' },
    ],
    centersText: 'Mohanji Foundation has set up centers in various cities around the world to conduct meditations and transformative programs on a regular basis, bringing together like-minded people and working towards a more conscious and compassionate world.',
  }

  await payload.create({
    collection: 'pages',
    data: { title: 'Mohanji Foundation', slug: 'mohanji-foundation', pageType: 'foundation', foundationContent, status: 'published' } as any,
  })
  log('Foundation page created ✅')
}
