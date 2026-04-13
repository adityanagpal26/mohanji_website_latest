import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
