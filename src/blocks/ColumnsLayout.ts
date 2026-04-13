import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ColumnsLayout: Block = {
  slug: 'columnsLayout',
  labels: { singular: 'Columns Layout', plural: 'Column Layouts' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'width', type: 'select', defaultValue: 'equal', options: [
          { label: 'Equal', value: 'equal' },
          { label: '1/3', value: '1/3' },
          { label: '2/3', value: '2/3' },
          { label: '1/4', value: '1/4' },
          { label: '3/4', value: '3/4' },
        ]},
        { name: 'content', type: 'richText', editor: lexicalEditor() },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'verticalAlign',
      type: 'select',
      defaultValue: 'top',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
  ],
}
