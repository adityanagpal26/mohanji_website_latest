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
      name: 'duration',
      type: 'text',
      label: 'Duration',
      admin: { description: 'e.g. "50 minutes" — shown on the listing card', position: 'sidebar' },
    },
    {
      name: 'audioPreview',
      type: 'upload',
      relationTo: 'media',
      label: 'Audio Preview (optional short clip)',
    },
    blocksField,
    {
      name: 'downloads',
      type: 'array',
      label: 'Download Links by Language',
      admin: { description: 'Add one row per language. Upload the audio file and enter the duration.' },
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
          admin: { description: 'e.g. English, Hindi, French' },
        },
        {
          name: 'languageCode',
          type: 'text',
          admin: { description: 'e.g. en, hi, fr — optional' },
        },
        {
          name: 'audioFile',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'fileSize',
          type: 'text',
          label: 'Duration',
          admin: { description: 'e.g. 52:52 — shown next to the language name' },
        },
      ],
    },
    {
      name: 'howToUse',
      type: 'array',
      label: 'How to Use — Steps (shown on download page)',
      admin: { description: 'The step-by-step instructions shown below the download list. Add 3 steps.' },
      fields: [
        { name: 'title', type: 'text', required: true, admin: { description: 'e.g. Find a Quiet Space' } },
        { name: 'description', type: 'textarea', required: true },
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
