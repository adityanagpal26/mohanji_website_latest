import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

/**
 * Seeds the awards collection with real awards from mohanji.org/awards-and-recognition/
 */
export async function seedAwardsCollection(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:awards-collection]', ...args)

  const awards = [
    // 2025
    {
      title: 'Global Voice of Compassion (2025)',
      organization: 'Global Recognition',
      date: '2025-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2025/07/Global-Voice-of-Compassion.png',
        'https://mohanji.org/wp-content/uploads/2025/07/Global-Voice-of-Compassion-1.png',
      ],
    },
    {
      title: 'Top 100 Influential Men of the Year',
      organization: 'Cape Town, South Africa',
      date: '2025-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2025/11/IMOTY.png',
      ],
    },
    // 2024
    {
      title: 'Humanitarian Award by Sivananda World Peace Foundation',
      organization: 'Sivananda World Peace Foundation, South Africa',
      date: '2024-10-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/10/Humanitarian-Award-by-Sivananda-World-Peace-Foundation.jpg',
      ],
    },
    {
      title: 'Certificate of Recognition from the Government of South Africa',
      organization: 'Government of South Africa',
      date: '2024-09-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/09/COR.png',
        'https://mohanji.org/wp-content/uploads/2024/09/COR-2.jpg',
      ],
    },
    {
      title: 'Humanitarian of the Year 2024',
      organization: 'International Recognition',
      date: '2024-09-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/09/DSC08499_re-1.jpg',
        'https://mohanji.org/wp-content/uploads/2024/09/DSC08786_re-1.jpg',
      ],
    },
    {
      title: 'Vivekananda International Relations (VIR) Peace Award as Global Humanitarian',
      organization: 'Vivekananda International Relations, Mumbai',
      date: '2024-08-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/08/VIR.png',
        'https://mohanji.org/wp-content/uploads/2024/08/Vir-2.png',
      ],
    },
    {
      title: 'Lifetime Achievement Award as a Global Voice of Compassion',
      organization: 'International Recognition, Mumbai',
      date: '2024-08-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/07/Vegan-India-Conference-1.jpg',
      ],
    },
    {
      title: 'Honorary Doctorate from PAHER University, Udaipur',
      organization: 'PAHER University, Rajasthan, India',
      date: '2024-07-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/07/doctorate-from-PAHER-university.png',
        'https://mohanji.org/wp-content/uploads/2024/02/Honorary-doctorate.jpg',
      ],
    },
    {
      title: 'Global Compassion Ambassador Award at BRICS Annual Recognition Award (B.A.R.A. 2024)',
      organization: 'BRICS Annual Recognition',
      date: '2024-05-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/05/brics2.jpg',
        'https://mohanji.org/wp-content/uploads/2024/01/BRICS-CCI.jpeg',
      ],
    },
    // 2023
    {
      title: 'Mohanji Day Proclamation (2023)',
      organization: 'Government Recognition, USA',
      date: '2023-06-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/05/Mohanji-Day-Proclamation-2023.png',
      ],
    },
    {
      title: 'Virginia House of Delegates — House Resolution (2023)',
      organization: 'Virginia House of Delegates, USA',
      date: '2023-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/House-of-Delegates-Virginia.jpg',
      ],
    },
    // 2022
    {
      title: 'Mahaveer Award (2022)',
      organization: 'Mahaveer Foundation',
      date: '2022-06-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/Mahaveer-1.jpg',
        'https://mohanji.org/wp-content/uploads/2024/02/mahaveer-award-2.jpg',
      ],
    },
    {
      title: 'Chishty Foundation Global Peace Award (2022)',
      organization: 'Chishty Foundation',
      date: '2022-05-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/05/chishty.png',
        'https://mohanji.org/wp-content/uploads/2024/05/chishty-1.png',
      ],
    },
    {
      title: 'Mohanji Foundation Day Proclamations (2022)',
      organization: 'Government Recognition, USA',
      date: '2022-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/05/Proclamations-2022.png',
        'https://mohanji.org/wp-content/uploads/2024/01/MF-Day-Proclamation-Texas-scaled.jpg',
      ],
    },
    // 2021
    {
      title: 'Most Influential Vegan (2021)',
      organization: 'PETA India',
      date: '2021-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/PETA-award-1024x903.png',
      ],
    },
    // 2018
    {
      title: 'Sivananda World Peace Award',
      organization: 'Sivananda Foundation',
      date: '2018-11-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/Shivananda-Award_HQ-1-scaled.jpg',
      ],
    },
    {
      title: 'Honorary Life-Membership at East Coast Motorcycle Club',
      organization: 'East Coast Motorcycle Club',
      date: '2018-11-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/02/Motor-Club-1024x678.jpg',
      ],
    },
    {
      title: 'Zulu Peace Warrior Stick',
      organization: 'Zulu Community, South Africa',
      date: '2018-11-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/Zulu-Stick-_-HQ-1024x679.jpg',
      ],
    },
    // Earlier
    {
      title: 'Seal of Municipal District of Huarocondo',
      organization: 'Municipal District of Huarocondo, Peru',
      date: '2018-04-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/Seal-of-the-Municipal-District-of-Huarocondo-1024x768.jpg',
      ],
    },
    {
      title: 'Global Peace Award',
      organization: 'International Peace Organisation',
      date: '2017-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/Global-Peace-Award-scaled.jpg',
      ],
    },
    {
      title: 'Brahmarishi Title conferred by Avadoota Nadananda',
      organization: 'Avadoota Nadananda',
      date: '2016-01-01',
      imageUrls: [
        'https://mohanji.org/wp-content/uploads/2024/01/Brahmarishi-title.jpg',
      ],
    },
  ]

  let created = 0
  for (const award of awards) {
    // Upload primary image (first one)
    let imageId: number | null = null
    if (award.imageUrls.length > 0) {
      imageId = await upsertMedia(payload, pool, award.imageUrls[0], award.title)
    }

    await payload.create({
      collection: 'awards',
      data: {
        title: award.title,
        organization: award.organization,
        date: award.date,
        image: imageId ?? undefined,
      } as any,
    })
    created++
    log(`Created award: "${award.title}"`)
  }

  log(`Awards collection seeded: ${created} awards ✅`)
}
