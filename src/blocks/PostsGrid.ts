import type { Block } from 'payload'

export const PostsGrid: Block = {
  slug: 'postsGrid',
  labels: { singular: 'Posts Grid', plural: 'Posts Grids' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'postType',
      type: 'select',
      defaultValue: 'news',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Blog', value: 'blog' },
        { label: 'Press Coverage', value: 'press-coverage' },
      ],
    },
    { name: 'limit', type: 'number', defaultValue: 6 },
    { name: 'viewAllUrl', type: 'text' },
  ],
}
