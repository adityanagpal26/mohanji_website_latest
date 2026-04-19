import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Meditations } from './collections/Meditations'
import { Practices } from './collections/Practices'
import { Courses } from './collections/Courses'
import { Lessons } from './collections/Lessons'
import { Events } from './collections/Events'
import { Books } from './collections/Books'
import { Audios } from './collections/Audios'
import { Quotes } from './collections/Quotes'
import { Awards } from './collections/Awards'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Venues } from './collections/Venues'
import { Forms } from './collections/Forms'
import { MaiTriApplications } from './collections/MaiTriApplications'
import { KriyaApplications } from './collections/KriyaApplications'
import { AnnualReports } from './collections/AnnualReports'

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isBuilding = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
const useS3 = Boolean(process.env.S3_BUCKET && process.env.S3_REGION && (process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID))
// Optional CloudFront CDN — if set, Payload generates CDN URLs instead of direct S3 URLs
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, '') || undefined

export default buildConfig({
  // Seed is triggered on-demand via GET /api/dev-seed — NOT on startup.
  // Running seed in onInit causes Lambda cold-start timeouts (image downloads take too long).

  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',

  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Meditations,
    Practices,
    Courses,
    Lessons,
    Events,
    Books,
    Audios,
    Quotes,
    Awards,
    Categories,
    Tags,
    Venues,
    Forms,
    MaiTriApplications,
    KriyaApplications,
    AnnualReports,
  ],

  globals: [Header, Footer, SiteSettings],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      // During next build (compile phase), use a dummy URL — pages are force-dynamic so no DB needed at build
      connectionString: isBuilding
        ? 'postgresql://localhost:5432/build_placeholder'
        : (process.env.DATABASE_URI || process.env.DATABASE_URL),
      // SSL: enabled for remote RDS, disabled for local Docker
      ssl: (() => {
        if (isBuilding) return false
        const dbUrl = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
        const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')
        return isLocal ? false : { rejectUnauthorized: false }
      })(),
    },
    push: false,
  }),

  sharp,

  plugins: [
    ...(useS3
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
                // Always provide generateFileURL so URLs are absolute.
                // Uses CloudFront CDN if NEXT_PUBLIC_CDN_URL is set, falls back to direct S3 URL.
                generateFileURL: ({ filename, prefix }) => {
                  const p = prefix ?? 'media'
                  if (cdnUrl) return `${cdnUrl}/${p}/${filename}`
                  return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION ?? 'us-east-1'}.amazonaws.com/${p}/${filename}`
                },
              },
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: (process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID)!,
                secretAccessKey: (process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY)!,
              },
              region: process.env.S3_REGION!,
            },
          }),
        ]
      : []),
  ],
})
