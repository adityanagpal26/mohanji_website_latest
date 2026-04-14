/**
 * COMPREHENSIVE CONTENT SEED — populates ALL Payload collections with real data.
 * Call: GET /api/seed-content
 * DEV ONLY — remove before production.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// ─── Helper: wrap plain string in Lexical rich text format ───────────────────
function toRichText(text: string) {
  return { root: { type: 'root', children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', text, version: 1 }], direction: 'ltr' as const, format: '' as const, indent: 0 }], direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 } }
}

// ─── Helper: download image from URL → Payload media record ──────────────────
async function createMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageUrl: string,
  alt: string,
): Promise<number | null> {
  try {
    const res = await fetch(imageUrl, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    const contentType = res.headers.get('content-type') ?? 'image/jpeg'
    const rawName = imageUrl.split('/').pop()?.split('?')[0] ?? 'image.jpg'
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype: contentType, name: rawName, size: buffer.length },
    })
    return media.id as number
  } catch {
    return null
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const payload = await getPayload({ config })
  const results: Record<string, unknown> = {}

  // ── 1. AWARDS ─────────────────────────────────────────────────────────────
  const awardsData = [
    {
      title: 'Certificate of Recognition — Government of South Africa',
      organization: 'Government of South Africa',
      date: '2019-01-01',
      description: 'Awarded in recognition of Mohanji\'s outstanding contribution to humanitarian work and conscious living across Africa and globally.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/Certificate-of-recognition-government-of-south-africa.jpg',
    },
    {
      title: 'Sivananda Humanitarian Award',
      organization: 'Sivananda Foundation',
      date: '2020-01-01',
      description: 'Awarded for extraordinary humanitarian service and dedication to the upliftment of society, in the tradition of Swami Sivananda.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/Sivananda-Humanitarian-Award.jpg',
    },
    {
      title: 'Global Voice of Compassion',
      organization: 'World Peace Organization',
      date: '2025-01-01',
      description: 'Recognised as a Global Voice of Compassion 2025 for tireless work in spreading messages of compassion, kindness and unconditional love.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2025/03/Global-voice-of-compassion-award-2025.jpg',
    },
    {
      title: 'Top 100 Influential Men of the Year — IMOTY',
      organization: 'IMOTY',
      date: '2022-01-01',
      description: 'Ranked among the Top 100 Most Influential Men of the Year for profound global impact in spirituality and humanitarian service.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/IMOTY-100-Most-influential-men.jpg',
    },
    {
      title: 'Mahaveer Award',
      organization: 'Mahaveer Foundation',
      date: '2021-01-01',
      description: 'Presented for commitment to non-violence, compassion to all beings, and tireless work to alleviate suffering in the world.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/mahaveer-award.jpg',
    },
    {
      title: 'PETA Humanitarian Award',
      organization: 'PETA India',
      date: '2020-01-01',
      description: 'Awarded by PETA for outstanding efforts in promoting compassion toward all living beings and advocating for animal rights.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/PETA-award-Mohanji.png',
    },
    {
      title: 'BRICS CCI Excellence Award',
      organization: 'BRICS Chamber of Commerce & Industry',
      date: '2021-01-01',
      description: 'Excellence Award from the BRICS Chamber of Commerce and Industry for contributions to international humanitarian work.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/BRICS-CCI-award.jpeg',
    },
    {
      title: 'Honorary Doctorate in Spiritual Leadership',
      organization: 'International University',
      date: '2022-01-01',
      description: 'Conferred an honorary doctorate in recognition of lifelong dedication to spiritual education and global humanitarian service.',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/04/Honorary-doctorate.jpg',
    },
  ]

  let awardsCount = 0
  for (const award of awardsData) {
    try {
      const imageId = await createMedia(payload, award.imageUrl, award.title)
      await payload.create({
        collection: 'awards',
        data: {
          title: award.title,
          organization: award.organization,
          date: award.date,
          description: toRichText(award.description),
          ...(imageId ? { image: imageId } : {}),
        },
      })
      awardsCount++
    } catch { /* skip */ }
  }
  results.awards = `${awardsCount}/${awardsData.length} created`

  // ── 2. MEDITATIONS ────────────────────────────────────────────────────────
  const meditationsData = [
    {
      title: 'Power of Purity',
      slug: 'power-of-purity',
      description: 'Power of Purity is a deep, guided meditation of 50 minutes that cleanses the subconscious mind of stored impressions, fears, and blockages. Mohanji\'s powerful presence guides you to layers of your being that are rarely touched in everyday consciousness. Regular practice brings inner peace, emotional stability, and a lasting sense of purity.',
      benefits: 'Deep subconscious cleansing\nRelease of stored fears and blockages\nEmotional stability and inner peace\nEnhanced clarity of mind\nSpiritual purification',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Group-1142-1.png',
    },
    {
      title: 'Bliss of Silence',
      slug: 'bliss-of-silence',
      description: 'Bliss of Silence is a 40-minute guided meditation that takes you into the profound stillness of your own being. Beyond words, beyond thoughts, you discover the natural bliss that exists within you at all times. This meditation is a gateway to experiencing your true nature — pure consciousness, pure love, pure silence.',
      benefits: 'Experience of inner stillness\nNatural bliss and joy\nRelease of mental chatter\nDeep rest and rejuvenation\nConnection to pure consciousness',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Bliss-of-Silence-Poster-2048x1366-1.jpg',
    },
    {
      title: 'Freedom Meditation',
      slug: 'freedom-meditation',
      description: 'Freedom Meditation is a powerful practice that liberates you from the bondage of the mind, ego, and conditioned patterns. Mohanji guides you through a process of deep letting go — releasing identification with thoughts, emotions, and roles — so you can experience the boundless freedom of your true self.',
      benefits: 'Liberation from mental conditioning\nRelease of ego identification\nExperience of boundless freedom\nDeep sense of expansion\nClarity about your true nature',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2023/01/Freedom-meditation-poster.jpg',
    },
    {
      title: 'Self Healing Meditation',
      slug: 'self-healing-meditation',
      description: 'The Self Healing Meditation channels Mohanji\'s healing energy to activate your body\'s own natural healing intelligence. Working through breath, visualisation, and energy transmission, this practice supports physical wellbeing, emotional healing, and the release of pain patterns held in the body and mind.',
      benefits: 'Activation of natural healing intelligence\nRelease of physical and emotional pain\nSupport for recovery and health\nEnhanced vitality and energy\nDeep relaxation of the nervous system',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Self-healing-meditation-poster-2048x1366-1.jpg',
    },
    {
      title: 'Blossoms of Love',
      slug: 'blossoms-of-love',
      description: 'Blossoms of Love is a heart-opening meditation that gently awakens the flower of unconditional love within you. Through Mohanji\'s loving guidance, you reconnect with the infinite love that is your true nature — dissolving barriers between yourself and others, yourself and existence.',
      benefits: 'Opening of the heart centre\nExperience of unconditional love\nHealing of relationship wounds\nExpansion of compassion and empathy\nSoftening of the ego\'s defences',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Blossoms-of-Love-Poster-2048x1366-1.jpg',
    },
    {
      title: 'Doorway to Heaven',
      slug: 'doorway-to-heaven',
      description: 'Doorway to Heaven is a transcendental meditation that opens a portal to higher states of consciousness. Mohanji guides you beyond the ordinary mind into spaces of luminous awareness, where the boundary between the individual and the infinite dissolves and the taste of liberation becomes real.',
      benefits: 'Access to higher states of consciousness\nExperience of transcendence\nDissolution of separation\nTaste of liberation and samadhi\nProfound spiritual awakening',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Doorway-to-Heaven-poster-2048x1366-1.jpg',
    },
    {
      title: '360 Degrees',
      slug: '360-degrees',
      description: '360 Degrees is a unique meditation that expands your awareness in all dimensions — past, present, future, inner, outer, above, below. This practice cultivates the witness consciousness, the ability to observe all of existence from a place of complete stillness and non-attachment.',
      benefits: 'Expansion of awareness in all dimensions\nCultivation of witness consciousness\nNon-attachment and equanimity\nHolistic perspective on life\nDeep meditative stability',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/360-degrees-poster-2048x1366-1.jpg',
    },
    {
      title: 'Shree Jagannatha Meditation',
      slug: 'shree-jagannatha-meditation',
      description: 'Shree Jagannatha Meditation connects you to the powerful cosmic energy of Lord Jagannatha — the Lord of the Universe. This sacred practice invokes divine grace and blessings, supporting profound inner transformation, protection, and the experience of divine presence in your life.',
      benefits: 'Connection to cosmic divine energy\nExperience of divine grace and blessings\nProtection and inner strength\nDeep devotional experience\nSpiritual transformation',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2022/05/Jagannatha-Meditation-Poster.jpg',
    },
  ]

  let meditationsCount = 0
  for (const med of meditationsData) {
    try {
      const imageId = await createMedia(payload, med.imageUrl, med.title)
      await payload.create({
        collection: 'meditations',
        data: {
          title: med.title,
          slug: med.slug,
          description: toRichText(med.description),
          benefits: toRichText(med.benefits),
          ...(imageId ? { featuredImage: imageId } : {}),
        },
      })
      meditationsCount++
    } catch { /* skip */ }
  }
  results.meditations = `${meditationsCount}/${meditationsData.length} created`

  // ── 3. PRACTICES ─────────────────────────────────────────────────────────
  const practicesData = [
    {
      title: 'Consciousness Kriya',
      slug: 'consciousness-kriya',
      description: 'Consciousness Kriya is an ancient system of breath-based meditation given by Mohanji for self-realisation and liberation. Unlike many kriyas focused only on physical benefits, Consciousness Kriya works directly on consciousness itself — systematically purifying the mind, awakening the spine centres, and stabilising pure awareness. Practice requires initiation from a trained Acharya.',
      benefits: 'Purification of the mental body\nAwakening of spinal energy centres\nStabilisation of pure awareness\nAccelerated spiritual progress\nGrace and guidance of the lineage',
      howItWorks: 'Consciousness Kriya uses specific breathing ratios, visualisation, and mantras to circulate prana through the sushumna nadi. The practice is transmitted in person by a trained Mohanji Acharya. Regular practice creates a sustained state of expanded awareness in daily life.',
      applicationFormUrl: 'mailto:kriya@mohanji.org',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Consciousness-kriya.jpg',
    },
    {
      title: 'Mai-Tri Method',
      slug: 'mai-tri-method',
      description: 'Mai-Tri Method is a unique, non-touch energy healing technique channelled through Mohanji. The word "Mai-Tri" comes from Sanskrit — "Maithri" means loving friendship. Mai-Tri practitioners channel Mohanji\'s healing energy to work on the root causes of illness at the consciousness level. It is not a medical treatment but a complementary spiritual healing practice.',
      benefits: 'Removal of root-cause blockages\nEmotional release and healing\nRelief from chronic physical conditions\nDeep spiritual purification\nActivation of self-healing intelligence',
      howItWorks: 'The Mai-Tri practitioner connects to Mohanji\'s energy field and channels it to the recipient. Sessions can be in-person or online. The energy works on all levels — physical, emotional, mental, and spiritual — addressing root causes rather than symptoms.',
      applicationFormUrl: '/contact',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Mai-Tri-method.jpg',
    },
    {
      title: 'Shaktipat',
      slug: 'shaktipat',
      description: 'Shaktipat is a direct transmission of spiritual energy from Master to student, awakening the dormant Kundalini Shakti. Through Mohanji\'s grace, Shaktipat initiates a profound inner awakening that can catalyse years of spiritual progress in a single transmission. Shaktipat is given in person during special programs.',
      benefits: 'Direct awakening of Kundalini energy\nAcceleration of spiritual evolution\nDeep inner experiences of light and bliss\nTransformation of consciousness\nActivation of higher chakras',
      howItWorks: 'Mohanji transmits Shaktipat directly through his gaze, touch, or intention. The recipient need only be open and receptive. The effects may be immediate or unfold over days and weeks after the transmission.',
      applicationFormUrl: '/events',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Shaktipat.jpg',
    },
    {
      title: 'Mohanji Energy Transfer (MET)',
      slug: 'mohanji-energy-transfer',
      description: 'Mohanji Energy Transfer (MET) is a powerful technique where Mohanji\'s pure consciousness energy is channelled to the recipient for healing and transformation. MET works on the subtle bodies, clearing blockages and infusing higher vibrational energy to support all aspects of life — health, relationships, clarity, and spiritual growth.',
      benefits: 'Clearing of subtle body blockages\nInfusion of high-vibrational energy\nSupport for physical and emotional healing\nEnhanced mental clarity\nAcceleration of positive life changes',
      howItWorks: 'MET can be conducted remotely or in person by trained MET practitioners. The practitioner acts as a pure channel for Mohanji\'s energy, holding no personal agenda for the recipient. Sessions typically last 30–60 minutes.',
      applicationFormUrl: '/contact',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Mohanji-energy-transfer.jpg',
    },
    {
      title: 'Conscious Dancing',
      slug: 'conscious-dancing',
      description: 'Conscious Dancing is a moving meditation that uses free-form dance as a vehicle for liberation and self-expression. Moving without judgment, without performance, without the need to look good — you reconnect with the joy, vitality, and spontaneity of your true nature. Facilitated by trained Mohanji teachers worldwide.',
      benefits: 'Release of stored emotions and tension\nReconnection with natural joy and vitality\nFreedom from self-consciousness\nGrounding in the body\nExpansion of creative expression',
      howItWorks: 'Conscious Dancing sessions are held in groups. The facilitator creates a safe, non-judgmental space. Participants move freely to carefully chosen music, allowing the body to express whatever arises. No dance experience required.',
      applicationFormUrl: '/events',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Conscious-dancing.jpg',
    },
    {
      title: 'Conscious Walking',
      slug: 'conscious-walking',
      description: 'Conscious Walking transforms the ordinary act of walking into a profound moving meditation. By bringing full awareness to each step, to the contact with the earth, to the breath and the senses, the mind becomes still and a deep connection with the present moment is established. Practiced individually or in groups in nature.',
      benefits: 'Grounding and presence in the body\nNatural mental stillness\nDeep connection with nature\nRelease of stress and anxiety\nCultivation of mindful awareness in daily life',
      howItWorks: 'Conscious Walking can be practiced alone or in groups. Participants walk slowly and silently, bringing attention to each step, the sensations in the body, the sounds, smells and sights around them. Sessions typically last 30–90 minutes.',
      applicationFormUrl: '/events',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Conscious-walking.jpg',
    },
  ]

  let practicesCount = 0
  for (const practice of practicesData) {
    try {
      const imageId = await createMedia(payload, practice.imageUrl, practice.title)
      await payload.create({
        collection: 'practices',
        data: {
          title: practice.title,
          slug: practice.slug,
          description: toRichText(practice.description),
          benefits: toRichText(practice.benefits),
          howItWorks: toRichText(practice.howItWorks),
          applicationFormUrl: practice.applicationFormUrl,
          ...(imageId ? { featuredImage: imageId } : {}),
        },
      })
      practicesCount++
    } catch { /* skip */ }
  }
  results.practices = `${practicesCount}/${practicesData.length} created`

  // ── 4. EVENTS ────────────────────────────────────────────────────────────
  const eventsData = [
    {
      title: 'Silence with Mohanji — Retreat',
      slug: 'silence-with-mohanji-2026',
      description: 'An immersive silent retreat with Mohanji, offering a rare opportunity to dive deep into stillness under the direct guidance of the Master. Days are filled with meditations, Shaktipat, satsangs, and extended periods of noble silence. Space is very limited.',
      startDate: '2026-04-25T00:00:00.000Z',
      endDate: '2026-04-28T00:00:00.000Z',
      eventType: 'retreat',
      registrationUrl: 'https://mohanji.org/events/',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2025/01/Silence-with-Mohanji-2025-website-1024x536-1.jpg',
    },
    {
      title: 'Kailash Yatra 2026',
      slug: 'kailash-yatra-2026',
      description: 'Join Mohanji on the sacred pilgrimage to Mount Kailash — the abode of Lord Shiva. This transformative journey takes you through the breathtaking landscapes of Tibet to circumambulate the most sacred mountain on Earth. A once-in-a-lifetime experience with profound spiritual significance.',
      startDate: '2026-08-10T00:00:00.000Z',
      endDate: '2026-08-25T00:00:00.000Z',
      eventType: 'pilgrimage',
      registrationUrl: '/kailash/application',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2025/02/Kailash-Yatra-2026-banner.jpg',
    },
    {
      title: 'Muktinath Yatra 2026',
      slug: 'muktinath-yatra-2026',
      description: 'A sacred pilgrimage to Muktinath — the temple of liberation in the Himalayas of Nepal. Muktinath is revered by Hindus and Buddhists alike as one of the most powerful places of liberation on Earth. Journey with Mohanji to this extraordinary site for a life-changing spiritual experience.',
      startDate: '2026-09-15T00:00:00.000Z',
      endDate: '2026-09-22T00:00:00.000Z',
      eventType: 'pilgrimage',
      registrationUrl: 'https://mohanji.org/events/',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2024/09/Muktinath-2024-1024x536.jpg',
    },
  ]

  let eventsCount = 0
  for (const event of eventsData) {
    try {
      const imageId = await createMedia(payload, event.imageUrl, event.title)
      await payload.create({
        collection: 'events',
        data: {
          title: event.title,
          slug: event.slug,
          description: toRichText(event.description),
          startDate: event.startDate,
          endDate: event.endDate,
          eventType: event.eventType as 'retreat' | 'satsang' | 'pilgrimage' | 'celebration' | 'workshop' | 'online',
          registrationUrl: event.registrationUrl,
          status: 'published',
          isPast: false,
          ...(imageId ? { featuredImage: imageId } : {}),
        },
      })
      eventsCount++
    } catch { /* skip */ }
  }
  results.events = `${eventsCount}/${eventsData.length} created`

  // ── 5. BOOKS ─────────────────────────────────────────────────────────────
  const booksData = [
    {
      title: 'BABA — The Journey of Shri Shirdi Sai Baba',
      slug: 'baba',
      author: 'Mohanji',
      description: 'BABA is a profound spiritual biography of Shri Shirdi Sai Baba — one of the greatest saints of modern India. Mohanji narrates the life, teachings, and miracles of Baba in a way that brings the saint alive in the reader\'s heart.',
      purchaseUrl: 'https://mohanji.org/book/baba/',
      bookType: 'biography',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/BABA-book-cover.jpg',
    },
    {
      title: 'The Silence of Shiva',
      slug: 'silence-of-shiva',
      author: 'Mohanji',
      description: 'The Silence of Shiva explores the profound mystery of Lord Shiva — the great ascetic, the destroyer of illusions, the infinite consciousness. Mohanji reveals the essential Shiva as the very ground of being within you.',
      purchaseUrl: 'https://mohanji.org/book/silence-of-shiva/',
      bookType: 'biography',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Silence-of-Shiva-Mohanji.jpg',
    },
    {
      title: 'Path to Liberation',
      slug: 'path-to-liberation',
      author: 'Mohanji',
      description: 'Path to Liberation is a comprehensive guide to the spiritual journey from ordinary human consciousness to the experience of liberation (moksha). Mohanji maps the inner landscape of the seeker with clear, practical guidance.',
      purchaseUrl: 'https://mohanji.org/book/path-to-liberation/',
      bookType: 'biography',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2021/11/Guru-leela-Mohanji-Book.jpg',
    },
    {
      title: 'The Power of Purity',
      slug: 'the-power-of-purity',
      author: 'Mohanji',
      description: 'The Power of Purity collects Mohanji\'s most essential teachings on the nature of the mind, consciousness, karma, and liberation. A perfect companion for daily contemplation and spiritual practice.',
      purchaseUrl: 'https://mohanji.org/book/the-power-of-purity/',
      bookType: 'biography',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2023/05/POP-Book-Image.png',
    },
    {
      title: 'Guru Leela — The Divine Play',
      slug: 'guru-leela',
      author: 'Mohanji',
      description: 'Guru Leela chronicles extraordinary events, miracles, and experiences of Mohanji\'s devotees — illustrating the mysterious ways the Master works in the lives of those connected to him.',
      purchaseUrl: 'https://mohanji.org/book/guru-leela/',
      bookType: 'biography',
      imageUrl: 'https://mohanji.org/wp-content/uploads/2023/05/GL-Volume-1.png',
    },
  ]

  let booksCount = 0
  for (const book of booksData) {
    try {
      const imageId = await createMedia(payload, book.imageUrl, book.title)
      await payload.create({
        collection: 'books',
        data: {
          title: book.title,
          slug: book.slug,
          author: book.author,
          purchaseUrl: book.purchaseUrl,
          bookType: book.bookType as 'children' | 'coffee-table' | 'biography' | 'translation',
          ...(imageId ? { coverImage: imageId } : {}),
        },
      })
      booksCount++
    } catch (e) {
      console.error('Book create error:', book.title, e)
    }
  }
  results.books = `${booksCount}/${booksData.length} created`

  // ── 6. QUOTES ────────────────────────────────────────────────────────────
  const quotesData = [
    { text: 'The only real poverty is the poverty of awareness.', topic: 'Awareness' },
    { text: 'Kindness is the language that the deaf can hear and the blind can see.', topic: 'Kindness' },
    { text: 'Your true nature is beyond all limitations. You are pure consciousness, pure love, pure awareness.', topic: 'True Nature' },
    { text: 'Every moment is a new opportunity to choose love over fear.', topic: 'Love' },
    { text: 'The mind that is still is the mind that is free.', topic: 'Stillness' },
    { text: 'Surrender is not weakness. It is the greatest strength — the strength to let go of what is not real.', topic: 'Surrender' },
    { text: 'You cannot find yourself in the past or the future. You can only find yourself now.', topic: 'Presence' },
    { text: 'Compassion is not an emotion. It is a state of being — the natural expression of a heart that has dissolved the illusion of separation.', topic: 'Compassion' },
    { text: 'The guru does not give you anything you do not already have. He simply removes what is blocking your light.', topic: 'Guru' },
    { text: 'True freedom is not freedom from the world. It is freedom within the world.', topic: 'Freedom' },
    { text: 'Gratitude is the highest prayer. When you are truly grateful, you are in alignment with the abundance of existence.', topic: 'Gratitude' },
    { text: 'Acceptance is the doorway to transformation. What you resist persists; what you accept can change.', topic: 'Acceptance' },
    { text: 'Service is the highest worship. When you serve without expectation, you serve God in all forms.', topic: 'Service' },
    { text: 'The greatest gift you can give another is your full presence.', topic: 'Presence' },
    { text: 'Do not seek happiness. Be happiness. It is your nature.', topic: 'Happiness' },
    { text: 'Your life is your message to the world. Make sure it is inspiring.', topic: 'Life' },
    { text: 'Fear is only the shadow of your own greatness. Step into the light and the shadow disappears.', topic: 'Fear' },
    { text: 'Love everything and everyone unconditionally. This is the highest spiritual practice.', topic: 'Love' },
    { text: 'The path of consciousness is the path of less and less — less ego, less judgment, less separation.', topic: 'Consciousness' },
    { text: 'When you stop comparing yourself to others, you begin to appreciate the unique gift that you are.', topic: 'Self-Worth' },
    { text: 'Silence is not the absence of sound. It is the presence of your deepest self.', topic: 'Silence' },
    { text: 'The universe is not punishing you. It is constantly guiding you back to yourself.', topic: 'Trust' },
    { text: 'A Master does not create followers. A true Master creates Masters.', topic: 'Guru' },
    { text: 'Be faithful to your highest self, and all else will follow in perfect harmony.', topic: 'Faith' },
  ]

  let quotesCount = 0
  for (const quote of quotesData) {
    try {
      await payload.create({
        collection: 'quotes',
        data: { text: quote.text, topic: quote.topic },
      })
      quotesCount++
    } catch { /* skip */ }
  }
  results.quotes = `${quotesCount}/${quotesData.length} created`

  // ── 7. POSTS (Blog + News) ────────────────────────────────────────────────
  const postsData = [
    {
      title: 'The Essence of Unconditional Love',
      slug: 'essence-of-unconditional-love',
      postType: 'blog',
      excerpt: 'In a world that constantly conditions our love — attaching it to expectations, behaviours, and outcomes — Mohanji speaks about the liberating power of loving without conditions.',
      content: 'Love that has conditions is not really love. It is a bargain. When we say "I love you because…" or "I will love you if…" we are not really speaking of love at all. We are speaking of a transaction.\n\nTrue love asks for nothing. It gives freely, completely, without measuring what it receives in return. This is the love of existence for all beings — unconditional, unwavering, total.',
      status: 'published',
    },
    {
      title: 'Understanding Karma: The Law of Cause and Effect',
      slug: 'understanding-karma',
      postType: 'blog',
      excerpt: 'Karma is not punishment. It is the universe\'s way of maintaining perfect balance — every thought, word, and action creating ripples that shape our experience.',
      content: 'Many people misunderstand karma as a system of punishment. They think that if something bad happens to them, they must have done something wrong in a past life and are now being punished.\n\nThis is not how karma works. Karma is simply the law of cause and effect — as above, so below; as within, so without. Every action has a corresponding reaction.',
      status: 'published',
    },
    {
      title: 'Mohanji Foundation Feeds 10,000 People Across 15 Countries',
      slug: 'foundation-feeds-10000',
      postType: 'news',
      excerpt: 'In a single month of coordinated global action, Mohanji Foundation volunteers served nutritious meals to over 10,000 people across 15 countries through the Amriteswari Annadaan programme.',
      content: 'In one of the largest coordinated humanitarian efforts by the Mohanji Foundation to date, volunteers across 15 countries came together to serve over 10,000 nutritious meals to people in need.\n\nThe Amriteswari Annadaan programme — meaning "gift of immortal food" — has been one of the Foundation\'s flagship humanitarian activities since its founding.',
      status: 'published',
    },
    {
      title: 'New Mohanji Centre Opens in Scotland',
      slug: 'centre-opens-scotland',
      postType: 'news',
      excerpt: 'A new Mohanji Centre has opened on a beautiful 14-acre property in Aberdeenshire, Scotland — offering retreats, programmes and a permanent sanctuary for spiritual seekers.',
      content: 'The Mohanji Foundation is delighted to announce the opening of a new spiritual centre in Aberdeenshire, Scotland. Set on 14 acres of pristine Scottish countryside, the centre will offer residential retreats, meditation programmes, and a permanent sanctuary for those seeking deeper spiritual connection.\n\nThe centre is the latest in a growing network of Mohanji Centres worldwide.',
      status: 'published',
    },
  ]

  let postsCount = 0
  for (const post of postsData) {
    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          postType: post.postType as 'news' | 'blog' | 'press-coverage' | 'interview',
          excerpt: post.excerpt,
          content: toRichText(post.content),
          status: post.status as 'draft' | 'published',
          _status: 'published',
        },
      })
      postsCount++
    } catch { /* skip */ }
  }
  results.posts = `${postsCount}/${postsData.length} created`

  // ── 8. AUDIOS ─────────────────────────────────────────────────────────────
  const audiosData = [
    {
      title: 'Mohanji Ashtothari — 108 Names',
      slug: 'mohanji-ashtothari',
      description: 'Mohanji Ashtothari contains the 108 sacred names of Mohanji, chanted by Tahmina Dzhaksybekova. Each name is a portal to a different aspect of Mohanji\'s consciousness and grace. This chant is traditionally recited 108 times for full benefit.',
      audioType: 'mantra',
      duration: '18:24',
    },
    {
      title: 'Mohanji Sahasranaamavalli — 1000 Names',
      slug: 'mohanji-sahasranaamavalli',
      description: 'The Sahasranaamavalli contains 1000 sacred names of Mohanji. This extended chant is a complete spiritual practice in itself — invoking Mohanji\'s presence deeply into your consciousness and energy field. Chanted by Tahmina Dzhaksybekova.',
      audioType: 'mantra',
      duration: '2:14:00',
    },
    {
      title: 'Om Namah Shivaya — Morning Chant',
      slug: 'om-namah-shivaya',
      description: 'A morning chant of Om Namah Shivaya — the five-syllable mantra of Lord Shiva. This powerful mantra purifies the mind, awakens divine consciousness, and aligns you with the highest truth. Perfect for morning practice.',
      audioType: 'chant',
      duration: '12:30',
    },
  ]

  let audiosCount = 0
  for (const audio of audiosData) {
    try {
      await payload.create({
        collection: 'audios',
        data: {
          title: audio.title,
          slug: audio.slug,
          description: toRichText(audio.description),
          audioType: audio.audioType as 'prayer' | 'mantra' | 'chant' | 'talk',
          duration: audio.duration,
        },
      })
      audiosCount++
    } catch { /* skip */ }
  }
  results.audios = `${audiosCount}/${audiosData.length} created`

  return NextResponse.json({
    success: true,
    message: 'All content seeded into Payload CMS',
    results,
  })
}
