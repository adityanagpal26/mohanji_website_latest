'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type FooterLink = { label: string; url: string; openInNewTab?: boolean }
type FooterColumn = { title: string; links: FooterLink[] }
type SocialLink = { platform: string; url: string }

type Props = {
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  copyrightText?: string
  newsletterEnabled?: boolean
  privacyPolicyUrl?: string
}

// Default footer columns matching the verified live site structure
const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Mohanji's Life",
    links: [
      { label: 'Quotes', url: '/quotes' },
      { label: 'Blogs', url: '/blog' },
      { label: 'Audio & Books', url: '/books' },
      { label: "Life's Journey", url: '/about/life-journey' },
      { label: 'Foundation', url: '/about/foundation' },
    ],
  },
  {
    title: 'Volunteer',
    links: [
      { label: 'Become a Volunteer', url: '/join/volunteer' },
      { label: 'Join Youth Club', url: '/join/youth-club' },
      { label: 'Acharyas', url: '/about/acharyas' },
      { label: 'Global Ambassador', url: '/about/global-ambassador' },
      { label: 'Spaces', url: '/about/spaces' },
    ],
  },
]

// Default social links matching mohanji.org
const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'facebook', url: 'https://www.facebook.com/MohanjiOfficial' },
  { platform: 'youtube', url: 'https://www.youtube.com/@MohanjiOfficial' },
  { platform: 'twitter', url: 'https://twitter.com/MohanjiOfficial' },
  { platform: 'instagram', url: 'https://www.instagram.com/MohanjiOfficial' },
]

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  }
  return <>{icons[platform] ?? null}</>
}

function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setConsent(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#16697A]/30 border border-[#E2B748]/40 rounded p-4 text-center">
        <p className="text-[#E2B748] font-semibold text-sm mb-1">Thank you for subscribing!</p>
        <p className="text-gray-400 text-xs">You will receive our newsletter updates soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E2B748] transition-colors"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E2B748] transition-colors"
        required
      />
      <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 shrink-0 accent-[#E2B748]"
          required
        />
        <span>
          I agree to receive newsletters and accept the{' '}
          <Link href="/privacy-policy" className="underline hover:text-white transition-colors">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {status === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading' || !consent}
        className="w-full py-2 bg-[#C95D63] text-white text-sm font-medium rounded hover:bg-[#f4442e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  )
}

export function Footer({
  columns = [],
  socialLinks = [],
  copyrightText = '© 2026 Mohanji Foundation. All Rights Reserved.',
  newsletterEnabled = true,
  privacyPolicyUrl = '/privacy-policy',
}: Props) {
  // Use CMS columns if provided, else use static defaults
  const displayColumns = columns.length > 0 ? columns : DEFAULT_COLUMNS
  // Use CMS social links if provided, else use defaults
  const displaySocial = socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL_LINKS

  return (
    <footer className="bg-[#191919] text-white">
      {/* Main footer grid: 2 link columns + newsletter */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Link columns */}
          {displayColumns.map((col, i) => (
            <div key={i}>
              <h3 className="text-[#E2B748] font-heading text-lg font-semibold mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.url}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter — always show as 3rd column when newsletterEnabled */}
          {newsletterEnabled && (
            <div>
              <h3 className="text-[#E2B748] font-heading text-lg font-semibold mb-4">
                Subscribe
              </h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Stay connected with Mohanji&rsquo;s teachings, events, and initiatives.
              </p>
              <NewsletterForm />
            </div>
          )}
        </div>
      </div>

      {/* Social icons bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex items-center justify-center gap-5">
          {displaySocial.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
              aria-label={`Mohanji on ${social.platform}`}
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>{copyrightText}</span>
          <div className="flex items-center gap-4">
            <Link href={privacyPolicyUrl} className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span>Powered by MFactor Consultancy LLP</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
