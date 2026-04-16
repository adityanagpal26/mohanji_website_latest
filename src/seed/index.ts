import type { Payload } from 'payload'
import { Pool } from 'pg'
import { seedHomepage } from './homepage'
import { seedWhoIsMohanji } from './whoIsMohanji'
import { seedFoundation } from './foundation'
import { seedLifeJourney } from './lifeJourney'
import { seedGlobalCouncil } from './globalCouncil'
import { seedSpaces } from './spaces'
import { seedGoldenPath } from './goldenPath'
import { seedGlobalAmbassador } from './globalAmbassador'
import { seedAwardsPage } from './awardsPage'
import { seedAwardsCollection } from './awardsCollection'
import { seedMeditations } from './meditations'
import { seedPractices } from './practices'

/**
 * Runs all seed functions on server startup.
 * Each seed checks whether its data already exists before inserting —
 * so this is safe to run on every deploy (idempotent).
 */
export async function seedIfNeeded(payload: Payload): Promise<void> {
  const dbUrl = process.env.DATABASE_URL || ''
  const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')
  const isStaging = dbUrl.includes('staging')
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: (isLocal || isStaging) ? false : { rejectUnauthorized: false },
  })

  const seedPage = async (slug: string, label: string, fn: (p: Payload, pool: Pool) => Promise<void>) => {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (docs.length === 0) {
      console.log(`[seed] ${label} not found — seeding...`)
      await fn(payload, pool)
    } else {
      console.log(`[seed] ${label} already exists — skipping.`)
    }
  }

  try {
    await seedPage('home',              'Homepage',           seedHomepage)
    await seedPage('who-is-mohanji',   'Who is Mohanji',     seedWhoIsMohanji)
    await seedPage('mohanji-foundation','Mohanji Foundation', seedFoundation)
    await seedPage('life-journey',     "Life Journey",       seedLifeJourney)
    await seedPage('global-council',   'Global Council',     seedGlobalCouncil)
    await seedPage('mohanji-spaces',   'Mohanji Spaces',     seedSpaces)
    await seedPage('golden-path',      'The Golden Path',    seedGoldenPath)
    await seedPage('global-ambassador','Global Ambassador',  seedGlobalAmbassador)
    await seedPage('awards',           'Awards & Recognition', seedAwardsPage)

    // Seed awards collection (separate from pages)
    const { totalDocs: awardsCount } = await payload.find({ collection: 'awards', limit: 1 })
    if (awardsCount === 0) {
      console.log('[seed] Awards collection empty — seeding...')
      await seedAwardsCollection(payload, pool)
    } else {
      console.log('[seed] Awards collection already has data — skipping.')
    }

    // Seed meditations
    console.log('[seed] Seeding meditations...')
    await seedMeditations(payload)

    // Seed practices
    console.log('[seed] Seeding practices...')
    await seedPractices(payload)
  } finally {
    await pool.end()
  }
}
