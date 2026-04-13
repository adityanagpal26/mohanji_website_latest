import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Site Settings' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
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
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Mohanji Foundation. All Rights Reserved.',
    },
    {
      name: 'newsletterEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'privacyPolicyUrl',
      type: 'text',
      defaultValue: '/privacy-policy',
    },
  ],
}
