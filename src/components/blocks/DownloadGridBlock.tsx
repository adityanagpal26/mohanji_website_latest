import React from 'react'

type DownloadItem = {
  language: string
  languageCode?: string
  file?: { url?: string; filename?: string } | null
  externalUrl?: string
  fileSize?: string
}

type MeditationData = {
  title?: string
  downloads?: DownloadItem[]
}

type Props = {
  heading?: string
  meditation?: MeditationData | null
  downloads?: DownloadItem[]
}

export function DownloadGridBlock({ heading = 'Download in Your Language', meditation, downloads = [] }: Props) {
  const items: DownloadItem[] = meditation?.downloads?.length ? meditation.downloads : downloads

  if (!items.length) return null

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-semibold text-[#16697A]">{heading}</h2>
          <span className="gold-divider gold-divider--center" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((item, i) => {
            const href = item.file?.url ?? item.externalUrl ?? '#'
            return (
              <a
                key={i}
                href={href}
                download={item.file?.url ? item.file.filename : undefined}
                target={item.externalUrl ? '_blank' : undefined}
                rel={item.externalUrl ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded hover:border-[#C95D63] hover:shadow-md transition-all group text-center"
              >
                <svg className="w-8 h-8 text-[#16697A] group-hover:text-[#C95D63] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-sm font-medium text-[#191919] group-hover:text-[#C95D63] transition-colors">
                  {item.language}
                </span>
                {item.fileSize && <span className="text-xs text-gray-400">{item.fileSize}</span>}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
