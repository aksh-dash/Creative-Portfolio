// api/contact.js - Secure Vercel Serverless Function for Inquiries
import nodemailer from 'nodemailer';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

// Escape HTML characters to prevent XSS injection
function sanitizeText(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}

export default async function handler(req, res) {
    // 1. Safe CORS Handling
    const origin = req.headers.origin;
    const allowedOrigins = [
        'https://creativelylensed.com',
        'https://www.creativelylensed.com'
    ];

    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Strict POST only
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 3. Client IP Rate Limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + RATE_LIMIT_WINDOW_MS;
    } else {
        record.count += 1;
    }
    rateLimitMap.set(ip, record);

    if (record.count > MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests. Please wait a few minutes before trying again.' });
    }

    // 4. Request Payload Check
    const body = req.body;
    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid request payload.' });
    }

    // 5. Honeypot Verification
    if (body.website_trap || body.hp) {
        return res.status(200).json({ success: true, message: 'Inquiry received.' });
    }

    // 6. Strict Input Trimming & Validation
    const name = sanitizeText(body.name);
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = sanitizeText(body.phone || '');
    const message = sanitizeText(body.message);

    if (!name || name.length < 2 || name.length > 100) {
        return res.status(400).json({ error: 'Please provide a valid name between 2 and 100 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 120) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!message || message.length < 10 || message.length > 2500) {
        return res.status(400).json({ error: 'Please provide an inquiry message between 10 and 2500 characters.' });
    }

    // 7. Email Dispatch via Nodemailer (if configured)
    const fromAddress = process.env.GMAIL_USER || 'creativelensesstore@gmail.com';
    const recipientEmail = process.env.RECIPIENT_EMAIL || fromAddress;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailPass) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: fromAddress,
                    pass: gmailPass.replace(/\s+/g, '')
                },
                connectionTimeout: 10000,
                greetingTimeout: 10000,
                socketTimeout: 15000
            });

            // Notification to Owner
            await transporter.sendMail({
                from: `"Portfolio Inquiry" <${fromAddress}>`,
                to: recipientEmail,
                replyTo: email,
                subject: `💼 New Project Inquiry: ${name} [Creatively Lensed]`,
                text: `New Portfolio Project Inquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nDate: ${new Date().toISOString()}\n\nMessage:\n${message}`,
                html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0c10; color: #fff; padding: 28px; border-radius: 16px; max-width: 500px; border: 1px solid rgba(255,255,255,0.08);">
                    <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #df646e;">💼 New Project Inquiry</h2>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 14px 0;">
                    <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Name:</strong> ${name}</p>
                    <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Email:</strong> <a href="mailto:${email}" style="color: #df646e;">${email}</a></p>
                    <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Phone:</strong> ${phone || 'Not provided'}</p>
                    <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 14px 0;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #dcd7d0; text-transform: uppercase; letter-spacing: 0.05em;">Message:</p>
                    <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #e5e5e5; white-space: pre-wrap; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">${message}</p>
                </div>`
            });

            // Confirmation Auto-Reply to Client
            await transporter.sendMail({
                from: `"Akshat Dange | Creatively Lensed" <${fromAddress}>`,
                to: email,
                replyTo: fromAddress,
                subject: `Inquiry Received — Akshat Dange | Creatively Lensed`,
                text: `Hi ${name},\n\nThank you for reaching out! I have received your project inquiry and will review your details.\n\nI typically respond within 24 hours. If your project is time-sensitive, feel free to reach out directly via WhatsApp at +91 8482872105.\n\nBest regards,\n\nAkshat Dange\nFounder & Visual Artist • Creatively Lensed\ncreativelensesstore@gmail.com\nhttps://creativelylensed.com`
            });
        } catch (mailErr) {
            console.error('[Contact Form Email Warning]:', mailErr?.message || mailErr);
        }
    }

    return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Akshat Dange will review your inquiry and respond within 24 hours.'
    });
}
