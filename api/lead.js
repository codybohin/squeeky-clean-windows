// api/lead.js — Vercel Serverless Function
// Receives quote requests and commercial enquiries from the website.
//
// By default this logs the lead and emails it to you via Resend (free tier).
// To turn on email delivery:
//   1. Create a free account at https://resend.com
//   2. Add an env var RESEND_API_KEY in your Vercel dashboard
//   3. Set LEAD_TO_EMAIL to where you want leads delivered
// If RESEND_API_KEY isn't set, the function still succeeds and logs the
// lead to your Vercel function logs so nothing is lost while you set up email.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { business, name, email, phone, details } = req.body || {};

  // Basic validation — name + a way to reach them
  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'Please include your name and an email or phone.' });
  }

  const lead = {
    business: business || '(residential / not given)',
    name,
    email: email || '(none)',
    phone: phone || '(none)',
    details: details || '(none)',
    received: new Date().toISOString()
  };

  // Always log so the lead is never lost, even before email is configured
  console.log('NEW LEAD:', JSON.stringify(lead));

  // Optional: email the lead via Resend if configured
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (key && to) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Squeeky Clean Leads <onboarding@resend.dev>',
          to: [to],
          subject: `New quote request — ${lead.name}`,
          text:
`New lead from squeakycleanwindows.com

Business:  ${lead.business}
Name:      ${lead.name}
Email:     ${lead.email}
Phone:     ${lead.phone}

Details:
${lead.details}

Received: ${lead.received}`
        })
      });
    } catch (err) {
      console.error('Email send failed (lead still logged):', err);
      // Don't fail the request — the lead is logged regardless
    }
  }

  return res.status(200).json({ ok: true });
}
