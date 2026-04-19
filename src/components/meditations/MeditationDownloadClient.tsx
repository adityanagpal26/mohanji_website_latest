'use client'

import React, { useState, useMemo } from 'react'
import { MeditationPlayerClient, type DownloadEntry } from './MeditationPlayerClient'

interface Props {
  downloads: DownloadEntry[]
  title: string
}

export function MeditationDownloadClient({ downloads, title }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return downloads
    return downloads.filter((dl) => dl.language.toLowerCase().includes(q))
  }, [downloads, query])

  return (
    <div>
      {/* Language search */}
      <div className="relative max-w-sm mx-auto mb-8">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by language…"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#16697A] focus:ring-1 focus:ring-[#16697A] bg-white"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          {query && (
            <p className="text-center text-sm text-gray-500 mb-4">
              {filtered.length} language{filtered.length !== 1 ? 's' : ''} found
            </p>
          )}
          <MeditationPlayerClient downloads={filtered} title={title} />
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg mb-2">No languages match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => setQuery('')}
            className="text-sm text-[#16697A] hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
