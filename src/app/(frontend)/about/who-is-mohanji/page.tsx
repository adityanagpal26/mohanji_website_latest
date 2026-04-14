import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 }).catch(() => null)
  const siteName = (settings as any)?.siteName ?? 'Mohanji'
  return {
    title: `Who is Mohanji | ${siteName}`,
    description:
      'Mohanji is a friend of the world — a spiritual leader, humanitarian, and founder of multiple global platforms dedicated to kindness, compassion and non-violence.',
  }
}

function mediaUrl(field: unknown): string | null {
  if (!field || typeof field !== 'object') return null
  const f = field as Record<string, unknown>
  return typeof f.url === 'string' ? f.url : null
}

function mediaAlt(field: unknown, fallback = ''): string {
  if (!field || typeof field !== 'object') return fallback
  const f = field as Record<string, unknown>
  return typeof f.alt === 'string' ? f.alt : fallback
}

export default async function WhoIsMohanjiPage() {
  const payload = await getPayloadClient()

  const [{ docs: wimPages }, { docs: awards }] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'who-is-mohanji' } }, depth: 2, limit: 1 }),
    payload.find({ collection: 'awards', limit: 20, depth: 1, sort: '-date' }).catch(() => ({ docs: [] })),
  ])

  const wimPage = wimPages[0] as any
  const data = wimPage?.wimContent ?? {}

  // ── Derived values ────────────────────────────────────────────────────────
  const heroUrl       = mediaUrl(data?.heroImage)
  const heroAlt       = mediaAlt(data?.heroImage, 'Who is Mohanji')
  const portraitUrl   = mediaUrl(data?.portraitImage)
  const portraitAlt   = mediaAlt(data?.portraitImage, 'Mohanji portrait')
  const wideUrl       = mediaUrl(data?.wideImage)
  const wideAlt       = mediaAlt(data?.wideImage, 'Mohanji with devotees')

  const intro         = data?.introSection
  const secondIntro   = data?.secondIntro
  const liberation    = data?.liberationSection
  const pillars       = data?.pillarsSection
  const spirituality  = data?.spiritualitySection
  const footprint     = data?.footprintSection
  const leading       = data?.leadingSection

  const pullQuote1    = data?.pullQuote1 as string | undefined
  const openingQuote  = data?.openingQuote as string | undefined
  const lifeQuote     = data?.lifeQuote as string | undefined
  const awardsQuote   = data?.awardsQuote as string | undefined

  const initiatives: any[] = data?.initiatives ?? []
  const foundedInits  = initiatives.filter((i) => i.category === 'founded')
  const inspiredInits = initiatives.filter((i) => i.category === 'inspired')

  return (
    <div className="bg-white">

      {/* ── 1. Hero Image ─────────────────────────────────────────────────── */}
      {heroUrl && (
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
          <Image
            src={heroUrl}
            alt={heroAlt}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            unoptimized={heroUrl.startsWith('http')}
          />
        </div>
      )}

      {/* ── 2. Intro Section ──────────────────────────────────────────────── */}
      {intro && (
        <section className="py-14 bg-white">
          <div className="container max-w-4xl">
            {intro.heading && (
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl md:text-4xl text-[#16697A]">
                  {intro.heading}
                </h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mx-auto mt-3" />
              </div>
            )}
            {intro.para1 && (
              <p className="text-gray-700 leading-relaxed text-[15px] mb-5">{intro.para1}</p>
            )}
            {intro.para2 && (
              <p className="text-gray-700 leading-relaxed text-[15px] mb-5">{intro.para2}</p>
            )}
            {intro.para3 && (
              <p className="text-gray-700 leading-relaxed text-[15px]">{intro.para3}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 3. Portrait + Opening Quote (two-column) ──────────────────────── */}
      {(portraitUrl || openingQuote) && (
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left: portrait */}
              {portraitUrl && (
                <div className="relative w-full aspect-[3/4] rounded overflow-hidden shadow-md">
                  <Image
                    src={portraitUrl}
                    alt={portraitAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={portraitUrl.startsWith('http')}
                  />
                </div>
              )}
              {/* Right: self-description quote */}
              {openingQuote && (
                <div className="flex flex-col justify-center">
                  <div className="text-[#E2B748] text-6xl font-serif leading-none mb-4">&ldquo;</div>
                  <div className="space-y-4">
                    {openingQuote.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-700 text-[15px] leading-relaxed italic">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Wide Photo ─────────────────────────────────────────────────── */}
      {wideUrl && (
        <div className="relative w-full h-[280px] md:h-[420px] overflow-hidden">
          <Image
            src={wideUrl}
            alt={wideAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized={wideUrl.startsWith('http')}
          />
        </div>
      )}

      {/* ── 5. Second Intro Block ─────────────────────────────────────────── */}
      {secondIntro && (
        <section className="py-14 bg-white">
          <div className="container max-w-4xl">
            {secondIntro.heading && (
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl md:text-4xl text-[#16697A]">
                  {secondIntro.heading}
                </h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mx-auto mt-3" />
              </div>
            )}
            {secondIntro.para1 && (
              <p className="text-gray-700 leading-relaxed text-[15px] mb-5">{secondIntro.para1}</p>
            )}
            {secondIntro.para2 && (
              <p className="text-gray-700 leading-relaxed text-[15px] mb-5">{secondIntro.para2}</p>
            )}
            {secondIntro.para3 && (
              <p className="text-gray-700 leading-relaxed text-[15px]">{secondIntro.para3}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 6. Pull Quote 1 (teal background) ────────────────────────────── */}
      {pullQuote1 && (
        <section className="py-14 bg-[#16697A]">
          <div className="container max-w-3xl text-center">
            <blockquote className="font-heading text-2xl md:text-3xl text-white italic leading-relaxed">
              &ldquo;{pullQuote1}&rdquo;
            </blockquote>
            <p className="mt-5 text-[#E2B748] font-semibold text-sm uppercase tracking-widest">
              — Mohanji
            </p>
          </div>
        </section>
      )}

      {/* ── 7. Liberation Section ─────────────────────────────────────────── */}
      {liberation && (
        <section className="py-14 bg-white">
          <div className="container max-w-4xl">
            {liberation.heading && (
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-[#16697A]">{liberation.heading}</h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mt-3" />
              </div>
            )}
            {liberation.text && (
              <p className="text-gray-700 leading-relaxed text-[15px] mb-7">{liberation.text}</p>
            )}
            {liberation.inlineQuote && (
              <blockquote className="border-l-4 border-[#E2B748] pl-6 my-7">
                <p className="font-heading text-xl text-[#16697A] italic">
                  &ldquo;{liberation.inlineQuote}&rdquo;
                </p>
              </blockquote>
            )}
            {liberation.textContinued && (
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {liberation.textContinued}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── 8. Key Pillars Section ────────────────────────────────────────── */}
      {pillars && (
        <section className="py-14 bg-[#F5F5F5]">
          <div className="container max-w-4xl">
            {pillars.heading && (
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-[#16697A]">{pillars.heading}</h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mt-3" />
              </div>
            )}
            {pillars.text && (
              <p className="text-gray-700 leading-relaxed text-[15px]">{pillars.text}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 9. Spirituality is a Lifestyle ───────────────────────────────── */}
      {spirituality && (
        <section className="py-14 bg-white">
          <div className="container max-w-4xl">
            {spirituality.heading && (
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-[#16697A]">{spirituality.heading}</h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mt-3" />
              </div>
            )}
            {spirituality.text && (
              <div className="space-y-5">
                {(spirituality.text as string).split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-gray-700 leading-relaxed text-[15px]">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 10. Life Achievements Quote (dark) ───────────────────────────── */}
      {lifeQuote && (
        <section className="py-14 bg-[#2B2828]">
          <div className="container max-w-3xl text-center">
            <div className="text-[#E2B748] text-5xl font-serif leading-none mb-4">&ldquo;</div>
            <blockquote className="font-heading text-xl md:text-2xl text-white italic leading-relaxed">
              {lifeQuote}
            </blockquote>
            <p className="mt-5 text-[#E2B748] font-semibold text-sm uppercase tracking-widest">
              — Mohanji
            </p>
          </div>
        </section>
      )}

      {/* ── 11. Global Footprint ─────────────────────────────────────────── */}
      {footprint && (
        <section className="py-14 bg-white">
          <div className="container max-w-4xl">
            {footprint.heading && (
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-[#16697A]">{footprint.heading}</h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mt-3" />
              </div>
            )}
            {footprint.text1 && (
              <p className="text-gray-700 leading-relaxed text-[15px] mb-5">{footprint.text1}</p>
            )}
            {footprint.text2 && (
              <p className="text-gray-700 leading-relaxed text-[15px]">{footprint.text2}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 12. Leading by Example ───────────────────────────────────────── */}
      {leading && (
        <section className="py-14 bg-[#F5F5F5]">
          <div className="container max-w-4xl">
            {leading.heading && (
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-[#16697A]">{leading.heading}</h2>
                <span className="block w-14 h-[2px] bg-[#E2B748] mt-3" />
              </div>
            )}
            {leading.text && (
              <p className="text-gray-700 leading-relaxed text-[15px]">{leading.text}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 13. Awards Section ───────────────────────────────────────────── */}
      {(awardsQuote || awards.length > 0) && (
        <section className="py-14 bg-white">
          <div className="container max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-3xl text-[#16697A]">Awards &amp; Recognition</h2>
              <span className="block w-14 h-[2px] bg-[#E2B748] mx-auto mt-3" />
            </div>

            {awardsQuote && (
              <blockquote className="text-center font-heading text-xl md:text-2xl text-[#16697A] italic mb-10">
                &ldquo;{awardsQuote}&rdquo;
              </blockquote>
            )}

            {awards.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {awards.map((award: any) => {
                  const imgUrl = mediaUrl(award.image)
                  return (
                    <div
                      key={award.id}
                      className="bg-[#F5F5F5] rounded-lg p-5 flex flex-col items-center text-center gap-3"
                    >
                      {imgUrl && (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={imgUrl}
                            alt={mediaAlt(award.image, award.title)}
                            fill
                            className="object-cover"
                            sizes="80px"
                            unoptimized={imgUrl.startsWith('http')}
                          />
                        </div>
                      )}
                      {!imgUrl && (
                        <div className="w-20 h-20 rounded-full bg-[#16697A]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#E2B748] text-2xl">✦</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-heading text-[#16697A] font-semibold text-base leading-snug">
                          {award.title}
                        </h3>
                        {award.organization && (
                          <p className="text-xs text-gray-500 mt-1">{award.organization}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="text-center mt-10">
              <Link
                href="/about/awards"
                className="inline-block px-8 py-3 border-2 border-[#C95D63] text-[#C95D63] font-medium rounded hover:bg-[#C95D63] hover:text-white transition-colors"
              >
                View All Awards
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 14. Initiatives Gallery ──────────────────────────────────────── */}
      {initiatives.length > 0 && (
        <section className="py-14 bg-[#F5F5F5]">
          <div className="container">
            {/* Founded by Mohanji */}
            {foundedInits.length > 0 && (
              <>
                <div className="text-center mb-10">
                  <h2 className="font-heading text-3xl text-[#16697A]">
                    Platforms Founded by Mohanji
                  </h2>
                  <span className="block w-14 h-[2px] bg-[#E2B748] mx-auto mt-3" />
                </div>
                <div className="flex flex-wrap justify-center gap-8 mb-14">
                  {foundedInits.map((init: any, i: number) => {
                    const logoUrl = mediaUrl(init.logo)
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2 w-28 text-center"
                      >
                        {logoUrl ? (
                          <div className="relative w-20 h-20">
                            <Image
                              src={logoUrl}
                              alt={mediaAlt(init.logo, init.name)}
                              fill
                              className="object-contain"
                              sizes="80px"
                              unoptimized={logoUrl.startsWith('http')}
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-white border border-[#16697A]/20 flex items-center justify-center">
                            <span className="text-[#16697A] text-xs font-medium text-center leading-tight px-1">
                              {init.name.split(' ').slice(0, 2).join(' ')}
                            </span>
                          </div>
                        )}
                        <p className="text-xs text-gray-600 leading-tight">{init.name}</p>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {/* Inspired by Mohanji */}
            {inspiredInits.length > 0 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl text-[#16697A]">
                    Initiatives Inspired by Mohanji
                  </h2>
                  <span className="block w-14 h-[2px] bg-[#E2B748] mx-auto mt-3" />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {inspiredInits.map((init: any, i: number) => (
                    <span
                      key={i}
                      className="px-5 py-2 bg-white border border-[#16697A]/30 text-[#16697A] rounded-full text-sm font-medium"
                    >
                      {init.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
