/**
 * CLI seed script — populates admin user, globals, and all pages.
 *
 * Run:
 *   npm run seed
 *
 * This is idempotent: existing records are kept, missing ones are created.
 * Images are stored as CDN URL references — no downloading.
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { seedIfNeeded } from './index'

const seed = async () => {
  console.log('🌱 Starting Mohanji seed...')

  try {
  const payload = await getPayload({ config })
    // ── 1. Create / update super-admin user ─────────────────────────────────
    console.log('👤 Setting up admin user...')
    const adminEmail = 'admin@mohanji.org'
    const adminPassword = 'Mohanji@20'

    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'users',
        id: existing.docs[0].id,
        data: { password: adminPassword, role: 'admin' },
      })
      console.log('   ✓ Admin user updated')
    } else {
      await payload.create({
        collection: 'users',
        data: {
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
          firstName: 'Site',
          lastName: 'Admin',
        },
      })
      console.log('   ✓ Admin user created')
    }

    // ── 2. Seed Header global ────────────────────────────────────────────────
    console.log('🧭 Seeding Header...')
    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { label: 'Home', link: '/' },
          {
            label: 'About',
            link: '/about',
            children: [
              { label: 'Who is Mohanji', link: '/about/who-is-mohanji' },
              { label: 'Mohanji Foundation', link: '/about/foundation' },
              { label: "Mohanji's Life Journey", link: '/about/life-journey' },
              { label: 'Mohanji Global Council', link: '/about/global-council' },
              { label: 'Mohanji Acharyas', link: '/about/acharyas' },
              { label: 'Mohanji Spaces', link: '/about/spaces' },
              { label: 'The Golden Path', link: '/about/golden-path' },
              { label: 'Global Ambassador', link: '/about/global-ambassador' },
              { label: 'Awards and Recognition', link: '/about/awards' },
            ],
          },
          {
            label: 'Learn',
            link: '/learn',
            children: [
              {
                label: 'Free Guided Meditation',
                link: '/meditations',
                subItems: [
                  { label: 'Bliss of Silence', link: '/meditations/bliss-of-silence' },
                  { label: 'Blossoms of Love', link: '/meditations/blossoms-of-love' },
                  { label: '360 Degrees Meditation', link: '/meditations/360-degrees-meditation' },
                  { label: 'Doorway to Heaven', link: '/meditations/doorway-to-heaven' },
                  { label: 'Freedom Meditation', link: '/meditations/freedom-meditation' },
                  { label: 'Mohanji Self-Healing', link: '/meditations/self-healing' },
                  { label: 'Power of Purity', link: '/meditations/power-of-purity' },
                  { label: 'Shree Jagannatha Meditation', link: '/meditations/shree-jagannatha' },
                  { label: 'Shirdi Sai Baba Meditation', link: '/meditations/shirdi-sai-baba' },
                ],
              },
              {
                label: 'Practices',
                link: '/practices',
                subItems: [
                  { label: 'Conscious Cleansing Process', link: '/practices/conscious-cleansing' },
                  { label: 'Conscious Dancing', link: '/practices/conscious-dancing' },
                  { label: 'Conscious Walking', link: '/practices/conscious-walking' },
                  { label: 'Consciousness Kriya', link: '/practices/consciousness-kriya' },
                  { label: 'Mohanji Conscious Chanting', link: '/practices/conscious-chanting' },
                  { label: 'Mohanji Energy Transfer', link: '/practices/energy-transfer' },
                  { label: 'Mohanji Future Mapping Process', link: '/practices/future-mapping' },
                  { label: 'Mohanji Transformation Method', link: '/practices/transformation-method' },
                  { label: 'Mohanji Wellness Walking', link: '/practices/wellness-walking' },
                  { label: 'Relationship Alignment Process', link: '/practices/relationship-alignment' },
                  { label: 'Shaktipat', link: '/practices/shaktipat' },
                ],
              },
              { label: 'Mai-Tri Method', link: '/practices/mai-tri-method' },
              { label: 'Traditional Yoga', link: '/practices/traditional-yoga' },
              { label: 'Awakening Yoga Nidra', link: '/practices/awakening-yoga-nidra' },
            ],
          },
          {
            label: 'Join',
            link: '/join',
            children: [
              { label: 'Youth Club', link: '/join/youth-club' },
              { label: 'Volunteer', link: '/join/volunteer' },
            ],
          },
          {
            label: 'Events',
            link: '/events',
            children: [
              { label: 'Upcoming Events', link: '/events' },
              { label: 'Past Events', link: '/events/past' },
            ],
          },
          {
            label: 'Courses',
            link: '/courses',
            children: [
              { label: 'Empowered 1.0', link: 'https://mohanji.org/courses/courses/empowered-1-0/', openInNewTab: true },
              { label: 'Empowered 2.0', link: 'https://mohanji.org/courses/courses/empowered-2-0/', openInNewTab: true },
              { label: 'Empowered 3.0', link: 'https://mohanji.org/courses/courses/empowered-3-0/', openInNewTab: true },
              { label: 'Empowered 4.0', link: 'https://mohanji.org/courses/empowered-4-0/', openInNewTab: true },
              { label: 'Empowered 1.0 – 4.0', link: 'https://mohanji.org/courses/empowered-1-4/', openInNewTab: true },
            ],
          },
          {
            label: 'Media',
            link: '/media',
            children: [
              { label: 'Blogs', link: 'https://mohanji.org/blogs/satsangs/', openInNewTab: true },
              { label: 'News', link: '/news' },
              { label: 'Press Coverage', link: '/press' },
              { label: 'Podcast', link: '/media#podcast' },
              { label: 'Videos', link: '/media#videos' },
              { label: 'Annual Reports', link: '/annual-reports' },
            ],
          },
          { label: 'Store', link: '/store', openInNewTab: false },
          { label: 'Contact Us', link: '/contact' },
        ],
      },
    })
    console.log('   ✓ Header seeded')

    // ── 3. Seed Footer global ────────────────────────────────────────────────
    console.log('🦶 Seeding Footer...')
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        columns: [
          {
            title: "Mohanji's Life",
            links: [
              { label: 'Quotes', url: '/quotes' },
              { label: 'Blogs', url: '/blog' },
              { label: 'Audio & Books', url: '/audios' },
              { label: "Life's Journey", url: '/about/life-journey' },
              { label: 'Mohanji Foundation', url: '/about/foundation' },
            ],
          },
          {
            title: 'Volunteer',
            links: [
              { label: 'Become a Volunteer', url: '/join/volunteer' },
              { label: 'Join the Youth Club', url: '/join/youth-club' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://www.facebook.com/MohanjiOfficial' },
          { platform: 'youtube', url: 'https://www.youtube.com/@MohanjiOfficial' },
          { platform: 'twitter', url: 'https://twitter.com/MohanjiOfficial' },
          { platform: 'instagram', url: 'https://www.instagram.com/MohanjiOfficial' },
        ],
        copyrightText:
          '© 2026 Mohanji Foundation. All Rights Reserved. | Privacy Policy | Powered by MFactor Consultancy LLP',
        newsletterEnabled: true,
      },
    })
    console.log('   ✓ Footer seeded')

    // ── 4. Seed SiteSettings global ──────────────────────────────────────────
    console.log('⚙️  Seeding SiteSettings...')
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Mohanji',
        tagline: 'Boundless Love, Timeless Wisdom',
        contactEmail: 'info@mohanji.org',
        donationLinks: [
          { region: 'India',  provider: 'Razorpay', label: 'Donate (India)',  url: 'https://donate.mohanji.org/india' },
          { region: 'Europe', provider: 'Stripe',   label: 'Donate (Europe)', url: 'https://donate.mohanji.org/europe' },
          { region: 'US',     provider: 'Stripe',   label: 'Donate (US)',     url: 'https://donate.mohanji.org/us' },
          { region: 'Global', provider: 'PayPal',   label: 'Donate (Global)', url: 'https://www.paypal.com/donate/?hosted_button_id=mohanji' },
        ],
      },
    })
    console.log('   ✓ SiteSettings seeded')

    // ── 5. Seed pages (idempotent — skips if already exists) ────────────────
    console.log('📄 Seeding pages...')
    await seedIfNeeded(payload)
    console.log('   ✓ Pages seeded')

    // ── 6. Seed meditations listing page ────────────────────────────────────
    console.log('🧘 Seeding meditations listing page...')
    const { docs: existingMedPage } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'meditations-listing' } },
      limit: 1,
    })
    if (existingMedPage.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Free Guided Meditations',
          slug: 'meditations',
          pageType: 'meditations-listing',
          status: 'published',
          meditationsListingContent: {
            heroTitle: 'FREE GUIDED MEDITATIONS',
            heroSubtitle: 'Eight meditations, translated into many languages, helping hundreds of thousands of people around the world to cleanse, heal and raise awareness.',
            brochureUrl: 'https://mohanji.org/wp-content/uploads/2026/04/Free-Guided-Meditations-Brochure.pdf',
            introText: "Mohanji's transformative free guided meditations play a significant role in creating a better daily life. Simply download them from their respective links, find a quiet space to sit, relax with the soothing background meditation music and let yourself be guided.",
            ctaHeading: 'Deepen Your Practice',
            ctaText: 'Join a live retreat or course to experience these meditations with Mohanji in person.',
          },
        } as any,
      })
      console.log('   ✓ Meditations listing page created')
    } else {
      console.log('   ✓ Meditations listing page already exists — skipping')
    }

    // ── 7. Seed practices listing page ──────────────────────────────────────
    console.log('🧘 Seeding practices listing page...')
    const { docs: existingPracPage } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'practices-listing' } },
      limit: 1,
    })
    if (existingPracPage.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Spiritual Practices',
          slug: 'practices',
          pageType: 'practices-listing',
          status: 'published',
          practicesListingContent: {
            heroTitle: 'SPIRITUAL PRACTICES',
            heroSubtitle: 'Transformative tools for inner growth — grounded in ancient wisdom and accessible to all who seek.',
            introText: "Mohanji offers a rich array of spiritual practices, each designed to address specific aspects of human suffering and liberation. From powerful energy transmissions and healing methods to movement-based practices and daily techniques, these tools meet you exactly where you are.",
            ctaHeading: 'Deepen Your Practice',
            ctaText: 'Complement your practice with Mohanji\'s free guided meditations — available in multiple languages and ready to download.',
            ctaLinkLabel: 'Explore Meditations',
            ctaLinkUrl: '/meditations',
          },
        } as any,
      })
      console.log('   ✓ Practices listing page created')
    } else {
      console.log('   ✓ Practices listing page already exists — skipping')
    }

    // ── 8. Seed Mai-Tri Method page ──────────────────────────────────────────
    console.log('🌟 Seeding Mai-Tri Method page...')
    const { docs: existingMaiTri } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'mai-tri-method' } },
      limit: 1,
    })
    if (existingMaiTri.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Mai-Tri Method',
          slug: 'mai-tri-method',
          pageType: 'mai-tri-method',
          status: 'published',
          maiTriContent: {
            heroTitle: 'Mai-Tri Method',
            heroSubtitle: 'Align and heal your body, mind and spirit. A profound method of deep cleansing and harmonizing — removing blockages even from the subtlest layer of existence.',
            applyNowUrl: '/practices/mai-tri-method/apply',
            introText: "Mai-Tri Method is a profound method of deep cleansing and harmonizing in which deep-seated subconscious blockages are removed, even from the subtlest layer of our existence — the causal body — where seeds of karmic impressions are stored. While the cleansing reaches deep into the energy records, it is important to note that Mai-Tri Method does not interfere with the destiny aspect of karma (as this is what has been chosen at the soul level, be it pleasant or unpleasant to our mind).\n\nMai-Tri Method, for the practitioner, is meditation with a purpose. Through extreme concentration (Dharana) during the process, the practitioner reaches the meditative state (Dhyana), where there is no existence of the practitioner as such and he/she only operates as the pure conduit to carry the energy flowing through Mohanji's consciousness, from the Source itself. This enables the healing to happen, depending on the karmic allowance and the client's receptivity and free will. Hence Mai-Tri is a Meditation with purpose and is a sadhana (spiritual practice) for a practitioner.",
            meaningText: "The actual word meaning of \"Mai-tri\" is friendship, companionship, collaboration, or simply togetherness. \"Mai\" means mother. The word mother represents unconditional love, protection, care, consistency of emotions, continuity, life, creation. Mother also represents levitation, as in the womb experience. A child finds solace, comfort, freedom and peace in the company of its mother. The sheer presence of mother is itself healing for the child. Motherhood has spontaneous healing impacts on the child.\n\n\"Tri\" represents trinity. The three aspects of creation are BIRTH, LIFE and DEATH. Trinity also represents the three powers — Will Power, Knowledge Power, and Power of Action. Hence, the word tri represents all aspects of existence. When the pure and eternal energy source combines with the power of will for creation, LIFE happens.",
            mohanjiQuote: "Healing is a part of creation. Healing, revitalization and rejuvenation are aspects deeply connected to the very fabric of terrestrial existence. Healing happens automatically, as long as the mind does not prevent it. Spontaneous healing takes place when we allow nature to function without interruption. Healers are just intenders. They intend that healing takes place. The receiver allows it to happen. We all are natural healers; every man, woman and child naturally possess the capacity to heal themselves.",
            benefitsIntro: 'This method leads to self-healing and restoration of inner balance at all levels. There are three parts to every Mai-Tri session, each with a distinct benefit:',
            benefits: [
              { benefit: 'Cleansing of the painful impressions and memories and their effects gathered in the present life, starting with early childhood.' },
              { benefit: 'Cleansing of the impressions of the past from the subconscious mind.' },
              { benefit: 'Cleansing of the central meridian in order to remove blockages and improve the flow of energy through it.' },
            ],
            benefitsExtra: "As these deep patterns get released, clarity at the level of the mind ensues. The recipient is empowered to become aware of the key impressions causing imbalances, and to understand which unhealthy habits, behavioural and thought patterns need changing. After the practice, when a lot of weight from deep within has dropped, one enters the mode of alignment and self-healing at the level of body, mind and spirit.",
            individualSessionText: "Individual sessions are 30 minutes long. The overall meeting is up to one hour, including explanations and experience sharing. Practitioners place their palms on the recipient's chakras (energy centres) from the front and back of the body, serving as a pure conduit for Mohanji's energy.",
            groupSessionText: "Group sessions are conducted only by selected senior Mai-Tri practitioners. They can be done in-person or online, with invocation of Mohanji's subtle presence for protection and effectiveness. There is no hand-to-chakra application — only energy work based on verbal guidance. Group energy during these sessions is very strong and the cleansing processes are deep.",
            energyExchangeText: "The honoring of energy exchange is an important aspect of the Mai-Tri Method. Half of the amount that Mai-Tri Practitioners receive is allocated to feeding people and other sentient beings in need. Satiating the hunger of another being through selfless service adds to the depth of the cleansing and balancing effect of the Mai-Tri Method. The amount exchanged needs to be confirmed with the selected Mai-Tri practitioner directly.",
            faqs: [
              {
                question: 'What is Mai-Tri Method?',
                answer: 'Mai-Tri Method is a profound method of deep cleansing and harmonizing in which deep-seated subconscious blockages are removed, even from the subtlest layer of our existence — the causal body — where seeds of karmic impressions are stored. While the cleansing reaches deep into the energy records, it is important to note that Mai-Tri Method does not interfere with the destiny aspect of karma.',
              },
              {
                question: 'Who can perform Mai-Tri Method?',
                answer: "The Mai-Tri Method is performed by initiated Practitioners who connect with the consciousness of Mohanji, passing on the energy through their palms to the recipient's chakras (energy centers) from the front and the back side of the body.",
              },
              {
                question: 'Who can experience Mai-Tri Method?',
                answer: 'The Mai-Tri Method can be experienced by individuals of all age groups — from small children (5 years of age and above) to senior citizens, in any state of health. For pregnant ladies and children, Mai-Tri is milder and is done primarily for health purposes, rejuvenation and protection.',
              },
              {
                question: 'How long is a session?',
                answer: 'Individual sessions are 30 minutes long. On the whole, the meeting is up to one hour long, including explanations and experience sharing. Group sessions can be from 60 to 90 minutes long.',
              },
              {
                question: 'Can Mai-Tri be done online?',
                answer: "Yes. Group sessions can be done in person or online, with invocation of Mohanji's subtle presence for protection and effectiveness. There is no hand-to-chakra application in group online sessions — only energy work based on verbal guidance.",
              },
              {
                question: 'What is the energy exchange?',
                answer: 'The honoring of energy exchange is an important aspect of the Mai-Tri Method. Half of the amount that Mai-Tri Practitioners receive is allocated to feeding of people and other sentient beings in need. Satiating the hunger of another being through selfless service adds to the depth of the cleansing and balancing effect. The amount is to be confirmed with the selected practitioner directly.',
              },
            ],
            testimonials: [
              {
                quote: "As a Mai-Tri practitioner, I was a witness to many amazing miracles. We are so blessed to be connected to Mohanji and to be given this platform to serve. I have felt my faith and surrender grow exponentially since I was initiated into the Mai-Tri Method. My connection to Mohanji's consciousness has become deeper.",
                name: 'Tina Arya',
                location: 'USA',
              },
              {
                quote: 'Mai-Tri is a soul impressions release system which acts on the deepest layer of our karmic and ancestral impression, the DNA and the neuron, to deliver an "impression-free soul" that can ultimately merge as an energy with the highest consciousness, when the time comes.',
                name: 'Subhasree',
                location: 'UK',
              },
              {
                quote: "The Grace that flows during a Mai-Tri session transcends healing — it reaches one's very essence, invoking the sacred inner balance already gifted to each of us by the Source. Love is the path and destination. May we experience a lasting inner transformation through that Love.",
                name: 'Devi Mohan',
                location: 'Slovenia',
              },
            ],
            bookingText: 'If you would like to book a Mai-Tri session or have any additional questions, please complete the form below and we will connect you with a practitioner in your region.',
            bookingFormEmail: 'info@mohanji.org',
          },
        } as any,
      })
      console.log('   ✓ Mai-Tri Method page created')
    } else {
      console.log('   ✓ Mai-Tri Method page already exists — skipping')
    }

    // ── 9. Seed Traditional Yoga (HSTY) page ────────────────────────────────
    console.log('🧘 Seeding Traditional Yoga page...')
    const { docs: existingTradYoga } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'traditional-yoga' } },
      limit: 1,
    })
    if (existingTradYoga.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Himalayan School of Traditional Yoga',
          slug: 'traditional-yoga',
          pageType: 'traditional-yoga',
          status: 'published',
          traditionalYogaContent: {
            heroTitle: 'Himalayan School Of Traditional Yoga',
            tagline: 'Yoga is the science of staying liberated, through conscious connection with oneself, maintaining sensitivity, fluidity and flexibility',
            introText: "Himalayan School of Traditional Yoga (HSTY) is dedicated to propagating traditional yoga, i.e. the essence of yoga as per the original teachings codified in the scriptures by Maharishi Patanjali. Set up under the inspiration and guidance of Mohanji, HSTY's mission is to promote a culture of yoga and make it accessible to all of mankind, beyond boundaries of country, religion, gender, class and wealth.",
            whySectionTitle: 'Why Himalayan School Of Traditional Yoga?',
            whySectionText: "HSTY offers authentic yoga rooted in the Patanjali tradition — not just postures, but a complete path of living. Our teachers are trained to transmit the full depth of yoga philosophy alongside the physical practice.\n\nEvery program at HSTY is designed to take you beyond the physical, into the subtler dimensions of breath, energy, and awareness. Rooted in tradition yet practical for modern life.\n\nThrough individual and group programs, HSTY serves seekers across the world, offering tools for sustained wellbeing, inner balance, and spiritual growth — accessible to everyone regardless of background or ability.",
            programs: [
              { text: 'Yoga Teacher Training — A comprehensive residential program rooted in classical yoga, covering asana, pranayama, philosophy, meditation, and teaching methodology.' },
              { text: 'Wellness Retreats — Immersive programs combining traditional yoga, meditation, and conscious living practices in serene natural settings.' },
              { text: 'Online Programs — Live and recorded courses bringing traditional yoga teachings to practitioners worldwide, with direct teacher guidance.' },
              { text: "Children's Yoga — Age-appropriate programs introducing children to yoga's physical, mental, and ethical dimensions through play and awareness." },
            ],
            visitUsUrl: 'https://himalayanschool.com/yoga',
            visitUsLabel: 'Visit Us',
          },
        } as any,
      })
      console.log('   ✓ Traditional Yoga page created')
    } else {
      console.log('   ✓ Traditional Yoga page already exists — skipping')
    }

    // ── 10. Seed Awakening Yoga Nidra page ──────────────────────────────────
    console.log('🧘 Seeding Awakening Yoga Nidra page...')
    const { docs: existingAYN } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'awakening-yoga-nidra' } },
      limit: 1,
    })
    if (existingAYN.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Awakening Yoga Nidra Meditation',
          slug: 'awakening-yoga-nidra',
          pageType: 'awakening-yoga-nidra',
          status: 'published',
          awakeningYogaNidraContent: {
            heroTitle: 'Awakening Yoga Nidra Meditation',
            tagline: 'Experience deep gratitude, inner richness and get empowered to face any challenge of life more effectively',
            introText: 'Awakening Yoga Nidra Meditation is a method guided by Mohanji and conducted by Devi Mohan. It is based on the ancient method of effective, progressive relaxation called Yoga Nidra (self-induced, conscious yogic sleep).',
            deviMohanUrl: 'https://www.devimohan.com',
            whySectionTitle: 'Why Awakening Yoga Nidra Meditation',
            whySectionText: "Yoga Nidra is a beautiful method of inner cleansing, balancing and empowerment done in the alpha, receptive state of the mind.\n\nAwakening Yoga Nidra however goes a step further than the standard guided Yoga Nidra Meditation: the Grace of Guru Tattwa (the Guru Principle within) is invoked and, as Devi connects with the higher consciousness through her spiritual guide, Mohanji, she guides the group through a process of intense inner cleansing, bringing back the memory of the Soul's journey and the Light beyond all the veils of illusion.\n\nWhat emerges from the unconscious mind during the cleansing part of the process is exactly what one is ready to face, integrate and absorb at that moment in time.\n\nLove and gratitude which are experienced are immense and are the key to the inner healing process.\n\nIt is important to note that this is not a hypnotic state, as one is partially aware that he/she is lying on the floor in Shavasana (i.e. the \"corpse pose\") and following the guidance. However, a vivid and profound inner journey is experienced through the inner senses as they are fully active in this deeply relaxed state.\n\nThe process is very intense but completely safe.\n\nAwakening Yoga Nidra can be done comfortably by people of any age group and fitness level and requires no specific preparation. After light warm up exercises of Traditional Yoga (HSTY), one relaxes in the comfortable lying position of Shavasana and simply follows the guidance provided.",
            hstyUrl: 'https://himalayanschool.com',
            benefitsSectionTitle: 'Benefits',
            benefitsText: "Through guided Awakening Yoga Nidra meditation one gets empowered to face any life challenges by strengthening the connection with the inner witness (sakshi bhaav), the key to our ability to rise above pain in any challenging moment of life.\n\nOther benefits include balancing of the left and right side of the brain and speeding up the process of self-healing and spiritual awakening.\n\nMost importantly, the intense inner thirst for spiritual liberation in this life is enhanced many times over!\n\nEven if one only briefly touches on the \"no-mind\" state (a timeless state devoid of thoughts), they may emerge from the Awakening Yoga Nidra session birthed into a new reality — blessed with a deep, palpable feeling of inner richness, gratitude and empowerment.",
            benefitsList: [
              { benefit: 'Sincere gratitude and calmness' },
              { benefit: 'Increased awareness' },
              { benefit: 'Integration with the Self' },
            ],
            ctaLabel: 'Contact Us',
            ctaUrl: '/contact',
          },
        } as any,
      })
      console.log('   ✓ Awakening Yoga Nidra page created')
    } else {
      console.log('   ✓ Awakening Yoga Nidra page already exists — skipping')
    }

    // ── 11. Seed Mohanji Youth Club page ────────────────────────────────────
    console.log('🌟 Seeding Mohanji Youth Club page...')
    const { docs: existingYC } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'youth-club' } },
      limit: 1,
    })
    if (existingYC.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Mohanji Youth Club',
          slug: 'youth-club',
          pageType: 'youth-club',
          status: 'published',
          youthClubContent: {
            heroTitle: 'Mohanji Youth Club',
            introText:
              "Mohanji Youth Club is a global youth network which exists to empower and inspire fellow youngsters to live authentic, positive and purpose-driven lives.\n\nIt is inspired by the work and teachings of Mohanji to 'Be good. Do Good.'\n\nWe serve as a platform for youth to break their boundaries. Our aim is to empower youth to explore and express their full potential beyond the limitations of the mind.",
            pullQuote: 'Break your boundaries !!',
            activitiesTitle: 'What We Do',
            activities: [
              {
                title: 'Educational Programs & Trainings',
                description:
                  "Youth-focused workshops, seminars, and training sessions grounded in Mohanji's teachings. Programs cover leadership, mindfulness, and conscious living to equip young people with tools for purposeful growth.",
              },
              {
                title: 'Picnics & Festivals',
                description:
                  'Joyful outdoor gatherings and cultural celebrations that bring young people together in a spirit of fun, friendship, and community. These events nurture bonds across backgrounds, cultures, and borders.',
              },
              {
                title: 'Selfless Service',
                description:
                  "Volunteering and seva (selfless service) activities — from feeding the hungry to environmental care and community support. Service is the heart of MYC, reflecting the principle of 'Be good. Do Good.'",
              },
            ],
            awardsTitle: 'MYC Awards & Areas of Interest',
            awardsText:
              'The MYC Awards recognize exceptional contributions by young members who demonstrate outstanding commitment to service, leadership, and personal development. Each year, youth clubs from around the world are celebrated for their impactful activities and initiatives that uplift communities and inspire others.',
            areasTitle: 'Areas of Interest',
            areasText:
              'Arts & Culture\nEnvironment & Sustainability\nHealth & Wellness\nEducation & Mentoring\nAnimal Welfare\nCommunity Development\nSpirituality & Inner Growth',
            eligibilityText:
              'All youngsters (aged 14-29) are welcome to join existing youth clubs and therefore join the global family-like community.',
            joinButtonLabel: 'Join the Youth Club',
            joinButtonUrl:
              'https://docs.google.com/forms/d/e/1FAIpQLSd8v541hsenk652wuQnmhjS6XyTJNmRKa-bb6i9vRdKjRZpSQ/viewform',
            brochureUrl: 'https://mohanji.org/wp-content/uploads/2026/04/MYC-Brochure.pdf',
          },
        } as any,
      })
      console.log('   ✓ Youth Club page created')
    } else {
      // Patch brochureUrl if it was missing from an earlier seed run
      const existingCms = (existingYC[0] as any)?.youthClubContent ?? {}
      if (!existingCms.brochureUrl) {
        await payload.update({
          collection: 'pages',
          id: existingYC[0].id,
          data: {
            youthClubContent: {
              ...existingCms,
              brochureUrl: 'https://mohanji.org/wp-content/uploads/2026/04/MYC-Brochure.pdf',
            },
          } as any,
        })
        console.log('   ✓ Youth Club page brochureUrl patched')
      } else {
        console.log('   ✓ Youth Club page already exists — skipping')
      }
    }

    // ── 12. Seed Volunteer page ──────────────────────────────────────────────
    console.log('🤝 Seeding Volunteer page...')
    const { docs: existingVol } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'volunteer' } },
      limit: 1,
    })
    if (existingVol.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Volunteer for a Greater Good',
          slug: 'volunteer',
          pageType: 'volunteer',
          status: 'published',
          volunteerContent: {
            heroTitle: 'Volunteer for a Greater Good',
            heroSubtitle: 'Find out about opportunities to create a better tomorrow',
            whySectionTitle: 'Why Volunteer?',
            whySectionText:
              "Giving selflessly to all beings, one's community, animals and birds, as well as serving the Earth with an attitude of gratitude is the pillar of Mohanji's teachings. Mohanji says that volunteering makes us complete only if it is done selflessly. Volunteering should become our lifestyle, then it truly becomes extremely powerful and uplifting.\n\nSocial service or selfless action of any kind gives us a chance to unhook from the accumulating dues and karmas of life and helps us live a more purposeful life.\n\nMohanji Foundation brings people together in a mission to make this world a better place. Guided by love and compassion, we strive to give our best to every living being who needs help and support, be it material, emotional or spiritual. We believe that in this way we contribute to the establishment of harmony in the society and the world.\n\nEveryone has something to give. It can be a skill (writing, translating, graphic design, video editing), a craft (knitting, embroidery), or our time, our smiles and hugs, or the willingness of our hands to pack or carry, etc. Your 'little' can mean a lot to someone! No matter how small our deeds may seem, when we do them with pure intention, their effect spreads through the entire universe.",
            pullQuote:
              'Believe in what you do, believe in volunteering, believe in being selfless, have no expectation – then, volunteering becomes your strength.',
            opportunitiesTitle: 'Current Opportunities',
            opportunities: [
              { role: 'Microsoft Azure Administrator' },
              { role: 'Digital Marketing Specialist (Podcasts)' },
              { role: 'Web Copy Writer' },
              { role: 'UI / UX Designer' },
            ],
            joinButtonLabel: 'Volunteer',
            joinButtonUrl: 'https://forms.gle/f657nFpcmZqvooMu6',
          },
        } as any,
      })
      console.log('   ✓ Volunteer page created')
    } else {
      console.log('   ✓ Volunteer page already exists — skipping')
    }

    // ── 13. Seed Events ──────────────────────────────────────────────────────
    console.log('🗓️  Seeding events...')
    const eventsToSeed = [
      // ── Upcoming ──────────────────────────────────────────────────────────
      {
        title: 'Silence with Mohanji',
        slug: 'silence-with-mohanji',
        startDate: '2026-04-16',
        displayDate: 'Every week — date varies with Mohanji\'s schedule',
        location: 'Online',
        tagline: 'A weekly 30-minute structured silence practice',
        shortDescription: 'A weekly opportunity to come together as a community and sit in silence with Mohanji, deepening inner connection through a shared practice of stillness.',
        ctaLabel: 'Join Now',
        ctaUrl: 'https://mohanji.org/register-for-silence-with-mohanji/',
        ctaExternal: true,
      },
      {
        title: 'Weekly Talk with Mohanji – Live Online Q&A Series',
        slug: 'weekly-talk-with-mohanji-live-online-qa-series',
        startDate: '2026-04-18',
        location: 'Online',
        tagline: 'Live online Q&A with Mohanji',
        shortDescription: 'Join Mohanji live for an online question and answer session. Bring your questions on spirituality, life and consciousness.',
        ctaLabel: 'Register',
        ctaUrl: '/courses',
        ctaExternal: false,
      },
      {
        title: 'Kailash with Mohanji 2026',
        slug: 'kailash-with-mohanji-2026',
        startDate: '2026-08-18',
        endDate: '2026-09-03',
        displayDate: '18 August – 3 September 2026 · Batch options available',
        location: 'Mount Kailash & Lake Manasarovar, Tibet',
        tagline: 'Dev Kumbh · Mohanji\'s Physical Presence · Sacred Kailash Pilgrimage',
        shortDescription: 'A once-in-12-years Dev Kumbh pilgrimage to Mount Kailash and Lake Manasarovar in the presence of Mohanji.',
        ctaLabel: 'Know More',
        ctaUrl: 'https://kailash.mohanji.org/',
        ctaExternal: true,
      },
      {
        title: 'Muktinath with Mohanji 2026',
        slug: 'muktinath-with-mohanji-2026',
        startDate: '2026-09-04',
        endDate: '2026-09-07',
        displayDate: '4 – 7 September 2026',
        location: 'Muktinath, Nepal',
        tagline: 'Sacred pilgrimage to Muktinath in the presence of Mohanji',
        shortDescription: 'Join Mohanji for a sacred pilgrimage to the holy shrine of Muktinath in Nepal.',
        ctaLabel: 'Find out more',
        ctaUrl: 'https://mohanji.org/events/muktinath-with-mohanji-2026/',
        ctaExternal: true,
      },
      // ── Past ──────────────────────────────────────────────────────────────
      {
        title: 'Maha Shivaratri with Mohanji 2026',
        slug: 'maha-shivaratri-with-mohanji-2026',
        startDate: '2026-02-15',
        displayDate: '15 February 2026 · 11 am EST | 5 pm CET | 9.30 pm IST',
        location: 'Online — 10 Mohanji Centres worldwide',
        tagline: 'Awakening the silence within',
        shortDescription: 'A global gathering honouring Shiva Consciousness: 20+ hours of continuous Homa, Abhishekham, and chanting across 10 Mohanji Centres worldwide.',
        ctaLabel: 'Join Now',
        ctaUrl: 'https://mohanji.org/apply-for-mahashivaratri-with-mohanji-2026',
        ctaExternal: true,
      },
      {
        title: "Mohanji's 61st Birthday Celebration",
        slug: 'mohanjis-61st-birthday-celebration',
        startDate: '2026-02-23',
        location: 'Global',
        shortDescription: "Global celebration of Mohanji's 61st birthday with satsangs, homas, and community gatherings around the world.",
        ctaLabel: 'Find out more',
        ctaUrl: 'https://mohanji.org/events/mohanjis-61st-birthday-celebration/',
        ctaExternal: true,
      },
    ]

    for (const eventData of eventsToSeed) {
      const { docs: existing } = await payload.find({
        collection: 'events',
        where: { slug: { equals: eventData.slug } },
        limit: 1,
      })
      if (existing.length === 0) {
        await payload.create({
          collection: 'events',
          data: { ...eventData, status: 'published' } as any,
        })
        console.log(`   ✓ Event "${eventData.title}" created`)
      } else {
        console.log(`   ✓ Event "${eventData.title}" already exists — skipping`)
      }
    }

    // ── 14. Seed Courses landing page ───────────────────────────────────────
    console.log('📚 Seeding Courses landing page...')
    const { docs: existingCourses } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'courses-landing' } },
      limit: 1,
    })
    if (existingCourses.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
      title: 'Courses',
      slug: 'courses',
      pageType: 'courses-landing',
      status: 'published',
      coursesLandingContent: {
        heroTagline: 'Online Courses & Workshops',
        heroTitle: 'EMPOWERED!',
        heroSubtitle: 'Make your life more purposeful. YOU CAN. Reinvent yourself. YOU CAN. Do not just let hours laze by and regret in the days ahead. Every moment is precious. It will never happen again.',
        heroCtaLabel: 'View All Courses',
        heroCtaUrl: 'https://mohanji.org/courses/',
        whatToExpectTitle: 'What to Expect',
        whatToExpectItems: [
          { title: 'Connection to Self', description: 'Gain stability and an ability to respond (and not react) to situations.' },
          { title: 'Awareness', description: 'Becoming aware of your limiting beliefs, habits and patterns.' },
          { title: 'Unhooking', description: 'Consciously unhooking from binding attachments.' },
          { title: 'Rewiring', description: 'Gaining clarity and rewiring your inner software.' },
          { title: 'Know Your Purpose', description: 'Understanding the role of purpose in leading a meaningful life and realising your full potential.' },
          { title: 'Inner Awakening', description: 'Awakening to the higher consciousness and experiencing true and lasting changes within.' },
        ],
        pathStripTitle: 'Choose Your Path',
        pathStripBody: 'Each course is carefully designed to guide you step by step — from Empowered 1.0 online recordings to the Empowered 5.0 in-person retreat with Mohanji in India.',
        courseCards: [
          {
            title: 'Empowered 1.0',
            courseType: 'Course',
            format: 'Video recording of an interactive Live Online Workshop',
            level: 'beginner',
            description: 'Begin your journey from fear to freedom. A foundational workshop connecting you with yourself through the manual of human life.',
            externalUrl: 'https://mohanji.org/courses/courses/empowered-1-0/',
          },
          {
            title: 'Empowered 2.0',
            courseType: 'Course',
            format: 'Video recording of an interactive online workshop',
            level: 'intermediate',
            description: 'Continue deepening awareness and unhooking from binding patterns — a natural progression from Empowered 1.0.',
            externalUrl: 'https://mohanji.org/courses/courses/empowered-2-0/',
          },
          {
            title: 'Empowered 3.0',
            courseType: 'Course',
            format: 'Video recording of an interactive online workshop',
            level: 'intermediate',
            description: 'Deepen your inner rewiring and gain clarity on purpose — building on the foundation of earlier Empowered levels.',
            externalUrl: 'https://mohanji.org/courses/courses/empowered-3-0/',
          },
          {
            title: 'Empowered 4.0',
            courseType: 'Course',
            format: 'Video recording of an interactive online workshop',
            level: 'advanced',
            description: 'Advanced inner work for consistent practitioners — exploring subtler dimensions of consciousness and liberation.',
            externalUrl: 'https://mohanji.org/courses/empowered-4-0/',
          },
          {
            title: 'Empowered 1.0 – 4.0',
            courseType: 'Bundle',
            format: 'Complete online workshop bundle',
            level: 'beginner',
            description: 'The complete Empowered series in one bundle — all four courses from 1.0 to 4.0 at a special combined price.',
            externalUrl: 'https://mohanji.org/courses/empowered-1-4/',
          },
        ],
        testimonialsTitle: 'What Participants Say',
        testimonials: [
          {
            quote: 'Thank you Mohanji, great learnings taking place here within me. I am so grateful for being included in this journey with you!',
            name: 'Carina Elizabeth Szabo',
            course: 'Empowered 1.0',
          },
          {
            quote: 'A very powerful event. I have the feeling like every answer is for me and cannot put the pen down, trying to write down everything.',
            name: 'Andrijana Ristovska',
            course: 'Empowered 1.0 — Macedonia',
          },
          {
            quote: 'These past four days have been such an immense blessing. So many patterns are being revealed, so many unconscious fears coming to forth. This is truly a journey within.',
            name: 'Arushi',
            course: 'Empowered 1.0 — India',
          },
        ],
        ctaTitle: 'Not Sure Where to Start?',
        ctaBody: 'Begin with Empowered 1.0 — a video recording of an interactive live online workshop that has transformed thousands of lives around the world.',
        ctaPrimaryLabel: 'Start with Empowered 1.0',
        ctaPrimaryUrl: 'https://mohanji.org/courses/courses/empowered-1-0/',
        ctaSecondaryLabel: 'Free Meditations',
        ctaSecondaryUrl: '/meditations',
      },
      } as any,
    })
      console.log('   ✓ Courses landing page created')
    } else {
      console.log('   ✓ Courses landing page already exists — skipping')
    }

    // ── 15. Add howToUse steps to all meditations (idempotent) ──────────────
    console.log('📝 Adding howToUse steps to meditations...')
    const defaultSteps = [
      { title: 'Find a Quiet Space', description: 'Sit or lie comfortably in a place where you will not be disturbed.' },
      { title: 'Use Headphones', description: 'For the best experience, listen with headphones and close your eyes.' },
      { title: 'Practise Regularly', description: 'Each session deepens the cleansing. Regular practice brings lasting transformation.' },
    ]
    const { docs: allMeditations } = await payload.find({ collection: 'meditations', limit: 50 })
    for (const med of allMeditations as any[]) {
      if (!med.howToUse || med.howToUse.length === 0) {
        await payload.update({
          collection: 'meditations',
          id: med.id,
          data: { howToUse: defaultSteps } as any,
        })
        console.log(`   ✓ howToUse added to "${med.title}"`)
      }
    }

    // ── 16. Seed News articles ──────────────────────────────────────────────
    console.log('📰 Seeding news articles...')
    const newsArticles = [
      {
        title: 'ORIGINS – World Tribal Alliance Gathering 2025, Cape Town',
        slug: 'origins-world-tribal-alliance-gathering-2025-cape-town',
        postType: 'news',
        location: 'Cape Town & !Khwa ttu, South Africa',
        publishedAt: '2025-11-10T00:00:00.000Z',
        excerpt: 'Mohanji participated in the ORIGINS – World Tribal Alliance Gathering 2025 in Cape Town, joining indigenous leaders, knowledge keepers, and change-makers from across the globe in a landmark gathering that celebrated tribal wisdom and the shared heritage of humanity.',
        status: 'published',
      },
      {
        title: 'Dr. Brahmarishi Mohanji Recognised Among the Top 100 Influential Men of the Year in Cape Town, South Africa',
        slug: 'dr-brahmarishi-mohanji-recognised-among-the-top-100-influential-men-of-the-year-in-cape-town-south-africa',
        postType: 'news',
        location: 'Cape Town, South Africa',
        publishedAt: '2025-11-09T00:00:00.000Z',
        excerpt: 'Dr. Brahmarishi Mohanji was honoured as one of the Top 100 Influential Men of the Year at a prestigious ceremony in Cape Town, recognising his decades of service to humanity, environmental conservation, and spiritual welfare across more than 100 countries.',
        status: 'published',
      },
      {
        title: 'Mohanji Graces 2025 Sumatera Utara Rally in Indonesia: A Blend of Speed, Spirit, and Spiritual Presence',
        slug: 'mohanji-graces-2025-sumatera-utara-rally-in-indonesia-a-blend-of-speed-spirit-and-spiritual-presence',
        postType: 'news',
        location: 'Parapat, North Sumatra, Indonesia',
        publishedAt: '2025-08-08T00:00:00.000Z',
        excerpt: 'Mohanji graced the 2025 Sumatera Utara Rally at Lake Toba in Indonesia — a celebration that uniquely blended the thrill of motorsport with the spirit of community and Mohanji\'s message of conscious living.',
        status: 'published',
      },
      {
        title: 'Mohanji Visited Kosovo and Metohija for the First Time as a Pilgrim',
        slug: 'mohanji-visited-kosovo-and-metohija-for-the-first-time-as-a-pilgrim',
        postType: 'news',
        location: 'Kosovo and Metohija',
        publishedAt: '2025-07-15T00:00:00.000Z',
        excerpt: 'In a deeply significant journey, Mohanji visited Kosovo and Metohija as a pilgrim for the first time, connecting with the ancient spiritual heritage of the land, meeting local community leaders, and honouring the sacred sites of this historically rich region.',
        status: 'published',
      },
      {
        title: 'Mohanji and Devi Met with Her Excellency Namrata S. Kumar, Indian Ambassador to Slovenia',
        slug: 'mohanji-and-devi-met-with-her-excellency-namrata-s-kumar-indian-ambassador-to-slovenia',
        postType: 'news',
        location: 'Ljubljana, Slovenia',
        publishedAt: '2025-06-20T00:00:00.000Z',
        excerpt: 'Mohanji and Devi had a warm and meaningful meeting with Her Excellency Namrata S. Kumar, the Indian Ambassador to Slovenia, discussing the global activities of the Mohanji Foundation, cultural diplomacy, and opportunities for deeper India-Slovenia cooperation.',
        status: 'published',
      },
      {
        title: 'Mohanji in the United Kingdom: A Landmark Gathering of Consciousness',
        slug: 'mohanji-in-the-united-kingdom-a-landmark-gathering',
        postType: 'news',
        location: 'United Kingdom',
        publishedAt: '2025-11-16T00:00:00.000Z',
        excerpt: "Mohanji's visit to the United Kingdom brought together hundreds of seekers, practitioners, and well-wishers for a profound gathering rooted in love, awareness, and the timeless teachings of the Tradition.",
        status: 'published',
      },
      {
        title: 'Mohanji Foundation and Ammucare At The Historic Mahamagham Mahotsav 2026',
        slug: 'mohanji-foundation-ammucare-mahamagham-mahotsav-2026',
        postType: 'news',
        location: 'Kerala, India',
        publishedAt: '2026-02-03T00:00:00.000Z',
        excerpt: 'Mohanji Foundation and Ammucare participated in the historic Mahamagham Mahotsav 2026 in Kerala, one of the most sacred and rarely occurring Hindu festivals, serving pilgrims and sharing the message of conscious living and compassion.',
        status: 'published',
      },
    ]

    for (const article of newsArticles) {
      const { docs: existing } = await payload.find({
        collection: 'posts',
        where: { slug: { equals: article.slug } },
        limit: 1,
      })
      if (existing.length === 0) {
        await payload.create({ collection: 'posts', data: article as any })
        console.log(`   ✓ News article created: "${article.title.substring(0, 55)}..."`)
      } else {
        console.log(`   ✓ News article already exists — skipping: "${article.title.substring(0, 45)}..."`)
      }
    }

    // ── 17. Seed Press Coverage articles ────────────────────────────────────

    console.log('📰 Seeding press coverage articles...')
    const pressArticles = [
      {
        title: 'Mohanji – Self-Discovery as the Most Mysterious and Most Joyful Process',
        slug: 'mohanji-self-discovery-as-the-most-mysterious-and-most-joyful-process',
        postType: 'press-coverage',
        publicationName: 'The Times of Russia',
        mediaType: 'interview',
        publishedAt: '2026-03-23T00:00:00.000Z',
        excerpt: 'A philosophical interview with Mohanji in The Times of Russia, exploring self-discovery as the most mysterious and joyful process available to every human being.',
        externalUrl: 'https://thetimesofrussia.com/culture/mohanji-self-discovery-as-the-most-mysterious-and-most-joyful-process/',
        status: 'published',
      },
      {
        title: "Veganism and Future of Humanity: Mohanji's Insights on News 18 on World Vegan Day",
        slug: 'veganism-and-future-of-humanity-mohanjis-insights-on-news-18-on-world-vegan-day',
        postType: 'press-coverage',
        publicationName: 'News 18',
        mediaType: 'tv-coverage',
        publishedAt: '2025-10-31T00:00:00.000Z',
        excerpt: 'On World Vegan Day, Mohanji shares his insights on veganism as a culture and lifestyle — not just a diet — and its profound implications for the future of humanity.',
        externalUrl: 'https://mohanji.org/press/veganism-and-future-of-humanity-mohanjis-insights-on-news-18-on-world-vegan-day/',
        status: 'published',
      },
      {
        title: 'PMC Channel: The PMC Show Podcast with Mohanji',
        slug: 'pmc-channel-the-pmc-show-podcast',
        postType: 'press-coverage',
        publicationName: 'PMC Channel',
        mediaType: 'podcast',
        publishedAt: '2025-09-26T00:00:00.000Z',
        excerpt: 'Mohanji joins The PMC Show for an in-depth conversation on spiritual journey, self-belief, root cause of violence, sacred balance in relationships, and breaking free from karmic patterns.',
        externalUrl: 'https://mohanji.org/press/pmc-channel-the-pmc-show-podcast/',
        status: 'published',
      },
      {
        title: 'Mohanji Joins Rangoli Sharma on Speaking Tree – English',
        slug: 'mohanji-joins-rangoli-sharma-on-speaking-tree-english',
        postType: 'press-coverage',
        publicationName: 'Speaking Tree',
        mediaType: 'podcast',
        publishedAt: '2025-10-10T00:00:00.000Z',
        excerpt: 'Mohanji discusses ancestral karma, karmic curses, karmic healing, soul contracts, past life energies, and spiritual inheritance in this enlightening podcast with Rangoli Sharma.',
        externalUrl: 'https://mohanji.org/press/mohanji-joins-rangoli-sharma-on-speaking-tree-english/',
        status: 'published',
      },
      {
        title: 'Janam TV Coverage on Surya Kaladi Mana',
        slug: 'janam-tv-coverages-on-surya-kaladi-mana',
        postType: 'press-coverage',
        publicationName: 'Janam TV',
        mediaType: 'tv-coverage',
        publishedAt: '2025-08-27T00:00:00.000Z',
        excerpt: "Janam TV's coverage of Mohanji's visit to Surya Kaladi Mana, capturing the sacred atmosphere and spiritual significance of the occasion.",
        externalUrl: 'https://mohanji.org/press/janam-tv-coverages-on-surya-kaladi-mana/',
        status: 'published',
      },
      {
        title: 'Mohanji Honoured with Humanitarian Award by Sivananda World Peace Foundation, South Africa',
        slug: 'mohanji-honoured-with-humanitarian-award-by-sivananda-world-peace-foundation-south-africa',
        postType: 'press-coverage',
        publicationName: 'PTI News',
        mediaType: 'press-release',
        publishedAt: '2024-09-27T00:00:00.000Z',
        excerpt: 'Mohanji received a prestigious humanitarian award from the Sivananda World Peace Foundation in South Africa, honouring his decades of service to humanity, nature, and animal welfare.',
        externalUrl: 'https://mohanji.org/news/mohanji-honoured-with-humanitarian-award-by-sivananda-world-peace-foundation-south-africa/',
        status: 'published',
      },
      {
        title: "Mohanji – The Man Behind the Movement",
        slug: 'mohanji-the-man-behind-the-movement',
        postType: 'press-coverage',
        publicationName: '',
        mediaType: 'article',
        publishedAt: '2025-11-05T00:00:00.000Z',
        excerpt: "An in-depth profile of Mohanji's journey from corporate professional to spiritual humanitarian — the story of the man behind a global movement.",
        externalUrl: 'https://mohanji.org/press/mohanji-the-man-behind-the-movement/',
        status: 'published',
      },
      {
        title: 'Pacific University Honours Mohanji with Honorary Doctorate Degree',
        slug: 'pacific-university-honours-mohanji-with-hon-doctorate-degree-dainik-bhaskar',
        postType: 'press-coverage',
        publicationName: 'Dainik Bhaskar',
        mediaType: 'article',
        publishedAt: '2024-06-01T00:00:00.000Z',
        excerpt: 'Pacific University conferred an honorary doctorate upon Mohanji in recognition of his lifetime contribution to humanity, spirituality, and global service.',
        externalUrl: 'https://mohanji.org/press/pacific-university-honours-mohanji-with-hon-doctorate-degree-dainik-bhaskar/',
        status: 'published',
      },
    ]

    for (const article of pressArticles) {
      const { docs: existing } = await payload.find({
        collection: 'posts',
        where: { slug: { equals: article.slug } },
        limit: 1,
      })
      if (existing.length === 0) {
        await payload.create({ collection: 'posts', data: article as any })
        console.log(`   ✓ Press article created: "${article.title.substring(0, 60)}..."`)
      } else {
        console.log(`   ✓ Press article already exists — skipping: "${article.title.substring(0, 50)}..."`)
      }
    }

    // ── 17. Seed Media landing page ──────────────────────────────────────────
    console.log('🎙️ Seeding Media landing page...')
    const { docs: existingMedia } = await payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'media-landing' } },
      limit: 1,
    })
    if (existingMedia.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Media',
          slug: 'media',
          pageType: 'media-landing',
          status: 'published',
          mediaLandingContent: {
            podcastSectionTitle: 'Podcasts',
            podcastSectionSubtitle: "Listen to Mohanji's teachings, Q&A sessions, and spiritual conversations — play directly on this page.",
            podbeanChannelUrl: 'https://mohanji.podbean.com',
            // NOTE: Add real Podbean episode embed codes via /admin → Pages → Media → Podcast Episodes
            podcasts: [
              {
                title: 'PMC Show — Spiritual Journey with Mohanji',
                description: 'Mohanji joins The PMC Show for an in-depth conversation on spiritual journey, self-belief, root cause of violence, sacred balance in relationships, and breaking free from karmic patterns.',
                embedCode: '',
              },
              {
                title: 'Speaking Tree — Ancestral Karma & Healing',
                description: 'Mohanji discusses ancestral karma, karmic healing, soul contracts, past life energies, and spiritual inheritance in this enlightening podcast with Rangoli Sharma.',
                embedCode: '',
              },
              {
                title: 'Podcast with Ginu Divakaran',
                description: "An intimate conversation exploring Mohanji's teachings on consciousness, liberation, and the path to unconditional love.",
                embedCode: '',
              },
            ],
            videoSectionTitle: 'Videos',
            videoSectionSubtitle: 'Watch selected videos from the official Mohanji Foundation YouTube channel.',
            youtubeChannelUrl: 'https://www.youtube.com/@MohanjiFoundation',
            // NOTE: Add real YouTube embed codes via /admin → Pages → Media → Featured Videos
            // Get embed code from: YouTube video → Share → Embed → copy the iframe HTML
            videos: [
              {
                title: "Who is Mohanji?",
                description: "An introduction to Mohanji — his life, mission, and the global movement he has inspired across 100+ countries.",
                embedCode: '',
              },
              {
                title: 'Mohanji on Conscious Living',
                description: 'Mohanji shares his insights on what it means to live consciously — with awareness, compassion, and a deep connection to nature.',
                embedCode: '',
              },
              {
                title: "Mohanji's Message of Love",
                description: "Mohanji speaks on unconditional love, non-violence, and the path to a life of purpose and freedom.",
                embedCode: '',
              },
            ],
          },
        } as any,
      })
      console.log('   ✓ Media landing page created')
    } else {
      console.log('   ✓ Media landing page already exists — skipping')
    }

    // ── 18. Seed Books ────────────────────────────────────────────────────────
    console.log('📚 Seeding books...')
    const booksToSeed = [
      {
        title: 'The Maha Yoga Sutras of Mohanji',
        slug: 'the-maha-yoga-sutras-of-mohanji',
        bookType: 'biography',
        author: 'Mohanji',
        publishedYear: 2020,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B08BNGFCRW',
      },
      {
        title: 'Guru Leela Volume I: In the Company of the Divine',
        slug: 'guru-leela-volume-i',
        bookType: 'biography',
        series: 'Guru Leela Series',
        author: 'Mohanji',
        publishedYear: 2018,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B07MBFYWJB',
      },
      {
        title: 'Guru Leela Volume II: Awakening',
        slug: 'guru-leela-volume-ii',
        bookType: 'biography',
        series: 'Guru Leela Series',
        author: 'Mohanji',
        publishedYear: 2019,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B07P74M9GS',
      },
      {
        title: 'Guru Leela Volume III: The Silence Beyond',
        slug: 'guru-leela-volume-iii',
        bookType: 'biography',
        series: 'Guru Leela Series',
        author: 'Mohanji',
        publishedYear: 2020,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B08CWF6TXY',
      },
      {
        title: 'Mind: The Ultimate Miracle',
        slug: 'mind-the-ultimate-miracle',
        bookType: 'coffee-table',
        author: 'Mohanji',
        publishedYear: 2017,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B074B7ZNQ8',
      },
      {
        title: 'Success: The Right Way',
        slug: 'success-the-right-way',
        bookType: 'coffee-table',
        author: 'Mohanji',
        publishedYear: 2017,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B074B7VSV6',
      },
      {
        title: 'Truth: The Life Divine',
        slug: 'truth-the-life-divine',
        bookType: 'coffee-table',
        author: 'Mohanji',
        publishedYear: 2018,
        language: 'English',
        purchaseUrl: 'https://www.amazon.com/dp/B07DDHBMPC',
      },
      {
        title: 'Jagat Mitra: The Friend of the World',
        slug: 'jagat-mitra-the-friend-of-the-world',
        bookType: 'coffee-table',
        author: 'Mohanji',
        publishedYear: 2022,
        language: 'English',
        purchaseUrl: 'https://mohanji.org/book/',
      },
      {
        title: 'In the Lotus of the Heart',
        slug: 'in-the-lotus-of-the-heart',
        bookType: 'children',
        author: 'Mohanji',
        publishedYear: 2019,
        language: 'English',
        purchaseUrl: 'https://mohanji.org/book/',
      },
      {
        title: "Mohanji's Little Book of Love",
        slug: 'mohanjis-little-book-of-love',
        bookType: 'children',
        author: 'Mohanji',
        publishedYear: 2020,
        language: 'English',
        purchaseUrl: 'https://mohanji.org/book/',
      },
    ]
    // Regional store links for books that support multi-country purchase
    const guruLeelaI_storeLinks = [
      { platform: 'United States',  url: 'https://www.amazon.com/dp/B07MBFYWJB' },
      { platform: 'United Kingdom', url: 'https://www.amazon.co.uk/dp/B07MBFYWJB' },
      { platform: 'Germany',        url: 'https://www.amazon.de/dp/B07MBFYWJB' },
      { platform: 'France',         url: 'https://www.amazon.fr/dp/B07MBFYWJB' },
      { platform: 'Spain',          url: 'https://www.amazon.es/dp/B07MBFYWJB' },
      { platform: 'Italy',          url: 'https://www.amazon.it/dp/B07MBFYWJB' },
      { platform: 'Canada',         url: 'https://www.amazon.ca/dp/B07MBFYWJB' },
      { platform: 'Australia',      url: 'https://www.amazon.com.au/dp/B07MBFYWJB' },
      { platform: 'India',          url: 'https://www.amazon.in/dp/B07MBFYWJB' },
    ]
    const storeLinksMap: Record<string, any[]> = {
      'guru-leela-volume-i': guruLeelaI_storeLinks,
    }

    for (const book of booksToSeed) {
      const extraLinks = storeLinksMap[book.slug]
      const bookData = extraLinks ? { ...book, storeLinks: extraLinks } : book
      const { docs: existing } = await payload.find({
        collection: 'books',
        where: { slug: { equals: book.slug } },
        limit: 1,
      })
      if (existing.length === 0) {
        await payload.create({ collection: 'books', data: bookData as any })
        console.log(`   ✓ Book created: "${book.title}"`)
      } else if (extraLinks) {
        // Update storeLinks on books that have multi-country links
        await payload.update({
          collection: 'books',
          id: (existing[0] as any).id,
          data: { storeLinks: extraLinks } as any,
        })
        console.log(`   ✓ Book updated storeLinks: "${book.title}"`)
      } else {
        console.log(`   ✓ Book already exists — skipping: "${book.title}"`)
      }
    }

    // ── 19. Seed Audio albums ─────────────────────────────────────────────────
    console.log('🎵 Seeding audio albums...')
    const audiosToSeed = [
      {
        title: 'Shiva Chants by Mohanji',
        slug: 'shiva-chants-by-mohanji',
        audioType: 'chant',
        duration: '~60 min',
        tracks: [
          { title: 'Om Namah Shivaaya (21 Times)', duration: '~8:00' },
          { title: 'Om Namah Shivaya Shivaya Namaha Om (21 Times)', duration: '~7:00' },
          { title: 'Maha Mrityunjaya Mantra (21 Times)', duration: '~9:00' },
          { title: 'Bilvashtakam', duration: '~6:00' },
          { title: 'Kashi Vishwanathashtakam', duration: '~7:00' },
          { title: 'Lingashtakam', duration: '~6:00' },
          { title: 'Shivashtakam', duration: '~8:00' },
          { title: 'Shiva Panchakshara Stotram', duration: '~9:00' },
        ],
        storeLinks: [
          { platform: 'Spotify',       url: 'https://open.spotify.com/album/40jnV79snB9tEIJxqO7xxC',                                    label: 'Spotify' },
          { platform: 'Amazon Music',  url: 'http://www.amazon.com/gp/product/B08KSXGNNR/?tag=distrokid06-20',                           label: 'Amazon Music' },
          { platform: 'Apple Music',   url: 'https://music.apple.com/us/album/shiva-chants/1534327539?uo=4&app=music',                    label: 'Apple Music' },
          { platform: 'iTunes',        url: 'https://music.apple.com/us/album/shiva-chants/1534327539?uo=4&app=itunes',                   label: 'iTunes' },
          { platform: 'YouTube Music', url: 'https://music.youtube.com/search?q=Shiva+Chants+Mohanji',                                   label: 'YouTube Music' },
        ],
      },
      {
        title: 'Siva Kavacham',
        slug: 'siva-kavacham',
        audioType: 'chant',
        duration: '47 min',
        tracks: [
          { title: 'Siva Kavacham Part 1', duration: '24:00' },
          { title: 'Siva Kavacham Part 2', duration: '23:00' },
        ],
        storeLinks: [
          { platform: 'Amazon Music', url: 'https://www.amazon.com/dp/B00X5YQKW0', label: 'Amazon Music' },
          { platform: 'Spotify',      url: 'https://open.spotify.com/search/Siva%20Kavacham%20Mohanji', label: 'Spotify' },
        ],
      },
      {
        title: 'Devi Kavacham',
        slug: 'devi-kavacham',
        audioType: 'chant',
        duration: '52 min',
        tracks: [
          { title: 'Devi Kavacham Part 1', duration: '26:00' },
          { title: 'Devi Kavacham Part 2', duration: '26:00' },
        ],
        storeLinks: [
          { platform: 'Amazon Music', url: 'https://www.amazon.com/dp/B00X5YRMBS', label: 'Amazon Music' },
          { platform: 'Spotify',      url: 'https://open.spotify.com/search/Devi%20Kavacham%20Mohanji', label: 'Spotify' },
        ],
      },
      {
        title: 'Nonstop Chants',
        slug: 'nonstop-chants',
        audioType: 'chant',
        duration: '60 min',
        tracks: [
          { title: 'Om Namah Shivaya', duration: '20:00' },
          { title: 'Hare Rama Hare Krishna', duration: '20:00' },
          { title: 'Om Namo Narayanaya', duration: '20:00' },
        ],
        storeLinks: [
          { platform: 'Amazon Music', url: 'https://mohanji.org/store/', label: 'Amazon Music' },
          { platform: 'Spotify',      url: 'https://mohanji.org/store/', label: 'Spotify' },
        ],
      },
      {
        title: 'Ashtothari',
        slug: 'ashtothari',
        audioType: 'mantra',
        duration: '30 min',
        tracks: [
          { title: 'Shiva Ashtothari Namavali', duration: '15:00' },
          { title: 'Devi Ashtothari Namavali', duration: '15:00' },
        ],
        storeLinks: [
          { platform: 'Amazon Music', url: 'https://mohanji.org/store/', label: 'Amazon Music' },
          { platform: 'Spotify',      url: 'https://mohanji.org/store/', label: 'Spotify' },
        ],
      },
      {
        title: 'Mohanji Nithya Praarthana',
        slug: 'mohanji-nithya-praarthana',
        audioType: 'prayer',
        duration: '25 min',
        tracks: [
          { title: 'Morning Prayer (Prabhaata Smaranam)', duration: '8:30' },
          { title: 'Evening Prayer (Sandhya Vandanam)', duration: '8:00' },
          { title: 'Bedtime Prayer (Shayana Praarthana)', duration: '8:30' },
        ],
        storeLinks: [
          { platform: 'Amazon Music', url: 'https://mohanji.org/store/', label: 'Amazon Music' },
          { platform: 'Spotify',      url: 'https://mohanji.org/store/', label: 'Spotify' },
        ],
      },
    ]
    for (const audio of audiosToSeed) {
      const { docs: existing } = await payload.find({
        collection: 'audios',
        where: { slug: { equals: audio.slug } },
        limit: 1,
      })
      if (existing.length === 0) {
        await payload.create({ collection: 'audios', data: audio as any })
        console.log(`   ✓ Audio created: "${audio.title}"`)
      } else {
        // Update storeLinks + tracks if the record already exists (idempotent upsert)
        await payload.update({
          collection: 'audios',
          id: (existing[0] as any).id,
          data: { storeLinks: audio.storeLinks, tracks: audio.tracks } as any,
        })
        console.log(`   ✓ Audio updated storeLinks/tracks: "${audio.title}"`)
      }
    }

    console.log('')
    const appUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    console.log('✅ Seed complete!')
    console.log('   Admin:    admin@mohanji.org')
    console.log('   Password: Mohanji@20')
    console.log(`   Admin UI: ${appUrl}/admin`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()
