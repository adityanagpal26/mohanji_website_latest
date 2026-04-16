import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'location', 'status'],
  },
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
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },

    // ── Dates ────────────────────────────────────────────────────────────────
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Used to sort and filter upcoming vs past events.',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Leave blank for single-day events.',
      },
    },
    {
      name: 'displayDate',
      type: 'text',
      label: 'Display Date Label',
      admin: {
        description: 'Free-form label shown on the page, e.g. "18 Aug – 3 Sep 2026, Batch options available".',
      },
    },

    // ── Location ─────────────────────────────────────────────────────────────
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      admin: { description: 'e.g. "Online", "Tibet / Nepal", "Kathmandu, Nepal"' },
    },

    // ── Media ────────────────────────────────────────────────────────────────
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
      admin: { description: 'Shown as thumbnail on listing cards and as hero background on detail page.' },
    },

    // ── Content ──────────────────────────────────────────────────────────────
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: { description: 'Short subtitle shown below the title in the hero.' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      admin: { description: 'Shown on listing cards (1–2 sentences).' },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Full Body Content',
      editor: lexicalEditor(),
      admin: { description: 'Full event description — headings, lists, sections, etc.' },
    },

    // ── CTA ──────────────────────────────────────────────────────────────────
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      admin: { description: 'e.g. "Join Now", "Know More", "Register"' },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      admin: { description: 'Destination URL. Can be internal (/register-for-...) or external (https://kailash.mohanji.org).' },
    },
    {
      name: 'ctaExternal',
      type: 'checkbox',
      label: 'Open in new tab?',
      defaultValue: false,
      admin: { description: 'Check if the URL points to an external site.' },
    },

    // ── Legacy / computed ─────────────────────────────────────────────────────
    {
      name: 'isPast',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'eventType',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Retreat', value: 'retreat' },
        { label: 'Satsang', value: 'satsang' },
        { label: 'Pilgrimage', value: 'pilgrimage' },
        { label: 'Celebration', value: 'celebration' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Online', value: 'online' },
      ],
    },
  ],
}
