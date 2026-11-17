// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { generateEarlyBirdEmail, generateOwnerNotification } from './api/templates/earlyBirdEmail.js';

// Manually load .env into process.env if present
try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach((line) => {
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
    }
} catch (e) {
    // Silently continue if .env cannot be loaded
}

const apiDevPlugin = () => ({
    name: 'api-dev-plugin',
    configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
            // ── 1. Dev Waitlist Handler (/api/waitlist) ──
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
                    req.on('data', (chunk) => { bodyStr += chunk; });
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

                            // Bot honeypot check
                            if (body.website_trap || body.hp) {
                                res.end(JSON.stringify({ success: true, message: 'Registration received.' }));
                                return;
                            }

                            const name = typeof body.name === 'string' ? body.name.trim() : '';
                            const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                            if (!email || !emailRegex.test(email)) {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ error: 'Please enter a valid email address.' }));
                                return;
                            }

                            data.subscribers = data.subscribers || [];
                            const existingIdx = data.subscribers.findIndex((s) => s.email === email);
                            let spotNumber;
                            let isExisting = false;

                            if (existingIdx !== -1) {
                                spotNumber = data.subscribers[existingIdx].spotNumber || (existingIdx + 1);
                                isExisting = true;
                            } else {
                                spotNumber = data.subscribers.length + 1;
                                data.subscribers.push({
                                    spotNumber,
                                    name,
                                    email,
                                    registeredAt: new Date().toISOString(),
                                    ip: req.socket.remoteAddress || '127.0.0.1'
                                });
                                writeData(data);
                            }

                            // Email Dispatch via Nodemailer in local dev
                            const fromAddress = process.env.GMAIL_USER || 'creativelensesstore@gmail.com';
                            const recipientEmail = process.env.RECIPIENT_EMAIL || fromAddress;
                            const gmailPass = process.env.GMAIL_APP_PASSWORD;
                            let emailSent = false;

                            if (gmailPass && !isExisting) {
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

                                    const subMail = generateEarlyBirdEmail({ name, email, spotNumber });
                                    const ownerMail = generateOwnerNotification({
                                        name,
                                        email,
                                        spotNumber,
                                        totalSubscribers: data.subscribers.length,
                                        ip: req.socket.remoteAddress || '127.0.0.1'
                                    });

                                    await transporter.sendMail({
                                        from: `"Akshat Dange | Creatively Lensed" <${fromAddress}>`,
                                        to: email,
                                        replyTo: fromAddress,
                                        subject: subMail.subject,
                                        text: subMail.text,
                                        html: subMail.html
                                    });

                                    await transporter.sendMail({
                                        from: `"Creatively Lensed Store" <${fromAddress}>`,
                                        to: recipientEmail,
                                        subject: ownerMail.subject,
                                        text: ownerMail.text,
                                        html: ownerMail.html
                                    });

                                    emailSent = true;
                                } catch (emailErr) {
                                    console.error('[Dev SMTP Warning]:', emailErr?.message || emailErr);
                                }
                            } else if (!isExisting) {
                                recordOutbox({
                                    id: Date.now(),
                                    from: fromAddress,
                                    to: email,
                                    name,
                                    spotNumber,
                                    createdAt: new Date().toISOString(),
                                    note: 'Add GMAIL_APP_PASSWORD to .env to send live emails automatically'
                                });
                            }

                            res.end(JSON.stringify({
                                success: true,
                                spotNumber,
                                email,
                                emailSent,
                                isExisting,
                                message: isExisting
                                    ? `You're already registered as Spot #${spotNumber}!`
                                    : `Registered as Spot #${spotNumber}`
                            }));
                        } catch (err) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: 'Server error' }));
                        }
                    });
                    return;
                }
            }

            // ── 2. Dev Contact Form Handler (/api/contact) ──
            if (req.url && req.url.startsWith('/api/contact')) {
                res.setHeader('Content-Type', 'application/json');

                if (req.method === 'POST') {
                    let bodyStr = '';
                    req.on('data', (chunk) => { bodyStr += chunk; });
                    req.on('end', async () => {
                        try {
                            const body = JSON.parse(bodyStr || '{}');

                            if (body.website_trap || body.hp) {
                                res.end(JSON.stringify({ success: true, message: 'Inquiry received.' }));
                                return;
                            }

                            const name = (body.name || '').trim();
                            const email = (body.email || '').trim().toLowerCase();
                            const message = (body.message || '').trim();

                            if (!name || name.length < 2) {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ error: 'Please provide a valid name.' }));
                                return;
                            }

                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!email || !emailRegex.test(email)) {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ error: 'Please provide a valid email.' }));
                                return;
                            }

                            if (!message || message.length < 10) {
                                res.statusCode = 400;
                                res.end(JSON.stringify({ error: 'Please provide a message with at least 10 characters.' }));
                                return;
                            }

                            res.end(JSON.stringify({
                                success: true,
                                message: 'Thank you for reaching out! Akshat Dange will review your inquiry within 24 hours.'
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
    plugins: [react(), apiDevPlugin()],
    publicDir: 'Public',

    server: {
        port: 5173,
        open: true
    },

    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    }
});
