// api/waitlist.js - Vercel Serverless Function for Store Early Bird Waitlist

const rateLimitMap = new Map();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // IP Rate Limiting (5 requests per 10 minutes)
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

    const body = req.body;
    if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid request payload.' });
    }

    // Honeypot trap check
    if (body.website_trap || body.hp) {
        return res.status(200).json({ success: true, spotNumber: 79, message: 'Spot reserved.' });
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 120) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // Generate a deterministic or pseudo-random VIP spot number (e.g. between 79 and 92)
    const spotNumber = Math.floor(79 + Math.random() * 14);

    return res.status(200).json({
        success: true,
        spotNumber,
        email,
        discountCode: 'EARLYBIRD25',
        message: `Spot #${spotNumber} secured! You'll receive early bird launch perks and 25% off.`
    });
}
