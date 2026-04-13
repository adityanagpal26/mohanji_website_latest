import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'eventType', 'status'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.endDate) {
          data.isPast = new Date(data.endDate) < new Date()
        }
        return data
      },
    ],
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
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
    },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Retreat', value: 'retreat' },
        { label: 'Satsang', value: 'satsang' },
        { label: 'Pilgrimage', value: 'pilgrimage' },
        { label: 'Celebration', value: 'celebration' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Online', value: 'online' },
      ],
    },
    {
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'registrationForm',
      type: 'relationship',
      relationTo: 'forms',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'isPast',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', readOnly: true },
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
  ],
}
