import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  content?: any
  containerWidth?: 'normal' | 'narrow' | 'full'
}

const widthClasses = {
  normal: 'max-w-[1200px]',
  narrow: 'max-w-[800px]',
  full: 'max-w-none',
}

export function RichContentBlock({ content, containerWidth = 'normal' }: Props) {
  if (!content) return null

  return (
    <section className="py-10">
      <div className={`container ${widthClasses[containerWidth]}`}>
        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#16697A] prose-a:text-[#C95D63] hover:prose-a:text-[#f4442e]">
          <RichText data={content} />
        </div>
      </div>
    </section>
  )
}
