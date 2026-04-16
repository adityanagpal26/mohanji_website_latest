import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'postType', 'status', 'publishedAt'],
  },
  versions: { drafts: true },
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
      name: 'postType',
      type: 'select',
      defaultValue: 'news',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Blog / Satsang', value: 'blog' },
        { label: 'Press Coverage', value: 'press-coverage' },
        { label: 'Interview', value: 'interview' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'publicationName',
      type: 'text',
      admin: {
        description: 'Name of the publication, channel, or platform (e.g. "Times of India", "PMC Channel")',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Newspaper / Magazine Article', value: 'article' },
        { label: 'Podcast', value: 'podcast' },
        { label: 'TV Coverage', value: 'tv-coverage' },
        { label: 'Video', value: 'video' },
        { label: 'Press Release', value: 'press-release' },
        { label: 'Interview', value: 'interview' },
      ],
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'Link to the original article, podcast, or video',
      },
    },
    {
      name: 'embedCode',
      type: 'textarea',
      admin: {
        description: 'HTML embed code for podcast player, YouTube video, etc.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}
