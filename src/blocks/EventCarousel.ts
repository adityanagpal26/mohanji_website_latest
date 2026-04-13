import type { Block } from 'payload'

export const EventCarousel: Block = {
  slug: 'eventCarousel',
  labels: { singular: 'Event Carousel', plural: 'Event Carousels' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Upcoming Events' },
    {
      name: 'filter',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming Events', value: 'upcoming' },
        { label: 'Past Events', value: 'past' },
        { label: 'All Events', value: 'all' },
      ],
    },
    { name: 'limit', type: 'number', defaultValue: 6 },
    { name: 'viewAllUrl', type: 'text', defaultValue: '/events' },
  ],
}
