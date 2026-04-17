'use client'

import React, { useState } from 'react'

export const dynamic = 'force-dynamic'

const SUBJECTS = [
  '7-day programs',
  '21-day programs',
  "Mohanji's schedule",
  'Questions for Mohanji Acharyas',
  'Event / Retreat related',
  'Website feedback',
  'General Queries',
  'Consciousness Kriya',
  'Mai-Tri Method',
  'Practices',
  'Conscious Chanting',
  'Others',
]

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Bolivia','Bosnia and Herzegovina',
  'Brazil','Bulgaria','Cambodia','Canada','Chile','China','Colombia','Croatia',
  'Czech Republic','Denmark','Egypt','Estonia','Ethiopia','Finland','France',
  'Georgia','Germany','Ghana','Greece','Hungary','India','Indonesia','Iran',
  'Iraq','Ireland','Israel','Italy','Japan','Jordan','Kazakhstan','Kenya',
  'Kuwait','Latvia','Lebanon','Lithuania','Luxembourg','Malaysia','Mexico',
  'Moldova','Morocco','Myanmar','Nepal','Netherlands','New Zealand','Nigeria',
  'North Macedonia','Norway','Pakistan','Peru','Philippines','Poland','Portugal',
  'Qatar','Romania','Russia','Saudi Arabia','Serbia','Singapore','Slovakia',
  'Slovenia','South Africa','South Korea','Spain','Sri Lanka','Sweden',
  'Switzerland','Thailand','Turkey','Ukraine','United Arab Emirates',
  'United Kingdom','United States','Uzbekistan','Venezuela','Vietnam','Other',
]

type FormData = {
  name: string
  email: string
  phone: string
  country: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setStatus('sent')
      setFormData({ name: '', email: '', phone: '', country: '', subject: '', message: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us directly at info@mohanji.org.')
    }
  }

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Reach Out
          </p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Contact Us
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
          <p className="text-white/85 text-lg max-w-xl mx-auto">
            We would love to hear from you. Reach out with questions, collaboration ideas, or simply to connect.
          </p>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Contact form ─────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="font-heading text-2xl text-[#16697A] mb-1">Send a Message</h2>
                <span className="block w-10 h-0.5 bg-[#E2B748] mb-6" />

                {status === 'sent' ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <span className="text-5xl block mb-4">🙏</span>
                    <h3 className="font-heading text-2xl text-green-700 mb-2">Message Received</h3>
                    <p className="text-green-600 leading-relaxed">
                      Thank you for reaching out. Our team will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-sm text-[#16697A] underline hover:text-[#C95D63] transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-[#C95D63]">*</span>
                        </label>
                        <input
                          id="name" name="name" type="text" required
                          value={formData.name} onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-[#C95D63]">*</span>
                        </label>
                        <input
                          id="email" name="email" type="email" required
                          value={formData.email} onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A]/20 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone + Country */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone <span className="text-gray-400 font-normal text-xs ml-1">(optional)</span>
                        </label>
                        <input
                          id="phone" name="phone" type="tel"
                          value={formData.phone} onChange={handleChange}
                          placeholder="+1 234 567 8900"
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Country <span className="text-[#C95D63]">*</span>
                        </label>
                        <select
                          id="country" name="country" required
                          value={formData.country} onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A]/20 transition-colors bg-white"
                        >
                          <option value="">Select your country…</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject <span className="text-[#C95D63]">*</span>
                      </label>
                      <select
                        id="subject" name="subject" required
                        value={formData.subject} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A]/20 transition-colors bg-white"
                      >
                        <option value="">Select a topic…</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message <span className="text-[#C95D63]">*</span>
                      </label>
                      <textarea
                        id="message" name="message" required rows={6}
                        value={formData.message} onChange={handleChange}
                        placeholder="Write your message here…"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A]/20 transition-colors resize-vertical"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full sm:w-auto px-10 py-3 bg-[#C95D63] text-white font-semibold rounded-lg hover:bg-[#f4442e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center gap-2">
                          <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-heading text-xl text-[#16697A] mb-1">Get in Touch</h3>
                <span className="block w-8 h-0.5 bg-[#E2B748] mb-5" />

                <div className="space-y-5 text-sm">
                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0 mt-0.5">✉</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-0.5">Email</p>
                      <a href="mailto:info@mohanji.org" className="text-[#16697A] hover:underline">
                        info@mohanji.org
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0 mt-0.5">🌐</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-0.5">Foundation</p>
                      <p className="text-gray-600">Mohanji Foundation</p>
                      <p className="text-gray-500 text-xs mt-0.5">Global humanitarian organisation, active in 93+ countries</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0 mt-0.5">📱</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Follow Mohanji</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { href: 'https://www.facebook.com/mohanji.official', icon: 'f', color: 'text-blue-600', label: 'Facebook — MohanjiOfficial' },
                          { href: 'https://www.instagram.com/mohanjiofficial/', icon: '◉', color: 'text-pink-500', label: 'Instagram @MohanjiOfficial' },
                          { href: 'https://www.youtube.com/@Mohanji', icon: '▶', color: 'text-red-600', label: 'YouTube — Mohanji' },
                          { href: 'https://twitter.com/MohanjiSpeak', icon: '𝕏', color: 'text-sky-500', label: 'X (Twitter) @MohanjiSpeak' },
                        ].map(({ href, icon, color, label }) => (
                          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                            className="text-[#16697A] hover:underline flex items-center gap-1.5">
                            <span className={`${color} font-bold text-xs`}>{icon}</span>
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0 mt-0.5">🤝</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Get Involved</p>
                      <div className="flex flex-col gap-1.5">
                        <a href="/join/volunteer" className="text-[#16697A] hover:underline text-xs">Become a Volunteer</a>
                        <a href="/donate" className="text-[#16697A] hover:underline text-xs">Support the Foundation</a>
                        <a href="/about/acharyas" className="text-[#16697A] hover:underline text-xs">Find a Local Acharya</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#16697A]/5 border border-[#16697A]/20 rounded-xl p-5">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;Our goal is to reach every heart with the message of unconditional love.&rdquo;
                </p>
                <p className="text-xs text-[#16697A] font-semibold mt-3">— Mohanji</p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  )
}
