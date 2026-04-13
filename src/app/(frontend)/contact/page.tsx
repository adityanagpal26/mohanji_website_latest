'use client'

import React, { useState } from 'react'

// Note: this page uses a client component for the form interactivity.
// Metadata is handled via the parent layout since this is a client component.

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      // Payload CMS email / form submission endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Contact Us
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-lg max-w-xl mx-auto">
            We would love to hear from you. Reach out with questions, collaboration ideas, or simply to connect.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="font-heading text-2xl text-[#16697A] mb-1">Send a Message</h2>
                <span className="gold-divider" />

                {status === 'sent' ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <span className="text-4xl block mb-3">🙏</span>
                    <h3 className="font-heading text-xl text-green-700 mb-2">Message Received</h3>
                    <p className="text-green-600">
                      Thank you for reaching out. We will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 text-sm text-[#16697A] underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                          Full Name <span className="text-[#C95D63]">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                          Email Address <span className="text-[#C95D63]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Subject <span className="text-[#C95D63]">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors bg-white"
                      >
                        <option value="">Select a subject…</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Events & Retreats">Events &amp; Retreats</option>
                        <option value="Courses">Courses</option>
                        <option value="Media / Press">Media / Press</option>
                        <option value="Donations">Donations</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        Message <span className="text-[#C95D63]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors resize-vertical"
                        placeholder="Write your message here…"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full sm:w-auto px-10 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <aside className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-heading text-xl text-[#16697A] mb-1">Get in Touch</h3>
                <span className="gold-divider" />

                <div className="space-y-5 text-sm">
                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0">✉</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-0.5">Email</p>
                      <a
                        href="mailto:info@mohanji.org"
                        className="text-[#16697A] hover:underline"
                      >
                        info@mohanji.org
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0">🌐</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-0.5">Foundation</p>
                      <p className="text-gray-600">Mohanji Foundation</p>
                      <p className="text-gray-500 text-xs">Global humanitarian organisation, active in 93+ countries</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0">📱</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Follow Mohanji</p>
                      <div className="flex flex-col gap-2">
                        <a
                          href="https://www.facebook.com/mohanji.official"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16697A] hover:underline flex items-center gap-1.5"
                        >
                          <span className="text-blue-600 font-bold text-xs">f</span>
                          Facebook — Mohanji Official
                        </a>
                        <a
                          href="https://www.instagram.com/mohanjiofficial/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16697A] hover:underline flex items-center gap-1.5"
                        >
                          <span className="text-pink-500 text-xs">◉</span>
                          Instagram @MohanjiOfficial
                        </a>
                        <a
                          href="https://www.youtube.com/@Mohanji"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16697A] hover:underline flex items-center gap-1.5"
                        >
                          <span className="text-red-600 font-bold text-xs">▶</span>
                          YouTube — Mohanji
                        </a>
                        <a
                          href="https://twitter.com/MohanjiSpeak"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16697A] hover:underline flex items-center gap-1.5"
                        >
                          <span className="text-sky-500 font-bold text-xs">𝕏</span>
                          X (Twitter) @MohanjiSpeak
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#C95D63] text-lg flex-shrink-0">🤝</span>
                    <div>
                      <p className="font-semibold text-gray-700 mb-0.5">Get Involved</p>
                      <div className="flex flex-col gap-1">
                        <a href="/volunteer" className="text-[#16697A] hover:underline text-xs">Become a Volunteer</a>
                        <a href="/donate" className="text-[#16697A] hover:underline text-xs">Support the Foundation</a>
                        <a href="/about/acharyas" className="text-[#16697A] hover:underline text-xs">Find a Local Acharya</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#16697A]/5 border border-[#16697A]/20 rounded-lg p-5">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "Our goal is to reach every heart with the message of unconditional love."
                </p>
                <p className="text-xs text-[#16697A] font-semibold mt-2">— Mohanji</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
