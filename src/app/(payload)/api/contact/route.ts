import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, country, subject, message } = data

    // ── Validate required fields ────────────────────────────────────────────
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject and message are required' },
        { status: 400 },
      )
    }

    // ── Determine recipient email from CMS SiteSettings ─────────────────────
    let toEmail = 'info@mohanji.org' // safe fallback
    try {
      const payload = await getPayloadClient()
      const settings = await payload.findGlobal({ slug: 'site-settings' })
      if ((settings as any)?.contactEmail) {
        toEmail = (settings as any).contactEmail
      }
    } catch {
      // proceed with fallback — don't block form submission
    }

    // ── Send via Resend ──────────────────────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // No API key configured — log and still return success so form UX works
      console.warn('[contact] RESEND_API_KEY not set. Email not sent (logging only).')
      console.log('[contact] Would have emailed to:', toEmail)
      console.log('[contact] Submission:', { name, email, phone, country, subject, message: message.slice(0, 200) })
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(apiKey)

    const html = buildEmailHtml({ name, email, phone, country, subject, message })
    const text = buildEmailText({ name, email, phone, country, subject, message })

    const { error } = await resend.emails.send({
      from: 'Mohanji Foundation Website <noreply@mohanji.org>',
      to: [toEmail],
      replyTo: email,
      subject: `[Contact Form] ${subject} — from ${name}`,
      html,
      text,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

// ── Email templates ──────────────────────────────────────────────────────────

interface FormData {
  name: string
  email: string
  phone?: string
  country?: string
  subject: string
  message: string
}

function buildEmailHtml(d: FormData): string {
  const rows = [
    ['Name', d.name],
    ['Email', `<a href="mailto:${d.email}" style="color:#16697A">${d.email}</a>`],
    ...(d.phone ? [['Phone', d.phone]] : []),
    ...(d.country ? [['Country', d.country]] : []),
    ['Subject', d.subject],
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#f5f5f5;font-weight:600;color:#333;width:120px;vertical-align:top;font-family:Arial,sans-serif;font-size:14px;border-bottom:1px solid #e5e5e5">${label}</td>
        <td style="padding:8px 12px;color:#444;font-family:Arial,sans-serif;font-size:14px;border-bottom:1px solid #e5e5e5">${value}</td>
      </tr>`,
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#16697A,#5B2D8E);padding:28px 32px;text-align:center">
            <p style="color:#E2B748;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px">Mohanji Foundation</p>
            <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:600">New Contact Form Message</h1>
          </td>
        </tr>

        <!-- Sender details table -->
        <tr>
          <td style="padding:24px 32px 12px">
            <p style="font-size:13px;color:#888;margin:0 0 12px">Received from the Contact Us form on mohanji.org</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden">
              ${tableRows}
            </table>
          </td>
        </tr>

        <!-- Message body -->
        <tr>
          <td style="padding:12px 32px 32px">
            <p style="font-size:13px;font-weight:600;color:#333;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px">Message</p>
            <div style="background:#f9f9f9;border-left:4px solid #16697A;padding:16px 20px;border-radius:0 6px 6px 0;color:#444;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(d.message)}</div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 32px 28px;text-align:center">
            <a href="mailto:${d.email}?subject=Re: ${encodeURIComponent(d.subject)}"
               style="display:inline-block;background:#C95D63;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:4px;font-size:14px;font-weight:600">
              Reply to ${d.name}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f5f5;padding:16px 32px;text-align:center;border-top:1px solid #e5e5e5">
            <p style="font-size:12px;color:#999;margin:0">This message was sent via the Contact Us form at <a href="https://mohanji.org/contact" style="color:#16697A;text-decoration:none">mohanji.org</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildEmailText(d: FormData): string {
  const lines = [
    'New Contact Form Submission — mohanji.org',
    '─'.repeat(42),
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    ...(d.phone ? [`Phone:   ${d.phone}`] : []),
    ...(d.country ? [`Country: ${d.country}`] : []),
    `Subject: ${d.subject}`,
    '─'.repeat(42),
    'Message:',
    d.message,
    '─'.repeat(42),
    `Reply directly to: ${d.email}`,
  ]
  return lines.join('\n')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
