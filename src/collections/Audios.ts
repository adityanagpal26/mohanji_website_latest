import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Audios: CollectionConfig = {
  slug: 'audios',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'audioType', 'duration'],
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
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      name: 'audioType',
      type: 'select',
      options: [
        { label: 'Prayer', value: 'prayer' },
        { label: 'Mantra', value: 'mantra' },
        { label: 'Chant', value: 'chant' },
        { label: 'Talk', value: 'talk' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
}
