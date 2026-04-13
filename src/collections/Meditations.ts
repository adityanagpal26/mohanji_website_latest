import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blocksField } from '../blocks'

export const Meditations: CollectionConfig = {
  slug: 'meditations',
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
      name: 'instructions',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'audioPreview',
      type: 'upload',
      relationTo: 'media',
    },
    blocksField,
    {
      name: 'downloads',
      type: 'array',
      label: 'Download Links by Language',
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
        },
        {
          name: 'languageCode',
          type: 'text',
          admin: { description: 'e.g. en, hi, de, fr' },
        },
        {
          name: 'audioFile',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'fileSize',
          type: 'text',
        },
      ],
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
