import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, subject, message } = data

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Log the contact submission (in production, send email via nodemailer/resend/etc.)
    console.log('Contact form submission:', { name, email, subject, message: message.slice(0, 100) })

    // TODO: integrate with email service
    // e.g. Resend: POST to https://api.resend.com/emails

    return NextResponse.json({ success: true, message: 'Message received! We will get back to you soon.' })
  } catch (err) {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
