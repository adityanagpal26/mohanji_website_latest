import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'order', 'status'],
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
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'videoUrl',
      type: 'text',
    },
    {
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'downloadables',
      type: 'array',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
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
