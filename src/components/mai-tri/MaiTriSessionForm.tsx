'use client'

import React, { useState } from 'react'

export function MaiTriSessionForm() {
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

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-4">🙏</span>
        <h3 className="font-heading text-2xl text-[#16697A] mb-3">Request Received</h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          Thank you for your interest in Mai-Tri Method. We will be in touch shortly to connect
          you with a practitioner in your region.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-[#16697A] underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
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
          <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
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
        <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-4 py-3 rounded">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Request a Session'}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        We will connect you with a Mai-Tri practitioner in your region. No payment is required
        at this stage.
      </p>
    </form>
  )
}
