// api/contact.js - Vercel Serverless Function for Secure Contact Inquiries

const rateLimitMap = new Map();

export default async function handler(req, res) {
    // 1. Strict POST only
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Client IP Rate Limiting (5 requests per 10 minutes)
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const maxRequests = 5;

    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
    } else {
        record.count += 1;
    }
    rateLimitMap.set(ip, record);

    if (record.count > maxRequests) {
        return res.status(429).json({ error: 'Too many requests. Please wait a few minutes before trying again.' });
    }

    // 3. Body Size and Type Check
    const body = req.body;
    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid request payload.' });
    }

    // 4. Honeypot Verification
    if (body.website_trap || body.hp) {
        // Bot triggered honeypot field - return fake success without executing
        return res.status(200).json({ success: true, message: 'Inquiry received.' });
    }

    // 5. Strict Input Trimming & Validation
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || name.length < 2 || name.length > 100) {
        return res.status(400).json({ error: 'Please provide a valid name between 2 and 100 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 120) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!message || message.length < 10 || message.length > 2000) {
        return res.status(400).json({ error: 'Please provide an inquiry message between 10 and 2000 characters.' });
    }

    // 6. Generic Safe Response (Automated Acknowledgement)
    return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Akshat Dange will review your inquiry and respond within 24 hours.',
        autoReply: {
            to: email,
            subject: 'Inquiry Received - Akshat Dange | Creatively Lensed',
            text: `Hi ${name},\n\nThank you for reaching out to Creatively Lensed. We have received your project inquiry and will get back to you shortly.\n\nBest regards,\nAkshat Dange`
        }
    });
}
