import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Awards: CollectionConfig = {
  slug: 'awards',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'date'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'organization',
      type: 'text',
    },
  ],
}
