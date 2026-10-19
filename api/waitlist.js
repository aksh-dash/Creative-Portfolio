// api/waitlist.js - Real-Time Waitlist Handler with Real Spot Numbers & Email Dispatch
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
const OUTBOX_FILE = path.join(process.cwd(), 'data', 'outbox.json');

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

function generateEmailHtml(subscriberEmail, spotNumber) {
    return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050507; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 480px; background-color: #0c0c10; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);">
                    <tr>
                        <td align="center" style="padding: 32px 24px 18px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                            <div style="font-size: 13px; font-weight: 600; letter-spacing: 0.28em; color: #bfaea0; text-transform: uppercase;">
                                CREATIVELY LENSED
                            </div>
                            <div style="font-size: 10px; font-weight: 500; letter-spacing: 0.14em; color: rgba(255, 255, 255, 0.35); text-transform: uppercase; margin-top: 5px;">
                                STORE • EARLY BIRD VIP ACCESS
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 24px;">
                            <h1 style="font-size: 21px; font-weight: 600; color: #ffffff; margin: 0 0 14px 0; text-align: center;">
                                You're on the list.
                            </h1>
                            <p style="font-size: 13px; line-height: 1.6; color: #8e8c9c; margin: 0 0 20px 0; text-align: center;">
                                Thank you for reserving your spot for the Creatively Lensed Store early bird drop!
                            </p>
                            <div style="text-align: center; margin-bottom: 22px;">
                                <div style="display: inline-block; background: #131219; border: 1px solid rgba(223, 100, 110, 0.4); border-radius: 100px; padding: 6px 18px; color: #df646e; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;">
                                    ★ VIP SPOT #${spotNumber} RESERVED
                                </div>
                            </div>
                            <div style="background: #121118; border: 1px dashed rgba(223, 100, 110, 0.45); border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 22px;">
                                <div style="font-size: 10px; font-weight: 600; letter-spacing: 0.16em; color: #df646e; text-transform: uppercase; margin-bottom: 5px;">
                                    Your 25% Launch Privilege Code
                                </div>
                                <div style="font-size: 20px; font-weight: 700; letter-spacing: 0.14em; color: #ffffff; margin-bottom: 4px;">
                                    EARLYBIRD25
                                </div>
                                <div style="font-size: 11px; color: #767484;">
                                    Valid for 25% off all Cinematic LUTs, Presets, and Digital Assets.
                                </div>
                            </div>
                            <p style="font-size: 12px; font-weight: 600; letter-spacing: 0.05em; color: #dcd7d0; text-transform: uppercase; margin: 0 0 8px 0;">
                                What to expect:
                            </p>
                            <ul style="padding-left: 16px; margin: 0 0 22px 0; font-size: 12px; line-height: 1.7; color: #8e8c9c;">
                                <li><strong>24-Hour Head Start:</strong> Private access link sent to you 24 hours prior to public drop.</li>
                                <li><strong>VIP Inventory Reservation:</strong> Guaranteed stock on limited preset drops.</li>
                            </ul>
                            <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 18px; margin-top: 18px;">
                                <p style="font-size: 13px; font-weight: 600; color: #ffffff; margin: 0 0 2px 0;">
                                    Akshat Dange
                                </p>
                                <p style="font-size: 11px; color: #6e6c7e; margin: 0;">
                                    Founder &amp; Filmmaker • Creatively Lensed<br/>
                                    Pune, Maharashtra, India<br/>
                                    <a href="mailto:dange.akshat2107@gmail.com" style="color: #df646e; text-decoration: none;">dange.akshat2107@gmail.com</a>
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #07070a; padding: 16px; font-size: 10px; color: #4e4c5b; border-top: 1px solid rgba(255, 255, 255, 0.04);">
                            &copy; 2026 Creatively Lensed by Akshat Dange. All rights reserved.<br/>
                            Sent from dange.akshat2107@gmail.com
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    `;
}

async function dispatchEmail(subscriberEmail, spotNumber, totalSubscribers) {
    const fromAddress = 'dange.akshat2107@gmail.com';
    const emailSubject = `✨ You're on the list — VIP Spot #${spotNumber} [Creatively Lensed Store]`;
    const emailHtml = generateEmailHtml(subscriberEmail, spotNumber);
    const emailText = `Hi!\n\nThank you for joining the Creatively Lensed Store waitlist.\nYou are registered as VIP Spot #${spotNumber}.\n\nYour 25% launch code is: EARLYBIRD25\n\nYou will receive private early access 24 hours prior to public drop.\n\nBest regards,\nAkshat Dange\nCreatively Lensed\ndange.akshat2107@gmail.com`;

    // Owner notification email content
    const ownerSubject = `🔔 New Registration — Spot #${spotNumber} [${subscriberEmail}]`;
    const ownerHtml = `
    <div style="font-family: -apple-system, sans-serif; background: #0c0c10; color: #fff; padding: 30px; border-radius: 16px; max-width: 480px;">
        <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #df646e;">🔔 New Waitlist Registration</h2>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;">
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Email:</strong> ${subscriberEmail}</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Spot Number:</strong> #${spotNumber}</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Registered At:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Total Subscribers:</strong> ${totalSubscribers}</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;">
        <p style="margin: 0; font-size: 11px; color: #4e4c5b;">Creatively Lensed Store • Waitlist System</p>
    </div>`;
    const ownerText = `New waitlist registration!\n\nEmail: ${subscriberEmail}\nSpot Number: #${spotNumber}\nRegistered At: ${new Date().toISOString()}\nTotal Subscribers: ${totalSubscribers}\n\n— Creatively Lensed Store Waitlist`;

    // 1. Try Gmail SMTP via Nodemailer
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    if (gmailPass) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: fromAddress,
                    pass: gmailPass.replace(/\s+/g, '')
                }
            });

            // Email 1: Confirmation to subscriber
            await transporter.sendMail({
                from: `"Akshat Dange | Creatively Lensed" <${fromAddress}>`,
                to: subscriberEmail,
                subject: emailSubject,
                text: emailText,
                html: emailHtml
            });
            console.log(`[Email Dispatched]: Confirmation sent to ${subscriberEmail}`);

            // Email 2: Notification to owner
            await transporter.sendMail({
                from: `"Creatively Lensed Store" <${fromAddress}>`,
                to: fromAddress,
                subject: ownerSubject,
                text: ownerText,
                html: ownerHtml
            });
            console.log(`[Email Dispatched]: Owner notification for ${subscriberEmail}`);

            return { sent: true, provider: 'gmail' };
        } catch (err) {
            console.error('[Gmail SMTP Error]:', err);
        }
    }

    // 2. Try Resend if configured
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
                    from: `Creatively Lensed <onboarding@resend.dev>`,
                    reply_to: fromAddress,
                    to: subscriberEmail,
                    subject: emailSubject,
                    html: emailHtml
                })
            });
            console.log(`[Email Dispatched via Resend]: Sent to ${subscriberEmail}`);
            return { sent: true, provider: 'resend' };
        } catch (err) {
            console.error('[Resend Error]:', err);
        }
    }

    // 3. Fallback: Save to Outbox queue for transparency
    recordOutbox({
        id: Date.now(),
        from: fromAddress,
        to: subscriberEmail,
        spotNumber,
        subject: emailSubject,
        createdAt: new Date().toISOString(),
        status: 'saved_pending_smtp_creds'
    });

    console.log(`[Waitlist Registered]: Recorded for ${subscriberEmail} as Spot #${spotNumber}. Email queued in data/outbox.json`);
    return { sent: false, queued: true };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const currentData = readData();

    // GET: Return real-time count
    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            totalSubscribers: (currentData.subscribers || []).length,
            totalVisitors: currentData.totalVisitors || 0
        });
    }

    // POST: Track or Register
    if (req.method === 'POST') {
        const body = req.body || {};

        if (body.action === 'visit') {
            currentData.totalVisitors = (currentData.totalVisitors || 0) + 1;
            writeData(currentData);
            return res.status(200).json({ success: true, visitorsCount: currentData.totalVisitors });
        }

        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || email.length > 120) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
        currentData.subscribers = currentData.subscribers || [];

        // Check if already registered
        const existingIdx = currentData.subscribers.findIndex((s) => s.email === email);
        let spotNumber;

        if (existingIdx !== -1) {
            // Sequential 1-based index
            spotNumber = existingIdx + 1;
        } else {
            spotNumber = currentData.subscribers.length + 1;
            currentData.subscribers.push({
                spotNumber,
                email,
                registeredAt: new Date().toISOString(),
                ip
            });
            writeData(currentData);
        }

        // Send or queue confirmation email from dange.akshat2107@gmail.com
        const dispatchResult = await dispatchEmail(email, spotNumber, currentData.subscribers.length);

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
