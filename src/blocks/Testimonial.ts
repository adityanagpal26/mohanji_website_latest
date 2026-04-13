import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'location', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
      ],
    },
  ],
}
