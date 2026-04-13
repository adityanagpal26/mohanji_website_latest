import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

// Ensure node binary is on PATH so Payload's generate:types subprocess can find it
process.env.PATH = `/usr/local/bin:/usr/bin:/bin:${process.env.PATH ?? ''}`

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_BUCKET
          ? `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION ?? 'us-east-1'}.amazonaws.com`
          : 'localhost',
      },
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
