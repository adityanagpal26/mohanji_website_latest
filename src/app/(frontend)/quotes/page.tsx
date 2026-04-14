import React from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Words of Wisdom | Mohanji',
  description:
    "Browse Mohanji's words of wisdom — profound quotes on love, consciousness, service, life, and the spiritual path. Organised by topic.",
}

const TOPIC_COLORS: Record<string, string> = {
  Love: 'bg-[#C95D63] text-white',
  Consciousness: 'bg-[#16697A] text-white',
  Service: 'bg-[#5B2D8E] text-white',
  Transformation: 'bg-[#E2B748] text-[#191919]',
  Silence: 'bg-gray-600 text-white',
  Relationships: 'bg-teal-600 text-white',
  Gratitude: 'bg-green-600 text-white',
  Nature: 'bg-green-700 text-white',
  Surrender: 'bg-indigo-600 text-white',
  Compassion: 'bg-rose-600 text-white',
  Acceptance: 'bg-cyan-700 text-white',
  Faith: 'bg-amber-700 text-white',
}

export default async function QuotesPage() {
  const payload = await getPayloadClient()

  const { docs: quotes } = await payload.find({
    collection: 'quotes',
    sort: 'topic',
    depth: 1,
    limit: 100,
  })

  // Group by topic
  const byTopic: Record<string, any[]> = {}
  for (const quote of quotes as any[]) {
    const topic =
      typeof quote.topic === 'string'
        ? quote.topic
        : Array.isArray(quote.topic)
          ? quote.topic[0] ?? 'General'
          : 'General'
    if (!byTopic[topic]) byTopic[topic] = []
    byTopic[topic].push(quote)
  }

  const topics = Object.keys(byTopic).sort()

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Words of Wisdom
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Timeless teachings from Mohanji — distilled into words that illuminate the path.
          </p>
        </div>
      </section>

      {quotes.length === 0 ? (
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container text-center">
            <p className="text-gray-500 py-12">
              Quotes are being added. Please check back soon.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Topic filters */}
          <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
            <div className="container">
              <div className="flex flex-wrap gap-2 justify-center">
                {topics.map((topic) => {
                  const color = TOPIC_COLORS[topic] ?? 'bg-gray-200 text-gray-700'
                  return (
                    <a
                      key={topic}
                      href={`#topic-${topic.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80 ${color}`}
                    >
                      {topic} ({byTopic[topic].length})
                    </a>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Quotes by topic */}
          <section className="py-16 bg-[#F5F5F5]">
            <div className="container">
              {topics.map((topic, topicIndex) => (
                <div
                  key={topic}
                  id={`topic-${topic.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`mb-16 ${topicIndex !== 0 ? 'pt-4' : ''}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-heading text-2xl text-[#16697A]">{topic}</h2>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${TOPIC_COLORS[topic] ?? 'bg-gray-200 text-gray-700'}`}
                    >
                      {byTopic[topic].length} quote{byTopic[topic].length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {byTopic[topic].map((quote: any, i: number) => (
                      <div
                        key={quote.id ?? i}
                        className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#E2B748] hover:shadow-md transition-shadow"
                      >
                        <div className="text-[#E2B748] text-4xl font-heading leading-none mb-2">&ldquo;</div>
                        <p className="text-gray-700 leading-relaxed italic text-sm">
                          {quote.text ?? quote.quote ?? ''}
                        </p>
                        <p className="text-right text-[#16697A] font-semibold text-sm mt-4">
                          &mdash; Mohanji
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
