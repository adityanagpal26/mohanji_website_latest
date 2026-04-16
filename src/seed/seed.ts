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
              { label: 'Empowered 1.0', link: '/courses/empowered-1-0' },
              { label: 'Empowered 2.0', link: '/courses/empowered-2-0' },
              { label: 'Empowered 3.0', link: '/courses/empowered-3-0' },
              { label: 'Empowered 4.0', link: '/courses/empowered-4-0' },
              { label: 'Empowered 5.0', link: '/courses/empowered-5-0' },
              { label: 'Mastery Program', link: '/courses/mastery' },
            ],
          },
          {
            label: 'Media',
            link: '/media',
            children: [
              { label: 'Blogs', link: '/blog' },
              { label: 'News', link: '/news' },
              { label: 'Press Coverage', link: '/news/press-coverage' },
              { label: 'Podcast', link: '/media#podcast' },
              { label: 'Videos', link: '/media#videos' },
            ],
          },
          { label: 'Store', link: '/store', openInNewTab: true },
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

    // ── 10. Add howToUse steps to all meditations (idempotent) ──────────────
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
