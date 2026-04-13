'use client'

import React, { useState, useRef, useEffect } from 'react'
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
}

function DropdownMenu({ items, isOpen }: { items: NavChild[]; isOpen: boolean }) {
  return (
    <ul
      className={`absolute top-full left-0 min-w-[220px] bg-white shadow-lg border-t-2 border-[#16697A] z-50 transition-all duration-200 ${
        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
      }`}
    >
      {items.map((child, i) => (
        <li key={i} className="relative group/sub">
          <Link
            href={child.link ?? '#'}
            target={child.openInNewTab ? '_blank' : undefined}
            className="flex items-center justify-between px-4 py-3 text-sm text-[#191919] hover:bg-[#F5F5F5] hover:text-[#16697A] transition-colors"
          >
            {child.label}
            {child.children && child.children.length > 0 && (
              <span className="ml-2 text-xs">›</span>
            )}
          </Link>
          {child.children && child.children.length > 0 && (
            <ul className="absolute left-full top-0 min-w-[220px] bg-white shadow-lg border-t-2 border-[#16697A] z-50 invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-200">
              {child.children.map((grandchild, j) => (
                <li key={j}>
                  <Link
                    href={grandchild.link ?? '#'}
                    target={grandchild.openInNewTab ? '_blank' : undefined}
                    className="block px-4 py-3 text-sm text-[#191919] hover:bg-[#F5F5F5] hover:text-[#16697A] transition-colors"
                  >
                    {grandchild.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Navigation({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <ul ref={navRef} className="hidden lg:flex items-center gap-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative"
          onMouseEnter={() => item.children?.length ? setOpenIndex(i) : undefined}
          onMouseLeave={() => setOpenIndex(null)}
        >
          <Link
            href={item.link ?? '#'}
            target={item.openInNewTab ? '_blank' : undefined}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#191919] hover:text-[#16697A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#16697A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${
              openIndex === i ? 'text-[#16697A] after:scale-x-100' : ''
            }`}
          >
            {item.label}
            {item.children && item.children.length > 0 && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </Link>
          {item.children && item.children.length > 0 && (
            <DropdownMenu items={item.children} isOpen={openIndex === i} />
          )}
        </li>
      ))}
    </ul>
  )
}
