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

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isBuilding = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
const useS3 = Boolean(process.env.S3_BUCKET && process.env.S3_REGION && process.env.AWS_ACCESS_KEY_ID)

export default buildConfig({
  // Seed is triggered on-demand via GET /api/dev-seed — NOT on startup.
  // Running seed in onInit causes Lambda cold-start timeouts (image downloads take too long).

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

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
      // SSL config separate from connection string (never mix sslmode= in the URL with this object)
      ssl: isBuilding ? false : { rejectUnauthorized: false },
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
              },
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
              },
              region: process.env.S3_REGION!,
            },
          }),
        ]
      : []),
  ],
})
