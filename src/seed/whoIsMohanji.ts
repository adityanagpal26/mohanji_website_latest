import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedWhoIsMohanji(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:who-is-mohanji]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero',              url: 'https://mohanji.org/wp-content/uploads/2022/05/Who-is-Mohanji-1.jpg',   alt: 'Who is Mohanji — hero' },
    { key: 'portrait',          url: 'https://mohanji.org/wp-content/uploads/2022/05/Group-1332.jpg',          alt: 'Mohanji portrait' },
    { key: 'wide',              url: 'https://mohanji.org/wp-content/uploads/2022/05/Group-1333.jpg',          alt: 'Mohanji with devotees — wide' },
    { key: 'logo_foundation',   url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1203.png',          alt: 'Mohanji Foundation logo' },
    { key: 'logo_international',url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1202.png',          alt: 'Mohanji International logo' },
    { key: 'logo_ammucare',     url: 'https://mohanji.org/wp-content/uploads/2023/01/Ammucare.png',            alt: 'Ammucare Charitable Trust logo' },
    { key: 'logo_act',          url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1188.png',          alt: 'ACT Foundation logo' },
    { key: 'logo_hunger',       url: 'https://mohanji.org/wp-content/uploads/2022/12/Group-1192-1.png',        alt: 'ACT For Hunger logo' },
    { key: 'logo_ebc',          url: 'https://mohanji.org/wp-content/uploads/2022/12/ebc-kids.png',           alt: 'Early Birds Club logo' },
    { key: 'logo_yoga',         url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1195.png',          alt: 'Himalayan School of Traditional Yoga logo' },
    { key: 'logo_myc',          url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1190.png',          alt: 'Mohanji Youth Club logo' },
    { key: 'logo_wca',          url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1191.png',          alt: 'World Consciousness Alliance logo' },
    { key: 'logo_hwb',          url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1184.png',          alt: 'Healers Without Boundaries logo' },
    { key: 'logo_gurulight',    url: 'https://mohanji.org/wp-content/uploads/2022/05/Group-1335.png',          alt: 'Gurulight logo' },
    { key: 'logo_centres',      url: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1196.png',          alt: 'Mohanji Centres logo' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const wimContent = {
    heroImage: mediaMap.hero ?? undefined,
    introSection: {
      heading: 'Who is Mohanji',
      para1: 'Mohanji is a friend of the world, a person trying to raise the awareness of generations from selfishness to selflessness. His mission is to wake up kindness in the hearts of people. He has dedicated his life to serving the world with this single purpose – to raise humans to achieve the highest values of human potential such as kindness, compassion and non-violence. Or in other words, make the transition from humankind to kind humans.',
      para2: 'Mohanji firmly believes that humanity is the best religion for humans and the best practice is ahimsa, or non-violence – in thoughts, words or actions towards fellow beings across all species.',
      para3: 'His core teaching is simply "Be You" – accept, understand, recognise and express your uniqueness in the world. Mohanji has founded various global platforms for people to express themselves through acts of compassion and kindness that add value to society.',
    },
    portraitImage: mediaMap.portrait ?? undefined,
    openingQuote: 'I have never had any godfather in my life. I never had any tycoons assisting me to establish. I never had a specific road map. I never had a Guru who handed over his seat. I have not been a part of any groups or established organizations. I stayed away from conditional relationships. I never claimed any spiritual powers. I never told anyone I am enlightened, nor have I told anyone I am their Guru.\n\nI never discriminated against people based on any divisions of society, social structure, or individual finances. I have not chased anyone, any positions or titles. I have never claimed to be perfect, pure, or different from others. I have always been one with the people. I am one of them always. Nothing special. Nothing different.',
    wideImage: mediaMap.wide ?? undefined,
    secondIntro: {
      heading: 'Who is Mohanji',
      para1: 'Mohanji describes himself as a friend of the world, as a person trying to raise the awareness of generations from selfishness to selflessness. He has dedicated his life to serving the world with this single purpose – to raise humans to achieve the highest values of human potential such as kindness, compassion and non-violence.',
      para2: 'In Mohanji\'s words, "True wealth comes from what we give to this earth, not from what we take." To fulfill his purpose, Mohanji has founded various charities and non-profit organizations that act as platforms for people to express their kindness and compassion through selfless acts that add value to society.',
      para3: 'Mohanji is married to Devi Mohan, and they have a daughter together – Mila Mohan.',
    },
    pullQuote1: 'I am what you consider me to be.',
    liberationSection: {
      heading: 'Liberation',
      text: 'Liberation is the cornerstone of Mohanji\'s teachings where he points us at where to look but not what to see. He places great emphasis on liberation from the bindings, concepts and habits of life. He himself practically demonstrates this by leading a life free from the bindings and conditioning of the mind – totally natural, with total acceptance of life as it comes without resistance, irrespective of people, time, space, situations or concepts.',
      inlineQuote: 'True mastery is the mastery of one\'s own mind.',
      textContinued: 'Mohanji maintains that spirituality is expressed in the awareness with which we live and experience our daily lives. He advocates the path of Pathlessness where the spontaneity and flow is all there is; being totally yourself! He believes in romancing life, approaching every situation in life with wonder and curiosity of a new-born child without preconceptions or judgments. When we see God in every being, we can only have romance in our hearts because we romance God through every being.',
    },
    pillarsSection: {
      heading: "Key Pillars of Mohanji's philosophy",
      text: 'He emphasizes purity, faith, unconditional love and selfless service towards fellow beings of all species, as the foundation and pillars of a balanced human existence. He considers the prayer of gratitude as the highest prayer that increases inner richness and attracts both grace and abundance. His morning prayer is, "Thank you for letting me serve one more day in the world" which is followed by a question to himself, "What more can I do for the world today?" He encourages everyone to do likewise and constantly assess the worth of their existence on earth by the value they have added to the world, within their capacity and scope of influence.',
    },
    spiritualitySection: {
      heading: 'Spirituality is a lifestyle',
      text: 'Being a family man and a former corporate professional, Mohanji believes that spirituality is a part of every aspect of one\'s life, proving it with the example of his own life. He plays all the roles in his life as best as he can – a dutiful son, a loving husband, a doting father, a supportive friend, an encouraging guide and a steadfast citizen. In every aspect, Mohanji performs his role to perfection.\n\nEven though his public life started in 2012, it was an arduous journey to reach from there to his current level of global recognition. He was never afraid to walk alone despite the many hurdles, objections, betrayals and falls on that journey. Coming from relative anonymity, he raised himself to global recognition through his service, love and firm conviction in humanity.',
    },
    lifeQuote: 'Life is about achievements, but is not about the cups and trophies in the wardrobe. It is about the blessings that you rendered to the helpless. It is about our ability to make a positive difference to another being. True achievements cannot be counted in fingers, but can only be measured through one\'s spiritual progress, one\'s level of liberation.',
    footprintSection: {
      heading: 'Global Footprint',
      text1: 'Mohanji has created a number of platforms to allow those who choose to associate with him to add value to society through consistent acts of kindness and compassion. He has founded various charities and organisations such as Ammucare, ACT Foundation, Mohanji Foundation, Himalayan School of Traditional Yoga, World Consciousness Alliance and Early Birds Club. Today, there are around 15 countries where some or all of these institutions are formally registered while followers are present in over 80 countries.',
      text2: 'As an expression of gratitude to the world, Mohanji has made his practices and techniques available for free to the worldwide community. In line with his path of ahimsa (non-violence), Mohanji firmly believes that practical initiatives are required to provide cruelty-free alternatives to help people make conscious choices to avoid causing pain and suffering to nature and its beings.',
    },
    leadingSection: {
      heading: 'Leading by Example',
      text: 'Amidst all the adulation, Mohanji always considers himself a mere projection of the powerful tradition of liberation, sent to reiterate the same essential truths that Masters have been propounding since ages. He makes the esoteric and arcane wisdom of the ancients available to a contemporary audience without diluting their import or depth. His teachings are simple, practical and universal, cutting across religions and nationalities. He speaks from the heart and is an original. He envisions a bright world that vibrates with positivity and compassion.',
    },
    awardsQuote: 'The Brave make their mark. Cowards die anonymous.',
    initiatives: [
      { name: 'Mohanji Foundation',                   logo: mediaMap.logo_foundation    ?? undefined, category: 'founded'  },
      { name: 'Mohanji International',                logo: mediaMap.logo_international ?? undefined, category: 'founded'  },
      { name: 'Ammucare Charitable Trust',            logo: mediaMap.logo_ammucare      ?? undefined, category: 'founded'  },
      { name: 'ACT Foundation',                       logo: mediaMap.logo_act           ?? undefined, category: 'founded'  },
      { name: 'ACT For Hunger',                       logo: mediaMap.logo_hunger        ?? undefined, category: 'founded'  },
      { name: 'Early Birds Club',                     logo: mediaMap.logo_ebc           ?? undefined, category: 'founded'  },
      { name: 'Himalayan School of Traditional Yoga', logo: mediaMap.logo_yoga          ?? undefined, category: 'founded'  },
      { name: 'Mohanji Youth Club',                   logo: mediaMap.logo_myc           ?? undefined, category: 'founded'  },
      { name: 'World Consciousness Alliance',         logo: mediaMap.logo_wca           ?? undefined, category: 'founded'  },
      { name: 'Healers Without Boundaries',           logo: mediaMap.logo_hwb           ?? undefined, category: 'founded'  },
      { name: 'Gurulight',                            logo: mediaMap.logo_gurulight     ?? undefined, category: 'founded'  },
      { name: 'Mohanji Centres of Consciousness',     logo: mediaMap.logo_centres       ?? undefined, category: 'founded'  },
      { name: 'Ahimsa Vegan Cafe',  logo: undefined, category: 'inspired' },
      { name: 'Vegan First',        logo: undefined, category: 'inspired' },
      { name: 'The Ahimsa Space',   logo: undefined, category: 'inspired' },
      { name: 'Divine M Heritage',  logo: undefined, category: 'inspired' },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Who is Mohanji',
      slug: 'who-is-mohanji',
      pageType: 'who-is-mohanji',
      wimContent,
      status: 'published',
    } as any,
  })

  log('Who is Mohanji page created ✅')
}
