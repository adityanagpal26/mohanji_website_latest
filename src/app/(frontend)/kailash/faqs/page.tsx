'use client'

import React, { useState } from 'react'

export const dynamic = 'force-dynamic'

const faqs = [
  {
    question: 'Who is eligible to join the Kailash pilgrimage?',
    answer:
      'The pilgrimage is open to sincere seekers of all backgrounds and nationalities. Participants must be in good physical health and able to walk 15–22 km per day at high altitude. A medical certificate may be required. Age limit is generally 18–65, though exceptions can be made based on individual fitness.',
  },
  {
    question: 'What is the best time to visit Mount Kailash?',
    answer:
      'The pilgrimage season runs from May to September, when the mountain passes and the Tibetan Plateau are accessible. The most popular months are June, July, and August. The Mohanji Foundation typically organises pilgrimages during June–August.',
  },
  {
    question: 'How physically demanding is the Kailash Parikrama?',
    answer:
      'The parikrama (circumambulation) covers approximately 52 kilometres over three days. The most challenging day involves ascending Dolma La Pass at 5,630 metres. The walk requires a reasonable level of fitness and acclimatisation to high altitude. We provide full support, but participants must be prepared for strenuous trekking.',
  },
  {
    question: 'What permits are required?',
    answer:
      'Travel to Tibet requires a Chinese Visa, a Tibet Travel Permit (TTP), an Alien Travel Permit (ATP), and a Military Area Permit (MAP). Our team handles all permit applications on your behalf — you simply provide the required documentation and we manage the process.',
  },
  {
    question: 'What is altitude sickness and how is it managed?',
    answer:
      'Altitude sickness (AMS — Acute Mountain Sickness) can affect travellers at elevations above 3,000m. Symptoms include headache, nausea, dizziness, and fatigue. Our itinerary includes carefully planned acclimatisation stops. We carry oxygen cylinders and first aid supplies, and our team is trained in altitude sickness management. Participants are advised to consult their doctor before the trip.',
  },
  {
    question: 'What is included in the pilgrimage cost?',
    answer:
      'The package typically includes all permits, accommodation (twin-sharing), meals (vegetarian), ground transportation throughout the journey, spiritual guidance and meditations, and full logistical support. International flights to/from Delhi or Kathmandu are not included.',
  },
  {
    question: 'Can I do the parikrama by yak or pony?',
    answer:
      'Yes, yaks and ponies are available for hire at Darchen for pilgrims who need additional support during the parikrama. This can be arranged locally and is an additional cost not included in the package.',
  },
  {
    question: 'What is the group size?',
    answer:
      'To ensure a sacred, intimate, and well-supported experience, the Mohanji Kailash pilgrimage is limited to a small group of 15–25 pilgrims.',
  },
  {
    question: 'What should I pack?',
    answer:
      'A detailed packing list will be provided upon registration. Key items include warm clothing (temperatures can drop to -10°C at night), waterproof jacket, sturdy trekking boots, sunscreen, sunglasses, altitude medication (Diamox — consult your doctor), and personal medications.',
  },
  {
    question: 'Is the pilgrimage vegetarian?',
    answer:
      'Yes, all meals provided throughout the pilgrimage are strictly vegetarian, in keeping with the spiritual nature of the journey.',
  },
  {
    question: 'What if I need to cancel?',
    answer:
      'Please refer to the Terms & Conditions for the full cancellation policy. In general, cancellations made more than 60 days before departure receive a partial refund. Cancellations within 60 days are non-refundable as costs will have been committed with local operators and permit authorities. We strongly recommend travel insurance that covers cancellation and emergency evacuation.',
  },
  {
    question: 'Will Mohanji be present on every pilgrimage?',
    answer:
      'Mohanji personally leads select pilgrimages each season. Other pilgrimages are led by senior Mohanji Acharyas who transmit the same spiritual energy and guidance. Availability is confirmed at the time of booking.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#F5F5F5] transition-colors"
      >
        <span className="font-heading text-lg text-[#16697A] pr-4">{question}</span>
        <span className="text-[#E2B748] text-2xl flex-shrink-0 transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed pt-4">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function KailashFAQsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Kailash Pilgrimage — FAQs
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Answers to the most common questions about the Kailash pilgrimage.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 text-center shadow-sm">
            <p className="text-gray-600 mb-4">
              Don't see your question answered here? We're happy to help.
            </p>
            <a
              href="/contact"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
