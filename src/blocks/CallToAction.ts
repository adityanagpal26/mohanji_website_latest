import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'callToAction',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subtext', type: 'textarea' },
    { name: 'primaryLabel', type: 'text' },
    { name: 'primaryUrl', type: 'text' },
    { name: 'secondaryLabel', type: 'text' },
    { name: 'secondaryUrl', type: 'text' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'teal',
      options: [
        { label: 'Teal Background', value: 'teal' },
        { label: 'Rose Background', value: 'rose' },
        { label: 'White with Border', value: 'white' },
        { label: 'Gold Accent', value: 'gold' },
      ],
    },
  ],
}
