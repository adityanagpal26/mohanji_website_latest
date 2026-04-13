import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/RenderBlocks'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

// ─── Static course data sourced from mohanji.org/courses ─────────────────────
const staticCourseData: Record<
  string,
  {
    title: string
    level: 'beginner' | 'intermediate' | 'advanced'
    duration: string
    price: string
    image: string
    tagline: string
    description: string[]
    curriculum: Array<{ module: string; topics: string[] }>
    prerequisites: string[]
    outcomes: string[]
    registrationUrl: string
  }
> = {
  'empowered-1-0': {
    title: 'Empowered 1.0',
    level: 'beginner',
    duration: '4 days',
    price: 'Contact for pricing',
    image: 'https://mohanji.org/wp-content/uploads/2021/10/Empowered-1.0.png',
    tagline: 'The foundation program — understand yourself and your purpose.',
    description: [
      'Empowered 1.0 is the entry-level program in Mohanji\'s transformative Empowered series. It is designed to give participants a solid foundation in self-understanding, conscious living, and the principles that underpin Mohanji\'s teachings.',
      'Over four intensive days, participants explore the nature of the mind, the ego, and the layers of conditioning that shape everyday experience. Through guided meditations, self-inquiry practices, group sharing, and Mohanji\'s teachings, participants begin the journey from unconscious living to conscious, empowered existence.',
      'Empowered 1.0 is open to everyone — no prior spiritual experience is necessary. It is the recommended starting point for anyone wishing to engage deeply with Mohanji\'s work.',
    ],
    curriculum: [
      {
        module: 'Understanding the Self',
        topics: [
          'Who am I? — Beyond body, mind, and ego',
          'The nature of consciousness',
          'How conditioning shapes our reality',
          'Introduction to Mohanji\'s teachings',
        ],
      },
      {
        module: 'The Mind and Its Patterns',
        topics: [
          'The structure and function of the mind',
          'Habitual patterns and how to change them',
          'The role of emotions in spiritual growth',
          'Working with fear, anger, and attachment',
        ],
      },
      {
        module: 'Conscious Living Practices',
        topics: [
          'Power of Purity meditation',
          'Gratitude and forgiveness practices',
          'Conscious breathing techniques',
          'Daily practices for inner transformation',
        ],
      },
      {
        module: 'Purpose and Dharma',
        topics: [
          'Understanding your life\'s purpose',
          'Karma and the law of cause and effect',
          'Service as a path of liberation',
          'Building a consistent spiritual practice',
        ],
      },
    ],
    prerequisites: ['None — open to all seekers'],
    outcomes: [
      'A clear understanding of Mohanji\'s core teachings',
      'Practical tools for daily conscious living',
      'Release of key emotional blockages',
      'Foundation for continuing the Empowered series',
      'Connection with a global community of practitioners',
    ],
    registrationUrl: 'https://mohanji.org/courses/',
  },
  'empowered-2-0': {
    title: 'Empowered 2.0',
    level: 'intermediate',
    duration: '4 days',
    price: 'Contact for pricing',
    image: 'https://mohanji.org/wp-content/uploads/2021/10/Empowered-1.0.png',
    tagline: 'Deepen your practice and dissolve deeper layers of conditioning.',
    description: [
      'Empowered 2.0 builds upon the foundation established in Empowered 1.0, taking participants deeper into self-inquiry, energetic practices, and the dismantling of subtler patterns of conditioning.',
      'This intermediate program introduces more advanced practices from Mohanji\'s tradition and supports participants in establishing a robust, consistent spiritual practice. It also addresses the common challenges that arise as one progresses on the spiritual path.',
      'With a stronger foundation in place, Empowered 2.0 guides participants into the subtler dimensions of consciousness — including the nature of the energy body, the mechanics of karma, and the art of living from one\'s higher self rather than the reactive mind.',
    ],
    curriculum: [
      {
        module: 'Advanced Self-Inquiry',
        topics: [
          'The witness consciousness — observing without identification',
          'Subtler ego patterns and how they operate',
          'Deep work with suppressed emotions',
          'Moving from reaction to conscious response',
        ],
      },
      {
        module: 'Energy and the Subtle Body',
        topics: [
          'Understanding prana and the energy body',
          'Chakras: function and practical relevance',
          'Pranayama practices for energy elevation',
          'Protecting and nourishing your energy field',
        ],
      },
      {
        module: 'Relationships and Karma',
        topics: [
          'Karmic bonds and relationships',
          'Healing family patterns and ancestral karma',
          'Unconditional love in practice',
          'Forgiveness as a spiritual tool',
        ],
      },
      {
        module: 'Integration and Deeper Practice',
        topics: [
          'Establishing a stable daily sadhana',
          'Navigating spiritual experiences and challenges',
          'Connecting with the guru principle',
          'Carrying the practice into everyday life',
        ],
      },
    ],
    prerequisites: ['Empowered 1.0'],
    outcomes: [
      'Deeper access to meditative states',
      'Resolution of relationship karmas',
      'Enhanced prana and vitality',
      'Greater emotional freedom and stability',
      'A consistent, personalised spiritual practice',
    ],
    registrationUrl: 'https://mohanji.org/courses/',
  },
  'empowered-3-0': {
    title: 'Empowered 3.0',
    level: 'advanced',
    duration: '5 days',
    price: 'Contact for pricing',
    image: 'https://mohanji.org/wp-content/uploads/2021/10/Empowered-1.0.png',
    tagline: 'Enter the deeper dimensions of consciousness and dissolve the roots of ego.',
    description: [
      'Empowered 3.0 is an advanced program designed for committed practitioners who have integrated the teachings of Empowered 1.0 and 2.0 and are ready to go deeper. At this level, the work becomes increasingly subtle and transformative.',
      'The focus shifts from understanding and practice to direct experience — of pure awareness, of the nature of the self beyond conditioning, and of the dissolution of the deep-seated ego structures that prevent the full flowering of consciousness.',
      'Empowered 3.0 incorporates more intensive energy practices, deeper silence, and direct transmission from Mohanji\'s lineage. Participants often report significant shifts in consciousness, perception, and their relationship with themselves and the world.',
    ],
    curriculum: [
      {
        module: 'Dissolution of Ego Structures',
        topics: [
          'The architecture of the ego — going to the roots',
          'Identification vs. pure awareness',
          'Practices for dissolving deep conditioning',
          'The paradox of the spiritual seeker',
        ],
      },
      {
        module: 'Advanced Energy Practices',
        topics: [
          'Consciousness Kriya introduction',
          'Advanced pranayama and mudra practices',
          'Working with the koshas (five sheaths of existence)',
          'Kundalini — understanding and navigating awakening',
        ],
      },
      {
        module: 'Silence and Inner Stillness',
        topics: [
          'Extended meditation practices',
          'The nature of thoughtless awareness',
          'Silence as a gateway to the absolute',
          'Integration of stillness in daily life',
        ],
      },
      {
        module: 'Liberation and Service',
        topics: [
          'Understanding liberation (moksha) in practical terms',
          'Selfless service as the highest path',
          'The relationship between the individual and the universal',
          'Living as a conscious instrument of the divine',
        ],
      },
    ],
    prerequisites: ['Empowered 1.0', 'Empowered 2.0'],
    outcomes: [
      'Direct experience of pure awareness beyond thought',
      'Significant dissolution of deep ego patterns',
      'Advanced energy practices for sustained practice at home',
      'Deepened relationship with the guru principle and lineage',
      'Clarity about one\'s dharmic path and purpose',
    ],
    registrationUrl: 'https://mohanji.org/courses/',
  },
  'empowered-4-0': {
    title: 'Empowered 4.0',
    level: 'advanced',
    duration: '5 days',
    price: 'Contact for pricing',
    image: 'https://mohanji.org/wp-content/uploads/2021/10/Empowered-1.0.png',
    tagline: 'Advanced immersion into the highest teachings of Mohanji\'s tradition.',
    description: [
      'Empowered 4.0 is an intensive advanced program for those who have completed the first three levels and are deeply established in a consistent spiritual practice. At this level, the teachings become increasingly refined and direct.',
      'The program focuses on the deeper mechanics of consciousness, the nature of liberation, and the embodiment of one\'s highest potential. Participants work closely with Mohanji Acharyas in a highly personal and transformative setting.',
      'Empowered 4.0 may include Shaktipat transmission, advanced Consciousness Kriya practices, and extended periods of silence and deep meditation. The experience is unique to each participant, tailored to where they are on their individual journey.',
    ],
    curriculum: [
      {
        module: 'The Nature of Consciousness',
        topics: [
          'Advaita — the non-dual nature of reality',
          'The Self beyond the seeker',
          'Exploring the states of consciousness',
          'Direct investigation into the source of awareness',
        ],
      },
      {
        module: 'Advanced Practices and Transmissions',
        topics: [
          'Advanced Consciousness Kriya',
          'Shaktipat — receiving divine energy transmission',
          'Mohanji Energy Transfer (MET)',
          'Deep states of samadhi',
        ],
      },
      {
        module: 'Living the Teaching',
        topics: [
          'Sahaja samadhi — natural, effortless liberation',
          'The guru-disciple relationship',
          'Embodied wisdom vs. intellectual understanding',
          'Becoming a living example of the teaching',
        ],
      },
    ],
    prerequisites: ['Empowered 1.0', 'Empowered 2.0', 'Empowered 3.0'],
    outcomes: [
      'Stabilisation in non-dual awareness',
      'Direct experience of higher states of consciousness',
      'Advanced energy practices transmitted personally',
      'Deepened embodiment of Mohanji\'s teachings',
      'Clarity on the path forward to complete liberation',
    ],
    registrationUrl: 'https://mohanji.org/courses/',
  },
  'empowered-5-0': {
    title: 'Empowered 5.0',
    level: 'advanced',
    duration: '6 days',
    price: 'Contact for pricing',
    image: 'https://mohanji.org/wp-content/uploads/2021/10/Empowered-1.0.png',
    tagline: 'The culmination of the Empowered series — abiding in the highest truth.',
    description: [
      'Empowered 5.0 is the capstone of the Empowered series, reserved for those who have deeply integrated the teachings of all previous levels. It is a rare and precious program that offers the highest transmissions available within Mohanji\'s tradition.',
      'At this level, the boundary between practice and life dissolves. Participants are not learning or doing — they are being. The program supports the final dissolution of the barriers between the individual self and universal consciousness.',
      'Empowered 5.0 is offered infrequently and only to practitioners specifically invited by Mohanji or senior Acharyas. It represents the pinnacle of the structured teaching path within the Mohanji Foundation.',
    ],
    curriculum: [
      {
        module: 'Abidance in Pure Awareness',
        topics: [
          'Beyond practices — pure being',
          'The final dissolution of the seeker',
          'Spontaneous, effortless awareness',
          'Living as consciousness itself',
        ],
      },
      {
        module: 'The Highest Transmissions',
        topics: [
          'Direct transmission from the highest source',
          'Deeksha — the ultimate initiation',
          'Beyond words, beyond techniques',
          'The guru as pure consciousness',
        ],
      },
      {
        module: 'Integration and Service',
        topics: [
          'Embodying the teaching in every moment',
          'The role of the advanced practitioner in the world',
          'Unconditional service as the natural expression of liberation',
          'Preparing to guide others on the path',
        ],
      },
    ],
    prerequisites: ['Empowered 1.0', 'Empowered 2.0', 'Empowered 3.0', 'Empowered 4.0'],
    outcomes: [
      'Abidance in the highest states of awareness',
      'Complete integration of non-dual understanding',
      'Transmission of the highest teachings from Mohanji\'s lineage',
      'Readiness to serve as a guide for others',
      'The direct experience of one\'s true, liberated nature',
    ],
    registrationUrl: 'https://mohanji.org/courses/',
  },
}
// ─────────────────────────────────────────────────────────────────────────────

function renderRichText(content: any): string {
  if (!content?.root?.children) return ''
  return content.root.children
    .map((node: any) => {
      if (node.type === 'paragraph')
        return `<p>${node.children?.map((c: any) => c.text || '').join('') || ''}</p>`
      if (node.type === 'heading')
        return `<h${node.tag?.slice(1) || 2}>${node.children?.map((c: any) => c.text || '').join('') || ''}</h${node.tag?.slice(1) || 2}>`
      if (node.type === 'list') {
        const tag = node.listType === 'number' ? 'ol' : 'ul'
        const items = node.children?.map((li: any) =>
          `<li>${li.children?.map((c: any) => c.text || '').join('') || ''}</li>`
        ).join('') || ''
        return `<${tag}>${items}</${tag}>`
      }
      return ''
    })
    .join('')
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  try {
    const { docs } = await payload.find({
      collection: 'courses',
      where: { slug: { equals: slug } },
      depth: 0,
      limit: 1,
    })
    const course = docs[0] as any
    if (course) {
      return {
        title: course.meta?.title ?? course.title,
        description: course.meta?.description ?? undefined,
      }
    }
  } catch {
    // fall through
  }
  const staticData = staticCourseData[slug]
  if (staticData) {
    return {
      title: `${staticData.title} | Mohanji Courses`,
      description: staticData.tagline,
    }
  }
  return {}
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  try {
    const { docs } = await payload.find({
      collection: 'courses',
      where: { status: { equals: 'published' } },
      limit: 200,
      depth: 0,
    })
    const cmsParams = (docs as any[]).filter((c) => c.slug).map((c) => ({ slug: c.slug as string }))
    const staticParams = Object.keys(staticCourseData).map((slug) => ({ slug }))
    const allSlugs = new Set([...cmsParams.map((p) => p.slug), ...staticParams.map((p) => p.slug)])
    return Array.from(allSlugs).map((slug) => ({ slug }))
  } catch {
    return Object.keys(staticCourseData).map((slug) => ({ slug }))
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  let course: any = null
  try {
    const { docs } = await payload.find({
      collection: 'courses',
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
      },
      depth: 3,
      limit: 1,
    })
    course = docs[0] as any
  } catch {
    // fall through to static
  }

  const staticData = staticCourseData[slug]

  if (!course && !staticData) return notFound()

  // ── Static fallback rendering ─────────────────────────────────────────────
  if (!course && staticData) {
    const LEVEL_COLOR: Record<string, string> = {
      beginner: 'bg-green-600',
      intermediate: 'bg-[#16697A]',
      advanced: 'bg-[#C95D63]',
    }
    return (
      <div>
        {/* Hero */}
        <section className="relative min-h-[400px] flex items-end overflow-hidden">
          <Image
            src={staticData.image}
            alt={staticData.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="container relative z-10 py-12">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`${LEVEL_COLOR[staticData.level]} text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wider`}>
                {staticData.level.charAt(0).toUpperCase() + staticData.level.slice(1)}
              </span>
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded backdrop-blur-sm">
                {staticData.duration}
              </span>
            </div>
            <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold leading-tight max-w-3xl">
              {staticData.title}
            </h1>
            <p className="text-white/80 max-w-2xl mt-2">{staticData.tagline}</p>
          </div>
        </section>

        {/* Status bar */}
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="container flex flex-wrap items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
              <p className="font-heading text-xl font-semibold text-[#C95D63]">{staticData.price}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
              <p className="font-heading text-xl font-semibold text-[#16697A]">{staticData.duration}</p>
            </div>
            <div className="ml-auto">
              <a
                href={staticData.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-2.5 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-1">About This Course</h2>
                  <span className="gold-divider" />
                  <div className="mt-4 space-y-4">
                    {staticData.description.map((para, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                {staticData.outcomes.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="font-heading text-2xl text-[#16697A] mb-1">What You Will Gain</h2>
                    <span className="gold-divider" />
                    <ul className="mt-4 space-y-3">
                      {staticData.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#E2B748] mt-1 flex-shrink-0">✦</span>
                          <p className="text-gray-700 leading-relaxed">{outcome}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Curriculum */}
                {staticData.curriculum.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="font-heading text-2xl text-[#16697A] mb-1">Curriculum</h2>
                    <span className="gold-divider" />
                    <div className="mt-4 space-y-6">
                      {staticData.curriculum.map((mod, i) => (
                        <div key={i}>
                          <h3 className="font-semibold text-gray-800 mb-2">
                            <span className="text-[#16697A] mr-2">Module {i + 1}:</span>
                            {mod.module}
                          </h3>
                          <ul className="space-y-1 pl-4">
                            {mod.topics.map((topic, j) => (
                              <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E2B748] flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {staticData.prerequisites.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="font-heading text-2xl text-[#16697A] mb-1">Prerequisites</h2>
                    <span className="gold-divider" />
                    <ul className="mt-4 space-y-2">
                      {staticData.prerequisites.map((prereq, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                          <span className="text-[#E2B748]">✦</span>
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="bg-[#16697A]/5 border border-[#16697A]/20 rounded-lg p-6 text-center">
                  <p className="font-heading text-2xl text-[#16697A] font-semibold mb-1">{staticData.price}</p>
                  <p className="text-sm text-gray-500 mb-4">Duration: {staticData.duration}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Ready to begin your journey? Register now to secure your place.
                  </p>
                  <a
                    href={staticData.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#C95D63] text-white py-3 rounded font-medium hover:bg-[#f4442e] transition-colors"
                  >
                    Register Now
                  </a>
                </div>
                <Link
                  href="/courses"
                  className="block text-center text-sm text-[#16697A] border-2 border-[#16697A] rounded py-2.5 hover:bg-[#16697A] hover:text-white transition-colors"
                >
                  ← All Courses
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ── CMS-driven rendering ──────────────────────────────────────────────────

  const imageUrl =
    typeof course.featuredImage === 'object' && course.featuredImage?.url
      ? course.featuredImage.url
      : null
  const descriptionHtml = course.description ? renderRichText(course.description) : ''
  const lessons: any[] = Array.isArray(course.lessons) ? course.lessons : []
  const levelLabel = course.level ? LEVEL_LABELS[course.level] : null

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-end overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 hero-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="container relative z-10 py-12">
          <div className="flex flex-wrap gap-2 mb-3">
            {levelLabel && (
              <span className="bg-[#E2B748] text-[#191919] text-xs font-semibold px-3 py-1 rounded uppercase tracking-wider">
                {levelLabel}
              </span>
            )}
            {course.duration && (
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded backdrop-blur-sm">
                {course.duration}
              </span>
            )}
          </div>
          <h1 className="text-white font-heading text-3xl md:text-5xl font-semibold leading-tight max-w-3xl">
            {course.title}
          </h1>
        </div>
      </section>

      {/* Status bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container flex flex-wrap items-center gap-6">
          {course.price && (
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
              <p className="font-heading text-xl font-semibold text-[#C95D63]">{course.price}</p>
            </div>
          )}
          {lessons.length > 0 && (
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Lessons</p>
              <p className="font-heading text-xl font-semibold text-[#16697A]">{lessons.length}</p>
            </div>
          )}
          {course.duration && (
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
              <p className="font-heading text-xl font-semibold text-[#16697A]">{course.duration}</p>
            </div>
          )}
          {course.registrationUrl && (
            <div className="ml-auto">
              <a
                href={course.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-2.5 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
              >
                Enroll Now
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Description + Blocks + Prerequisites */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              {descriptionHtml && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-1">About This Course</h2>
                  <span className="gold-divider" />
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                      prose-headings:font-heading prose-headings:text-[#16697A]
                      prose-ul:list-disc prose-ul:pl-5"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </div>
              )}

              {/* CMS blocks (if any) */}
              {Array.isArray(course.layout) && course.layout.length > 0 && (
                <RenderBlocks blocks={course.layout} />
              )}

              {/* Prerequisites */}
              {Array.isArray(course.prerequisites) && course.prerequisites.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-1">Prerequisites</h2>
                  <span className="gold-divider" />
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq: any) => {
                      const name = typeof prereq === 'object' ? prereq.title : prereq
                      const prereqSlug = typeof prereq === 'object' ? prereq.slug : null
                      return (
                        <li key={typeof prereq === 'object' ? prereq.id : prereq} className="flex items-center gap-2">
                          <span className="text-[#E2B748]">✦</span>
                          {prereqSlug ? (
                            <Link href={`/courses/${prereqSlug}`} className="text-[#16697A] hover:underline text-sm">
                              {name}
                            </Link>
                          ) : (
                            <span className="text-gray-700 text-sm">{name}</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar: Lesson list + register */}
            <aside className="space-y-6">
              {/* Lesson list */}
              {lessons.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-heading text-xl text-[#16697A] mb-1">
                    Course Content
                  </h3>
                  <span className="gold-divider" />
                  <p className="text-xs text-gray-500 mb-4">
                    {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
                  </p>
                  <ol className="space-y-2">
                    {lessons.map((lesson: any, idx: number) => {
                      const title = typeof lesson === 'object' ? lesson.title : `Lesson ${idx + 1}`
                      const duration = typeof lesson === 'object' ? lesson.duration : null
                      return (
                        <li
                          key={typeof lesson === 'object' ? lesson.id : idx}
                          className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#16697A]/10 text-[#16697A] text-xs font-bold flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-sm text-gray-800 leading-snug">{title}</p>
                            {duration && (
                              <p className="text-xs text-gray-400">{duration}</p>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )}

              {/* Registration CTA */}
              {course.registrationUrl && (
                <div className="bg-[#16697A]/5 border border-[#16697A]/20 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Ready to begin your journey? Register now to secure your place.
                  </p>
                  <a
                    href={course.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#C95D63] text-white py-3 rounded font-medium hover:bg-[#f4442e] transition-colors"
                  >
                    Register Now
                  </a>
                  {course.price && (
                    <p className="text-xs text-gray-500 mt-2">Course fee: {course.price}</p>
                  )}
                </div>
              )}

              <Link
                href="/courses"
                className="block text-center text-sm text-[#16697A] border-2 border-[#16697A] rounded py-2.5 hover:bg-[#16697A] hover:text-white transition-colors"
              >
                ← All Courses
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
