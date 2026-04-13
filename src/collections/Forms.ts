import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Form Fields',
      fields: [
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select / Dropdown', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Phone', value: 'phone' },
            { label: 'File Upload', value: 'file' },
          ],
        },
        { name: 'label', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'placeholder', type: 'text' },
        { name: 'required', type: 'checkbox', defaultValue: false },
        {
          name: 'options',
          type: 'array',
          admin: { condition: (_, siblingData) => siblingData?.fieldType === 'select' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'confirmationMessage',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'emailTo',
      type: 'text',
      admin: { description: 'Email address(es) to receive submissions, comma-separated' },
    },
    {
      name: 'redirectUrl',
      type: 'text',
      admin: { description: 'Optional: redirect to this URL after successful submission' },
    },
  ],
}
