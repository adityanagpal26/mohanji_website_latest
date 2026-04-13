import React from 'react'
import Link from 'next/link'

type Crumb = {
  label: string
  href?: string
}

type Props = {
  items: Crumb[]
}

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-[#16697A] transition-colors">
            Home
          </Link>
        </li>
        {items.map((crumb, i) => (
          <React.Fragment key={i}>
            <li aria-hidden="true" className="text-gray-300">›</li>
            <li>
              {crumb.href && i < items.length - 1 ? (
                <Link href={crumb.href} className="hover:text-[#16697A] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#191919]" aria-current="page">{crumb.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}
