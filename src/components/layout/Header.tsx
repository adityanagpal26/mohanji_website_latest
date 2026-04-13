'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'

type NavChild = {
  label: string
  link?: string
  openInNewTab?: boolean
  children?: NavChild[]
}

type NavItem = {
  label: string
  link?: string
  openInNewTab?: boolean
  children?: NavChild[]
}

type Props = {
  logo?: {
    url?: string
    alt?: string
    width?: number
    height?: number
  } | null
  navItems?: NavItem[]
}

export function Header({ logo, navItems = [] }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt ?? 'Mohanji'}
                width={logo.width ?? 160}
                height={logo.height ?? 50}
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            ) : (
              <span className="font-heading text-2xl font-semibold text-[#16697A]">Mohanji</span>
            )}
          </Link>

          {/* Desktop nav */}
          <Navigation items={navItems} />

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/donate"
              className="px-5 py-2 bg-[#C95D63] text-white text-sm font-medium rounded hover:bg-[#f4442e] transition-colors"
            >
              Donate
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#191919] hover:text-[#16697A] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        items={navItems}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
