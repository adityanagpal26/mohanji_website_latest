import type { Payload } from 'payload'

interface PracticeData {
  title: string
  slug: string
  tagline: string
  category: string
  duration?: string
  descriptionText: string
  benefits: string[]
  howItWorks: string[]
  primaryCtaLabel?: string
  primaryCtaUrl?: string
  brochureUrl?: string
  showContactForm?: boolean
  contactEmail?: string
  showNewsletterForm?: boolean
  newsletterLabel?: string
  isExternalPractice?: boolean
  externalPageUrl?: string
}

function makeRichText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [{ type: 'text', text, version: 1 }],
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

const PRACTICES: PracticeData[] = [
  // ── 1. Conscious Cleansing Process ─────────────────────────────────────────
  {
    title: 'Conscious Cleansing Process',
    slug: 'conscious-cleansing',
    tagline: 'A deep inner purification for liberation from past impressions',
    category: 'Cleansing',
    duration: '60–90 minutes',
    descriptionText:
      'The Conscious Cleansing Process (CCP) is a powerful technique channelled through Mohanji that works on the deeper layers of consciousness. It cleanses subconscious impressions, inherited patterns, and accumulated karmas — restoring clarity, lightness, and inner freedom. Participants report profound shifts after just one session.',
    benefits: [
      'Releases deep-seated subconscious impressions (samskaras)',
      'Frees you from inherited emotional and karmic patterns',
      'Reduces anxiety, fear, and emotional heaviness',
      'Promotes deep inner peace and clarity',
      'Accelerates spiritual growth and self-awareness',
    ],
    howItWorks: [
      'The facilitator guides you into a deep state of relaxation.',
      "Mohanji's consciousness works through the facilitator to access and release trapped impressions.",
      'You may experience emotions, visions, or physical sensations as the cleansing occurs.',
      'The session ends with grounding and integration.',
      'Regular sessions deepen the cleansing and bring lasting transformation.',
    ],
    primaryCtaLabel: 'Register for a Session',
    primaryCtaUrl: '/contact',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/CCP-Brochure.pdf',
    showContactForm: true,
    contactEmail: 'ccp@mohanji.org',
  },

  // ── 2. Conscious Dancing ────────────────────────────────────────────────────
  {
    title: 'Conscious Dancing',
    slug: 'conscious-dancing',
    tagline: 'Move freely and release what no longer serves you',
    category: 'Movement Practice',
    duration: '60 minutes',
    descriptionText:
      'Conscious Dancing is a spontaneous, free-form movement practice introduced by Mohanji. Without choreography or technique, participants are guided to move to music in a completely uninhibited way — releasing blocked emotions, energising the body, and reconnecting with authentic self-expression. This joyful practice is accessible to everyone regardless of age or fitness level.',
    benefits: [
      'Releases emotional blockages stored in the body',
      'Increases energy, vitality, and joy',
      'Cultivates spontaneity and authentic self-expression',
      'Reduces stress and mental chatter',
      'Connects you to the present moment through movement',
    ],
    howItWorks: [
      'Stand or sit comfortably in a safe, open space.',
      'Close your eyes and allow the music to move your body.',
      'There is no right or wrong way — follow your body\'s natural impulses.',
      'Continue for the duration of the session, then rest in silence.',
    ],
    primaryCtaLabel: 'Find a Class Near You',
    primaryCtaUrl: '/events',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/Conscious-Dancing-Brochure.pdf',
  },

  // ── 3. Conscious Walking ────────────────────────────────────────────────────
  {
    title: 'Conscious Walking',
    slug: 'conscious-walking',
    tagline: 'Transform each step into a meditation',
    category: 'Movement Practice',
    duration: '30–60 minutes',
    descriptionText:
      'Conscious Walking is a meditative walking practice taught by Mohanji. By bringing full awareness to each step, breath, and sensation while walking, this practice transforms an everyday activity into a profound moving meditation. It builds presence, gratitude, and a deep connection with the Earth.',
    benefits: [
      'Develops moment-to-moment awareness and presence',
      'Grounds your energy and reduces mental turbulence',
      'Cultivates gratitude and appreciation for life',
      'Improves physical and mental wellbeing',
      'Can be practised anywhere — in nature, in a park, even at home',
    ],
    howItWorks: [
      'Begin walking slowly, bringing awareness to your feet touching the ground.',
      'Coordinate your breath with your steps — inhale for two steps, exhale for two.',
      'Observe sensations, sounds, and the world around you without judgement.',
      'If the mind wanders, gently return attention to the next step.',
      'End with a few minutes of stillness to absorb the experience.',
    ],
    primaryCtaLabel: 'Learn More',
    primaryCtaUrl: '/events',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/Conscious-Walking-Brochure.pdf',
  },

  // ── 4. Consciousness Kriya ──────────────────────────────────────────────────
  {
    title: 'Consciousness Kriya',
    slug: 'consciousness-kriya',
    tagline: 'Ancient breathwork for rapid spiritual evolution',
    category: 'Breathwork & Pranayama',
    duration: '45 minutes daily',
    descriptionText:
      'Consciousness Kriya is a powerful pranayama-based practice transmitted by Mohanji, rooted in the ancient Kriya Yoga tradition. Through specific breathing patterns, it activates the spine, awakens dormant energy, and accelerates the journey towards higher states of consciousness. It is a daily practice that deepens over time.',
    benefits: [
      'Activates and purifies the spine and energy channels (nadis)',
      'Accelerates spiritual evolution and consciousness expansion',
      'Calms the nervous system and reduces stress',
      'Improves focus, clarity, and meditative depth',
      'Supports physical health through pranic cleansing',
    ],
    howItWorks: [
      'The Kriya is transmitted during an initiation session with a certified Mohanji Acharya.',
      'You receive personalised instruction on the breathing technique and inner locks (bandhas).',
      'Practice daily for 40–45 minutes, ideally in the early morning.',
      'Regular practice integrates the technique deeper into your system over months.',
    ],
    primaryCtaLabel: 'Register for Initiation',
    primaryCtaUrl: '/contact',
    showNewsletterForm: true,
    newsletterLabel: 'Sign up for the Consciousness Kriya Newsletter',
  },

  // ── 5. Mohanji Conscious Chanting ───────────────────────────────────────────
  {
    title: 'Mohanji Conscious Chanting',
    slug: 'conscious-chanting',
    tagline: 'Purify your space and consciousness through sacred sound',
    category: 'Sound & Mantra',
    duration: 'Variable',
    descriptionText:
      'Mohanji Conscious Chanting uses the vibrational power of Sanskrit mantras and devotional chanting to cleanse the atmosphere, elevate consciousness, and open the heart. Chanting awakens inner devotion, dissolves ego, and connects the practitioner to the divine through the sacred science of sound.',
    benefits: [
      'Purifies the mind, body, and surrounding atmosphere',
      'Opens the heart and cultivates devotion',
      'Dissolves ego barriers and deepens connection to the divine',
      'Improves focus and meditative receptivity',
      'Creates a protective and sacred energy in your space',
    ],
    howItWorks: [
      'Sit comfortably in a clean, quiet space.',
      'Begin with an intention or prayer.',
      'Chant the mantras clearly and with full attention.',
      'Allow the vibrations to penetrate inward rather than performing externally.',
    ],
    primaryCtaLabel: 'Join a Chanting Session',
    primaryCtaUrl: '/events',
  },

  // ── 6. Mohanji Energy Transfer ──────────────────────────────────────────────
  {
    title: 'Mohanji Energy Transfer',
    slug: 'energy-transfer',
    tagline: 'Direct transmission of Mohanji\'s consciousness',
    category: 'Energy Transmission',
    duration: 'Group sessions vary',
    descriptionText:
      "Mohanji Energy Transfer (MET) is a direct transmission of Mohanji's consciousness — the universal energy of unconditional love. During a session, participants sit in silence while a trained facilitator channels Mohanji's energy, which works on each individual according to their specific needs, cleansing, healing, and elevating their state of consciousness.",
    benefits: [
      'Direct experience of unconditional love and higher consciousness',
      'Deep energetic and emotional cleansing',
      'Relief from physical, mental, and emotional blockages',
      'Accelerated spiritual progress',
      'Profound inner peace and stillness',
    ],
    howItWorks: [
      'Sessions are conducted in groups or individually.',
      'Participants sit or lie comfortably with eyes closed.',
      'The facilitator channels Mohanji\'s consciousness into the space.',
      'The energy works on each participant according to their individual need.',
      'Sessions typically last 30–90 minutes, followed by silence and integration.',
    ],
    primaryCtaLabel: 'Find a Session',
    primaryCtaUrl: '/events',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/MET-Brochure.pdf',
  },

  // ── 7. Mohanji Future Mapping Process ───────────────────────────────────────
  {
    title: 'Mohanji Future Mapping Process',
    slug: 'future-mapping',
    tagline: 'Align your inner vision with your highest potential',
    category: 'Manifestation',
    duration: '90 minutes',
    descriptionText:
      'The Mohanji Future Mapping Process (MFMP) is a guided inner journey that helps participants access their subconscious blueprint and consciously re-write their future. By releasing limiting beliefs and past conditioning, participants gain clarity about their purpose and the practical steps to achieve their highest potential.',
    benefits: [
      'Clarity on your life purpose and highest potential',
      'Releases limiting beliefs that block your progress',
      'Aligns your conscious and subconscious mind',
      'Practical roadmap for manifesting your goals',
      'Increased confidence, motivation, and inner strength',
    ],
    howItWorks: [
      'The session begins with a grounding and relaxation process.',
      'The facilitator guides you into a receptive inner state.',
      'You access your subconscious vision and explore your future possibilities.',
      'Limiting beliefs are identified and released.',
      'You create a clear intention and commitment for your desired future.',
    ],
    primaryCtaLabel: 'Register for a Session',
    primaryCtaUrl: '/contact',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/MFMP-Brochure.pdf',
    showContactForm: true,
    contactEmail: 'mfmp@mohanji.org',
  },

  // ── 8. Mohanji Transformation Method ────────────────────────────────────────
  {
    title: 'Mohanji Transformation Method',
    slug: 'transformation-method',
    tagline: 'Dissolve what holds you back and step into your authentic self',
    category: 'Inner Transformation',
    duration: '60–90 minutes',
    descriptionText:
      'The Mohanji Transformation Method (MTM) is a structured process of inner exploration and release. Through guided conversation, breath, and awareness techniques, participants identify the root causes of their patterns, addictions, and suffering — and release them at the source. The result is lasting transformation, not just temporary relief.',
    benefits: [
      'Identifies and dissolves root causes of suffering',
      'Breaks habitual patterns, addictions, and fears',
      'Restores authentic self-expression and freedom',
      'Deepens self-awareness and emotional intelligence',
      'Creates lasting inner change rather than surface fixes',
    ],
    howItWorks: [
      'An initial one-on-one session with a trained MTM facilitator.',
      'The facilitator uses guided inquiry to surface the root pattern.',
      'Breath and awareness techniques support the release.',
      'Integration guidance helps anchor the transformation into daily life.',
      'Follow-up sessions consolidate and deepen the work.',
    ],
    primaryCtaLabel: 'Book a Session',
    primaryCtaUrl: '/contact',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/MTM-Brochure.pdf',
    showContactForm: true,
    contactEmail: 'mtm@mohanji.org',
  },

  // ── 9. Mohanji Wellness Walking ──────────────────────────────────────────────
  {
    title: 'Mohanji Wellness Walking',
    slug: 'wellness-walking',
    tagline: 'Heal and rejuvenate through the rhythm of your steps',
    category: 'Wellness',
    duration: '45–60 minutes',
    descriptionText:
      'Mohanji Wellness Walking combines the healing power of rhythmic walking with breath awareness, gratitude, and positive affirmations. Designed to be accessible for all ages and fitness levels, it improves physical health, mental clarity, and emotional balance. Walking groups form communities of support and shared wellness across the world.',
    benefits: [
      'Improves cardiovascular health and physical fitness',
      'Reduces stress, anxiety, and depression',
      'Boosts energy and mental clarity',
      'Builds community and social connection',
      'Cultivates gratitude and positive mindset',
    ],
    howItWorks: [
      'Join a Wellness Walking group or begin solo with guidance.',
      'Set an intention at the start of your walk.',
      'Walk at a comfortable, rhythmic pace with awareness.',
      'Use affirmations and gratitude practices during the walk.',
      'End with a few minutes of stillness and reflection.',
    ],
    primaryCtaLabel: 'Find a Walking Group',
    primaryCtaUrl: '/contact',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/MWW-Brochure.pdf',
    showContactForm: true,
    contactEmail: 'wellness@mohanji.org',
  },

  // ── 10. Relationship Alignment Process ──────────────────────────────────────
  {
    title: 'Relationship Alignment Process',
    slug: 'relationship-alignment',
    tagline: 'Heal your relationships from within',
    category: 'Relationships',
    duration: '90 minutes',
    descriptionText:
      "The Relationship Alignment Process (RAP) is a facilitated inner journey that works on the participant's relationship patterns at the subconscious level. By releasing unresolved emotions, karmic ties, and limiting expectations, RAP restores harmony, compassion, and authentic connection — whether with a partner, family member, colleague, or oneself.",
    benefits: [
      'Heals unresolved relationship wounds and resentments',
      'Releases karmic ties and unhealthy attachment patterns',
      'Restores compassion, understanding, and authentic connection',
      'Improves communication and emotional boundaries',
      'Transforms recurring relationship conflicts at the root',
    ],
    howItWorks: [
      'Begin with a clarity session with a trained RAP facilitator.',
      'Identify the key relationships or patterns you wish to address.',
      'Guided visualisation and awareness techniques access the subconscious.',
      'Blockages, resentments, and patterns are gently released.',
      'Integration practices support lasting change in your relationships.',
    ],
    primaryCtaLabel: 'Book a Session',
    primaryCtaUrl: '/contact',
    brochureUrl: 'https://mohanji.org/wp-content/uploads/2024/01/RAP-Brochure.pdf',
    showContactForm: true,
    contactEmail: 'rap@mohanji.org',
  },

  // ── 11. Shaktipat ────────────────────────────────────────────────────────────
  {
    title: 'Shaktipat',
    slug: 'shaktipat',
    tagline: 'The direct transmission of spiritual energy from Guru to student',
    category: 'Energy Transmission',
    duration: 'Session-dependent',
    descriptionText:
      'Shaktipat is one of the most ancient and potent spiritual transmissions — the direct transfer of divine energy (Shakti) from a realised master to a seeker. Through Mohanji, Shaktipat can awaken dormant spiritual energy (Kundalini), accelerate spiritual evolution, and initiate profound inner experiences. It is given in silence, through gaze, touch, or thought.',
    benefits: [
      'Direct awakening of spiritual energy (Kundalini)',
      'Rapid expansion of consciousness',
      'Deep purification of the mind and subtle body',
      'Profound inner experiences and revelations',
      'Accelerated spiritual evolution',
    ],
    howItWorks: [
      'Shaktipat is given by Mohanji or an authorised Acharya.',
      'The recipient sits in receptive stillness.',
      'Transmission occurs through gaze, touch, intention, or proximity.',
      'Integration may take days or weeks as the energy works through the system.',
      'Regular meditation deepens and stabilises the effects.',
    ],
    primaryCtaLabel: 'Learn About Events',
    primaryCtaUrl: '/events',
  },

  // ── 12. Abundance Process ────────────────────────────────────────────────────
  {
    title: 'Abundance Process',
    slug: 'abundance-process',
    tagline: 'Unlock the consciousness of abundance within you',
    category: 'Manifestation',
    descriptionText:
      'The Abundance Process is a unique program created by Mohanji that works on shifting the consciousness from scarcity to true abundance. Through inner work, gratitude practices, and conscious intention, participants release the deep-seated beliefs that block prosperity — and align themselves with the natural flow of abundance in all areas of life.',
    benefits: [
      'Shifts core beliefs from scarcity to abundance',
      'Removes subconscious blocks to prosperity and success',
      'Cultivates gratitude as the foundation of abundance',
      'Aligns actions with an abundance mindset',
      'Brings positive transformation across finances, health, and relationships',
    ],
    howItWorks: [
      'The process is conducted online via the Mohanji Process platform.',
      'Complete guided modules at your own pace.',
      'Daily practices and reflections deepen the work.',
      'Live group sessions with facilitators provide support.',
    ],
    isExternalPractice: true,
    externalPageUrl: 'https://mohanjiprocess.mohanji.org/process/abundance-process/',
    primaryCtaLabel: 'Visit the Abundance Process',
    primaryCtaUrl: 'https://mohanjiprocess.mohanji.org/process/abundance-process/',
  },

  // ── 13. Guided Forgiveness Process ──────────────────────────────────────────
  {
    title: 'Guided Forgiveness Process',
    slug: 'guided-forgiveness',
    tagline: 'Set yourself free through the power of forgiveness',
    category: 'Inner Transformation',
    descriptionText:
      "The Guided Forgiveness Process is a powerful inner journey created by Mohanji that facilitates genuine, deep forgiveness — of others and of oneself. Unforgiveness is one of the heaviest burdens we carry, keeping us locked in the past. This process gently dissolves old wounds, resentments, and guilt, freeing you to live fully in the present with an open heart.",
    benefits: [
      'Releases deep-seated resentments and emotional wounds',
      'Frees you from guilt, shame, and self-blame',
      'Restores lightness, peace, and emotional freedom',
      'Heals relationships — even those that have ended',
      'Opens the heart to love, compassion, and new possibilities',
    ],
    howItWorks: [
      'The process is conducted online via the Mohanji Process platform.',
      'Guided audio and video sessions lead you through the process.',
      'Work through at your own pace in a private, safe space.',
      'Integration exercises support lasting emotional release.',
    ],
    isExternalPractice: true,
    externalPageUrl: 'https://mohanjiprocess.mohanji.org/process/guided-forgiveness-process/',
    primaryCtaLabel: 'Visit the Forgiveness Process',
    primaryCtaUrl: 'https://mohanjiprocess.mohanji.org/process/guided-forgiveness-process/',
  },
]

export async function seedPractices(payload: Payload): Promise<void> {
  for (const data of PRACTICES) {
    const { docs } = await payload.find({
      collection: 'practices',
      where: { slug: { equals: data.slug } },
      limit: 1,
    })

    if (docs.length > 0) {
      console.log(`   ✓ Practice "${data.title}" already exists — skipping`)
      continue
    }

    await payload.create({
      collection: 'practices',
      data: {
        title: data.title,
        slug: data.slug,
        tagline: data.tagline,
        category: data.category,
        duration: data.duration,
        description: makeRichText(data.descriptionText),
        benefits: data.benefits.map((b) => ({ benefit: b })),
        howItWorks: data.howItWorks?.map((s) => ({ step: s })) ?? [],
        primaryCta: {
          label: data.primaryCtaLabel ?? '',
          url: data.primaryCtaUrl ?? '',
        },
        brochureUrl: data.brochureUrl,
        showContactForm: data.showContactForm ?? false,
        contactEmail: data.contactEmail,
        showNewsletterForm: data.showNewsletterForm ?? false,
        newsletterLabel: data.newsletterLabel,
        isExternalPractice: data.isExternalPractice ?? false,
        externalPageUrl: data.externalPageUrl,
      } as any,
    })

    console.log(`   ✓ Practice "${data.title}" created`)
  }
}
