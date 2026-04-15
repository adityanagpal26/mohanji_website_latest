'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Props {
  successMessage?: string
}

export function MaiTriApplyForm({ successMessage }: Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    dateOfBirth: '',
    mohanjiConnection: '',
    practicesFollowed: '',
    yearsWithMohanji: '',
    attendedRetreats: '',
    meditationPractice: '',
    dietaryPractice: '',
    smokingAlcohol: '',
    healthConditions: '',
    hoursPerWeek: '',
    sessionMode: '',
    languages: '',
    whyMaiTri: '',
    innerMotivation: '',
    previousHealingExperience: '',
    commitmentAccuracy: false,
    commitmentGuidelines: false,
    commitmentService: false,
    signatureDate: '',
    signaturePlace: '',
    signatureName: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.commitmentAccuracy || !formData.commitmentGuidelines || !formData.commitmentService) {
      setErrorMsg('Please confirm all three commitment statements before submitting.')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/mai-tri-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || 'Submission failed')
      }
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center py-16 px-6 max-w-xl mx-auto">
          <span className="text-6xl block mb-6">🙏</span>
          <h2 className="font-heading text-3xl text-[#16697A] mb-4">Application Received</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {successMessage ||
              'Thank you for your interest in becoming a Mai-Tri Method practitioner. Our team will review your application and be in touch within 2–4 weeks.'}
          </p>
          <Link
            href="/practices/mai-tri-method"
            className="inline-block bg-[#C95D63] text-white hover:bg-[#f4442e] px-7 py-3 rounded font-medium transition-colors"
          >
            Return to Mai-Tri Method
          </Link>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'
  const sectionClass = 'font-heading text-xl text-[#16697A] mb-1'
  const req = <span className="text-[#C95D63]">*</span>

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* Section 1 — Personal Details */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className={sectionClass}>1. Personal Details</h2>
        <span className="gold-divider mb-6" />
        <div className="grid sm:grid-cols-2 gap-5 mt-6">
          <div>
            <label className={labelClass}>Full Name {req}</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email Address {req}</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone / WhatsApp {req}</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Date of Birth {req}</label>
            <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Country {req}</label>
            <input type="text" name="country" required value={formData.country} onChange={handleChange} placeholder="Country of residence" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Section 2 — Mohanji Connection */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className={sectionClass}>2. Connection with Mohanji &amp; Practices</h2>
        <span className="gold-divider mb-6" />
        <div className="space-y-5 mt-6">
          <div>
            <label className={labelClass}>How did you first connect with Mohanji? {req}</label>
            <textarea name="mohanjiConnection" required rows={3} value={formData.mohanjiConnection} onChange={handleChange} placeholder="Describe how and when you first connected with Mohanji's teachings…" className={inputClass + ' resize-none'} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Approximate years following Mohanji {req}</label>
              <select name="yearsWithMohanji" required value={formData.yearsWithMohanji} onChange={handleChange} className={inputClass}>
                <option value="">Select…</option>
                <option>Less than 1 year</option>
                <option>1–2 years</option>
                <option>3–5 years</option>
                <option>5–10 years</option>
                <option>More than 10 years</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Attended Mohanji retreats or programs?</label>
              <select name="attendedRetreats" value={formData.attendedRetreats} onChange={handleChange} className={inputClass}>
                <option value="">Select…</option>
                <option>Yes — multiple</option>
                <option>Yes — one</option>
                <option>Not yet</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Which Mohanji practices do you follow? {req}</label>
            <textarea name="practicesFollowed" required rows={3} value={formData.practicesFollowed} onChange={handleChange} placeholder="E.g. Power of Purity meditation, Shaktipat, Consciousness Kriya, Mai-Tri sessions received…" className={inputClass + ' resize-none'} />
          </div>
          <div>
            <label className={labelClass}>Describe your current meditation practice</label>
            <textarea name="meditationPractice" rows={3} value={formData.meditationPractice} onChange={handleChange} placeholder="How often, which techniques, how long have you been practicing?…" className={inputClass + ' resize-none'} />
          </div>
        </div>
      </div>

      {/* Section 3 — Lifestyle & Health */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className={sectionClass}>3. Lifestyle &amp; Health</h2>
        <span className="gold-divider mb-6" />
        <div className="space-y-5 mt-6">
          <div>
            <label className={labelClass}>Dietary practice {req}</label>
            <select name="dietaryPractice" required value={formData.dietaryPractice} onChange={handleChange} className={inputClass}>
              <option value="">Select…</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Sattvic / Yogic diet</option>
              <option>Non-vegetarian (reducing)</option>
              <option>Non-vegetarian</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Do you consume alcohol or smoke? {req}</label>
            <select name="smokingAlcohol" required value={formData.smokingAlcohol} onChange={handleChange} className={inputClass}>
              <option value="">Select…</option>
              <option>No — neither</option>
              <option>Occasionally (alcohol only)</option>
              <option>Yes — working on reducing</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Any significant health conditions?</label>
            <textarea name="healthConditions" rows={3} value={formData.healthConditions} onChange={handleChange} placeholder="Optional — physical, mental or emotional health conditions…" className={inputClass + ' resize-none'} />
          </div>
        </div>
      </div>

      {/* Section 4 — Availability */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className={sectionClass}>4. Availability &amp; Session Preferences</h2>
        <span className="gold-divider mb-6" />
        <div className="grid sm:grid-cols-2 gap-5 mt-6">
          <div>
            <label className={labelClass}>Hours available per week {req}</label>
            <select name="hoursPerWeek" required value={formData.hoursPerWeek} onChange={handleChange} className={inputClass}>
              <option value="">Select…</option>
              <option>1–3 hours</option>
              <option>4–8 hours</option>
              <option>8–15 hours</option>
              <option>15+ hours</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Preferred session mode {req}</label>
            <select name="sessionMode" required value={formData.sessionMode} onChange={handleChange} className={inputClass}>
              <option value="">Select…</option>
              <option>In-person only</option>
              <option>Online only</option>
              <option>Both in-person and online</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Languages for sessions {req}</label>
            <input type="text" name="languages" required value={formData.languages} onChange={handleChange} placeholder="E.g. English, Spanish, Hindi…" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Section 5 — Spiritual Journey */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className={sectionClass}>5. Spiritual Journey</h2>
        <span className="gold-divider mb-6" />
        <div className="space-y-5 mt-6">
          <div>
            <label className={labelClass}>Why do you wish to become a Mai-Tri practitioner? {req}</label>
            <textarea name="whyMaiTri" required rows={4} value={formData.whyMaiTri} onChange={handleChange} placeholder="Describe your motivation and intention for this path of service…" className={inputClass + ' resize-none'} />
          </div>
          <div>
            <label className={labelClass}>What inner transformation have you experienced through Mohanji&apos;s teachings?</label>
            <textarea name="innerMotivation" rows={4} value={formData.innerMotivation} onChange={handleChange} placeholder="Share significant shifts in your awareness, character or daily life…" className={inputClass + ' resize-none'} />
          </div>
          <div>
            <label className={labelClass}>Any previous healing or energy work experience?</label>
            <textarea name="previousHealingExperience" rows={3} value={formData.previousHealingExperience} onChange={handleChange} placeholder="E.g. Reiki, pranic healing, counselling background…" className={inputClass + ' resize-none'} />
          </div>
        </div>
      </div>

      {/* Section 6 — Commitment */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className={sectionClass}>6. Commitment &amp; Declaration</h2>
        <span className="gold-divider mb-6" />
        <p className="text-sm text-gray-600 leading-relaxed mt-4 mb-6">
          By submitting this application, I confirm the following statements to be true:
        </p>
        <div className="space-y-4">
          {[
            { name: 'commitmentAccuracy', text: 'All the information provided in this application is accurate and truthful to the best of my knowledge.' },
            { name: 'commitmentGuidelines', text: 'I commit to following the guidelines and ethical code of the Mai-Tri Method as laid out by Mohanji Foundation, if accepted as a practitioner.' },
            { name: 'commitmentService', text: 'I understand that the Mai-Tri Method is a path of unconditional service and that half of all energy exchange received will be directed toward feeding people and sentient beings in need.' },
          ].map(({ name, text }) => (
            <label key={name} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={name}
                checked={formData[name as keyof typeof formData] as boolean}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-[#16697A]"
              />
              <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
            </label>
          ))}
        </div>

        {/* Signature */}
        <div className="grid sm:grid-cols-3 gap-5 mt-8 pt-6 border-t border-gray-100">
          <div>
            <label className={labelClass}>Date {req}</label>
            <input type="date" name="signatureDate" required value={formData.signatureDate} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Place {req}</label>
            <input type="text" name="signaturePlace" required value={formData.signaturePlace} onChange={handleChange} placeholder="City, Country" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Full Name (Signature) {req}</label>
            <input type="text" name="signatureName" required value={formData.signatureName} onChange={handleChange} placeholder="Type your full name" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Error + Submit */}
      {errorMsg && (
        <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-4 py-3 rounded">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-4 rounded font-medium text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Submitting Application…' : 'Submit Application'}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Applications are reviewed by the Mohanji Foundation team. We aim to respond within 2–4 weeks.
        This application does not guarantee acceptance.
      </p>
    </form>
  )
}
