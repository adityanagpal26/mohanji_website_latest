'use client'

import React from 'react'

type AudioData = {
  title?: string
  audioFile?: { url?: string; filename?: string } | null
  duration?: string
}

type Props = {
  title?: string
  audio?: AudioData | null
  audioFile?: { url?: string; filename?: string } | null
  showDownloadButton?: boolean
  description?: string
}

export function AudioPlayerBlock({ title, audio, audioFile, showDownloadButton = true, description }: Props) {
  const resolvedFile = audioFile?.url ? audioFile : audio?.audioFile
  const resolvedTitle = title ?? audio?.title

  if (!resolvedFile?.url) return null

  return (
    <section className="py-8">
      <div className="container max-w-[700px]">
        <div className="bg-white rounded shadow-sm p-6">
          {resolvedTitle && (
            <h3 className="font-heading text-lg font-semibold text-[#16697A] mb-3">{resolvedTitle}</h3>
          )}
          {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
          <audio
            controls
            className="w-full"
            preload="metadata"
          >
            <source src={resolvedFile.url} />
            Your browser does not support the audio element.
          </audio>
          {showDownloadButton && (
            <a
              href={resolvedFile.url}
              download={resolvedFile.filename}
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#C95D63] hover:text-[#f4442e] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
