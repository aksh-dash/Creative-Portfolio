import React, { useEffect } from 'react';
import { storeCancelledPage } from '../content/status-pages';
import '../styles/StatusPages.css';

const StoreCancelledPage = ({ onReturn }) => {
    useEffect(() => {
        document.title = 'Payment Cancelled | Akshat Dange';
        let meta = document.querySelector('meta[name="robots"]');
        if (meta) meta.setAttribute('content', 'noindex, nofollow');
        return () => {
            document.title = 'Akshat Dange | Content Creator, Filmmaker & Visual Storyteller | Pune';
        };
    }, []);

    const handleShop = () => {
        window.history.pushState(null, '', '/store');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleHome = () => {
        if (onReturn) onReturn();
        else window.location.href = '/';
    };

    return (
        <div className="status-container" role="main" aria-label="Payment cancelled">
            <div className="status-content">
                <div className="status-motif" aria-hidden="true">
                    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                        <line x1="28" y1="28" x2="52" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
                        <line x1="52" y1="28" x2="28" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="status-tag">{storeCancelledPage.tag}</div>
                <h1 className="status-title">{storeCancelledPage.title}</h1>
                <p className="status-desc">{storeCancelledPage.description}</p>
                <div className="status-actions">
                    <button onClick={handleShop} className="status-btn primary" id="store-cancelled-btn-shop">
                        {storeCancelledPage.buttons.shop}
                    </button>
                    <button onClick={handleHome} className="status-btn secondary" id="store-cancelled-btn-home">
                        {storeCancelledPage.buttons.home}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreCancelledPage;
