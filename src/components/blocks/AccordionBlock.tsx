'use client'

import React, { useState } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type AccordionItem = {
  question: string
  answer?: any
}

type Props = {
  heading?: string
  items?: AccordionItem[]
}

export function AccordionBlock({ heading, items = [] }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-12">
      <div className="container max-w-[800px]">
        {heading && (
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-semibold text-[#16697A]">{heading}</h2>
            <span className="gold-divider" />
          </div>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-[#191919] hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 text-[#16697A] shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && item.answer && (
                <div className="px-5 py-4 border-t border-gray-100 text-gray-600 prose prose-sm max-w-none">
                  <RichText data={item.answer} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
