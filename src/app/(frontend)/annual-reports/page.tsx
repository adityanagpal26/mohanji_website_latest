import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Annual Reports | Mohanji Foundation',
  description: 'Download annual reports from Mohanji Foundation — a summary of activities, impact, and initiatives each year.',
}

export default async function AnnualReportsPage() {
  const payload = await getPayloadClient()

  const { docs: reports } = await payload.find({
    collection: 'annual-reports',
    where: { status: { equals: 'published' } },
    sort: '-year',
    depth: 1,
    limit: 50,
  })

  const latestReport = (reports as any[])[0] ?? null
  const olderReports  = (reports as any[]).slice(1)

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-gradient py-20 text-center">
        <div className="container">
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-sm mb-3">
            Media
          </p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-semibold mb-2">
            Annual Reports
          </h1>
          <span className="block w-14 h-0.5 bg-[#E2B748] mx-auto my-5" />
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Each year's report documents the global reach, humanitarian activities, and transformative initiatives of Mohanji Foundation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F5F5F5]">
        <div className="container max-w-5xl">

          {reports.length === 0 ? (
            /* ── Empty state ──────────────────────────────────────── */
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="font-heading text-2xl text-[#16697A] mb-2">Coming Soon</h2>
              <p className="text-gray-500">Annual reports will be available here shortly.</p>
            </div>
          ) : (
            <>
              {/* ── Latest report — featured card ─────────────────── */}
              {latestReport && <LatestReportCard report={latestReport} />}

              {/* ── Older reports grid ────────────────────────────── */}
              {olderReports.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-heading text-2xl text-[#16697A] mb-6 font-semibold">
                    Previous Reports
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {olderReports.map((report: any) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

// ── Latest / featured report card ──────────────────────────────────────────────
function LatestReportCard({ report }: { report: any }) {
  const fileUrl  = typeof report.file === 'object' ? report.file?.url : null
  const coverUrl = typeof report.coverImage === 'object' ? report.coverImage?.url : null

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
      {/* Cover thumbnail */}
      <div className="relative w-full md:w-56 flex-shrink-0 bg-gradient-to-br from-[#16697A]/15 to-[#5B2D8E]/15 min-h-[200px] md:min-h-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`${report.title} cover`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-5xl opacity-30">📋</span>
            <span className="text-[#16697A] font-heading font-bold text-3xl opacity-40">
              {report.year}
            </span>
          </div>
        )}
        {/* "Latest" badge */}
        <span className="absolute top-3 left-3 bg-[#E2B748] text-[#191919] text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
          Latest
        </span>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col justify-between flex-1">
        <div>
          <p className="text-[#E2B748] font-semibold uppercase tracking-widest text-xs mb-1">
            Annual Report
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-[#16697A] font-semibold mb-3">
            {report.title}
          </h2>
          {report.description && (
            <p className="text-gray-600 leading-relaxed mb-4">
              {report.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {fileUrl ? (
            <>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#16697A] text-white px-6 py-2.5 rounded hover:bg-[#0e4f5c] transition-colors font-medium text-sm"
              >
                <PdfIcon />
                View Report
              </a>
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-2 border-2 border-[#16697A] text-[#16697A] px-6 py-2.5 rounded hover:bg-[#16697A] hover:text-white transition-colors font-medium text-sm"
              >
                <DownloadIcon />
                Download PDF
              </a>
            </>
          ) : (
            <span className="text-sm text-gray-400 italic">PDF not yet available</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Older report card ─────────────────────────────────────────────────────────
function ReportCard({ report }: { report: any }) {
  const fileUrl  = typeof report.file === 'object' ? report.file?.url : null
  const coverUrl = typeof report.coverImage === 'object' ? report.coverImage?.url : null

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Cover thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-[#16697A]/10 to-[#5B2D8E]/10">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`${report.title} cover`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-4xl opacity-20">📋</span>
            <span className="text-[#16697A] font-heading font-bold text-4xl opacity-25">
              {report.year}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#E2B748] font-semibold uppercase tracking-wider mb-1">
          {report.year}
        </p>
        <h3 className="font-heading text-lg text-[#16697A] font-semibold mb-2 leading-snug line-clamp-2">
          {report.title}
        </h3>
        {report.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
            {report.description}
          </p>
        )}

        <div className="flex gap-2 mt-auto pt-2">
          {fileUrl ? (
            <>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm font-semibold bg-[#16697A] text-white py-2 rounded hover:bg-[#0e4f5c] transition-colors"
              >
                View
              </a>
              <a
                href={fileUrl}
                download
                className="flex-1 text-center text-sm font-semibold border border-[#16697A] text-[#16697A] py-2 rounded hover:bg-[#16697A] hover:text-white transition-colors"
              >
                Download
              </a>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">PDF not yet available</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
function PdfIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}
