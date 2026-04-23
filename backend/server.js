require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://yourdomain.com',
  methods: ['POST', 'GET'],
  credentials: true
}))

// Rate limiting — max 5 contact submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' }
})

// Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })
}

// POST /api/contact
app.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
    }

    // Sanitize
    const safeName = name.replace(/[<>]/g, '').substring(0, 100)
    const safeEmail = email.substring(0, 200)
    const safeSubject = (subject || 'No Subject').replace(/[<>]/g, '').substring(0, 200)
    const safeMessage = message.replace(/[<>]/g, '').substring(0, 5000)

    const transporter = createTransporter()

    // Email to YOU (portfolio owner)
    const ownerMailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: 'abuturabhassankhan@gmail.com',
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #0a0a0f; color: #f0ede8; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { border-bottom: 1px solid rgba(200,169,110,0.3); padding-bottom: 24px; margin-bottom: 32px; }
            .logo { font-size: 1.5rem; color: #f0ede8; font-weight: 300; letter-spacing: 0.02em; }
            .logo span { color: #c8a96e; }
            .badge { font-size: 0.65rem; letter-spacing: 0.25em; color: #c8a96e; text-transform: uppercase; margin-top: 4px; }
            .card { background: #111120; border: 1px solid rgba(200,169,110,0.15); padding: 28px; margin-bottom: 20px; }
            .field-label { font-size: 0.65rem; letter-spacing: 0.2em; color: #c8a96e; text-transform: uppercase; margin-bottom: 6px; }
            .field-value { color: #f0ede8; font-size: 0.95rem; line-height: 1.6; }
            .message-box { background: #0a0a0f; border: 1px solid rgba(200,169,110,0.1); padding: 20px; margin-top: 8px; white-space: pre-wrap; line-height: 1.7; }
            .footer { font-size: 0.7rem; color: #5a5650; margin-top: 32px; border-top: 1px solid rgba(200,169,110,0.1); padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo">Abu Turab Hassan<span>.</span></div>
              <div class="badge">✦ New Portfolio Message</div>
            </div>
            <div class="card">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                  <div class="field-label">From</div>
                  <div class="field-value">${safeName}</div>
                </div>
                <div>
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${safeEmail}" style="color:#c8a96e;">${safeEmail}</a></div>
                </div>
              </div>
              <div>
                <div class="field-label">Subject</div>
                <div class="field-value">${safeSubject}</div>
              </div>
            </div>
            <div class="card">
              <div class="field-label">Message</div>
              <div class="message-box field-value">${safeMessage}</div>
            </div>
            <div style="text-align:center; margin-top:24px;">
              <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(safeSubject)}" 
                style="background:#c8a96e; color:#0a0a0f; text-decoration:none; 
                padding:12px 28px; font-size:0.72rem; letter-spacing:0.15em; 
                text-transform:uppercase; display:inline-block;">
                Reply to ${safeName} →
              </a>
            </div>
            <div class="footer">
              This message was sent from your portfolio contact form at abuturabhassan.dev
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Auto-reply to sender
    const autoReplyOptions = {
      from: `"Abu Turab Hassan" <${process.env.GMAIL_USER}>`,
      to: safeEmail,
      subject: `Thanks for reaching out, ${safeName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #0a0a0f; color: #f0ede8; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { border-bottom: 1px solid rgba(200,169,110,0.3); padding-bottom: 24px; margin-bottom: 32px; }
            .logo { font-size: 1.5rem; color: #f0ede8; font-weight: 300; }
            .logo span { color: #c8a96e; }
            .badge { font-size: 0.65rem; letter-spacing: 0.25em; color: #c8a96e; text-transform: uppercase; margin-top: 4px; }
            h2 { font-size: 1.8rem; font-weight: 300; color: #f0ede8; margin-bottom: 16px; }
            h2 em { color: #c8a96e; font-style: italic; }
            p { color: #9a9590; line-height: 1.75; font-size: 0.95rem; }
            .divider { height: 1px; background: rgba(200,169,110,0.15); margin: 24px 0; }
            .footer { font-size: 0.7rem; color: #5a5650; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo">Abu Turab Hassan<span>.</span></div>
              <div class="badge">✦ Frontend Developer</div>
            </div>
            <h2>Thank you,<br /><em>${safeName}!</em></h2>
            <p>
              I've received your message and will get back to you as soon as possible — 
              usually within 24 hours.
            </p>
            
            <div class="divider"></div>
            <p style="font-size:0.85rem; color:#5a5650;"><strong style="color:#9a9590;">Your message:</strong><br/>${safeMessage}</p>
            <div class="divider"></div>
            <div class="footer">
              Abu Turab Hassan · Frontend Developer · Lahore, Pakistan<br/>
              abuturabhassankhan@gmail.com · +92 316-7354746
            </div>
          </div>
        </body>
        </html>
      `
    }

    await transporter.sendMail(ownerMailOptions)
    await transporter.sendMail(autoReplyOptions)

    console.log(`[${new Date().toISOString()}] Contact form submitted by ${safeName} <${safeEmail}>`)

    res.status(200).json({ success: true, message: 'Message sent successfully!' })

  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again or email directly.' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ✅ CHANGED: Removed app.listen() — Vercel handles the server
// ✅ CHANGED: Export app for Vercel serverless
module.exports = app
