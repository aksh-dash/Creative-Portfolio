// api/waitlist.js - Secure Real-Time Early Bird Waitlist Handler
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { generateEarlyBirdEmail, generateOwnerNotification } from './templates/earlyBirdEmail.js';

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
const OUTBOX_FILE = path.join(process.cwd(), 'data', 'outbox.json');

// In-memory rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory fallback for read-only serverless environments
let inMemorySubscribers = [];
let inMemoryVisitors = 0;

function readData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(raw);
        }
    } catch (e) {}
    return { totalVisitors: inMemoryVisitors, subscribers: inMemorySubscribers };
}

function writeData(data) {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        inMemorySubscribers = data.subscribers || [];
        inMemoryVisitors = data.totalVisitors || 0;
    }
}

function recordOutbox(payload) {
    try {
        const dir = path.dirname(OUTBOX_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        let outbox = [];
        if (fs.existsSync(OUTBOX_FILE)) {
            try {
                outbox = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf-8')) || [];
            } catch (e) {}
        }
        outbox.push(payload);
        fs.writeFileSync(OUTBOX_FILE, JSON.stringify(outbox, null, 2), 'utf-8');
    } catch (e) {}
}

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

async function dispatchEmail({ name, email, spotNumber, totalSubscribers, ip }) {
    const fromAddress = process.env.GMAIL_USER || 'creativelensesstore@gmail.com';
    const recipientEmail = process.env.RECIPIENT_EMAIL || fromAddress;

    const subscriberMail = generateEarlyBirdEmail({ name, email, spotNumber });
    const ownerMail = generateOwnerNotification({ name, email, spotNumber, totalSubscribers, ip });

    // 1. Gmail SMTP via Nodemailer
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

            // Email 1: Confirmation to subscriber
            await transporter.sendMail({
                from: `"Akshat Dange | Creatively Lensed" <${fromAddress}>`,
                to: email,
                replyTo: fromAddress,
                subject: subscriberMail.subject,
                text: subscriberMail.text,
                html: subscriberMail.html
            });

            // Email 2: Alert to owner
            await transporter.sendMail({
                from: `"Creatively Lensed Store" <${fromAddress}>`,
                to: recipientEmail,
                subject: ownerMail.subject,
                text: ownerMail.text,
                html: ownerMail.html
            });

            return { sent: true, provider: 'gmail' };
        } catch (err) {
            console.error('[Waitlist SMTP Error]: Failed sending via Gmail SMTP', err?.message || err);
        }
    }

    // 2. Resend API Fallback
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'Creatively Lensed <onboarding@resend.dev>',
                    reply_to: fromAddress,
                    to: email,
                    subject: subscriberMail.subject,
                    html: subscriberMail.html
                })
            });
            return { sent: true, provider: 'resend' };
        } catch (err) {
            console.error('[Waitlist Resend Error]: Failed sending via Resend', err?.message || err);
        }
    }

    // 3. Fallback: Queue to Outbox
    recordOutbox({
        id: Date.now(),
        from: fromAddress,
        to: email,
        name,
        spotNumber,
        subject: subscriberMail.subject,
        createdAt: new Date().toISOString(),
        status: 'saved_pending_credentials'
    });

    return { sent: false, queued: true };
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Client IP Resolution & Rate Limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const rateRecord = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
    if (now > rateRecord.resetTime) {
        rateRecord.count = 1;
        rateRecord.resetTime = now + RATE_LIMIT_WINDOW_MS;
    } else {
        rateRecord.count += 1;
    }
    rateLimitMap.set(ip, rateRecord);

    const currentData = readData();

    // 3. Protected Admin Export (Requires x-admin-key header authentication only)
    const query = req.query || {};
    if (query.export === 'csv' || query.export === 'json') {
        const adminKey = process.env.ADMIN_SECRET_KEY;
        const providedKey = req.headers['x-admin-key'];

        if (!adminKey || providedKey !== adminKey) {
            return res.status(401).json({ error: 'Unauthorized: Admin authentication key required in x-admin-key header.' });
        }

        if (query.export === 'csv') {
            const header = 'Spot Number,Name,Email,Registered At,IP\n';
            const rows = (currentData.subscribers || []).map(s =>
                `"${s.spotNumber || ''}","${(s.name || '').replace(/"/g, '""')}","${s.email || ''}","${s.registeredAt || ''}","${s.ip || ''}"`
            ).join('\n');
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', 'attachment; filename="creatively-lensed-waitlist.csv"');
            return res.status(200).send(header + rows);
        }

        return res.status(200).json(currentData);
    }

    // 4. GET: Return aggregate stats
    if (req.method === 'GET') {
        let totalSubscribers = (currentData.subscribers || []).length;
        let totalVisitors = currentData.totalVisitors || 0;

        const sheetUrl = process.env.GOOGLE_SHEET_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        if (sheetUrl) {
            try {
                const sheetRes = await fetch(sheetUrl, { method: 'GET' });
                const sheetJson = await sheetRes.json();
                if (sheetJson && typeof sheetJson.totalSubscribers === 'number') {
                    totalSubscribers = sheetJson.totalSubscribers;
                }
            } catch (e) {}
        }

        return res.status(200).json({
            success: true,
            totalSubscribers,
            totalVisitors
        });
    }

    // 5. POST: Registration or Visitor tracking
    if (req.method === 'POST') {
        // Enforce rate limit on POST
        if (rateRecord.count > MAX_REQUESTS_PER_WINDOW) {
            return res.status(429).json({
                error: 'Too many requests. Please wait a few minutes before trying again.'
            });
        }

        const body = req.body || {};

        // Track page visits
        if (body.action === 'visit') {
            currentData.totalVisitors = (currentData.totalVisitors || 0) + 1;
            writeData(currentData);
            return res.status(200).json({ success: true, visitorsCount: currentData.totalVisitors });
        }

        // Honeypot check: If bot filled hidden traps, return fake success
        if (body.website_trap || body.hp) {
            return res.status(200).json({
                success: true,
                message: 'Registration received.'
            });
        }

        // Validate and sanitize input
        const rawName = typeof body.name === 'string' ? body.name.trim() : '';
        const name = sanitizeText(rawName);

        if (name && (name.length < 2 || name.length > 100)) {
            return res.status(400).json({ error: 'Please enter a valid name between 2 and 100 characters.' });
        }

        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || email.length > 120) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        // Explicit consent validation
        if (body.consent === false) {
            return res.status(400).json({ error: 'Please confirm your consent to receive early access updates.' });
        }

        currentData.subscribers = currentData.subscribers || [];

        // Duplicate registration check
        const existingIdx = currentData.subscribers.findIndex((s) => s.email === email);
        if (existingIdx !== -1) {
            const existing = currentData.subscribers[existingIdx];
            const spotNumber = existing.spotNumber || (existingIdx + 1);

            return res.status(200).json({
                success: true,
                spotNumber,
                email,
                isExisting: true,
                message: `You're already on the VIP list as Spot #${spotNumber}!`
            });
        }

        // Assign spot number
        let spotNumber = currentData.subscribers.length + 1;
        let totalSubscribersCount = spotNumber;

        // Sync with Google Sheet if configured
        const sheetUrl = process.env.GOOGLE_SHEET_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        if (sheetUrl) {
            try {
                const sheetRes = await fetch(sheetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        ip,
                        registeredAt: new Date().toISOString()
                    })
                });
                const sheetJson = await sheetRes.json();
                if (sheetJson && sheetJson.spotNumber) {
                    spotNumber = Number(sheetJson.spotNumber);
                    totalSubscribersCount = Number(sheetJson.totalSubscribers || spotNumber);
                }
            } catch (sheetErr) {
                console.error('[Google Sheet Sync Warning]:', sheetErr?.message || sheetErr);
            }
        }

        // Record subscriber
        currentData.subscribers.push({
            spotNumber,
            name,
            email,
            registeredAt: new Date().toISOString(),
            ip
        });
        writeData(currentData);
        totalSubscribersCount = currentData.subscribers.length;

        // Dispatch confirmation email
        const dispatchResult = await dispatchEmail({
            name,
            email,
            spotNumber,
            totalSubscribers: totalSubscribersCount,
            ip
        });

        return res.status(200).json({
            success: true,
            spotNumber,
            email,
            emailSent: dispatchResult.sent,
            message: `You are officially registered as Spot #${spotNumber}!`
        });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
