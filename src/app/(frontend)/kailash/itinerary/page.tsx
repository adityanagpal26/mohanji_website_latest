import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Kailash Pilgrimage Itinerary | Mohanji',
  description:
    'Day-by-day itinerary for the Mohanji Kailash pilgrimage — from Delhi to Mount Kailash, Lake Mansarovar, and back.',
}

const itinerary = [
  {
    day: 'Day 1',
    location: 'Delhi, India',
    title: 'Arrival & Group Assembly',
    description:
      'Pilgrims arrive in Delhi. Evening orientation meeting with the Mohanji team. Introduction to the journey, safety briefing, and group meditation. Overnight in Delhi.',
    altitude: '216m',
  },
  {
    day: 'Day 2',
    location: 'Kathmandu, Nepal',
    title: 'Flight to Kathmandu',
    description:
      'Morning flight to Kathmandu. Afternoon acclimatisation walk and sightseeing. Group meditation at a sacred temple. Evening satsang with the group. Overnight in Kathmandu.',
    altitude: '1,400m',
  },
  {
    day: 'Day 3',
    location: 'Lhasa, Tibet',
    title: 'Flight to Lhasa — The Roof of the World',
    description:
      'Flight from Kathmandu to Lhasa. Rest and acclimatisation — this is crucial at this altitude. Light walk in the afternoon. Evening group meditation and preparation for the journey ahead.',
    altitude: '3,656m',
  },
  {
    day: 'Day 4',
    location: 'Shigatse, Tibet',
    title: 'Lhasa to Shigatse',
    description:
      'Drive from Lhasa to Shigatse via the Friendship Highway. Visit Tashilhunpo Monastery, one of the most magnificent Tibetan Buddhist complexes. Overnight in Shigatse.',
    altitude: '3,840m',
  },
  {
    day: 'Day 5',
    location: 'Saga, Tibet',
    title: 'Shigatse to Saga',
    description:
      'Long scenic drive across the Tibetan plateau. The landscape becomes increasingly dramatic and remote. Afternoon meditation in the open plains. Overnight in Saga.',
    altitude: '4,640m',
  },
  {
    day: 'Day 6',
    location: 'Lake Mansarovar, Tibet',
    title: 'Arrival at Lake Mansarovar',
    description:
      'Drive to the sacred Lake Mansarovar. First darshan of Mount Kailash in the distance. Sacred bath in the waters of Mansarovar. Mohanji energy transmission by the lake. Evening puja and meditation.',
    altitude: '4,590m',
  },
  {
    day: 'Day 7',
    location: 'Darchen, Tibet',
    title: 'Lake Mansarovar to Darchen',
    description:
      'Morning meditation at Mansarovar. Drive to Darchen — the base camp for the Kailash Parikrama. Acclimatisation and preparation for the parikrama. Offering ceremony at the base of Kailash.',
    altitude: '4,560m',
  },
  {
    day: 'Day 8',
    location: 'Diraphuk, Tibet',
    title: 'Parikrama Day 1 — Darchen to Diraphuk',
    description:
      'Begin the sacred circumambulation of Mount Kailash. 22km trek through stunning Himalayan scenery. Pass through the Tarboche flagpole site. Arrive at Diraphuk Monastery with the north face of Kailash in full view. Evening meditation under the stars.',
    altitude: '4,890m',
  },
  {
    day: 'Day 9',
    location: 'Zutulpuk, Tibet',
    title: 'Parikrama Day 2 — Diraphuk to Zutulpuk',
    description:
      'The most challenging day — ascent to Dolma La Pass (the highest point of the parikrama at 5,630m). Sacred stopping point for offerings and prayers. Descent to Zutulpuk monastery. Evening ceremony.',
    altitude: '5,630m (pass)',
  },
  {
    day: 'Day 10',
    location: 'Darchen, Tibet',
    title: 'Parikrama Day 3 — Complete the Sacred Circle',
    description:
      'Complete the circumambulation, returning to Darchen. Celebration and gratitude ceremony. Rest and reflection. The parikrama is complete.',
    altitude: '4,560m',
  },
  {
    day: 'Day 11',
    location: 'Saga / Return',
    title: 'Begin Return Journey',
    description:
      'Begin the return drive toward Nepal. Travel through the majestic Tibetan landscape. Evening satsang — sharing experiences and insights from the pilgrimage.',
    altitude: '4,640m',
  },
  {
    day: 'Day 12',
    location: 'Kathmandu, Nepal',
    title: 'Return to Kathmandu',
    description:
      'Complete the return to Kathmandu. Rest, recovery, and celebration dinner. Closing ceremony and group meditation.',
    altitude: '1,400m',
  },
  {
    day: 'Day 13',
    location: 'Home',
    title: 'Departure',
    description:
      'Pilgrims depart for their home countries, carrying the blessings of Kailash within them.',
    altitude: '',
  },
]

export default function KailashItineraryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Kailash Pilgrimage Itinerary
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            A 13-day sacred journey from Delhi to the summit of the world — and back transformed.
          </p>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {itinerary.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                {/* Day badge */}
                <div className="md:w-32 bg-[#16697A] text-white flex flex-col items-center justify-center p-4 text-center flex-shrink-0">
                  <p className="font-heading text-lg font-semibold">{item.day}</p>
                  {item.altitude && (
                    <p className="text-white/70 text-xs mt-1">{item.altitude}</p>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <h3 className="font-heading text-xl text-[#16697A]">{item.title}</h3>
                    <span className="text-xs bg-[#E2B748]/20 text-[#16697A] px-2 py-0.5 rounded font-medium">
                      {item.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-10 bg-[#16697A]/10 border border-[#16697A]/20 rounded-lg p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#16697A]">Please note:</strong> The exact itinerary may
              vary depending on weather conditions, permit requirements, group acclimatisation, and
              other factors. The team will keep all pilgrims informed of any changes. Altitude
              sickness is a serious consideration — all pilgrims are required to follow the
              acclimatisation protocols provided by the team.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/kailash/application"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
            >
              Apply for This Pilgrimage
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
