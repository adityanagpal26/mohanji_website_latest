import type { Payload } from 'payload'

function rt(text: string) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      children: [
        {
          type: 'paragraph',
          version: 1,
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          children: [{ type: 'text', version: 1, text }],
        },
      ],
    },
  }
}

const MEDITATIONS = [
  {
    title: 'Power of Purity',
    slug: 'power-of-purity',
    duration: '50 minutes',
    description: rt(
      'The Power of Purity is a guided meditation that focuses on gratitude, self-acceptance and a sense of inner peace. Practising this meditation regularly brings increased stability and better mental health. Through the release of accumulated negative emotions and blockages, the meditation brings the feelings of calmness and positivity.',
    ),
  },
  {
    title: '360 Degrees Meditation',
    slug: '360-degrees-meditation',
    duration: '75 minutes',
    description: rt(
      'This advanced guided meditation is for the serious seeker. It develops our higher awareness by training us to become more rooted in our spine when we are going about our daily lives.',
    ),
  },
  {
    title: 'Doorway to Heaven',
    slug: 'doorway-to-heaven',
    duration: '',
    description: rt(
      "Experience a transformative journey with Mohanji's latest guided meditation, centred around the art of breath regulation. 'Doorway to Heaven' invites us to explore the profound space between breaths, guided by Mohanji. As you immerse yourself in this tranquil meditation, you'll discover the gateway to a serene state where breath helps you relax, letting you sink into a peaceful state and dissolve into a profound experience.",
    ),
  },
  {
    title: 'Bliss of Silence',
    slug: 'bliss-of-silence',
    duration: '40 minutes',
    description: rt(
      'This guided meditation offers a transformative glimpse into our true identity — the blissful stillness beyond the limitations of the ego. The meditator focuses on breathing, releasing the tension accumulated in the mind and body. Practising this meditation regularly brings the focus from external distractions to the inner space.',
    ),
  },
  {
    title: 'Blossoms of Love',
    slug: 'blossoms-of-love',
    duration: '30 minutes',
    description: rt(
      'This simple, yet deeply profound guided meditation gives us the opportunity to experience the feeling of containing the entire universe within ourselves. In simple terms, it allows the meditator to relax the body and alleviate acute anxiety and tension. The meditation brings increased positivity, empathy, self-esteem, and self-acceptance.',
    ),
  },
  {
    title: 'Freedom Meditation',
    slug: 'freedom-meditation',
    duration: '10 minutes',
    description: rt(
      'This short guided meditation works well to help children experience their inner world and to experience lightness and freedom. It is also a great shorter meditation for busy adults.',
    ),
  },
  {
    title: 'Shree Jagannatha Meditation',
    slug: 'shree-jagannatha',
    duration: '33 minutes',
    description: rt(
      'Krishna, in his most compassionate form, is Shree Jagannatha. Mohanji has dedicated this meditation to Shree Jagannatha for all the devotees of Krishna. This will aid in transforming the devotees through the power of Bhakti yoga: devotion, unshakable faith and love for their deity.',
    ),
  },
  {
    title: 'Shirdi Sai Baba Meditation',
    slug: 'shirdi-sai-baba',
    duration: '50 minutes',
    description: rt(
      "In this meditation, you establish Sai Baba inside your heart as his temple. Immersed in Baba's presence, you will experience the ultimate joy and contentment with Shraddha & Saburi. The devotion and surrender to Baba will bring you miraculous healing, acceptance, and true happiness beyond any boundaries.",
    ),
  },
  {
    title: 'Mohanji Self-Healing Meditation',
    slug: 'self-healing',
    duration: '',
    description: rt(
      "Mohanji's Self-Healing Meditation is a powerful guided practice designed to activate the body's natural healing capacities. Through deep relaxation and guided awareness, this meditation supports physical, emotional, and spiritual healing.",
    ),
  },
]

export async function seedMeditations(payload: Payload): Promise<void> {
  for (const med of MEDITATIONS) {
    const existing = await payload.find({
      collection: 'meditations',
      where: { slug: { equals: med.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`[seed] Meditation "${med.title}" already exists — skipping.`)
      continue
    }
    await payload.create({
      collection: 'meditations',
      data: {
        title: med.title,
        slug: med.slug,
        duration: med.duration || undefined,
        description: med.description,
        downloads: [],
      } as any,
    })
    console.log(`[seed] Meditation "${med.title}" created ✅`)
  }
}
