import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blocksField } from '../blocks'

export const Practices: CollectionConfig = {
  slug: 'practices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'updatedAt'],
  },
  fields: [
    // ── Core identity ─────────────────────────────────────────────────────────
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

    // ── Taxonomy / card metadata ──────────────────────────────────────────────
    {
      name: 'category',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Short badge shown on listing cards, e.g. "Energy Transfer", "Movement Practice".',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'One-line tagline shown under the title on listing cards.',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'e.g. "60 minutes", "Ongoing daily practice".',
      },
    },

    // ── Main content ──────────────────────────────────────────────────────────
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor(),
      admin: { description: 'Main descriptive text shown on the practice detail page.' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube Video URL',
      admin: { description: 'Optional YouTube embed URL. Shown as a video embed on the detail page.' },
    },

    // ── Benefits ──────────────────────────────────────────────────────────────
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      admin: { description: 'Each item shown as a bullet point in the "Benefits" section.' },
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Relieves deep-seated stress and trauma"' },
        },
      ],
    },

    // ── How It Works ──────────────────────────────────────────────────────────
    {
      name: 'howItWorks',
      type: 'array',
      label: 'How It Works',
      admin: { description: 'Each item shown as a numbered step in the "How It Works" section.' },
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Sit comfortably and close your eyes"' },
        },
      ],
    },

    // ── CMS block builder ─────────────────────────────────────────────────────
    blocksField,

    // ── CTAs & Registration ───────────────────────────────────────────────────
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA Button',
      admin: { description: 'Main call-to-action button — e.g. "Register Now" for events/programs.' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          admin: { description: 'e.g. "Register Now", "Apply Here"' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
          admin: { description: 'Full URL or internal path.' },
        },
      ],
    },
    {
      name: 'applicationFormUrl',
      type: 'text',
      label: 'Application Form URL (legacy)',
      admin: { description: 'Deprecated — use Primary CTA above. Kept for backwards compatibility.' },
    },
    {
      name: 'brochureUrl',
      type: 'text',
      label: 'Brochure PDF URL',
      admin: { description: 'Direct URL to a downloadable brochure PDF.' },
    },

    // ── Contact form ──────────────────────────────────────────────────────────
    {
      name: 'showContactForm',
      type: 'checkbox',
      label: 'Show "Write to Us" Contact Form',
      defaultValue: false,
      admin: { description: 'Show a contact/enquiry form at the bottom of this practice page.' },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Form Recipient Email',
      admin: { description: 'Enquiries submitted via this form will be sent to this address.' },
    },

    // ── Newsletter ────────────────────────────────────────────────────────────
    {
      name: 'showNewsletterForm',
      type: 'checkbox',
      label: 'Show Newsletter Signup Section',
      defaultValue: false,
    },
    {
      name: 'newsletterLabel',
      type: 'text',
      label: 'Newsletter Section Heading',
      admin: { description: 'e.g. "Sign up for the Consciousness Kriya Newsletter"' },
    },

    // ── External practice ──────────────────────────────────────────────────────
    {
      name: 'isExternalPractice',
      type: 'checkbox',
      label: 'Links to External Website',
      defaultValue: false,
      admin: {
        description: 'Tick if this practice lives on an external site (e.g. mohanjiprocess.mohanji.org). The detail page will show a prominent "Visit" link instead of inline content.',
        position: 'sidebar',
      },
    },
    {
      name: 'externalPageUrl',
      type: 'text',
      label: 'External Page URL',
      admin: {
        description: 'Full URL of the external practice page. Required when "Links to External Website" is ticked.',
      },
    },

    // ── SEO ───────────────────────────────────────────────────────────────────
    {
      name: 'meta',
      type: 'group',
      label: 'SEO & Social Sharing',
      fields: [
        { name: 'title', type: 'text', label: 'SEO Title' },
        { name: 'description', type: 'textarea', label: 'SEO Description' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Share Image',
          admin: { description: 'Not displayed on the page itself — only for social sharing.' },
        },
      ],
    },
  ],
}
