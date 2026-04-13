import type { Block } from 'payload'

export const DonationLinks: Block = {
  slug: 'donationLinks',
  labels: { singular: 'Donation Links', plural: 'Donation Links' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Donate' },
    { name: 'subtext', type: 'textarea' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'region', type: 'text', required: true, admin: { description: 'e.g. Europe, USA, India' } },
        { name: 'provider', type: 'text', admin: { description: 'e.g. PayPal, Stripe, Razorpay' } },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
