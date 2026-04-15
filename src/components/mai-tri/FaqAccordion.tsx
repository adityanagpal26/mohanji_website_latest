'use client'

import React, { useState } from 'react'

interface Faq {
  question: string
  answer: string
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#F5F5F5] transition-colors"
          >
            <span className="font-heading text-[#16697A] text-base font-semibold leading-snug">
              {faq.question}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#16697A] flex items-center justify-center text-[#16697A] transition-transform duration-200 ${
                activeIndex === i ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>
          {activeIndex === i && (
            <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
