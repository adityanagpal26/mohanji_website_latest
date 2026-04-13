import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blocksField } from '../blocks'

export const Practices: CollectionConfig = {
  slug: 'practices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'benefits',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'howItWorks',
      type: 'richText',
      editor: lexicalEditor(),
    },
    blocksField,
    {
      name: 'applicationFormUrl',
      type: 'text',
      admin: { description: 'External link to registration/application form' },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
