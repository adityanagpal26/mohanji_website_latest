import React from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Column = {
  width?: string
  content?: any
  image?: { url?: string; alt?: string } | null
}

type Props = {
  columns?: Column[]
  verticalAlign?: 'top' | 'center' | 'bottom'
}

const widthClasses: Record<string, string> = {
  equal: 'flex-1',
  '1/3': 'w-1/3',
  '2/3': 'w-2/3',
  '1/4': 'w-1/4',
  '3/4': 'w-3/4',
}

const alignClasses = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
}

export function ColumnsLayoutBlock({ columns = [], verticalAlign = 'top' }: Props) {
  return (
    <section className="py-10">
      <div className="container">
        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 ${alignClasses[verticalAlign]}`}>
          {columns.map((col, i) => (
            <div key={i} className={`min-w-0 ${widthClasses[col.width ?? 'equal'] ?? 'flex-1'}`}>
              {col.image?.url && (
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded">
                  <Image
                    src={col.image.url}
                    alt={col.image.alt ?? ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {col.content && (
                <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-[#16697A]">
                  <RichText data={col.content} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
