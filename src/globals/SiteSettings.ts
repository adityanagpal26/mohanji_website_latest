import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Site Settings' },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Mohanji' },
    { name: 'tagline', type: 'text' },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Browser tab icon. Upload a square image (32×32 or 512×512 .png/.ico). Falls back to /favicon.ico if not set.',
      },
    },
    {
      name: 'defaultMeta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Mohanji — Boundless love, timeless wisdom' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'donationLinks',
      type: 'array',
      fields: [
        { name: 'region', type: 'text', required: true },
        { name: 'provider', type: 'text' },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'googleAnalyticsId', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
  ],
}
