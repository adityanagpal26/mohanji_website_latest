import type { CollectionConfig } from 'payload'

export const AnnualReports: CollectionConfig = {
  slug: 'annual-reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'status', 'updatedAt'],
    description: 'Upload annual report PDF files. Each report appears on the Annual Reports page and can be viewed/downloaded by visitors.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Annual Report 2025" or "Mohanji Foundation Annual Report 2025"' },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Report year (used for sorting, e.g. 2025)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional short description shown on the listing page.',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the PDF file for this annual report.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional cover page image (shown as thumbnail on the listing). If not set, a placeholder is displayed.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
