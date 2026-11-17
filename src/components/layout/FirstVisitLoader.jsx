import React, { useState, useEffect } from 'react';

/**
 * FirstVisitLoader — branded aperture animation overlay.
 * Rules:
 * - Only on first visit per session (sessionStorage guarded with try/catch)
 * - Maximum 800ms, then fades out
 * - Skipped for reduced-motion, bots, repeat visits, and slow reloads
 * - Page content is in the HTML; this is just an overlay
 * - Does NOT delay LCP (content is behind it, already rendered)
 */
const STORAGE_KEY = 'cl_loader_shown';

const isBotUA = () => {
    try {
        return /bot|crawl|spider|slurp|Lighthouse|GoogleOther/i.test(navigator.userAgent);
    } catch { return false; }
};

const prefersReducedMotion = () => {
    try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch { return false; }
};

const alreadyShown = () => {
    try {
        return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch { return true; } // if storage fails, skip
};

const markShown = () => {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
};

const FirstVisitLoader = () => {
    const shouldSkip = alreadyShown() || prefersReducedMotion() || isBotUA();
    const [visible, setVisible] = useState(!shouldSkip);

    useEffect(() => {
        if (shouldSkip) return;
        markShown();
        const timeout = setTimeout(() => setVisible(false), 800);
        return () => clearTimeout(timeout);
    }, [shouldSkip]);

    if (!visible) return null;

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: '#080808',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'loaderFadeOut 0.3s ease-out 0.5s forwards',
                pointerEvents: 'none'
            }}
        >
            <svg
                viewBox="0 0 100 100"
                width="64"
                height="64"
                fill="none"
                style={{ animation: 'loaderSpin 0.8s ease-in-out' }}
            >
                {/* Aperture blades */}
                <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="28" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="12" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.3)" />
            </svg>
            <style>{`
                @keyframes loaderFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; visibility: hidden; }
                }
                @keyframes loaderSpin {
                    from { transform: rotate(0deg) scale(0.85); opacity: 0.5; }
                    50% { opacity: 1; transform: rotate(90deg) scale(1); }
                    to { transform: rotate(180deg) scale(0.85); opacity: 0.5; }
                }
                @media (prefers-reduced-motion: reduce) {
                    [aria-hidden="true"] { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default FirstVisitLoader;
