import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedLifeJourney(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:life-journey]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero',     url: 'https://mohanji.org/wp-content/uploads/2022/05/Mohanjis-Life-Journey.jpg',                  alt: "Mohanji's Life Journey — hero" },
    { key: 'initial',  url: 'https://mohanji.org/wp-content/uploads/2022/05/Mohanjis-Life-Journey.jpg',                  alt: 'Mohanji — early life in Kerala, India' },
    { key: 'black',    url: 'https://mohanji.org/wp-content/uploads/2022/05/Group-1274.png',                              alt: 'Mohanji story — early life' },
    { key: 'inflect',  url: 'https://mohanji.org/wp-content/uploads/2022/05/Group-1275-1.png',                            alt: 'Mohanji — the inflection point' },
    { key: 'loss',     url: 'https://mohanji.org/wp-content/uploads/2022/05/Group-1255.jpg',                              alt: 'Mohanji — lose a lot to gain somewhat' },
    { key: 'shift',    url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1172.png',                              alt: 'Mohanji inner transformation and spiritual awakening' },
    { key: 'spread',   url: 'https://mohanji.org/wp-content/uploads/2022/05/devimohanji-1024x549.png',                   alt: 'Mohanji spreading the message globally' },
    { key: 'global',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Mohanji-and-Masters-of-the-Tradition-1.png', alt: 'Mohanji and Masters of the Tradition' },
    { key: 'recog',    url: 'https://mohanji.org/wp-content/uploads/2025/10/Zlatibor-October-18-2022081816.jpg',          alt: 'Mohanji receiving global recognition' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const lifeJourneyContent = {
    heroImage: mediaMap.hero ?? undefined,
    introText: "From a childhood in Kerala to a global spiritual mission — the remarkable story of one man's journey to serve humanity.",
    chapters: [
      {
        title: 'Initial Life',
        period: 'Born February 23, 1965',
        text: "As his mother lightly remarked, Mohanji (Mohan Pathirisseri Kesavan) was born smiling on February 23rd, 1965, in Palakkad, Kerala, India. From childhood, he displayed a deep sensitivity, compassion for all beings, and an innate spiritual awareness that set him apart. He was always close to the poor and the disadvantaged, feeling their pain as his own.",
        image: mediaMap.initial ?? undefined,
      },
      {
        title: 'Black Sheep in My Family',
        period: 'Early years',
        text: "Mohanji was considered the black sheep of his family — one who always questioned conventions and refused to conform to societal expectations. His free spirit and unconditional love for all people, animals, and nature were often misunderstood. Yet he remained true to himself, walking a path guided by an inner compass few could see.",
        image: mediaMap.black ?? undefined,
      },
      {
        title: 'The Inflection Point',
        period: 'A turning point',
        text: "A profound personal tragedy — the loss of his beloved daughter Ammu — became the inflection point in Mohanji's life. This devastating experience shattered all worldly ambitions and drove him deep within himself. In the crucible of grief, he discovered a reservoir of strength, love, and awareness that transcended personal suffering.",
        image: mediaMap.inflect ?? undefined,
      },
      {
        title: 'Lose a lot to gain somewhat',
        period: 'The path of purification',
        text: "Every loss on the outer plane became a gain on the inner. Mohanji went through a profound process of purification — shedding attachments, expectations, and identifications one by one. What appeared to the world as a man losing everything was, in reality, a soul gaining its freedom. He emerged from this crucible lighter, clearer, and more anchored in the truth of existence.",
        image: mediaMap.loss ?? undefined,
      },
      {
        title: 'The Inner Shift',
        period: 'Spiritual awakening',
        text: "The inner shift that followed was total and irreversible. Mohanji turned the unbearable pain of loss into fuel for spiritual evolution. He immersed himself in meditation and service, dedicating his life to alleviating the suffering of others. The Ammucare Charitable Trust — named after his daughter Ammu — was born from this act of love and surrender.",
        image: mediaMap.shift ?? undefined,
      },
      {
        title: 'Spreading the Message',
        period: '2000s – 2010s',
        text: "Mohanji began travelling extensively, meeting people from all walks of life and sharing his teachings freely. His message was simple and consistent: be kind, serve unconditionally, and connect with your true inner nature. Programs, retreats, and satsangs began to spring up around the world as the Mohanji family grew organically through genuine transformation.",
        image: mediaMap.spread ?? undefined,
      },
      {
        title: 'Global Expansion',
        period: '2012 – 2020',
        text: "Mohanji Foundation was formally established as the umbrella organisation for all of Mohanji's charitable, educational, and spiritual activities worldwide. Mohanji Acharyas — trained teachers — began representing the lineage across Europe, the Americas, Africa, Asia, and Oceania. His books, guided meditations, and online programs reached millions.",
        image: mediaMap.global ?? undefined,
      },
      {
        title: 'Recognition',
        period: '2018 – present',
        text: "Mohanji's tireless service and transformative impact have been recognised by institutions worldwide. He has received numerous awards including the Sivananda World Peace Award, PETA's Most Influential Vegan recognition, Global Peace Award, Honorary Doctorate, and the International Man of the Year Award, among many others.",
        image: mediaMap.recog ?? undefined,
      },
      {
        title: 'Today',
        period: '2024 – present',
        text: "Today, Mohanji's teachings, practices, and charitable work touch lives across 33+ countries in 27 languages. Through Mohanji Foundation and its many platforms, over a million lives have been positively impacted. Mohanji continues to travel, teach, and serve — a living embodiment of the timeless message he carries: be the change, radiate love.",
        image: undefined,
      },
    ],
    stats: [
      { value: '33+', label: 'Countries' },
      { value: '27',  label: 'Languages' },
      { value: '30+', label: 'Books' },
      { value: '1M+', label: 'Lives Touched' },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: "Mohanji's Life Journey",
      slug: 'life-journey',
      pageType: 'life-journey',
      lifeJourneyContent,
      status: 'published',
    } as any,
  })
  log("Life Journey page created ✅")
}
