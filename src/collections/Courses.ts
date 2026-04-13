import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blocksField } from '../blocks'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'level', 'status'],
  },
  versions: { drafts: true },
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
      name: 'level',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'duration',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'prerequisites',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
    },
    {
      name: 'lessons',
      type: 'relationship',
      relationTo: 'lessons',
      hasMany: true,
    },
    blocksField,
    {
      name: 'registrationUrl',
      type: 'text',
      admin: { description: 'External registration / payment link' },
    },
    {
      name: 'price',
      type: 'text',
      admin: { description: 'Display price, e.g. €95' },
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
