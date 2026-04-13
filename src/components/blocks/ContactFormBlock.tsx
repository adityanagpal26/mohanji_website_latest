'use client'

import React, { useState } from 'react'

type FormField = {
  fieldType: string
  label: string
  name: string
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
}

type FormData = {
  title?: string
  fields?: FormField[]
  submitButtonLabel?: string
}

type Props = {
  form?: FormData | null
}

export function ContactFormBlock({ form }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!form) return null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    await fetch('/api/form-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formId: (form as any)?.id, data }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-12">
        <div className="container max-w-[600px] text-center">
          <div className="p-8 bg-green-50 rounded border border-green-200">
            <p className="text-green-700 font-medium">Thank you! Your message has been received.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container max-w-[600px]">
        {form.title && (
          <h2 className="font-heading text-2xl font-semibold text-[#16697A] mb-6">{form.title}</h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {(form.fields ?? []).map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-[#C95D63] ml-1">*</span>}
              </label>
              {field.fieldType === 'textarea' ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#16697A]"
                />
              ) : field.fieldType === 'select' ? (
                <select
                  name={field.name}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#16697A]"
                >
                  <option value="">Select…</option>
                  {(field.options ?? []).map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.fieldType === 'checkbox' ? (
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" name={field.name} required={field.required} />
                  <span>{field.placeholder ?? field.label}</span>
                </label>
              ) : (
                <input
                  type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#16697A]"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors disabled:opacity-60"
          >
            {loading ? 'Sending…' : (form.submitButtonLabel ?? 'Submit')}
          </button>
        </form>
      </div>
    </section>
  )
}
