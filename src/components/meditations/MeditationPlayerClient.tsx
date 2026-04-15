'use client'

import React, { useState } from 'react'

export interface DownloadEntry {
  language: string
  url: string | null
  duration?: string
}

interface Props {
  downloads: DownloadEntry[]
  title: string
}

export function MeditationPlayerClient({ downloads, title }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const activeTrack = activeIdx !== null ? downloads[activeIdx] : null

  return (
    <div>
      {/* Sticky audio player — visible when a track is selected */}
      {activeTrack?.url && (
        <div className="sticky top-20 z-20 bg-[#16697A] text-white rounded-xl p-4 mb-6 shadow-lg">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Now Playing</p>
          <p className="font-semibold text-sm mb-3">
            {title} — {activeTrack.language}
            {activeTrack.duration && (
              <span className="ml-2 text-white/60 font-normal">{activeTrack.duration}</span>
            )}
          </p>
          {/* key forces a remount (and restart) when the track changes */}
          <audio
            key={activeTrack.url}
            controls
            autoPlay
            src={activeTrack.url}
            className="w-full"
          />
          <button
            onClick={() => setActiveIdx(null)}
            className="mt-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            ✕ Close player
          </button>
        </div>
      )}

      {/* Language grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {downloads.map((dl, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
              activeIdx === idx
                ? 'border-[#16697A] bg-[#16697A]/5 shadow-sm'
                : 'border-gray-200 bg-white hover:border-[#16697A]/40'
            }`}
          >
            {/* Language + duration */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{dl.language}</p>
              {dl.duration && (
                <p className="text-xs text-gray-400">{dl.duration}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 ml-3 shrink-0">
              {dl.url ? (
                <>
                  <button
                    onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                    title={activeIdx === idx ? 'Stop' : `Play ${dl.language}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                      activeIdx === idx
                        ? 'bg-[#16697A] text-white'
                        : 'border border-[#16697A] text-[#16697A] hover:bg-[#16697A] hover:text-white'
                    }`}
                  >
                    {activeIdx === idx ? '■' : '▶'}
                  </button>
                  <a
                    href={dl.url}
                    download
                    title={`Download ${dl.language}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#C95D63] text-[#C95D63] hover:bg-[#C95D63] hover:text-white transition-colors text-sm"
                  >
                    ↓
                  </a>
                </>
              ) : (
                <span className="text-xs text-gray-400 italic">Soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
