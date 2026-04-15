import type { CollectionConfig } from 'payload'
import { blocksField } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', 'status', 'updatedAt'],
  },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: { position: 'sidebar' },
    },
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'generic',
      admin: { position: 'sidebar', description: 'Determines which structured fields are shown below.' },
      options: [
        { label: 'Generic (block builder)', value: 'generic' },
        { label: 'Homepage', value: 'home' },
        { label: 'Who is Mohanji', value: 'who-is-mohanji' },
        { label: 'Mohanji Foundation', value: 'foundation' },
        { label: "Mohanji's Life Journey", value: 'life-journey' },
        { label: 'Global Council', value: 'global-council' },
        { label: 'Mohanji Spaces', value: 'mohanji-spaces' },
        { label: 'The Golden Path', value: 'golden-path' },
        { label: 'Global Ambassador', value: 'global-ambassador' },
        { label: 'Awards & Recognition', value: 'awards' },
        { label: 'Free Guided Meditations (listing)', value: 'meditations-listing' },
        { label: 'Practices (listing)', value: 'practices-listing' },
      ],
    },

    // ── Generic block-based layout ────────────────────────────────────────────
    {
      ...blocksField,
      admin: {
        ...(blocksField as any).admin,
        condition: (data: any) => !data?.pageType || data?.pageType === 'generic',
      },
    } as any,

    // ── SEO / social meta ─────────────────────────────────────────────────────
    {
      name: 'meta',
      type: 'group',
      label: 'SEO & Social Sharing',
      fields: [
        { name: 'title', type: 'text', label: 'SEO Title', admin: { description: 'Overrides the page title in browser tab and search results.' } },
        { name: 'description', type: 'textarea', label: 'SEO Description', admin: { description: 'Shown in Google search results below the title.' } },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Social Share Image', admin: { description: 'Shown as the preview image when this page is shared on WhatsApp, Twitter, Facebook etc. Not displayed on the page itself.' } },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // HOMEPAGE CONTENT (pageType === 'home')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'homeContent',
      type: 'group',
      label: 'Homepage Content',
      admin: {
        condition: (data: any) => data?.pageType === 'home',
        description: 'All structured content for the homepage.',
      },
      fields: [
        // Hero Slides
        {
          name: 'heroSlides',
          type: 'array',
          label: 'Hero Slider Slides',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'alt', type: 'text', required: true },
            { name: 'link', type: 'text', label: 'Click URL (optional)' },
          ],
        },

        // About Section
        {
          name: 'aboutSection',
          type: 'group',
          label: 'About Mohanji Section',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'heading', type: 'text', defaultValue: 'About Mohanji' },
            { name: 'body', type: 'textarea' },
            { name: 'bodySecond', type: 'textarea' },
            { name: 'quote', type: 'textarea' },
            { name: 'ctaLabel', type: 'text', defaultValue: 'Know More' },
            { name: 'ctaLink', type: 'text', defaultValue: '/about/who-is-mohanji' },
          ],
        },

        // Where is Mohanji
        {
          name: 'whereIsMohanjiDateRange',
          type: 'text',
          label: 'Where is Mohanji — Date Range Label',
        },
        {
          name: 'whereIsMohanji',
          type: 'array',
          label: 'Where is Mohanji? Locations',
          fields: [
            { name: 'country', type: 'text', required: true },
            { name: 'months', type: 'text', required: true },
            { name: 'detail', type: 'text' },
          ],
        },

        // Activity Stats
        {
          name: 'activityStats',
          type: 'array',
          label: 'Animated Stats (Counter Bar)',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { description: 'Display text e.g. "290+"' } },
            { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Group Activities"' } },
            { name: 'numeric', type: 'number', required: true, admin: { description: 'The number the animated counter counts up to (e.g. 290)' } },
          ],
        },

        // Mohanji Centres
        {
          name: 'centres',
          type: 'array',
          label: 'Mohanji Centres (country list)',
          fields: [{ name: 'name', type: 'text', required: true }],
        },

        // Platforms
        {
          name: 'platforms',
          type: 'array',
          label: 'Our Platforms',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'url', type: 'text', required: true },
          ],
        },

        // Activities Section
        {
          name: 'activitiesSection',
          type: 'group',
          label: 'Our Activities Section',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'body', type: 'textarea' },
          ],
        },

        // Meditations CTA
        {
          name: 'meditationsCtaImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Meditations CTA Background Image',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // WHO IS MOHANJI CONTENT (pageType === 'who-is-mohanji')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'wimContent',
      type: 'group',
      label: 'Who is Mohanji Content',
      admin: {
        condition: (data: any) => data?.pageType === 'who-is-mohanji',
        description: 'All structured content for the Who is Mohanji page.',
      },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Image' },

        {
          name: 'introSection',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'para1', type: 'textarea' },
            { name: 'para2', type: 'textarea' },
            { name: 'para3', type: 'textarea' },
          ],
        },

        { name: 'portraitImage', type: 'upload', relationTo: 'media' },
        { name: 'openingQuote', type: 'textarea' },
        { name: 'wideImage', type: 'upload', relationTo: 'media' },

        {
          name: 'secondIntro',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'para1', type: 'textarea' },
            { name: 'para2', type: 'textarea' },
            { name: 'para3', type: 'textarea' },
          ],
        },

        { name: 'pullQuote1', type: 'textarea', label: 'Pull Quote 1 (teal background)' },

        {
          name: 'liberationSection',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
            { name: 'inlineQuote', type: 'textarea' },
            { name: 'textContinued', type: 'textarea' },
          ],
        },

        {
          name: 'pillarsSection',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
          ],
        },

        {
          name: 'spiritualitySection',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
          ],
        },

        { name: 'lifeQuote', type: 'textarea' },

        {
          name: 'footprintSection',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text1', type: 'textarea' },
            { name: 'text2', type: 'textarea' },
          ],
        },

        {
          name: 'leadingSection',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'text', type: 'textarea' },
          ],
        },

        { name: 'awardsQuote', type: 'textarea' },

        {
          name: 'initiatives',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            {
              name: 'category',
              type: 'select',
              defaultValue: 'founded',
              options: [
                { label: 'Founded by Mohanji', value: 'founded' },
                { label: 'Inspired by Mohanji', value: 'inspired' },
                { label: 'Supported by Mohanji', value: 'supported' },
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // FOUNDATION (pageType === 'foundation')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'foundationContent',
      type: 'group',
      label: 'Foundation Page Content',
      admin: { condition: (data: any) => data?.pageType === 'foundation' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'missionStatement', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        {
          name: 'foundedPlatforms',
          type: 'array',
          label: 'Platforms Founded by Mohanji',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'inspiredPlatforms',
          type: 'array',
          label: 'Platforms Inspired by Mohanji',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'pillars',
          type: 'array',
          label: 'Pillars of Work',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        { name: 'centersText', type: 'textarea', label: 'Global Centers description' },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // LIFE JOURNEY (pageType === 'life-journey')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'lifeJourneyContent',
      type: 'group',
      label: "Life Journey Page Content",
      admin: { condition: (data: any) => data?.pageType === 'life-journey' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'introText', type: 'textarea' },
        {
          name: 'chapters',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'period', type: 'text' },
            { name: 'text', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // GLOBAL COUNCIL (pageType === 'global-council')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'councilContent',
      type: 'group',
      label: 'Global Council Page Content',
      admin: { condition: (data: any) => data?.pageType === 'global-council' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'introText', type: 'textarea' },
        {
          name: 'purposePoints',
          type: 'array',
          label: 'Purpose & Role points',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'members',
          type: 'array',
          label: 'Council Members',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'role', type: 'text' },
            { name: 'country', type: 'text' },
            { name: 'bio', type: 'textarea' },
            { name: 'photo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'regions',
          type: 'array',
          label: 'Global Regions',
          fields: [
            { name: 'region', type: 'text', required: true },
            { name: 'activities', type: 'textarea' },
            { name: 'countries', type: 'text' },
          ],
        },
        {
          name: 'howItWorks',
          type: 'array',
          label: 'How the Council Works steps',
          fields: [
            { name: 'step', type: 'text', required: true },
            { name: 'detail', type: 'textarea' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MOHANJI SPACES (pageType === 'mohanji-spaces')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'spacesContent',
      type: 'group',
      label: 'Mohanji Spaces Page Content',
      admin: { condition: (data: any) => data?.pageType === 'mohanji-spaces' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'introQuote', type: 'textarea' },
        { name: 'introText1', type: 'textarea' },
        { name: 'introText2', type: 'textarea' },
        {
          name: 'spaces',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'location', type: 'text' },
            { name: 'type', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'contact', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // GOLDEN PATH (pageType === 'golden-path')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'goldenPathContent',
      type: 'group',
      label: 'Golden Path Page Content',
      admin: { condition: (data: any) => data?.pageType === 'golden-path' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'introText1', type: 'textarea' },
        { name: 'introText2', type: 'textarea' },
        { name: 'quote', type: 'textarea' },
        {
          name: 'stages',
          type: 'array',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // GLOBAL AMBASSADOR (pageType === 'global-ambassador')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'ambassadorContent',
      type: 'group',
      label: 'Global Ambassador Page Content',
      admin: { condition: (data: any) => data?.pageType === 'global-ambassador' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'roleDesc1', type: 'textarea', label: 'Role description paragraph 1' },
        { name: 'roleDesc2', type: 'textarea', label: 'Role description paragraph 2' },
        { name: 'ambassadorName', type: 'text' },
        { name: 'ambassadorTitle', type: 'text' },
        { name: 'ambassadorPhoto', type: 'upload', relationTo: 'media' },
        { name: 'bio1', type: 'textarea', label: 'Bio paragraph 1' },
        { name: 'bio2', type: 'textarea', label: 'Bio paragraph 2' },
        { name: 'bio3', type: 'textarea', label: 'Bio paragraph 3' },
        {
          name: 'events',
          type: 'array',
          label: 'Representation highlights / events',
          fields: [
            { name: 'date', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // AWARDS PAGE (pageType === 'awards')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'awardsPageContent',
      type: 'group',
      label: 'Awards Page Content',
      admin: { condition: (data: any) => data?.pageType === 'awards' },
      fields: [
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'introText', type: 'textarea' },
        { name: 'closingQuote', type: 'textarea' },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // MEDITATIONS LISTING (pageType === 'meditations-listing')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'meditationsListingContent',
      type: 'group',
      label: 'Meditations Listing Page Content',
      admin: { condition: (data: any) => data?.pageType === 'meditations-listing' },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'meditations-listing' && !val ? 'Hero title is required' : true,
          admin: { description: '★ Required. Main heading shown in the hero banner.' },
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          label: 'Hero Subtitle',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'meditations-listing' && !val ? 'Hero subtitle is required' : true,
          admin: { description: '★ Required. Text shown below the title in the hero banner.' },
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Background Image',
          admin: { description: 'Optional. Full-width background image for the hero banner. Falls back to a teal gradient if not set.' },
        },
        {
          name: 'brochureUrl',
          type: 'text',
          label: 'Brochure PDF URL',
          admin: { description: 'Optional. Link for the "Download Brochure" button. Upload the PDF to Media and paste its URL here.' },
        },
        {
          name: 'introText',
          type: 'textarea',
          label: 'Intro Paragraph',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'meditations-listing' && !val ? 'Intro paragraph is required' : true,
          admin: { description: '★ Required. Shown below the hero section.' },
        },
        {
          name: 'ctaHeading',
          type: 'text',
          label: 'CTA Section Heading',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'meditations-listing' && !val ? 'CTA heading is required' : true,
          admin: { description: '★ Required. Heading for the call-to-action section at the bottom.' },
        },
        {
          name: 'ctaText',
          type: 'textarea',
          label: 'CTA Section Text',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'meditations-listing' && !val ? 'CTA text is required' : true,
          admin: { description: '★ Required. Description text in the call-to-action section.' },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PRACTICES LISTING (pageType === 'practices-listing')
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'practicesListingContent',
      type: 'group',
      label: 'Practices Listing Page Content',
      admin: { condition: (data: any) => data?.pageType === 'practices-listing' },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'practices-listing' && !val ? 'Hero title is required' : true,
          admin: { description: '★ Required. Main heading in the hero banner.' },
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          label: 'Hero Subtitle',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'practices-listing' && !val ? 'Hero subtitle is required' : true,
          admin: { description: '★ Required. Subheading below the hero title.' },
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Background Image',
          admin: { description: 'Full-width background image for the hero banner. Falls back to gradient if not set.' },
        },
        {
          name: 'introText',
          type: 'textarea',
          label: 'Intro Paragraph',
          validate: (val: any, { data }: any) =>
            data?.pageType === 'practices-listing' && !val ? 'Intro paragraph is required' : true,
          admin: { description: '★ Required. Shown below the hero in a white section.' },
        },
        {
          name: 'ctaHeading',
          type: 'text',
          label: 'CTA Section Heading',
          admin: { description: 'Heading for the call-to-action section at the bottom of the page.' },
        },
        {
          name: 'ctaText',
          type: 'textarea',
          label: 'CTA Section Text',
          admin: { description: 'Body text in the call-to-action section.' },
        },
        {
          name: 'ctaLinkLabel',
          type: 'text',
          label: 'CTA Button Label',
          admin: { description: 'e.g. "Explore Meditations"' },
        },
        {
          name: 'ctaLinkUrl',
          type: 'text',
          label: 'CTA Button URL',
          admin: { description: 'e.g. "/meditations"' },
        },
      ],
    },

    // ── Status / publishing ───────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}
