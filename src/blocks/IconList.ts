import type { Block } from 'payload'

export const IconList: Block = {
  slug: 'iconList',
  labels: { singular: 'Icon List', plural: 'Icon Lists' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Icon name or emoji' } },
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical List', value: 'vertical' },
        { label: 'Horizontal Grid', value: 'horizontal' },
      ],
    },
  ],
}
