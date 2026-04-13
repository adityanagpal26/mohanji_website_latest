import type { Block } from 'payload'

export const Divider: Block = {
  slug: 'divider',
  labels: { singular: 'Divider', plural: 'Dividers' },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'gold',
      options: [
        { label: 'Gold Line', value: 'gold' },
        { label: 'Thin Grey', value: 'grey' },
        { label: 'Spacing Only', value: 'space' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
  ],
}
