import React from 'react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sacred Places of the Kailash Pilgrimage | Mohanji',
  description:
    'Explore the sacred places visited during the Mohanji Kailash pilgrimage — Mount Kailash, Lake Mansarovar, Diraphuk Monastery, Dolma La Pass, and more.',
}

const places = [
  {
    name: 'Mount Kailash',
    altitude: '6,638m',
    significance: 'Hindu, Buddhist, Jain, Bon',
    description:
      'The most sacred mountain on Earth, Mount Kailash has never been climbed. Four great religions converge here: Hindus revere it as the abode of Lord Shiva; Buddhists see it as the seat of Chakrasamvara; Jains call it Mount Ashtapada where their first Tirthankara attained liberation; the Bon tradition considers it the soul of the world. The mountain is circumambulated — never summited — in an act of profound reverence.',
  },
  {
    name: 'Lake Mansarovar',
    altitude: '4,590m',
    significance: 'Hindu, Buddhist',
    description:
      'One of the world\'s highest freshwater lakes, Lake Mansarovar is described in Hindu scriptures as the mind of Brahma (the word "Manasa" means mind in Sanskrit). Bathing in or drinking from its crystal-clear waters is believed to cleanse all accumulated karma. At dawn, the reflection of Mount Kailash in the lake is one of the most breathtaking sights on Earth.',
  },
  {
    name: 'Rakshas Tal',
    altitude: '4,556m',
    significance: 'Hindu',
    description:
      'The "Demon Lake" lies adjacent to Mansarovar, separated by a narrow isthmus. Hindu mythology describes it as the lake created by Ravana to meditate upon Shiva. Its darker waters form a striking contrast to the brilliant blue of Mansarovar, representing the duality of dark and light, ignorance and knowledge.',
  },
  {
    name: 'Tarboche',
    altitude: '4,750m',
    significance: 'Buddhist, Bon',
    description:
      'Tarboche is the starting point of the Kailash Parikrama. Every year, during the Saga Dawa festival, a giant flagpole (the Tarboche Pole) is re-erected here with great ceremony. The angle at which the pole stands is said to indicate the auspiciousness of the coming year.',
  },
  {
    name: 'Diraphuk Monastery',
    altitude: '4,890m',
    significance: 'Buddhist',
    description:
      'Located on the northern face of Mount Kailash, Diraphuk Monastery offers the closest and most dramatic view of the sacred peak. Pilgrims rest here on the first night of the parikrama. The monastery belongs to the Drukpa Kagyu school of Tibetan Buddhism and is one of the oldest in the Kailash region.',
  },
  {
    name: 'Dolma La Pass',
    altitude: '5,630m',
    significance: 'Buddhist, Hindu',
    description:
      'The highest point of the Kailash Parikrama, Dolma La is dedicated to Tara (Dolma in Tibetan) — the goddess of compassion and liberation. Pilgrims leave offerings of hair, clothing, and personal items at the sacred rock near the summit, symbolically leaving behind their attachments and old identities. The view from the top is indescribably magnificent.',
  },
  {
    name: 'Gauri Kund',
    altitude: '5,608m',
    significance: 'Hindu',
    description:
      'A small glacial lake just below Dolma La, Gauri Kund is sacred to Goddess Parvati (Gauri). Hindu pilgrims believe that bathing in this frozen lake purifies the soul completely. In early season the lake is frozen solid; in late summer it thaws to a piercing turquoise blue.',
  },
  {
    name: 'Zutulpuk Monastery',
    altitude: '4,760m',
    significance: 'Buddhist',
    description:
      'The final monastery on the parikrama, Zutulpuk (meaning "Cave of Miracles") is associated with the great Tibetan yogi Milarepa, who is said to have meditated here. Pilgrims rest here on the second night of the parikrama, having crossed the sacred Dolma La Pass.',
  },
  {
    name: 'Tirthapuri',
    altitude: '4,600m',
    significance: 'Hindu, Buddhist',
    description:
      'Located about 80 kilometres west of Mount Kailash, Tirthapuri is famous for its hot springs and geysers. It is considered one of the most sacred sites in the Kailash region — a place where Guru Rinpoche (Padmasambhava) is said to have meditated. Many pilgrims stop here on the way to or from Kailash.',
  },
]

export default function KailashPlacesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Sacred Places of Importance
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            The Kailash pilgrimage passes through some of the most sacred sites on Earth — each
            carrying millennia of spiritual power and blessing.
          </p>
        </div>
      </section>

      {/* Places */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {places.map((place, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
              >
                {/* Index / marker */}
                <div className="md:w-24 bg-gradient-to-b from-[#16697A] to-[#5B2D8E] text-white flex flex-col items-center justify-center p-4 text-center flex-shrink-0">
                  <span className="font-heading text-3xl font-semibold">{index + 1}</span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <h3 className="font-heading text-2xl text-[#16697A]">{place.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs bg-[#16697A]/10 text-[#16697A] px-2 py-0.5 rounded">
                        {place.altitude}
                      </span>
                      <span className="text-xs bg-[#E2B748]/20 text-[#16697A] px-2 py-0.5 rounded">
                        {place.significance}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
