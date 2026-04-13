import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Card = {
  image?: { url?: string; alt?: string } | null
  title: string
  description?: string
  linkLabel?: string
  linkUrl?: string
}

type Props = {
  heading?: string
  cards?: Card[]
  columns?: '2' | '3' | '4'
}

export function CardGridBlock({ heading, cards = [], columns = '3' }: Props) {
  const colClass = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-3', '4': 'md:grid-cols-4' }[columns]

  return (
    <section className="py-12">
      <div className="container">
        {heading && (
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-semibold text-[#16697A]">{heading}</h2>
            <span className="gold-divider gold-divider--center" />
          </div>
        )}
        <div className={`grid grid-cols-1 ${colClass} gap-6`}>
          {cards.map((card, i) => (
            <article key={i} className="bg-white rounded shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              {card.image?.url && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image.url}
                    alt={card.image.alt ?? card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-[#16697A] mb-2">{card.title}</h3>
                {card.description && <p className="text-sm text-gray-600 mb-4">{card.description}</p>}
                {card.linkLabel && card.linkUrl && (
                  <Link
                    href={card.linkUrl}
                    className="text-sm text-[#C95D63] font-medium hover:text-[#f4442e] transition-colors"
                  >
                    {card.linkLabel} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
