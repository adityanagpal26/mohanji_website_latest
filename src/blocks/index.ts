import type { Field } from 'payload'
import { HeroBanner } from './HeroBanner'
import { RichContent } from './RichContent'
import { ImageGallery } from './ImageGallery'
import { CallToAction } from './CallToAction'
import { CardGrid } from './CardGrid'
import { Accordion } from './Accordion'
import { VideoEmbed } from './VideoEmbed'
import { Testimonial } from './Testimonial'
import { DonationLinks } from './DonationLinks'
import { ContactForm } from './ContactForm'
import { EventCarousel } from './EventCarousel'
import { PostsGrid } from './PostsGrid'
import { IconList } from './IconList'
import { SocialIcons } from './SocialIcons'
import { Divider } from './Divider'
import { ColumnsLayout } from './ColumnsLayout'
import { AudioPlayer } from './AudioPlayer'
import { DownloadGrid } from './DownloadGrid'

export const allBlocks = [
  HeroBanner,
  RichContent,
  ImageGallery,
  CallToAction,
  CardGrid,
  Accordion,
  VideoEmbed,
  Testimonial,
  DonationLinks,
  ContactForm,
  EventCarousel,
  PostsGrid,
  IconList,
  SocialIcons,
  Divider,
  ColumnsLayout,
  AudioPlayer,
  DownloadGrid,
]

export const blocksField: Field = {
  name: 'layout',
  type: 'blocks',
  blocks: allBlocks,
}
