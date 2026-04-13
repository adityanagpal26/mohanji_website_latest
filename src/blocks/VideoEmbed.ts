import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'YouTube or Vimeo URL' },
    },
    { name: 'caption', type: 'text' },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
      ],
    },
  ],
}
