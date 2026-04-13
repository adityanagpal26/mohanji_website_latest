import React from 'react'
import Image from 'next/image'

type GalleryImage = {
  image?: { url?: string; alt?: string } | null
  caption?: string
}

type Props = {
  images?: GalleryImage[]
  layout?: 'grid' | 'masonry' | 'carousel'
  columns?: '2' | '3' | '4'
}

export function ImageGalleryBlock({ images = [], layout = 'grid', columns = '3' }: Props) {
  const colClass = { '2': 'grid-cols-2', '3': 'grid-cols-2 md:grid-cols-3', '4': 'grid-cols-2 md:grid-cols-4' }[columns]

  return (
    <section className="py-10">
      <div className="container">
        <div className={`grid ${colClass} gap-4`}>
          {images.map((item, i) =>
            item.image?.url ? (
              <figure key={i} className="overflow-hidden rounded group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt ?? item.caption ?? ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {item.caption && (
                  <figcaption className="text-sm text-gray-500 mt-1 text-center">{item.caption}</figcaption>
                )}
              </figure>
            ) : null
          )}
        </div>
      </div>
    </section>
  )
}
