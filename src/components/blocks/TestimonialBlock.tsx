import React from 'react'
import Image from 'next/image'

type TestimonialItem = {
  quote: string
  name: string
  location?: string
  photo?: { url?: string; alt?: string } | null
}

type Props = {
  items?: TestimonialItem[]
  layout?: 'carousel' | 'grid'
}

export function TestimonialBlock({ items = [], layout = 'carousel' }: Props) {
  return (
    <section className="py-14 bg-[#F5F5F5]">
      <div className="container">
        <div className={`grid gap-6 ${layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1 max-w-[700px] mx-auto'}`}>
          {items.map((item, i) => (
            <blockquote key={i} className="bg-white p-8 rounded shadow-sm">
              <p className="font-heading text-lg italic text-[#2B2828] leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                {item.photo?.url && (
                  <Image
                    src={item.photo.url}
                    alt={item.photo.alt ?? item.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <cite className="not-italic font-medium text-[#16697A]">{item.name}</cite>
                  {item.location && <p className="text-sm text-gray-500">{item.location}</p>}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
