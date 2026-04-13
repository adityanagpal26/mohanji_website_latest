'use client'

import React, { useState } from 'react'
import Link from 'next/link'

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
  items: NavItem[]
  isOpen: boolean
  onClose: () => void
}

function MobileNavItem({ item, depth = 0 }: { item: NavItem | NavChild; depth?: number }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <li>
      <div className="flex items-center justify-between">
        <Link
          href={item.link ?? '#'}
          target={item.openInNewTab ? '_blank' : undefined}
          className={`flex-1 py-3 text-[#191919] hover:text-[#16697A] transition-colors ${depth === 0 ? 'font-medium text-base' : 'text-sm pl-4'}`}
          style={{ paddingLeft: `${depth * 1}rem` }}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-3 text-[#16697A]"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <ul className="border-l-2 border-[#E2B748] ml-4">
          {item.children!.map((child, i) => (
            <MobileNavItem key={i} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function MobileMenu({ items, isOpen, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[360px] bg-white z-50 shadow-xl transition-transform duration-300 lg:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-heading text-lg font-semibold text-[#16697A]">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-[#191919] hover:text-[#C95D63] transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="divide-y divide-gray-100">
            {items.map((item, i) => (
              <MobileNavItem key={i} item={item} />
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/donate"
              className="block w-full text-center py-3 px-6 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
              onClick={onClose}
            >
              Donate
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
