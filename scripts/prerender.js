// scripts/prerender.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const distPath = path.resolve(projectRoot, 'dist');
const templatePath = path.resolve(distPath, 'index.html');
const ssrBundlePath = path.resolve(projectRoot, 'dist-ssr', 'prerender-entry.js');

async function run() {
    if (!fs.existsSync(templatePath)) {
        console.error('Template not found at', templatePath);
        process.exit(1);
    }
    if (!fs.existsSync(ssrBundlePath)) {
        console.error('SSR bundle not found at', ssrBundlePath);
        process.exit(1);
    }

    const template = fs.readFileSync(templatePath, 'utf-8');
    const { render } = await import(pathToFileURL(ssrBundlePath).href);

    const routes = [
        {
            path: '/',
            outFile: path.resolve(distPath, 'index.html'),
            initialRoute: 'home',
            title: 'Akshat Dange | Photographer & Content Creator in Pune | Creatively Lensed',
            noindex: false,
        },
        {
            path: '/store',
            outFile: path.resolve(distPath, 'store', 'index.html'),
            initialRoute: 'store',
            title: 'Store Coming Soon | Creatively Lensed',
            noindex: true,
        },
        {
            path: '/coming-soon',
            outFile: path.resolve(distPath, 'coming-soon', 'index.html'),
            initialRoute: 'store',
            title: 'Store Coming Soon | Creatively Lensed',
            noindex: true,
        },
        {
            path: '/thank-you',
            outFile: path.resolve(distPath, 'thank-you', 'index.html'),
            initialRoute: 'thankyou',
            title: 'Thank You | Akshat Dange',
            noindex: true,
        },
        {
            path: '/success',
            outFile: path.resolve(distPath, 'success', 'index.html'),
            initialRoute: 'store-success',
            title: 'Payment Received | Akshat Dange',
            noindex: true,
        },
        {
            path: '/cancelled',
            outFile: path.resolve(distPath, 'cancelled', 'index.html'),
            initialRoute: 'store-cancelled',
            title: 'Payment Cancelled | Akshat Dange',
            noindex: true,
        },
        {
            path: '/forbidden',
            outFile: path.resolve(distPath, 'forbidden', 'index.html'),
            initialRoute: 'forbidden',
            title: '403 — Link Expired | Akshat Dange',
            noindex: true,
        },
        {
            path: '/404',
            outFile: path.resolve(distPath, '404.html'),
            initialRoute: '404',
            title: '404 — Frame Not Found | Akshat Dange',
            noindex: true,
        },
    ];

    console.log('⚡ Starting static HTML prerendering...');

    for (const route of routes) {
        const appHtml = render(route.initialRoute);
        let html = template.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
        );

        // Update Title if specified
        if (route.title) {
            html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
        }

        // Apply robots meta tag: noindex for error/status pages, keep index, follow for home
        if (route.noindex) {
            html = html.replace(
                /<meta name="robots" content=".*?" \/>/i,
                '<meta name="robots" content="noindex, nofollow" />'
            );
        }

        const outDir = path.dirname(route.outFile);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        fs.writeFileSync(route.outFile, html, 'utf-8');
        console.log(`✓ Prerendered ${route.path} -> ${path.relative(projectRoot, route.outFile)} (${html.length} bytes)`);
    }

    // Also write dist/404/index.html so /404 route is directly accessible
    const fourOhFourDir = path.resolve(distPath, '404');
    if (!fs.existsSync(fourOhFourDir)) {
        fs.mkdirSync(fourOhFourDir, { recursive: true });
    }
    fs.copyFileSync(path.resolve(distPath, '404.html'), path.resolve(fourOhFourDir, 'index.html'));
    console.log('✓ Prerendered /404 -> dist/404/index.html');

    // Clean up temporary dist-ssr
    const distSsrPath = path.resolve(projectRoot, 'dist-ssr');
    if (fs.existsSync(distSsrPath)) {
        fs.rmSync(distSsrPath, { recursive: true, force: true });
    }

    console.log('✨ Build prerendering completed successfully!');
}

run().catch((err) => {
    console.error('Prerender error:', err);
    process.exit(1);
});
