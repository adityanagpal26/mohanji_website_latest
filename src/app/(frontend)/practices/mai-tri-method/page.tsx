'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const testimonials = [
  {
    quote:
      'As a Mai-Tri practitioner, I was a witness to many amazing miracles. We are so blessed to be connected to Mohanji and to be given this platform to serve. I have felt my faith and surrender grow exponentially since I was initiated into the Mai-Tri Method. My connection to Mohanji\'s consciousness has become deeper.',
    name: 'Tina Arya',
    location: 'USA',
  },
  {
    quote:
      'Mai-Tri is a soul impressions release system which acts on the deepest layer of our karmic and ancestral impression, the DNA and the neuron, to deliver an "impression-free soul" that can ultimately merge as an energy with the highest consciousness, when the time comes.',
    name: 'Subhasree',
    location: 'UK',
  },
  {
    quote:
      'The Grace that flows during a Mai-Tri session transcends healing — it reaches one\'s very essence, invoking the sacred inner balance already gifted to each of us by the Source. Love is the path and destination. May we experience a lasting inner transformation through that Love.',
    name: 'Devi Mohan',
    location: 'Slovenia',
  },
]

const faqs = [
  {
    question: 'What is Mai-Tri Method?',
    answer:
      'Mai-Tri Method is a profound method of deep cleansing and harmonizing in which deep-seated subconscious blockages are removed, even from the subtlest layer of our existence — the causal body — where seeds of karmic impressions are stored. While the cleansing reaches deep into the energy records, it is important to note that Mai-Tri Method does not interfere with the destiny aspect of karma.',
  },
  {
    question: 'Who can perform Mai-Tri Method?',
    answer:
      'The Mai-Tri Method is performed by initiated Practitioners who connect with the consciousness of Mohanji, passing on the energy through their palms to the recipient\'s chakras (energy centers) from the front and the back side of the body.',
  },
  {
    question: 'Who can experience Mai-Tri Method?',
    answer:
      'The Mai-Tri Method can be experienced by individuals of all age groups — from small children (5 years of age and above) to senior citizens, in any state of health. For pregnant ladies and children, Mai-Tri is milder and is done primarily for health purposes, rejuvenation and protection.',
  },
  {
    question: 'How long is a session?',
    answer:
      'Individual sessions are 30 minutes long. On the whole, the meeting is up to one hour long, including explanations and experience sharing. Group sessions can be from 60 to 90 minutes long.',
  },
  {
    question: 'Can Mai-Tri be done online?',
    answer:
      'Yes. Group sessions can be done in person or online, with invocation of Mohanji\'s subtle presence for protection and effectiveness. There is no hand-to-chakra application in group online sessions — only energy work based on verbal guidance.',
  },
  {
    question: 'What is the energy exchange?',
    answer:
      'The honoring of energy exchange is an important aspect of the Mai-Tri Method. Half of the amount that Mai-Tri Practitioners receive is allocated to feeding of people and other sentient beings in need. Satiating the hunger of another being through selfless service adds to the depth of the cleansing and balancing effect. The amount is to be confirmed with the selected practitioner directly.',
  },
]

export default function MaiTriMethodPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    sessionType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function toggleFaq(i: number) {
    setActiveIndex(activeIndex === i ? null : i)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Mai-Tri Method Session Request',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          sessionType: formData.sessionType,
          message: formData.message,
          type: 'mai-tri-request',
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', phone: '', country: '', sessionType: '', message: '' })
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or contact us directly.')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image
          src="https://mohanji.org/wp-content/uploads/2021/11/Group-1159.png"
          alt="Mai-Tri Method"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container relative z-10 py-14 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-3">
            Mai-Tri Method
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto mt-4">
            Align and heal your body, mind and spirit. A profound method of deep cleansing and
            harmonizing — removing blockages even from the subtlest layer of existence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="#request-session"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-7 py-3 rounded font-medium transition-colors"
            >
              Request a Session
            </a>
            <a
              href="#faqs"
              className="border-2 border-white text-white hover:bg-white hover:text-[#16697A] px-7 py-3 rounded transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* What is Mai-Tri */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">What is Mai-Tri Method?</h2>
          <span className="gold-divider" />
          <div className="mt-6 space-y-5 text-gray-700 leading-relaxed text-[15px]">
            <p>
              Mai-Tri Method is a profound method of deep cleansing and harmonizing in which
              deep-seated subconscious blockages are removed, even from the subtlest layer of our
              existence — the causal body — where seeds of karmic impressions are stored. While the
              cleansing reaches deep into the energy records, it is important to note that Mai-Tri
              Method does not interfere with the destiny aspect of karma (as this is what has been
              chosen at the soul level, be it pleasant or unpleasant to our mind).
            </p>
            <p>
              Mai-Tri Method, for the practitioner, is meditation with a purpose. Through extreme
              concentration (Dharana) during the process, the practitioner reaches the meditative
              state (Dhyana), where there is no existence of the practitioner as such and he/she
              only operates as the pure conduit to carry the energy flowing through Mohanji&apos;s
              consciousness, from the Source itself. This enables the healing to happen, depending
              on the karmic allowance and the client&apos;s receptivity and free will. Hence Mai-Tri
              is a Meditation with purpose and is a sadhana (spiritual practice) for a practitioner.
            </p>
          </div>
        </div>
      </section>

      {/* Meaning of the word */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">
            Meaning of the Word &ldquo;Mai-Tri&rdquo;
          </h2>
          <span className="gold-divider" />
          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed text-[15px]">
            <p>
              The actual word meaning of &ldquo;Mai-tri&rdquo; is friendship, companionship,
              collaboration, or simply togetherness. &ldquo;Mai&rdquo; means mother. The word
              mother represents unconditional love, protection, care, consistency of emotions,
              continuity, life, creation. Mother also represents levitation, as in the womb
              experience. A child finds solace, comfort, freedom and peace in the company of its
              mother. The sheer presence of mother is itself healing for the child. Motherhood has
              spontaneous healing impacts on the child.
            </p>
            <p>
              &ldquo;Tri&rdquo; represents trinity. The three aspects of creation are BIRTH, LIFE
              and DEATH. Trinity also represents the three powers — Will Power, Knowledge Power,
              and Power of Action. Hence, the word tri represents all aspects of existence. When
              the pure and eternal energy source combines with the power of will for creation, LIFE
              happens.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">Benefits</h2>
          <span className="gold-divider" />
          <p className="text-gray-700 leading-relaxed mt-6">
            This method leads to self-healing and restoration of inner balance at all levels.
            There are three parts to every Mai-Tri session, each with a distinct benefit:
          </p>
          <ul className="mt-6 space-y-4">
            {[
              'Cleansing of the painful impressions and memories and their effects gathered in the present life, starting with early childhood.',
              'Cleansing of the impressions of the past from the subconscious mind.',
              'Cleansing of the central meridian in order to remove blockages and improve the flow of energy through it.',
            ].map((benefit, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#16697A] text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mt-6">
            As these deep patterns get released, clarity at the level of the mind ensues. The
            recipient is empowered to become aware of the key impressions causing imbalances, and
            to understand which unhealthy habits, behavioural and thought patterns need changing.
            After the practice, when a lot of weight from deep within has dropped, one enters the
            mode of alignment and self-healing at the level of body, mind and spirit.
          </p>
        </div>
      </section>

      {/* Mohanji on self-healing */}
      <section className="py-14 bg-[#16697A] text-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl mb-4">Mohanji on Self-Healing</h2>
          <span className="gold-divider" />
          <blockquote className="mt-6 font-heading text-lg leading-relaxed text-white/90 italic">
            &ldquo;Healing is a part of creation. Healing, revitalization and rejuvenation are
            aspects deeply connected to the very fabric of terrestrial existence. Healing happens
            automatically, as long as the mind does not prevent it. Spontaneous healing takes place
            when we allow nature to function without interruption. Healers are just intenders. They
            intend that healing takes place. The receiver allows it to happen. We all are natural
            healers; every man, woman and child naturally possess the capacity to heal themselves.&rdquo;
          </blockquote>
          <p className="mt-4 text-[#E2B748] font-semibold">— Mohanji</p>
        </div>
      </section>

      {/* Session types */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            Individual &amp; Group Sessions
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#16697A]">
              <h3 className="font-heading text-xl text-[#16697A] mb-3">Individual Sessions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Individual sessions are 30 minutes long. The overall meeting is up to one hour,
                including explanations and experience sharing. Practitioners place their palms on
                the recipient&apos;s chakras (energy centres) from the front and back of the body,
                serving as a pure conduit for Mohanji&apos;s energy.
              </p>
              <p className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mt-4">
                In-person or online
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#E2B748]">
              <h3 className="font-heading text-xl text-[#16697A] mb-3">Group Sessions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Group sessions are conducted only by selected senior Mai-Tri practitioners. They
                can be done in-person or online, with invocation of Mohanji&apos;s subtle presence
                for protection and effectiveness. There is no hand-to-chakra application — only
                energy work based on verbal guidance. Group energy during these sessions is very
                strong and the cleansing processes are deep.
              </p>
              <p className="text-xs text-[#C95D63] font-semibold uppercase tracking-wide mt-4">
                60–90 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Exchange */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-2xl text-[#16697A] mb-2">Energy Exchange</h2>
          <span className="gold-divider" />
          <p className="text-gray-700 leading-relaxed mt-6">
            The honoring of energy exchange is an important aspect of the Mai-Tri Method.{' '}
            <strong>Half of the amount that Mai-Tri Practitioners receive is allocated to
            feeding people and other sentient beings in need.</strong> Satiating the hunger of
            another being through selfless service adds to the depth of the cleansing and
            balancing effect of the Mai-Tri Method. The amount exchanged needs to be confirmed
            with the selected Mai-Tri practitioner directly.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">Testimonials</h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#E2B748] flex flex-col"
              >
                <p className="text-gray-700 italic leading-relaxed text-sm flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="font-semibold text-[#16697A] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl text-[#16697A] mb-2">FAQs</h2>
          <span className="gold-divider" />
          <div className="mt-8 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#F5F5F5] transition-colors"
                >
                  <span className="font-heading text-[#16697A] text-base font-semibold leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#16697A] flex items-center justify-center text-[#16697A] transition-transform ${
                      activeIndex === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {activeIndex === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request a Session Form */}
      <section id="request-session" className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            How to Book a Mai-Tri Session
          </h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-gray-600 text-center mt-4 mb-8">
            If you would like to book a Mai-Tri session or have any additional questions, please
            complete the form below and we will connect you with a practitioner in your region.
          </p>

          <div className="bg-white rounded-lg shadow-sm p-8">
            {status === 'sent' ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">🙏</span>
                <h3 className="font-heading text-2xl text-[#16697A] mb-3">Request Received</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Thank you for your interest in Mai-Tri Method. We will be in touch shortly to
                  connect you with a practitioner.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-[#16697A] underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-[#C95D63]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-[#C95D63]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Session Type <span className="text-[#C95D63]">*</span>
                  </label>
                  <select
                    name="sessionType"
                    required
                    value={formData.sessionType}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors bg-white"
                  >
                    <option value="">Select session type…</option>
                    <option value="Individual (In-Person)">Individual — In-Person</option>
                    <option value="Individual (Online)">Individual — Online</option>
                    <option value="Group Session">Group Session</option>
                    <option value="Not sure">Not sure — please advise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Message / Questions
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about yourself, your intention for seeking a session, or any questions you have…"
                    className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-4 py-3 rounded">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Request a Session'}
                </button>

                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  We will connect you with a Mai-Tri practitioner in your region. No payment is
                  required at this stage.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Back to practices */}
      <section className="py-12 bg-white text-center">
        <div className="container">
          <Link
            href="/practices"
            className="border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-7 py-3 rounded font-medium transition-colors"
          >
            ← All Practices
          </Link>
        </div>
      </section>
    </div>
  )
}
