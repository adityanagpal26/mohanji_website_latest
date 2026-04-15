import type { CollectionConfig } from 'payload'

export const KriyaApplications: CollectionConfig = {
  slug: 'kriya-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'country', 'status', 'createdAt'],
    description: 'Initiation application submissions from the Consciousness Kriya apply page.',
    group: 'Applications',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // ── Status (sidebar) ────────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👀 Under Review', value: 'reviewing' },
        { label: '✅ Approved', value: 'approved' },
        { label: '❌ Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
    { name: 'phone', type: 'text', label: 'Phone / Mobile' },
    { name: 'gender', type: 'text', label: 'Gender' },
    { name: 'country', type: 'text', label: 'Country' },
    { name: 'age', type: 'number', label: 'Age' },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'needsAssistance', type: 'text', label: 'Needs Assistance?' },
  ],
}
