import type { CollectionConfig } from 'payload'

export const MaiTriApplications: CollectionConfig = {
  slug: 'mai-tri-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'country', 'status', 'createdAt'],
    description: 'Practitioner application submissions from the Mai-Tri Method apply page.',
    group: 'Applications',
  },
  access: {
    // Public form submission — no auth required
    create: () => true,
    // Only logged-in admins/editors can read, update, delete
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

    // ── Section 1: Personal Details ─────────────────────────────────────────
    { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'phone', type: 'text', label: 'Phone / WhatsApp' },
    { name: 'dateOfBirth', type: 'text', label: 'Date of Birth' },
    { name: 'country', type: 'text', label: 'Country' },
    { name: 'city', type: 'text', label: 'City' },

    // ── Section 2: Mohanji Connection ───────────────────────────────────────
    { name: 'mohanjiConnection', type: 'textarea', label: 'How did you first connect with Mohanji?' },
    { name: 'yearsWithMohanji', type: 'text', label: 'Years following Mohanji' },
    { name: 'attendedRetreats', type: 'text', label: 'Attended Mohanji retreats?' },
    { name: 'practicesFollowed', type: 'textarea', label: 'Mohanji practices followed' },
    { name: 'meditationPractice', type: 'textarea', label: 'Current meditation practice' },

    // ── Section 3: Lifestyle & Health ───────────────────────────────────────
    { name: 'dietaryPractice', type: 'text', label: 'Dietary practice' },
    { name: 'smokingAlcohol', type: 'text', label: 'Alcohol / smoking?' },
    { name: 'healthConditions', type: 'textarea', label: 'Health conditions' },

    // ── Section 4: Availability ─────────────────────────────────────────────
    { name: 'hoursPerWeek', type: 'text', label: 'Hours available per week' },
    { name: 'sessionMode', type: 'text', label: 'Preferred session mode' },
    { name: 'languages', type: 'text', label: 'Languages for sessions' },

    // ── Section 5: Spiritual Journey ────────────────────────────────────────
    { name: 'whyMaiTri', type: 'textarea', label: 'Why become a Mai-Tri practitioner?' },
    { name: 'innerMotivation', type: 'textarea', label: 'Inner transformation with Mohanji' },
    { name: 'previousHealingExperience', type: 'textarea', label: 'Previous healing / energy work' },

    // ── Section 6: Signature ────────────────────────────────────────────────
    { name: 'signatureDate', type: 'text', label: 'Signature Date' },
    { name: 'signaturePlace', type: 'text', label: 'Signature Place' },
    { name: 'signatureName', type: 'text', label: 'Full Name (Signature)' },
  ],
}
