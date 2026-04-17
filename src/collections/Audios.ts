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
      label: 'Cover Image',
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
      name: 'tracks',
      type: 'array',
      label: 'Track Listing',
      admin: { description: 'List individual tracks in this album or collection' },
      fields: [
        { name: 'title', type: 'text', label: 'Track Title', required: true },
        { name: 'duration', type: 'text', label: 'Duration', admin: { placeholder: 'e.g. 12:34' } },
      ],
    },
    {
      name: 'storeLinks',
      type: 'array',
      label: 'Store Links',
      admin: { description: 'Purchase or download links for this audio' },
      fields: [
        { name: 'platform', type: 'text', label: 'Platform', admin: { placeholder: 'e.g. Amazon, Gumroad' } },
        { name: 'url', type: 'text', label: 'URL' },
        { name: 'label', type: 'text', label: 'Button Label', admin: { placeholder: 'e.g. Buy on Amazon' } },
      ],
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
