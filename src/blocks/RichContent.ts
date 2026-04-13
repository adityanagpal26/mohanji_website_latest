import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichContent: Block = {
  slug: 'richContent',
  labels: { singular: 'Rich Content', plural: 'Rich Content Blocks' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'containerWidth',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal (1200px)', value: 'normal' },
        { label: 'Narrow (800px)', value: 'narrow' },
        { label: 'Full Width', value: 'full' },
      ],
    },
  ],
}
