import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'bookType', 'language', 'publishedYear'],
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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'downloadFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'purchaseUrl',
      type: 'text',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Mohanji',
    },
    {
      name: 'publishedYear',
      type: 'number',
    },
    {
      name: 'bookType',
      type: 'select',
      options: [
        { label: 'Coffee Table Book', value: 'coffee-table' },
        { label: 'Biography / Spiritual', value: 'biography' },
        { label: "Children's Book", value: 'children' },
        { label: 'Translation', value: 'translation' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'language',
      type: 'text',
      admin: { position: 'sidebar' },
    },
  ],
}
