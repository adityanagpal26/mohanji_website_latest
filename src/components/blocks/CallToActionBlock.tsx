import React from 'react'
import Link from 'next/link'

type Props = {
  heading: string
  subtext?: string
  primaryLabel?: string
  primaryUrl?: string
  secondaryLabel?: string
  secondaryUrl?: string
  style?: 'teal' | 'rose' | 'white' | 'gold'
}

const bgClasses = {
  teal: 'bg-[#16697A] text-white',
  rose: 'bg-[#C95D63] text-white',
  white: 'bg-white text-[#191919] border border-gray-200',
  gold: 'bg-[#E2B748] text-[#191919]',
}

export function CallToActionBlock({
  heading,
  subtext,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  style = 'teal',
}: Props) {
  return (
    <section className={`py-14 ${bgClasses[style]}`}>
      <div className="container text-center">
        <h2 className={`font-heading text-3xl font-semibold ${style === 'white' ? 'text-[#16697A]' : 'text-inherit'}`}>
          {heading}
        </h2>
        <span className="gold-divider gold-divider--center" />
        {subtext && <p className="mt-4 max-w-2xl mx-auto opacity-90">{subtext}</p>}
        {(primaryLabel || secondaryLabel) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {primaryLabel && primaryUrl && (
              <Link
                href={primaryUrl}
                className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryLabel && secondaryUrl && (
              <Link
                href={secondaryUrl}
                className="px-8 py-3 border-2 border-current font-medium rounded hover:opacity-80 transition-opacity"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
