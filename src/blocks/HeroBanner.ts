import type { Block } from 'payload'

export const HeroBanner: Block = {
  slug: 'heroBanner',
  labels: { singular: 'Hero Banner', plural: 'Hero Banners' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'overlayStyle',
      type: 'select',
      defaultValue: 'gradient',
      options: [
        { label: 'Teal to Purple Gradient', value: 'gradient' },
        { label: 'Dark Overlay', value: 'dark' },
        { label: 'No Overlay', value: 'none' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },
  ],
}
