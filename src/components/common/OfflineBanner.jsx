import React, { useState, useEffect } from 'react';
import { offlineBanner as content } from '../../content/status-pages';

/**
 * OfflineBanner — dismissible banner using navigator.onLine events.
 * No service worker. Pure CSS animation, respects reduced motion.
 */
const OfflineBanner = () => {
    const [isOffline, setIsOffline] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const goOffline = () => { setIsOffline(true); setDismissed(false); };
        const goOnline = () => setIsOffline(false);

        // Check initial state
        if (!navigator.onLine) setIsOffline(true);

        window.addEventListener('offline', goOffline);
        window.addEventListener('online', goOnline);
        return () => {
            window.removeEventListener('offline', goOffline);
            window.removeEventListener('online', goOnline);
        };
    }, []);

    if (!isOffline || dismissed) return null;

    return (
        <div
            role="alert"
            aria-live="polite"
            style={{
                position: 'fixed',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                background: 'rgba(20, 20, 20, 0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                padding: '0.65rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: 'calc(100vw - 2rem)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
        >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} aria-hidden="true" />
            <span>{content.message}</span>
            <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss offline notice"
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    padding: 0
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default OfflineBanner;
