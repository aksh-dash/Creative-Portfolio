// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

// Manually load .env into process.env (avoids external dotenv dependency)
try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const eqIndex = trimmed.indexOf('=');
                if (eqIndex > 0) {
                    const key = trimmed.substring(0, eqIndex).trim();
                    const value = trimmed.substring(eqIndex + 1).trim();
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
        });
        console.log('[env] Loaded .env — GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✓ set' : '✗ missing');
    }
} catch (e) {
    console.warn('[env] Failed to load .env:', e.message);
}

const waitlistDevPlugin = () => ({
    name: 'waitlist-dev-plugin',
    configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/waitlist')) {
                const dataPath = path.join(process.cwd(), 'data', 'waitlist.json');
                const outboxPath = path.join(process.cwd(), 'data', 'outbox.json');

                const readData = () => {
                    try {
                        if (fs.existsSync(dataPath)) {
                            return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                        }
                    } catch (e) {}
                    return { totalVisitors: 0, subscribers: [] };
                };

                const writeData = (data) => {
                    try {
                        const dir = path.dirname(dataPath);
                        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
                    } catch (e) {}
                };

                const recordOutbox = (payload) => {
                    try {
                        let outbox = [];
                        if (fs.existsSync(outboxPath)) {
                            outbox = JSON.parse(fs.readFileSync(outboxPath, 'utf-8')) || [];
                        }
                        outbox.push(payload);
                        fs.writeFileSync(outboxPath, JSON.stringify(outbox, null, 2), 'utf-8');
                    } catch (e) {}
                };

                res.setHeader('Content-Type', 'application/json');

                if (req.method === 'GET') {
                    const data = readData();
                    res.end(JSON.stringify({
                        success: true,
                        totalSubscribers: (data.subscribers || []).length,
                        totalVisitors: data.totalVisitors || 0
                    }));
                    return;
                }

                if (req.method === 'POST') {
                    let bodyStr = '';
                    req.on('data', chunk => { bodyStr += chunk; });
                    req.on('end', async () => {
                        try {
                            const body = JSON.parse(bodyStr || '{}');
                            const data = readData();

                            if (body.action === 'visit') {
                                data.totalVisitors = (data.totalVisitors || 0) + 1;
                                writeData(data);
                                res.end(JSON.stringify({ success: true, visitorsCount: data.totalVisitors }));
                                return;
                            }

                            const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!email || !emailRegex.test(email)) {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ error: 'Please enter a valid email address.' }));
                                return;
                            }

                            data.subscribers = data.subscribers || [];
                            const existingIdx = data.subscribers.findIndex(s => s.email === email);
                            let spotNumber;

                            if (existingIdx !== -1) {
                                spotNumber = existingIdx + 1;
                            } else {
                                spotNumber = data.subscribers.length + 1;
                                data.subscribers.push({
                                    spotNumber,
                                    email,
                                    registeredAt: new Date().toISOString(),
                                    ip: req.socket.remoteAddress || '127.0.0.1'
                                });
                                writeData(data);
                            }

                            // Email Sending via Nodemailer (creativelensesstore@gmail.com)
                            const fromAddress = process.env.GMAIL_USER || 'creativelensesstore@gmail.com';
                            const gmailPass = process.env.GMAIL_APP_PASSWORD;
                            let emailSent = false;

                            if (gmailPass) {
                                try {
                                    const transporter = nodemailer.createTransport({
                                        host: 'smtp.gmail.com',
                                        port: 465,
                                        secure: true,
                                        auth: {
                                            user: fromAddress,
                                            pass: gmailPass.replace(/\s+/g, '')
                                        }
                                    });

                                    // 1. Confirmation email to the subscriber
                                    await transporter.sendMail({
                                        from: `"Akshat Dange | Creatively Lensed" <${fromAddress}>`,
                                        to: email,
                                        subject: `✨ You're on the list — VIP Spot #${spotNumber} [Creatively Lensed Store]`,
                                        text: `Hi!\n\nThank you for registering for the Creatively Lensed Store early bird launch.\nYou are registered as VIP Spot #${spotNumber}.\n\nYour 25% launch code is: EARLYBIRD25\n\nBest regards,\nAkshat Dange\ncreativelensesstore@gmail.com`
                                    });
                                    console.log(`[Dev Email Sent]: Confirmation to ${email}`);

                                    // 2. Notification email to the owner
                                    await transporter.sendMail({
                                        from: `"Creatively Lensed Store" <${fromAddress}>`,
                                        to: fromAddress,
                                        subject: `🔔 New Registration — Spot #${spotNumber} [${email}]`,
                                        text: `New waitlist registration!\n\nEmail: ${email}\nSpot Number: #${spotNumber}\nRegistered At: ${new Date().toISOString()}\nTotal Subscribers: ${data.subscribers.length}\n\n— Creatively Lensed Store Waitlist`,
                                        html: `
                                        <div style="font-family: -apple-system, sans-serif; background: #0c0c10; color: #fff; padding: 30px; border-radius: 16px; max-width: 480px;">
                                            <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #df646e;">🔔 New Waitlist Registration</h2>
                                            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;">
                                            <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Email:</strong> ${email}</p>
                                            <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Spot Number:</strong> #${spotNumber}</p>
                                            <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Registered At:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                                            <p style="margin: 6px 0; color: #9f9dae; font-size: 13px;"><strong style="color: #dcd7d0;">Total Subscribers:</strong> ${data.subscribers.length}</p>
                                            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;">
                                            <p style="margin: 0; font-size: 11px; color: #4e4c5b;">Creatively Lensed Store • Waitlist System</p>
                                        </div>`
                                    });
                                    console.log(`[Dev Email Sent]: Owner notification for ${email}`);

                                    emailSent = true;
                                } catch (emailErr) {
                                    console.error('[Gmail SMTP Error in Dev]:', emailErr);
                                }
                            } else {
                                // Record in outbox queue
                                recordOutbox({
                                    id: Date.now(),
                                    from: fromAddress,
                                    to: email,
                                    spotNumber,
                                    subject: `✨ You're on the list — VIP Spot #${spotNumber}`,
                                    createdAt: new Date().toISOString(),
                                    note: 'Add GMAIL_APP_PASSWORD to .env to send live emails automatically'
                                });
                            }

                            res.end(JSON.stringify({
                                success: true,
                                spotNumber,
                                email,
                                emailSent,
                                message: `Registered as Spot #${spotNumber}`
                            }));
                        } catch (err) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: 'Server error' }));
                        }
                    });
                    return;
                }
            }
            next();
        });
    }
});

export default defineConfig({
    plugins: [react(), waitlistDevPlugin()],
    publicDir: 'Public',

    server: {
        port: 5173,
        open: true
    },

    build: {
        outDir: 'dist',
        sourcemap: false
    }
});