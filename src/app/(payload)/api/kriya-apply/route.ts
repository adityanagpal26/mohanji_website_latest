import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.fullName || !data.email) {
      return NextResponse.json({ error: 'Full name and email are required.' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    await payload.create({
      collection: 'kriya-applications',
      data: {
        fullName: data.fullName,
        phone: data.phone || '',
        gender: data.gender || '',
        country: data.country || '',
        age: data.age ? Number(data.age) : undefined,
        email: data.email,
        needsAssistance: data.needsAssistance || '',
        status: 'new',
      },
    })

    // TODO: send email notification to applyFormEmail once email service is configured
    console.log(`[kriya-apply] New initiation application from ${data.fullName} <${data.email}>`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[kriya-apply] Error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
