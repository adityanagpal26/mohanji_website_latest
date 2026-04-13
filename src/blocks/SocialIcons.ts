import type { Block } from 'payload'

export const SocialIcons: Block = {
  slug: 'socialIcons',
  labels: { singular: 'Social Icons', plural: 'Social Icons' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
