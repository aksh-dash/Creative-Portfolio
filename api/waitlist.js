// api/waitlist.js - Vercel Serverless Function for Store Early Bird Waitlist & Confirmation Emails
import fs from 'fs';
import path from 'path';

// In-memory fallback if file write is restricted in serverless read-only container
let inMemorySubscribers = [];
let inMemoryVisitors = 0;

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

function readData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(raw);
        }
    } catch (e) {
        // Fallback to memory
    }
    return { totalVisitors: inMemoryVisitors, subscribers: inMemorySubscribers };
}

function writeData(data) {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        // Serverless container might be read-only; store in memory
        inMemorySubscribers = data.subscribers || [];
        inMemoryVisitors = data.totalVisitors || 0;
    }
}

async function sendConfirmationEmail(subscriberEmail) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.log(`[Waitlist] Registration for ${subscriberEmail} saved. (Add RESEND_API_KEY to send real emails)`);
        return false;
    }

    try {
        // 1. Send confirmation email to subscriber
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Creatively Lensed <onboarding@resend.dev>',
                to: subscriberEmail,
                subject: '✨ Your Early Bird VIP Access Confirmed — Creatively Lensed Store',
                html: `
                    <div style="background-color:#050507; color:#ffffff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding:45px 20px; text-align:center;">
                        <div style="max-width:480px; margin:0 auto; background:#0c0c10; border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:36px 28px; box-shadow:0 20px 60px rgba(0,0,0,0.8);">
                            <p style="font-size:11px; letter-spacing:0.3em; color:#bfaea0; text-transform:uppercase; margin:0 0 20px 0;">SIGNATURE • CREATIVELY LENSED</p>
                            <h1 style="font-size:22px; font-weight:600; letter-spacing:0.04em; color:#ffffff; margin:0 0 16px 0;">Early Bird VIP Confirmed</h1>
                            <p style="font-size:13px; color:#8e8c9e; line-height:1.6; margin:0 0 24px 0;">
                                Thank you for joining the early bird waitlist for the Creatively Lensed Store. You have secured private access 24 hours before the public launch.
                            </p>
                            <div style="background:#131219; border:1px dashed #df646e; border-radius:12px; padding:16px; margin-bottom:24px;">
                                <span style="font-size:10px; letter-spacing:0.18em; color:#df646e; text-transform:uppercase; font-weight:600;">Launch Discount Privilege</span>
                                <div style="font-size:20px; font-weight:700; color:#ffffff; letter-spacing:0.12em; margin-top:6px;">EARLYBIRD25</div>
                                <div style="font-size:11px; color:#787688; margin-top:4px;">25% off all presets, LUTs & creative assets</div>
                            </div>
                            <p style="font-size:11px; color:#5c5a6b; line-height:1.5; margin:0;">
                                We'll email you private access as soon as the store drops.<br/>
                                — Akshat Dange
                            </p>
                        </div>
                    </div>
                `
            })
        });

        // 2. Notify site owner (Akshat)
        const recipientEmail = process.env.RECIPIENT_EMAIL || 'dange.akshat2107@gmail.com';
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Creatively Lensed <onboarding@resend.dev>',
                to: recipientEmail,
                subject: `🔥 New Store Waitlist Registration: ${subscriberEmail}`,
                text: `New subscriber registered for Creatively Lensed Store early bird launch: ${subscriberEmail} on ${new Date().toLocaleString()}`
            })
        });

        return true;
    } catch (err) {
        console.error('[Waitlist Email Error]:', err);
        return false;
    }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const currentData = readData();

    // 1. GET: Real-time counter data
    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            subscribersCount: (currentData.subscribers || []).length,
            visitorsCount: currentData.totalVisitors || 0
        });
    }

    // 2. POST: Track visit or Register email
    if (req.method === 'POST') {
        const body = req.body || {};

        // Track Page Visit
        if (body.action === 'visit') {
            currentData.totalVisitors = (currentData.totalVisitors || 0) + 1;
            writeData(currentData);
            return res.status(200).json({
                success: true,
                visitorsCount: currentData.totalVisitors
            });
        }

        // Email Waitlist Registration
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || email.length > 120) {
            return res.status(400).json({ error: 'Please provide a valid email address.' });
        }

        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';

        const existing = (currentData.subscribers || []).find((s) => s.email === email);
        if (!existing) {
            currentData.subscribers = currentData.subscribers || [];
            currentData.subscribers.push({
                email,
                registeredAt: new Date().toISOString(),
                ip,
                userAgent
            });
            writeData(currentData);
        }

        // Trigger confirmation email
        const emailSent = await sendConfirmationEmail(email);

        return res.status(200).json({
            success: true,
            emailSent,
            subscribersCount: currentData.subscribers.length,
            message: 'Registration confirmed. You will receive an early bird launch invite.'
        });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
