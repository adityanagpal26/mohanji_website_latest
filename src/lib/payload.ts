import config from '@payload-config'
import { getPayload } from 'payload'

// Singleton so Next.js HMR doesn't create multiple instances in dev
let cachedPayload: Awaited<ReturnType<typeof getPayload>>

export async function getPayloadClient() {
  if (cachedPayload) return cachedPayload
  cachedPayload = await getPayload({ config })
  return cachedPayload
}
