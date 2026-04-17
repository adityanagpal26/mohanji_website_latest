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
      admin: { description: 'Primary purchase URL (e.g. Amazon). For multiple links use storeLinks below.' },
    },
    {
      name: 'storeLinks',
      type: 'array',
      label: 'Store Links',
      admin: { description: 'Add purchase links on different platforms (Amazon, Gumroad, etc.)' },
      fields: [
        { name: 'platform', type: 'text', label: 'Platform', admin: { placeholder: 'e.g. Amazon, Gumroad, Pothi.com' } },
        { name: 'url', type: 'text', label: 'URL' },
        { name: 'label', type: 'text', label: 'Button Label', admin: { placeholder: 'e.g. Buy on Amazon' } },
      ],
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Mohanji',
    },
    {
      name: 'series',
      type: 'text',
      admin: { description: 'Series name (e.g. "Guru Leela Series")' },
    },
    {
      name: 'format',
      type: 'text',
      admin: { description: 'Format (e.g. Paperback, E-Book, Bundle)' },
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
