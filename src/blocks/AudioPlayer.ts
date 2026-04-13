import type { Block } from 'payload'

export const AudioPlayer: Block = {
  slug: 'audioPlayer',
  labels: { singular: 'Audio Player', plural: 'Audio Players' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'audio',
      type: 'relationship',
      relationTo: 'audios',
    },
    {
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Or upload a file directly instead of linking to an Audio entry' },
    },
    { name: 'showDownloadButton', type: 'checkbox', defaultValue: true },
    { name: 'description', type: 'textarea' },
  ],
}
