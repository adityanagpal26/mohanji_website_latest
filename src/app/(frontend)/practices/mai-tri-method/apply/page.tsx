'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function MaiTriApplyPage() {
  const [formData, setFormData] = useState({
    // Section 1 — Personal Details
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    dateOfBirth: '',
    // Section 2 — Past Practices & Mohanji Connection
    mohanjiConnection: '',
    practicesFollowed: '',
    yearsWithMohanji: '',
    attendedRetreats: '',
    meditationPractice: '',
    // Section 3 — Lifestyle & Health
    dietaryPractice: '',
    smokingAlcohol: '',
    healthConditions: '',
    // Section 4 — Availability & Commitment
    hoursPerWeek: '',
    sessionMode: '',
    languages: '',
    // Section 5 — Spiritual Journey
    whyMaiTri: '',
    innerMotivation: '',
    previousHealingExperience: '',
    // Section 6 — Commitment
    commitmentAccuracy: false,
    commitmentGuidelines: false,
    commitmentService: false,
    // Signature
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (
      !formData.commitmentAccuracy ||
      !formData.commitmentGuidelines ||
      !formData.commitmentService
    ) {
      setErrorMsg('Please confirm all three commitment statements before submitting.')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Mai-Tri Method Practitioner Application',
          type: 'mai-tri-application',
          ...formData,
        }),
      })
      if (res.ok) {
        setStatus('sent')
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center py-16 px-6 max-w-xl mx-auto">
          <span className="text-6xl block mb-6">🙏</span>
          <h2 className="font-heading text-3xl text-[#16697A] mb-4">Application Received</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Thank you for your interest in becoming a Mai-Tri Method practitioner. Your application
            has been received and our team will review it. We will be in touch within 2–4 weeks.
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
  const sectionHeadingClass = 'font-heading text-xl text-[#16697A] mb-1'
  const required = <span className="text-[#C95D63]">*</span>

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#16697A] to-[#0d4a56] py-14 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Apply to Become a Mai-Tri Practitioner
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="mt-5 text-white/85 max-w-2xl mx-auto leading-relaxed">
            The Mai-Tri Method is a profound path of service. Please complete this application
            thoughtfully and honestly. All fields marked with an asterisk are required.
          </p>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F5F5F5]">
        <div className="container max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Section 1 — Personal Details */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className={sectionHeadingClass}>1. Personal Details</h2>
              <span className="gold-divider mb-6" />
              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className={labelClass}>Full Name {required}</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address {required}</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone / WhatsApp {required}</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth {required}</label>
                  <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Country {required}</label>
                  <input type="text" name="country" required value={formData.country} onChange={handleChange} placeholder="Country of residence" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Section 2 — Mohanji Connection & Practices */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className={sectionHeadingClass}>2. Connection with Mohanji &amp; Practices</h2>
              <span className="gold-divider mb-6" />
              <div className="space-y-5 mt-6">
                <div>
                  <label className={labelClass}>How did you first connect with Mohanji? {required}</label>
                  <textarea name="mohanjiConnection" required rows={3} value={formData.mohanjiConnection} onChange={handleChange} placeholder="Describe how and when you first connected with Mohanji's teachings…" className={inputClass + ' resize-none'} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Approximate years following Mohanji {required}</label>
                    <select name="yearsWithMohanji" required value={formData.yearsWithMohanji} onChange={handleChange} className={inputClass}>
                      <option value="">Select…</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1–2 years">1–2 years</option>
                      <option value="3–5 years">3–5 years</option>
                      <option value="5–10 years">5–10 years</option>
                      <option value="More than 10 years">More than 10 years</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Have you attended Mohanji retreats or programs?</label>
                    <select name="attendedRetreats" value={formData.attendedRetreats} onChange={handleChange} className={inputClass}>
                      <option value="">Select…</option>
                      <option value="Yes — multiple">Yes — multiple</option>
                      <option value="Yes — one">Yes — one</option>
                      <option value="Not yet">Not yet</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Which Mohanji practices do you follow? {required}</label>
                  <textarea name="practicesFollowed" required rows={3} value={formData.practicesFollowed} onChange={handleChange} placeholder="E.g. Power of Purity meditation, Shaktipat, Consciousness Kriya, Mai-Tri sessions received…" className={inputClass + ' resize-none'} />
                </div>
                <div>
                  <label className={labelClass}>Describe your current meditation practice</label>
                  <textarea name="meditationPractice" rows={3} value={formData.meditationPractice} onChange={handleChange} placeholder="How often do you meditate, which techniques do you use, how long have you been practicing?…" className={inputClass + ' resize-none'} />
                </div>
              </div>
            </div>

            {/* Section 3 — Lifestyle & Health */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className={sectionHeadingClass}>3. Lifestyle &amp; Health</h2>
              <span className="gold-divider mb-6" />
              <div className="space-y-5 mt-6">
                <div>
                  <label className={labelClass}>Dietary practice {required}</label>
                  <select name="dietaryPractice" required value={formData.dietaryPractice} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Sattvic / Yogic diet">Sattvic / Yogic diet</option>
                    <option value="Non-vegetarian (reducing)">Non-vegetarian (reducing)</option>
                    <option value="Non-vegetarian">Non-vegetarian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Do you consume alcohol or smoke? {required}</label>
                  <select name="smokingAlcohol" required value={formData.smokingAlcohol} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    <option value="No — neither">No — neither</option>
                    <option value="Occasionally (alcohol only)">Occasionally (alcohol only)</option>
                    <option value="Yes — working on reducing">Yes — working on reducing</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Any significant health conditions we should be aware of?</label>
                  <textarea name="healthConditions" rows={3} value={formData.healthConditions} onChange={handleChange} placeholder="Please mention any physical, mental or emotional health conditions (optional)…" className={inputClass + ' resize-none'} />
                </div>
              </div>
            </div>

            {/* Section 4 — Availability */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className={sectionHeadingClass}>4. Availability &amp; Session Preferences</h2>
              <span className="gold-divider mb-6" />
              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className={labelClass}>Hours available per week for Mai-Tri {required}</label>
                  <select name="hoursPerWeek" required value={formData.hoursPerWeek} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    <option value="1–3 hours">1–3 hours</option>
                    <option value="4–8 hours">4–8 hours</option>
                    <option value="8–15 hours">8–15 hours</option>
                    <option value="15+ hours">15+ hours</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred session mode {required}</label>
                  <select name="sessionMode" required value={formData.sessionMode} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    <option value="In-person only">In-person only</option>
                    <option value="Online only">Online only</option>
                    <option value="Both in-person and online">Both in-person and online</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Languages you can offer sessions in {required}</label>
                  <input type="text" name="languages" required value={formData.languages} onChange={handleChange} placeholder="E.g. English, Spanish, Hindi…" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Section 5 — Spiritual Journey */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className={sectionHeadingClass}>5. Spiritual Journey</h2>
              <span className="gold-divider mb-6" />
              <div className="space-y-5 mt-6">
                <div>
                  <label className={labelClass}>Why do you wish to become a Mai-Tri practitioner? {required}</label>
                  <textarea name="whyMaiTri" required rows={4} value={formData.whyMaiTri} onChange={handleChange} placeholder="Describe your motivation and intention for this path of service…" className={inputClass + ' resize-none'} />
                </div>
                <div>
                  <label className={labelClass}>What inner transformation have you experienced through Mohanji&apos;s teachings?</label>
                  <textarea name="innerMotivation" rows={4} value={formData.innerMotivation} onChange={handleChange} placeholder="Share significant shifts in your awareness, character or daily life…" className={inputClass + ' resize-none'} />
                </div>
                <div>
                  <label className={labelClass}>Any previous healing or energy work experience?</label>
                  <textarea name="previousHealingExperience" rows={3} value={formData.previousHealingExperience} onChange={handleChange} placeholder="E.g. Reiki, pranic healing, other energy modalities, counselling background…" className={inputClass + ' resize-none'} />
                </div>
              </div>
            </div>

            {/* Section 6 — Commitments */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className={sectionHeadingClass}>6. Commitment &amp; Declaration</h2>
              <span className="gold-divider mb-6" />
              <p className="text-sm text-gray-600 leading-relaxed mt-4 mb-6">
                By submitting this application, I confirm the following statements to be true:
              </p>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="commitmentAccuracy"
                    checked={formData.commitmentAccuracy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-[#16697A]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    All the information provided in this application is accurate and truthful to the
                    best of my knowledge.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="commitmentGuidelines"
                    checked={formData.commitmentGuidelines}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-[#16697A]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I commit to following the guidelines and ethical code of the Mai-Tri Method as
                    laid out by Mohanji Foundation, if accepted as a practitioner.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="commitmentService"
                    checked={formData.commitmentService}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-[#16697A]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I understand that the Mai-Tri Method is a path of unconditional service and that
                    half of all energy exchange received will be directed toward feeding people and
                    sentient beings in need.
                  </span>
                </label>
              </div>

              {/* Signature block */}
              <div className="grid sm:grid-cols-3 gap-5 mt-8 pt-6 border-t border-gray-100">
                <div>
                  <label className={labelClass}>Date {required}</label>
                  <input type="date" name="signatureDate" required value={formData.signatureDate} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Place {required}</label>
                  <input type="text" name="signaturePlace" required value={formData.signaturePlace} onChange={handleChange} placeholder="City, Country" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Full Name (Signature) {required}</label>
                  <input type="text" name="signatureName" required value={formData.signatureName} onChange={handleChange} placeholder="Type your full name" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Error + Submit */}
            {errorMsg && (
              <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-4 py-3 rounded">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-4 rounded font-medium text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Submitting Application…' : 'Submit Application'}
            </button>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Applications are reviewed by the Mohanji Foundation team. We aim to respond within
              2–4 weeks. This application does not guarantee acceptance.
            </p>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/practices/mai-tri-method"
              className="text-sm text-[#16697A] underline underline-offset-2"
            >
              ← Back to Mai-Tri Method
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
