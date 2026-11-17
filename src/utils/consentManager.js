// src/utils/consentManager.js
// Functional GDPR & ePrivacy Compliant Consent Controller

const CONSENT_STORAGE_KEY = 'creatively_cookie_consent';

export function getConsent() {
    try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!raw) {
            return { answered: false, essential: true, analytics: false };
        }
        const parsed = JSON.parse(raw);
        return {
            answered: true,
            essential: true,
            analytics: Boolean(parsed.analytics),
            timestamp: parsed.timestamp || null
        };
    } catch {
        return { answered: false, essential: true, analytics: false };
    }
}

export function saveConsent({ analytics }) {
    try {
        const record = {
            essential: true,
            analytics: Boolean(analytics),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
        applyConsent(record);
        window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: record }));
        return record;
    } catch (e) {
        return { answered: true, essential: true, analytics: false };
    }
}

export function applyConsent(consentRecord) {
    if (typeof window === 'undefined') return;

    const analyticsGranted = Boolean(consentRecord?.analytics);

    // 1. Google Analytics Consent Mode v2
    if (window.gtag) {
        window.gtag('consent', 'update', {
            analytics_storage: analyticsGranted ? 'granted' : 'denied',
            ad_storage: 'denied', // No ads on portfolio
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
    }

    // 2. Microsoft Clarity Dynamic Loader (Only inject script if consented & ID configured)
    if (analyticsGranted) {
        loadClarity();
    }
}

function loadClarity() {
    if (typeof window === 'undefined') return;
    if (window.__clarity_loaded) return;

    // Retrieve Clarity Project ID from global window config or meta
    const clarityId = window.__CLARITY_PROJECT_ID || 'YOUR_CLARITY_PROJECT_ID';
    if (!clarityId || clarityId === 'YOUR_CLARITY_PROJECT_ID') {
        // Project ID not yet configured by owner; skip script injection
        return;
    }

    window.__clarity_loaded = true;
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",clarityId);

    if (window.clarity) {
        window.clarity("set", "mask-text", true);
    }
}
