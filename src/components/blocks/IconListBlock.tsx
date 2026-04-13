import React from 'react'
import Link from 'next/link'

type IconItem = {
  icon?: string
  label: string
  url?: string
  description?: string
}

type Props = {
  heading?: string
  items?: IconItem[]
  layout?: 'vertical' | 'horizontal'
}

export function IconListBlock({ heading, items = [], layout = 'vertical' }: Props) {
  return (
    <section className="py-10">
      <div className="container">
        {heading && (
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-semibold text-[#16697A]">{heading}</h2>
            <span className="gold-divider" />
          </div>
        )}
        <ul className={layout === 'horizontal' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
          {items.map((item, i) => {
            const inner = (
              <div className="flex items-start gap-3">
                {item.icon && <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>}
                <div>
                  <span className="font-medium text-[#191919]">{item.label}</span>
                  {item.description && <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>}
                </div>
              </div>
            )
            return (
              <li key={i}>
                {item.url ? (
                  <Link href={item.url} className="hover:text-[#C95D63] transition-colors block">
                    {inner}
                  </Link>
                ) : inner}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
