import React from 'react'

type DonationLink = {
  region: string
  provider?: string
  url: string
  label: string
}

type Props = {
  heading?: string
  subtext?: string
  links?: DonationLink[]
}

export function DonationLinksBlock({ heading = 'Donate', subtext, links = [] }: Props) {
  return (
    <section className="py-14">
      <div className="container text-center">
        <h2 className="font-heading text-3xl font-semibold text-[#16697A]">{heading}</h2>
        <span className="gold-divider gold-divider--center" />
        {subtext && <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{subtext}</p>}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md hover:border-[#C95D63] transition-all group"
            >
              <div className="text-sm font-medium text-gray-500 mb-1">{link.region}</div>
              <div className="font-medium text-[#191919] group-hover:text-[#C95D63] transition-colors">{link.label}</div>
              {link.provider && <div className="text-xs text-gray-400 mt-1">{link.provider}</div>}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
