import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Accordion: Block = {
  slug: 'accordion',
  labels: { singular: 'Accordion', plural: 'Accordions' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', editor: lexicalEditor() },
      ],
    },
  ],
}
