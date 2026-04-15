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
      collection: 'mai-tri-applications',
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        dateOfBirth: data.dateOfBirth || '',
        country: data.country || '',
        city: data.city || '',
        mohanjiConnection: data.mohanjiConnection || '',
        yearsWithMohanji: data.yearsWithMohanji || '',
        attendedRetreats: data.attendedRetreats || '',
        practicesFollowed: data.practicesFollowed || '',
        meditationPractice: data.meditationPractice || '',
        dietaryPractice: data.dietaryPractice || '',
        smokingAlcohol: data.smokingAlcohol || '',
        healthConditions: data.healthConditions || '',
        hoursPerWeek: data.hoursPerWeek || '',
        sessionMode: data.sessionMode || '',
        languages: data.languages || '',
        whyMaiTri: data.whyMaiTri || '',
        innerMotivation: data.innerMotivation || '',
        previousHealingExperience: data.previousHealingExperience || '',
        signatureDate: data.signatureDate || '',
        signaturePlace: data.signaturePlace || '',
        signatureName: data.signatureName || '',
        status: 'new',
      },
    })

    // TODO: send email notification to applyFormEmail once email service is configured
    console.log(`[mai-tri-apply] New practitioner application from ${data.fullName} <${data.email}>`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[mai-tri-apply] Error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
