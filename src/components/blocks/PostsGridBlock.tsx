import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { formatDate } from '@/lib/utils'

type Props = {
  heading?: string
  postType?: 'news' | 'blog' | 'press-coverage'
  limit?: number
  viewAllUrl?: string
}

export async function PostsGridBlock({ heading, postType = 'news', limit = 6, viewAllUrl }: Props) {
  const payload = await getPayloadClient()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { postType: { equals: postType } },
      ],
    },
    limit,
    sort: '-publishedAt',
    depth: 1,
  })

  const fallbackUrl = postType === 'blog' ? '/blog' : postType === 'press-coverage' ? '/news' : '/news'

  return (
    <section className="py-12">
      <div className="container">
        {heading && (
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-[#16697A]">{heading}</h2>
              <span className="gold-divider" />
            </div>
            {viewAllUrl && (
              <Link href={viewAllUrl ?? fallbackUrl} className="text-sm text-[#C95D63] hover:text-[#f4442e] font-medium transition-colors">
                View All →
              </Link>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/${postType === 'blog' ? 'blog' : 'news'}/${post.slug}`} className="group">
              <article className="bg-white rounded shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                {post.featuredImage?.url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-gray-400 mb-2">
                    {post.publishedAt ? formatDate(post.publishedAt) : ''}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#191919] group-hover:text-[#16697A] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && <p className="text-sm text-gray-500 mt-2 line-clamp-3">{post.excerpt}</p>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
