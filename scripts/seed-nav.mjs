import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const payload = await getPayload({ config })

await payload.updateGlobal({
  slug: 'header',
  data: {
    navItems: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about/who-is-mohanji', children: [
        { label: 'Who is Mohanji', link: '/about/who-is-mohanji' },
        { label: 'Mohanji Foundation', link: '/about/foundation' },
        { label: "Mohanji's Life Journey", link: '/about/life-journey' },
        { label: 'Global Council', link: '/about/global-council' },
        { label: 'Acharyas', link: '/about/acharyas' },
        { label: 'Mohanji Spaces', link: '/about/spaces' },
        { label: 'The Golden Path', link: '/about/golden-path' },
        { label: 'Global Ambassador', link: '/community/global-ambassador' },
        { label: 'Awards and Recognition', link: '/about/awards' },
      ]},
      { label: 'Learn', link: '/meditations', children: [
        { label: 'Free Guided Meditation', link: '/meditations', children: [
          { label: 'Bliss of Silence', link: '/meditations/bliss-of-silence' },
          { label: 'Blossoms of Love', link: '/meditations/blossoms-of-love' },
          { label: 'Freedom Meditation', link: '/meditations/freedom-meditation' },
          { label: 'Power of Purity', link: '/meditations/power-of-purity' },
          { label: 'Mohanji Self-Healing', link: '/meditations/mohanji-self-healing-meditation' },
        ]},
        { label: 'Practices', link: '/practices', children: [
          { label: 'Conscious Walking', link: '/practices/conscious-walking' },
          { label: 'Conscious Dancing', link: '/practices/conscious-dancing' },
          { label: 'Consciousness Kriya', link: '/practices/consciousness-kriya' },
          { label: 'Shaktipat', link: '/practices/shaktipat' },
          { label: 'Mai-Tri Method', link: '/practices/mai-tri-method' },
        ]},
        { label: 'Traditional Yoga', link: '/practices/traditional-yoga' },
        { label: 'Awakening Yoga Nidra', link: '/practices/awakening-yoga-nidra' },
      ]},
      { label: 'Join', link: '/community/volunteer', children: [
        { label: 'Youth Club', link: '/community/youth-club' },
        { label: 'Volunteer', link: '/community/volunteer' },
      ]},
      { label: 'Events', link: '/events', children: [
        { label: 'Upcoming Events', link: '/events' },
        { label: 'Past Events', link: '/events/past' },
      ]},
      { label: 'Courses', link: '/courses' },
      { label: 'Media', link: '/news', children: [
        { label: 'Blogs', link: '/blog' },
        { label: 'News', link: '/news' },
        { label: 'Press Coverage', link: '/news?type=press' },
        { label: 'Annual Reports', link: '/media#annual-reports' },
      ]},
      { label: 'Contact', link: '/contact' },
    ]
  }
})

await payload.updateGlobal({
  slug: 'footer',
  data: {
    columns: [
      { title: "Mohanji's Life", links: [
        { label: 'Mohanji Quotes', url: '/quotes' },
        { label: 'Blogs / Satsangs', url: '/blog' },
        { label: 'Audio & Books', url: '/audios' },
        { label: "Life's Journey", url: '/about/life-journey' },
        { label: 'Mohanji Foundation', url: '/about/foundation' },
      ]},
      { title: 'Volunteer', links: [
        { label: 'Become a Volunteer', url: '/community/volunteer' },
        { label: 'Join the Youth Club', url: '/community/youth-club' },
        { label: 'Global Ambassador', url: '/community/global-ambassador' },
      ]},
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/MohanjiOfficial' },
      { platform: 'youtube', url: 'https://www.youtube.com/@MohanjiOfficial' },
      { platform: 'twitter', url: 'https://twitter.com/MohanjiOfficial' },
      { platform: 'instagram', url: 'https://www.instagram.com/mohanjiofficial' },
    ],
    copyrightText: '© 2026 Mohanji Foundation. All Rights Reserved.',
    newsletterEnabled: true,
    privacyPolicyUrl: '/privacy-policy',
  }
})

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    siteName: 'Mohanji',
    tagline: 'Boundless Love, Timeless Wisdom',
    defaultMeta: {
      title: 'Mohanji — Boundless Love, Timeless Wisdom',
      description: 'Mohanji is a spiritual master, humanitarian, and the embodiment of boundless love and timeless wisdom.',
    },
    donationLinks: [
      { region: 'Europe', provider: 'PayPal', url: 'https://www.paypal.com/donate', label: 'Donate (EUR)' },
      { region: 'USA', provider: 'PayPal', url: 'https://www.paypal.com/donate', label: 'Donate (USD)' },
      { region: 'India', provider: 'Razorpay', url: 'https://rzp.io', label: 'Donate (INR)' },
    ],
    contactEmail: 'info@mohanji.org',
  }
})

console.log('Seeded header, footer, and site settings')
process.exit(0)
