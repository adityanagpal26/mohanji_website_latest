import React from 'react'

// Block renderers — imported lazily by slug
import { HeroBannerBlock } from './blocks/HeroBannerBlock'
import { RichContentBlock } from './blocks/RichContentBlock'
import { ImageGalleryBlock } from './blocks/ImageGalleryBlock'
import { CallToActionBlock } from './blocks/CallToActionBlock'
import { CardGridBlock } from './blocks/CardGridBlock'
import { AccordionBlock } from './blocks/AccordionBlock'
import { VideoEmbedBlock } from './blocks/VideoEmbedBlock'
import { TestimonialBlock } from './blocks/TestimonialBlock'
import { DonationLinksBlock } from './blocks/DonationLinksBlock'
import { ContactFormBlock } from './blocks/ContactFormBlock'
import { EventCarouselBlock } from './blocks/EventCarouselBlock'
import { PostsGridBlock } from './blocks/PostsGridBlock'
import { IconListBlock } from './blocks/IconListBlock'
import { SocialIconsBlock } from './blocks/SocialIconsBlock'
import { DividerBlock } from './blocks/DividerBlock'
import { ColumnsLayoutBlock } from './blocks/ColumnsLayoutBlock'
import { AudioPlayerBlock } from './blocks/AudioPlayerBlock'
import { DownloadGridBlock } from './blocks/DownloadGridBlock'

// Map block slugs → components
const blockComponents: Record<string, React.ComponentType<any>> = {
  heroBanner: HeroBannerBlock,
  richContent: RichContentBlock,
  imageGallery: ImageGalleryBlock,
  callToAction: CallToActionBlock,
  cardGrid: CardGridBlock,
  accordion: AccordionBlock,
  videoEmbed: VideoEmbedBlock,
  testimonial: TestimonialBlock,
  donationLinks: DonationLinksBlock,
  contactForm: ContactFormBlock,
  eventCarousel: EventCarouselBlock,
  postsGrid: PostsGridBlock,
  iconList: IconListBlock,
  socialIcons: SocialIconsBlock,
  divider: DividerBlock,
  columnsLayout: ColumnsLayoutBlock,
  audioPlayer: AudioPlayerBlock,
  downloadGrid: DownloadGridBlock,
}

type Block = {
  blockType: string
  id?: string
  [key: string]: any
}

type Props = {
  blocks?: Block[] | null
}

export function RenderBlocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`No renderer found for block type: ${block.blockType}`)
          }
          return null
        }
        return <Component key={block.id ?? i} {...block} />
      })}
    </>
  )
}
