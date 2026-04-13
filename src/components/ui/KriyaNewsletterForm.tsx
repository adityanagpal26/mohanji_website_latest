'use client'

import React, { useState } from 'react'

export function KriyaNewsletterForm() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          consent: true,
          list: 'consciousness-kriya',
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '' })
      } else {
        throw new Error('Subscription failed')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-4">
        <span className="text-3xl block mb-2">🙏</span>
        <p className="text-[#16697A] font-semibold font-heading">Thank you for subscribing!</p>
        <p className="text-sm text-gray-500 mt-1">
          You will receive updates about Consciousness Kriya events and news.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
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
      {status === 'error' && (
        <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-3 py-2 rounded">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-3 bg-[#16697A] text-white font-medium rounded hover:bg-[#125567] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Subscribing…' : 'Sign Up for Newsletter'}
      </button>
    </form>
  )
}
