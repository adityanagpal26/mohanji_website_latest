import React from 'react'

type Props = {
  url: string
  caption?: string
  aspectRatio?: '16:9' | '4:3' | '1:1'
}

function getEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return url
}

const aspectClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
}

export function VideoEmbedBlock({ url, caption, aspectRatio = '16:9' }: Props) {
  const embedUrl = getEmbedUrl(url)

  return (
    <section className="py-10">
      <div className="container max-w-[900px]">
        <div className={`relative ${aspectClasses[aspectRatio]} w-full overflow-hidden rounded shadow-md`}>
          <iframe
            src={embedUrl}
            title={caption ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        {caption && <p className="mt-3 text-sm text-gray-500 text-center">{caption}</p>}
      </div>
    </section>
  )
}
