import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

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

// Seed
import { seedIfNeeded } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useS3 = Boolean(process.env.S3_BUCKET && process.env.S3_REGION && process.env.AWS_ACCESS_KEY_ID)

export default buildConfig({
  onInit: async (payload) => {
    await seedIfNeeded(payload).catch((err) => {
      console.error('[seed] Seeding failed (non-fatal):', err)
    })
  },

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
      connectionString: process.env.DATABASE_URL,
    },
    push: process.env.NODE_ENV !== 'production',
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
