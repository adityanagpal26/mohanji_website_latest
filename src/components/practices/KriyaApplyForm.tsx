'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina',
  'Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados',
  'Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana',
  'Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon',
  'Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros',
  'Congo (Democratic Republic)','Congo (Republic)','Costa Rica','Croatia','Cuba','Cyprus',
  'Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt',
  'El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland',
  'France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea',
  'Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran',
  'Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati',
  'Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya',
  'Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali',
  'Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco',
  'Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal',
  'Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia',
  'Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru',
  'Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis',
  'Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe',
  'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia',
  'Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka',
  'Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand',
  'Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
  'Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay',
  'Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
]

interface Props {
  successMessage?: string
}

export function KriyaApplyForm({ successMessage }: Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    country: '',
    age: '',
    email: '',
    needsAssistance: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.needsAssistance) {
      setErrorMsg('Please select one of the assistance options.')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/kriya-apply', {
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
              'Thank you for applying for Consciousness Kriya initiation. Our team will review your application and be in touch shortly.'}
          </p>
          <Link
            href="/practices/consciousness-kriya"
            className="inline-block bg-[#C95D63] text-white hover:bg-[#f4442e] px-7 py-3 rounded font-medium transition-colors"
          >
            Return to Consciousness Kriya
          </Link>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#16697A] transition-colors bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1'
  const req = <span className="text-[#C95D63]">*</span>

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Full Name {req}</label>
        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Phone / Mobile {req}</label>
        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Gender {req}</label>
          <select name="gender" required value={formData.gender} onChange={handleChange} className={inputClass}>
            <option value="">-- Please Select --</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer Not to Say</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Age {req}</label>
          <input type="number" name="age" required min={1} max={120} value={formData.age} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Country {req}</label>
        <select name="country" required value={formData.country} onChange={handleChange} className={inputClass}>
          <option value="">-- Please Select --</option>
          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Email {req}</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Do you need any assistance? {req}</p>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="needsAssistance" value="Yes, I need assistance" checked={formData.needsAssistance === 'Yes, I need assistance'} onChange={handleChange} className="w-4 h-4 accent-[#16697A]" />
            <span className="text-sm text-gray-700">Yes, I need assistance</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="needsAssistance" value="No, I'd like to continue" checked={formData.needsAssistance === "No, I'd like to continue"} onChange={handleChange} className="w-4 h-4 accent-[#16697A]" />
            <span className="text-sm text-gray-700">No, I&apos;d like to continue</span>
          </label>
        </div>
      </div>

      {errorMsg && (
        <p className="text-sm text-[#C95D63] bg-[#C95D63]/10 px-4 py-3 rounded">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
