import type { Payload } from 'payload'
import { Pool } from 'pg'
import { upsertMedia } from './utils'

export async function seedGlobalCouncil(payload: Payload, pool: Pool): Promise<void> {
  const log = (...args: any[]) => console.log('[seed:global-council]', ...args)

  const mediaMap: Record<string, number | null> = {}

  const images = [
    { key: 'hero',         url: 'https://mohanji.org/wp-content/uploads/2022/01/Mohanji-foundation.jpg',         alt: 'Mohanji Global Council' },
    { key: 'ashtamoorthy', url: 'https://mohanji.org/wp-content/uploads/2025/01/Ashtamoorthy-Kurur.png',        alt: 'Ashtamoorthy Kurur' },
    { key: 'barbara',      url: 'https://mohanji.org/wp-content/uploads/2025/01/Barbara.png',                    alt: 'Barbara Dizdarevic' },
    { key: 'christopher',  url: 'https://mohanji.org/wp-content/uploads/2025/01/Christopher-Greenwood.png',     alt: 'Christopher Greenwood' },
    { key: 'devi',         url: 'https://mohanji.org/wp-content/uploads/2025/01/Devi-Mohan.png',                 alt: 'Devi Mohan' },
    { key: 'dolf',         url: 'https://mohanji.org/wp-content/uploads/2025/01/Dolf-Zantinge.png',              alt: 'Dolf Zantinge' },
    { key: 'ganesh',       url: 'https://mohanji.org/wp-content/uploads/2025/01/Ganesh-Venkatachalam.png',       alt: 'Ganesh Venkatachalam' },
    { key: 'madhusudan',   url: 'https://mohanji.org/wp-content/uploads/2025/01/Madhusudan.png',                 alt: 'Madhusudan Rajagopalan' },
    { key: 'rajesh',       url: 'https://mohanji.org/wp-content/uploads/2025/01/Rajesh-Kamath.png',              alt: 'Rajesh Kamath' },
    { key: 'vijay',        url: 'https://mohanji.org/wp-content/uploads/2025/01/Vijay-Ramanaidoo.png',           alt: 'Vijay Ramanaidoo' },
  ]

  for (const img of images) {
    mediaMap[img.key] = await upsertMedia(payload, pool, img.url, img.alt)
    log(`${img.key}: ${mediaMap[img.key] ? `media#${mediaMap[img.key]}` : 'FAILED'}`)
  }

  const councilContent = {
    heroImage: mediaMap.hero ?? undefined,
    introText: "The Mohanji Global Council is the governing body overseeing the strategic direction and operations of the Mohanji Foundation worldwide. Council members are chosen for their dedication, integrity, and deep commitment to Mohanji's mission of spreading unconditional love and conscious living across the world.",
    purposePoints: [
      { title: 'Strategic Governance',    description: 'Setting the global direction for the Foundation and ensuring alignment across all platforms and initiatives.' },
      { title: 'Regional Coordination',   description: 'Connecting and empowering regional teams, volunteers, and practitioners worldwide.' },
      { title: 'Humanitarian Oversight',  description: "Guiding and monitoring the Foundation's charitable programs — feeding, sheltering, and supporting communities in need." },
      { title: 'Values & Integrity',      description: "Ensuring all activities remain aligned with Mohanji's core teachings and the Foundation's ethical standards." },
    ],
    members: [
      {
        name: 'Ashtamoorthy Kurur',
        role: 'CFO, Mohanji Foundation USA',
        country: 'USA',
        bio: 'Ashtamoorthy Kurur has volunteered with Mohanji Foundation USA since 2014 and serves as the CFO. He oversees the overall financial governance and management of Mohanji Foundation. He works as a CFO for a technology company, ASSYST in Northern Virginia.',
        photo: mediaMap.ashtamoorthy ?? undefined,
      },
      {
        name: 'Barbara Dizdarevic',
        role: 'Council Member',
        country: 'Switzerland',
        bio: 'Barbara is an economist currently pursuing a PhD in Economics and Social Sciences in Switzerland. She has been a volunteer for the Mohanji Foundation since 2014. A certified yoga teacher by HSTY, she served as Mohanji\'s personal assistant for several years and now supports the global operations from Switzerland.',
        photo: mediaMap.barbara ?? undefined,
      },
      {
        name: 'Christopher Greenwood',
        role: 'Trustee, Mohanji Foundation UK',
        country: 'UK',
        bio: 'Christopher is a seasoned leader with expertise in Web3 and blockchain technology. He serves as CEO of Success Mpowered and is a trustee of Mohanji Foundation UK. He currently manages the Mohanji Centre of Benevolence in Scotland and previously worked directly with Mohanji as his executive assistant for three years.',
        photo: mediaMap.christopher ?? undefined,
      },
      {
        name: 'Devi Mohan',
        role: 'Council Member & Global Ambassador',
        country: 'India / Global',
        bio: 'Devi Mohan is a multifaceted spiritual guide, humanitarian, advocate for women\'s empowerment, inspirational speaker, author, and teacher of Traditional Yoga. She serves as Mohanji Foundation\'s Global Ambassador and Global President of ACT Foundation, currently present in 31 countries.',
        photo: mediaMap.devi ?? undefined,
      },
      {
        name: 'Dolf Zantinge',
        role: 'Council Member',
        country: 'Netherlands',
        bio: 'Dolf Zantinge is a pioneer IT entrepreneur with a background in fiber optics and telecommunications. He co-founded Syllogic, an international IT firm integrating artificial intelligence, machine learning and database management — a pioneer in AI. The company later sold to Perot Systems, where he became a European Director.',
        photo: mediaMap.dolf ?? undefined,
      },
      {
        name: 'Ganesh Venkatachalam',
        role: 'President, Mohanji Foundation USA',
        country: 'USA',
        bio: "Ganesh Venkatachalam's journey with Mohanji began in 2010. He founded the ACT Foundation USA in March 2013 and Mohanji Foundation USA in November 2013. He serves as President of Mohanji Foundation USA and is a Business Professional with leadership experience in Marketing, Sales, and Business Development.",
        photo: mediaMap.ganesh ?? undefined,
      },
      {
        name: 'Madhusudan Rajagopalan',
        role: 'CEO, Mohanji Foundation Global (since 2019)',
        country: 'India',
        bio: 'Madhusudan is an entrepreneur with rich experience in management consulting, outsourcing and knowledge services. He has been associated with Mohanji since 2014 and has served as CEO for Mohanji Foundation Global since 2019. He is a director on Mohanji International Foundation and Mohanji Bharat Welfare Foundation.',
        photo: mediaMap.madhusudan ?? undefined,
      },
      {
        name: 'Rajesh Kamath',
        role: 'Council Member',
        country: 'India',
        bio: "Rajesh Kamath has been associated with Mohanji Foundation since 2014. A prolific author, he has published popular books and assisted in Mohanji's publications. He previously worked in information technology for twenty years in IT strategy, consulting, and project management. He holds a Masters in Physics from IIT Mumbai.",
        photo: mediaMap.rajesh ?? undefined,
      },
      {
        name: 'Vijay Ramanaidoo',
        role: 'Chairperson, Mohanji Foundation UK',
        country: 'UK',
        bio: "As a Chartered Scientist, Vijay works at Imperial College Healthcare NHS Trust as Lead Scientist for Clinical Biochemistry. He helped create the Ahimsa The Vegan Cafe in London. Since 2011, he has known Mohanji and serves as chairperson of Mohanji Foundation UK and trustee of Mohanji ACT Foundation.",
        photo: mediaMap.vijay ?? undefined,
      },
    ],
    regions: [
      { region: 'Asia & India',       activities: "The heartland of Mohanji's work — home to major charitable programs, ashrams, and a vibrant community of practitioners.", countries: 'India, Malaysia, Singapore, Hong Kong, Japan, Australia, New Zealand' },
      { region: 'Europe',             activities: 'One of the most active regions, with regular retreats, satsangs, Empowered programs, and a strong community across the continent.', countries: 'Serbia, UK, Germany, Austria, Norway, Finland, Sweden, Portugal, Spain, Switzerland, Slovenia' },
      { region: 'North America',      activities: 'A growing community with programs across the USA and Canada, including retreats, meditations, and charitable initiatives.', countries: 'USA, Canada' },
      { region: 'Latin America',      activities: 'Rapidly expanding presence with dedicated practitioners across South America.', countries: 'Brazil, Colombia, Argentina, Mexico, Chile' },
      { region: 'Middle East & Africa', activities: 'Emerging communities with a focus on universal teachings, peace, and humanitarian service.', countries: 'UAE, South Africa, Kenya, Nigeria, Mauritius' },
    ],
    howItWorks: [
      { step: 'Regular Council Meetings',     detail: 'The Global Council convenes regularly — virtually and in person — to review the Foundation\'s progress, align on strategy, and address emerging needs across regions.' },
      { step: 'Regional Teams',               detail: 'Each council member works with a dedicated regional team of volunteers and coordinators who manage local programs, events, and humanitarian activities.' },
      { step: 'Transparency & Accountability', detail: 'The Foundation publishes annual reports documenting its activities, financials, and impact — ensuring transparency and accountability to the global community it serves.' },
      { step: "Mohanji's Guidance",           detail: "The Council operates under the spiritual and directional guidance of Mohanji himself, ensuring that all decisions remain rooted in the Foundation's core mission and values." },
      { step: 'Open to Volunteers',           detail: "The Foundation's strength comes from thousands of volunteers worldwide. Anyone who resonates with the mission is welcome to contribute through the local regional chapters." },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Mohanji Global Council',
      slug: 'global-council',
      pageType: 'global-council',
      councilContent,
      status: 'published',
    } as any,
  })
  log('Global Council page created ✅')
}
