import type { Block } from 'payload'

export const CardGrid: Block = {
  slug: 'cardGrid',
  labels: { singular: 'Card Grid', plural: 'Card Grids' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'linkLabel', type: 'text' },
        { name: 'linkUrl', type: 'text' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
