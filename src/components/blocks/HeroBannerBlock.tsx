import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  heading: string
  subheading?: string
  backgroundImage?: { url?: string; alt?: string } | null
  overlayStyle?: 'gradient' | 'dark' | 'none'
  ctaLabel?: string
  ctaUrl?: string
  alignment?: 'center' | 'left'
}

export function HeroBannerBlock({
  heading,
  subheading,
  backgroundImage,
  overlayStyle = 'gradient',
  ctaLabel,
  ctaUrl,
  alignment = 'center',
}: Props) {
  const overlayClass = {
    gradient: 'bg-gradient-to-br from-[#16697A] to-[#5B2D8E]',
    dark: 'bg-black/60',
    none: '',
  }[overlayStyle]

  const alignClass = alignment === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      {/* Background image */}
      {backgroundImage?.url ? (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ''}
            fill
            className="object-cover"
            priority
          />
          {overlayStyle !== 'none' && (
            <div className={`absolute inset-0 ${overlayClass} opacity-80`} />
          )}
        </>
      ) : (
        <div className={`absolute inset-0 ${overlayStyle === 'none' ? 'bg-[#16697A]' : overlayClass}`} />
      )}

      {/* Content */}
      <div className={`container relative z-10 py-16 flex flex-col ${alignClass}`}>
        <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold max-w-3xl">
          {heading}
        </h1>
        <span className="gold-divider gold-divider--center mt-4" />
        {subheading && (
          <p className="text-white/90 text-lg mt-4 max-w-2xl">{subheading}</p>
        )}
        {ctaLabel && ctaUrl && (
          <Link
            href={ctaUrl}
            className="mt-8 inline-block px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
