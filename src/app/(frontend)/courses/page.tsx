import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Empowered Courses | Mohanji',
  description:
    'Make your life more purposeful. Empowered courses by Mohanji — online workshops and in-person retreats to reinvent yourself and awaken your highest potential.',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
}

export default async function CoursesPage() {
  const payload = await getPayloadClient()

  const { docs: courses } = await payload.find({
    collection: 'courses',
    where: { status: { equals: 'published' } },
    sort: 'title',
    depth: 1,
    limit: 100,
  })

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-24 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Online Courses &amp; Workshops
          </p>
          <h1 className="text-white font-heading text-4xl md:text-6xl font-semibold mb-2">
            EMPOWERED!
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/85 text-xl max-w-2xl mx-auto leading-relaxed mt-4">
            Make your life more purposeful. YOU CAN. Reinvent yourself. YOU CAN.
            Do not just let hours laze by and regret in the days ahead.
            Every moment is precious. It will never happen again.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="https://mohanji.org/courses/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-8 py-3 rounded font-medium transition-colors"
            >
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl text-[#16697A] mb-1">What to Expect</h2>
            <span className="gold-divider gold-divider--center" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Connection to Self', desc: 'Gain stability and an ability to respond (and not react) to situations.' },
              { title: 'Awareness', desc: 'Becoming aware of your limiting beliefs, habits and patterns.' },
              { title: 'Unhooking', desc: 'Consciously unhooking from binding attachments.' },
              { title: 'Rewiring', desc: 'Gaining clarity and rewiring your inner software.' },
              { title: 'Know Your Purpose', desc: 'Understanding the role of purpose in leading a meaningful life and realising your full potential.' },
              { title: 'Inner Awakening', desc: 'Awakening to the higher consciousness and experiencing true and lasting changes within.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#F5F5F5] rounded-lg p-5 border-l-4 border-[#16697A]">
                <h3 className="font-heading text-lg text-[#16697A] mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-12 bg-[#16697A] text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-3xl mb-1">Choose Your Path</h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/80 leading-relaxed mt-4">
            Each course is carefully designed to guide you step by step — from Empowered 1.0 online
            recordings to the Empowered 5.0 in-person retreat with Mohanji in India.
          </p>
        </div>
      </section>

      {/* Courses grid */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container">
          {courses.length === 0 ? (
            /* Fallback: real Empowered course listings from mohanji.org */
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Empowered 1.0',
                  type: 'Course',
                  format: 'Video recording of an interactive Live Online Workshop',
                  level: 'beginner',
                  slug: 'empowered-1-0',
                  url: 'https://mohanji.org/courses/',
                  description: 'Begin your journey from fear to freedom. A foundational workshop connecting you with yourself through the manual of human life.',
                },
                {
                  title: 'Empowered 2.0',
                  type: 'Course',
                  format: 'Video recording of an interactive online workshop',
                  level: 'intermediate',
                  slug: 'empowered-2-0',
                  url: 'https://mohanji.org/courses/',
                  description: 'Continue deepening awareness and unhooking from binding patterns — a natural progression from Empowered 1.0.',
                },
                {
                  title: 'Empowered 3.0',
                  type: 'Course',
                  format: 'Video recording of an interactive online workshop',
                  level: 'intermediate',
                  slug: 'empowered-3-0',
                  url: 'https://mohanji.org/courses/',
                  description: 'Deepen your inner rewiring and gain clarity on purpose — building on the foundation of earlier Empowered levels.',
                },
                {
                  title: 'Empowered 4.0',
                  type: 'Course',
                  format: 'Video recording of an interactive online workshop',
                  level: 'advanced',
                  slug: 'empowered-4-0',
                  url: 'https://mohanji.org/courses/',
                  description: 'Advanced inner work for consistent practitioners — exploring subtler dimensions of consciousness and liberation.',
                },
                {
                  title: 'Empowered 5.0',
                  type: 'Workshop',
                  format: 'In-person retreat with Mohanji in India',
                  level: 'advanced',
                  slug: 'empowered-5-0',
                  url: 'https://mohanji.org/courses/',
                  description: 'The pinnacle of the Empowered series — an immersive in-person retreat with Mohanji in India for deep transformation.',
                },
                {
                  title: 'Empowered 5.2',
                  type: 'Workshop',
                  format: 'Silent Retreat',
                  level: 'advanced',
                  slug: 'empowered-5-2',
                  url: 'https://mohanji.org/courses/',
                  description: 'A profound silent retreat — the deepest level of the Empowered journey, for serious seekers of inner freedom.',
                },
                {
                  title: 'Weekly Talk with Mohanji',
                  type: 'Workshop',
                  format: 'Live Zoom Sessions',
                  level: 'beginner',
                  slug: 'weekly-talk-mohanji',
                  url: 'https://mohanji.org/courses/',
                  description: 'Regular live Zoom sessions with Mohanji — satsangs, Q&A, and direct transmission for seekers worldwide.',
                },
                {
                  title: 'Empowered 1.0–4.0 Trainer',
                  type: 'Workshop',
                  format: 'Trainer certification',
                  level: 'advanced',
                  slug: 'empowered-trainer',
                  url: 'https://mohanji.org/courses/',
                  description: 'Become a certified facilitator to lead Empowered 1.0–4.0 sessions in your community around the world.',
                },
              ].map((course) => {
                const levelColor =
                  course.level === 'beginner'
                    ? 'bg-green-100 text-green-800'
                    : course.level === 'intermediate'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                const levelLabel =
                  course.level === 'beginner'
                    ? 'Beginner'
                    : course.level === 'intermediate'
                      ? 'Intermediate'
                      : 'Advanced'
                return (
                  <a
                    key={course.slug}
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    <div className="relative h-12 bg-gradient-to-r from-[#16697A] to-[#5B2D8E] flex items-center px-4 gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${levelColor}`}>
                        {levelLabel}
                      </span>
                      <span className="text-white/70 text-xs uppercase tracking-wider">{course.type}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-1 group-hover:text-[#C95D63] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">{course.format}</p>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">{course.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#C95D63] group-hover:underline">
                          Find out more →
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(courses as any[]).map((course) => {
                const imageUrl =
                  typeof course.featuredImage === 'object' && course.featuredImage?.url
                    ? course.featuredImage.url
                    : null
                const levelLabel = course.level ? LEVEL_LABELS[course.level] : null
                const levelColor = course.level
                  ? (LEVEL_COLORS[course.level] ?? 'bg-gray-100 text-gray-600')
                  : ''
                const lessonCount = Array.isArray(course.lessons) ? course.lessons.length : 0

                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 bg-gradient-to-br from-[#16697A]/20 to-[#5B2D8E]/20 overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-30">📚</span>
                        </div>
                      )}
                      {levelLabel && (
                        <div
                          className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded ${levelColor}`}
                        >
                          {levelLabel}
                        </div>
                      )}
                      {course.price && (
                        <div className="absolute top-3 right-3 bg-white text-[#C95D63] text-xs font-bold px-2 py-1 rounded shadow">
                          {course.price}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-xl text-[#16697A] leading-snug mb-2 group-hover:text-[#C95D63] transition-colors">
                        {course.title}
                      </h3>
                      {course.duration && (
                        <p className="text-xs text-gray-500 mb-1">
                          <span className="mr-1">⏱</span>{course.duration}
                        </p>
                      )}
                      {lessonCount > 0 && (
                        <p className="text-xs text-gray-500 mb-3">
                          <span className="mr-1">📖</span>{lessonCount} lesson{lessonCount !== 1 ? 's' : ''}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#C95D63] group-hover:underline">
                          View course →
                        </span>
                        {course.registrationUrl && (
                          <span className="text-xs text-gray-400">Open for enrollment</span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl text-[#16697A] text-center mb-2">
            What Participants Say
          </h2>
          <span className="gold-divider gold-divider--center" />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                quote:
                  'Thank you Mohanji, great learnings taking place here within me. I am so grateful for being included in this journey with you!',
                name: 'Carina Elizabeth Szabo',
                course: 'Empowered 1.0',
              },
              {
                quote:
                  'A very powerful event. I have the feeling like every answer is for me and cannot put the pen down, trying to write down everything.',
                name: 'Andrijana Ristovska',
                course: 'Empowered 1.0 — Macedonia',
              },
              {
                quote:
                  'These past four days have been such an immense blessing. So many patterns are being revealed, so many unconscious fears coming to forth. This is truly a journey within.',
                name: 'Arushi',
                course: 'Empowered 1.0 — India',
              },
            ].map((t) => (
              <div key={t.name} className="bg-[#F5F5F5] rounded-lg p-6">
                <p className="text-gray-700 text-sm leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-semibold text-[#16697A] text-sm">{t.name}</p>
                <p className="text-xs text-[#E2B748] font-semibold">{t.course}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient text-center">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-3xl text-white mb-1">Not Sure Where to Start?</h2>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/80 mb-8 mt-4">
            Begin with Empowered 1.0 — a video recording of an interactive live online workshop
            that has transformed thousands of lives around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://mohanji.org/courses/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors"
            >
              Start with Empowered 1.0
            </a>
            <Link
              href="/meditations"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded hover:bg-white hover:text-[#16697A] transition-colors"
            >
              Free Meditations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
