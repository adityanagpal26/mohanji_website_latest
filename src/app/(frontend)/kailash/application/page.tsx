'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const COUNTRIES = [
  'Australia', 'Brazil', 'Canada', 'France', 'Germany', 'India', 'Indonesia',
  'Italy', 'Malaysia', 'Netherlands', 'New Zealand', 'Russia', 'Serbia',
  'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom',
  'United States', 'Other',
]

export default function KailashApplicationPage() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    nationality: '',
    message: '',
    agreeTerms: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!formState.agreeTerms) {
      setError('Please agree to the Terms & Conditions to proceed.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Kailash Pilgrimage Application',
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          phone: formState.phone,
          country: formState.country,
          nationality: formState.nationality,
          message: formState.message,
          type: 'kailash-application',
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Unable to submit. Please email us directly at info@mohanji.org.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div>
        <section className="hero-gradient py-20 text-center text-white">
          <div className="container">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
              Application Received
            </h1>
            <span className="gold-divider gold-divider--center" />
          </div>
        </section>
        <section className="py-20 bg-white text-center">
          <div className="container max-w-xl">
            <div className="text-5xl mb-6">🙏</div>
            <h2 className="font-heading text-3xl text-[#16697A] mb-4">Thank You</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Your application has been received. Our team will review your request and be in
              touch within 5 business days with further information about the Kailash pilgrimage.
            </p>
            <Link
              href="/kailash"
              className="border-2 border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white px-6 py-3 rounded transition-colors"
            >
              Back to Kailash
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Kailash Pilgrimage — Request Information
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Complete the form below to express your interest in joining the Kailash pilgrimage.
            Our team will contact you with full details.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="font-heading text-2xl text-[#16697A] mb-1">Your Details</h2>
            <span className="gold-divider" />

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-[#C95D63]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formState.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-[#C95D63]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formState.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-[#C95D63]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country of Residence <span className="text-[#C95D63]">*</span>
                  </label>
                  <select
                    name="country"
                    required
                    value={formState.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors bg-white"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality <span className="text-[#C95D63]">*</span>
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formState.nationality}
                    onChange={handleChange}
                    placeholder="e.g. Indian, British"
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message / Questions (optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, any health considerations, or questions you have about the pilgrimage..."
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  checked={formState.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 flex-shrink-0 accent-[#16697A]"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-600 leading-relaxed">
                  I have read and agree to the{' '}
                  <Link href="/kailash/terms" className="text-[#16697A] underline">
                    Terms & Conditions
                  </Link>{' '}
                  of the Kailash Pilgrimage.
                </label>
              </div>

              {error && (
                <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-4 py-3 rounded">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            After reviewing your application, our team will contact you with pricing, availability,
            and next steps. No payment is required at this stage.
          </p>
        </div>
      </section>
    </div>
  )
}
