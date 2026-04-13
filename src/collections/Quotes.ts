import type { CollectionConfig } from 'payload'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'topic'],
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'topic',
      type: 'text',
      admin: { position: 'sidebar', description: 'Topic for grouping, e.g. Love, Awareness, Giving' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
}
