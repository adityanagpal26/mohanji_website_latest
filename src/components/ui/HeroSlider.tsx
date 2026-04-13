'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type HeroSlide = {
  src: string
  alt: string
  /** If set, the entire slide image becomes a clickable link */
  link?: string
}

type Props = {
  slides: HeroSlide[]
  /** Auto-rotate interval in ms (default 5000) */
  interval?: number
  /** Show prev/next arrows in the white margin outside the image */
  arrows?: boolean
  /** Show dot indicators inside the image at the bottom */
  dots?: boolean
}

export function HeroSlider({ slides, interval = 5000, arrows = true, dots = true }: Props) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = slides.length

  const goTo = useCallback(
    (index: number) => setCurrent(((index % count) + count) % count),
    [count],
  )
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (isPaused || count <= 1) return
    timerRef.current = setInterval(next, interval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next, interval, isPaused, count])

  if (count === 0) return null

  return (
    <section
      className="py-4 md:py-6 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero image slider"
    >
      <div className="container">
        {/* Outer wrapper — same width as container content, arrows float just outside */}
        <div className="relative">

          {/* ── Slide container ── */}
          <div className="relative overflow-hidden aspect-video rounded-sm shadow-sm">
            {slides.map((slide, i) => {
              const image = (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  draggable={false}
                />
              )

              return (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  aria-hidden={i !== current}
                >
                  {slide.link ? (
                    <Link
                      href={slide.link}
                      className="block w-full h-full"
                      tabIndex={i === current ? 0 : -1}
                    >
                      {image}
                    </Link>
                  ) : (
                    image
                  )}
                </div>
              )
            })}

            {/* Dot indicators — inside the image at the bottom centre */}
            {dots && count > 1 && (
              <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 focus:outline-none ${
                      i === current
                        ? 'w-5 h-2 bg-[#E2B748]'
                        : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === current ? 'true' : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Arrows — outside the image in the white margin ── */}
          {arrows && count > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-[-1.75rem] top-1/2 -translate-y-1/2 z-20 text-3xl md:text-4xl text-white/70 md:text-gray-400 hover:text-[#16697A] transition-colors leading-none select-none focus:outline-none drop-shadow"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:right-[-1.75rem] top-1/2 -translate-y-1/2 z-20 text-3xl md:text-4xl text-white/70 md:text-gray-400 hover:text-[#16697A] transition-colors leading-none select-none focus:outline-none drop-shadow"
                aria-label="Next slide"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
