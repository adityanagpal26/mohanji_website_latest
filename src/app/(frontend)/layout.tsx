import React from 'react'
import type { Metadata } from 'next'
import { EB_Garamond, Lato } from 'next/font/google'
import { getPayloadClient } from '@/lib/payload'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  let faviconUrl: string | undefined
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null)
    const faviconField = (settings as any)?.favicon
    if (faviconField && typeof faviconField === 'object' && typeof faviconField.url === 'string') {
      faviconUrl = faviconField.url
    }
  } catch {
    // DB unavailable during build — use fallback
  }

  return {
    title: { default: 'Mohanji — Boundless Love, Timeless Wisdom', template: '%s | Mohanji' },
    description: 'Mohanji is a spiritual master, humanitarian, and the embodiment of boundless love and timeless wisdom.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://mohanji.org'),
    icons: faviconUrl
      ? { icon: faviconUrl, shortcut: faviconUrl, apple: faviconUrl }
      : { icon: '/favicon.ico', shortcut: '/favicon.ico' },
    openGraph: {
      type: 'website',
      siteName: 'Mohanji',
      title: 'Mohanji — Boundless Love, Timeless Wisdom',
      description: 'Spiritual master, humanitarian and the embodiment of boundless love and timeless wisdom.',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mohanji' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@MohanjiOfficial',
      creator: '@MohanjiOfficial',
    },
    robots: { index: true, follow: true },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let headerData = null
  let footerData = null

  try {
    const payload = await getPayloadClient()
    ;[headerData, footerData] = await Promise.all([
      payload.findGlobal({ slug: 'header', depth: 1 }).catch(() => null),
      payload.findGlobal({ slug: 'footer', depth: 1 }).catch(() => null),
    ])
  } catch {
    // DB unavailable during build — render with empty header/footer
  }

  return (
    <html lang="en" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body>
        <Header
          logo={headerData?.logo as any}
          navItems={(headerData?.navItems ?? []) as any}
        />
        <main>{children}</main>
        <Footer
          columns={(footerData?.columns ?? []) as any}
          socialLinks={(footerData?.socialLinks ?? []) as any}
          copyrightText={footerData?.copyrightText ?? undefined}
          newsletterEnabled={footerData?.newsletterEnabled ?? true}
          privacyPolicyUrl={footerData?.privacyPolicyUrl ?? '/privacy-policy'}
        />
      </body>
    </html>
  )
}
