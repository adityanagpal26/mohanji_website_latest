import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Site Settings' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text' },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          label: 'Sub-menu Items',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text' },
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
            {
              name: 'subItems',
              type: 'array',
              label: 'Third-level Items',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'link', type: 'text' },
                { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
      ],
    },
  ],
}
