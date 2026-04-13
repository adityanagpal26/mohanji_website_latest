import type { Block } from 'payload'

export const DownloadGrid: Block = {
  slug: 'downloadGrid',
  labels: { singular: 'Download Grid', plural: 'Download Grids' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Download in Your Language' },
    {
      name: 'meditation',
      type: 'relationship',
      relationTo: 'meditations',
      admin: { description: 'Link to a meditation to auto-populate its download list' },
    },
    {
      name: 'downloads',
      type: 'array',
      admin: { description: 'Or add download links manually' },
      fields: [
        { name: 'language', type: 'text', required: true },
        { name: 'languageCode', type: 'text' },
        { name: 'file', type: 'upload', relationTo: 'media' },
        { name: 'externalUrl', type: 'text' },
        { name: 'fileSize', type: 'text' },
      ],
    },
  ],
}
