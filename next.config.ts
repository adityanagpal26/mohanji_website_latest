import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

// Ensure node binary is on PATH so Payload's generate:types subprocess can find it
process.env.PATH = `/usr/local/bin:/usr/bin:/bin:${process.env.PATH ?? ''}`

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@payloadcms/storage-s3',
    '@aws-sdk/client-s3',
    '@aws-sdk/s3-request-presigner',
    '@aws-sdk/lib-storage',
  ],
  images: {
    remotePatterns: [
      // Direct S3 URL (fallback when no CDN configured)
      {
        protocol: 'https',
        hostname: process.env.S3_BUCKET
          ? `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION ?? 'us-east-1'}.amazonaws.com`
          : 'localhost',
      },
      // CloudFront CDN (*.cloudfront.net — covers both staging and production distributions)
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      // Custom CDN domain (e.g. cdn.mohanji.org) — matches if NEXT_PUBLIC_CDN_URL is set to a custom domain
      ...(process.env.NEXT_PUBLIC_CDN_URL
        ? [{
            protocol: 'https' as const,
            hostname: new URL(process.env.NEXT_PUBLIC_CDN_URL).hostname,
          }]
        : []),
      {
        protocol: 'https',
        hostname: 'mohanji.org',
        pathname: '/wp-content/**',
      },
      {
        // Blog/satsangs subdomain for featured images
        protocol: 'https',
        hostname: 'mohanji.org',
        pathname: '/blogs/**',
      },
    ],
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/media/**' },
      { pathname: '/images/**' },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  async redirects() {
    return [
      // WP legacy URL patterns → new routes
      { source: '/future-events', destination: '/events', permanent: true },
      { source: '/past-events', destination: '/events/past', permanent: true },
      { source: '/free-guided-meditation', destination: '/meditations', permanent: true },
      { source: '/mohanji-quotes', destination: '/quotes', permanent: true },
      { source: '/mohanji-quotes/:path*', destination: '/quotes/:path*', permanent: true },
      { source: '/blogs/satsangs/:path*', destination: '/blog/:path*', permanent: true },
      { source: '/press-coverage/:path*', destination: '/news/:path*', permanent: true },
      { source: '/who-is-mohanji', destination: '/about/who-is-mohanji', permanent: true },
      { source: '/mohanji-life-journey', destination: '/about/life-journey', permanent: true },
      { source: '/mohanji-foundation', destination: '/about/foundation', permanent: true },
      { source: '/mohanji-global-council', destination: '/about/global-council', permanent: true },
      { source: '/acharyas', destination: '/about/acharyas', permanent: true },
      { source: '/mohanji-spaces', destination: '/about/spaces', permanent: true },
      { source: '/the-golden-path', destination: '/about/golden-path', permanent: true },
      { source: '/global-ambassador', destination: '/join', permanent: true },
      { source: '/awards-and-recognition', destination: '/about/awards', permanent: true },
      { source: '/volunteer', destination: '/join/volunteer', permanent: true },
      { source: '/youth-club', destination: '/join/youth-club', permanent: true },
      { source: '/mohanji-youth-club', destination: '/join/youth-club', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      // Legacy date-based blog URLs
      { source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*', destination: '/blog/:slug*', permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
