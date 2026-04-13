import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, consent } = data

    if (!email || !consent) {
      return NextResponse.json({ error: 'Email and consent required' }, { status: 400 })
    }

    // Log the subscription (in production, integrate with Mailchimp/ConvertKit/etc.)
    console.log(`Newsletter subscription: ${name} <${email}>`)

    // TODO: integrate with email service provider
    // e.g. Mailchimp: POST to https://us1.api.mailchimp.com/3.0/lists/{list_id}/members

    return NextResponse.json({ success: true, message: 'Thank you for subscribing!' })
  } catch (err) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
