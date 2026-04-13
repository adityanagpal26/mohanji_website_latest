import type { CollectionConfig } from 'payload'

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'country'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'latitude',
      type: 'number',
      admin: { step: 0.000001 },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: { step: 0.000001 },
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      admin: { description: 'Google Maps link for this venue' },
    },
  ],
}
