// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const waitlistDevPlugin = () => ({
    name: 'waitlist-dev-plugin',
    configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/waitlist')) {
                const dataPath = path.join(process.cwd(), 'data', 'waitlist.json');
                
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

                res.setHeader('Content-Type', 'application/json');

                if (req.method === 'GET') {
                    const data = readData();
                    res.end(JSON.stringify({
                        success: true,
                        subscribersCount: (data.subscribers || []).length,
                        visitorsCount: data.totalVisitors || 0
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
                                res.end(JSON.stringify({ error: 'Please provide a valid email address.' }));
                                return;
                            }

                            const existing = (data.subscribers || []).find(s => s.email === email);
                            if (!existing) {
                                data.subscribers = data.subscribers || [];
                                data.subscribers.push({
                                    email,
                                    registeredAt: new Date().toISOString(),
                                    ip: req.socket.remoteAddress || '127.0.0.1'
                                });
                                writeData(data);
                            }

                            // Optional Resend email dispatch if API key exists
                            const apiKey = process.env.RESEND_API_KEY;
                            let emailSent = false;
                            if (apiKey) {
                                try {
                                    await fetch('https://api.resend.com/emails', {
                                        method: 'POST',
                                        headers: {
                                            'Authorization': `Bearer ${apiKey}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            from: 'Creatively Lensed <onboarding@resend.dev>',
                                            to: email,
                                            subject: '✨ Your Early Bird VIP Access Confirmed — Creatively Lensed Store',
                                            html: `<p>Thank you for joining the Creatively Lensed Store waitlist! Your 25% discount code is <strong>EARLYBIRD25</strong>.</p>`
                                        })
                                    });
                                    emailSent = true;
                                } catch (err) {}
                            }

                            res.end(JSON.stringify({
                                success: true,
                                emailSent,
                                subscribersCount: data.subscribers.length,
                                message: 'Registration confirmed.'
                            }));
                        } catch (err) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: 'Internal server error.' }));
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