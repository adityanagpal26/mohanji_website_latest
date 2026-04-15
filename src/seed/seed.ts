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

  const payload = await getPayload({ config })

  try {
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

    console.log('')
    console.log('✅ Seed complete!')
    console.log('   Admin:    admin@mohanji.org')
    console.log('   Password: Mohanji@20')
    console.log('   Admin UI: http://localhost:3000/admin')

    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()
