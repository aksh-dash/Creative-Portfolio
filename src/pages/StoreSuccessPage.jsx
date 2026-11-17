import React, { useEffect } from 'react';
import { storeSuccessPage } from '../content/status-pages';
import '../styles/StatusPages.css';

const StoreSuccessPage = ({ onReturn }) => {
    useEffect(() => {
        document.title = 'Payment Received | Akshat Dange';
        let meta = document.querySelector('meta[name="robots"]');
        if (meta) meta.setAttribute('content', 'noindex, nofollow');

        if (window.trackPortfolioEvent) {
            window.trackPortfolioEvent('store_purchase_complete', { page: '/success' });
        }

        return () => {
            document.title = 'Akshat Dange | Content Creator, Filmmaker & Visual Storyteller | Pune';
        };
    }, []);

    const handleHome = () => {
        if (onReturn) onReturn();
        else window.location.href = '/';
    };

    const handleContact = () => {
        handleHome();
        setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="status-container" role="main" aria-label="Payment successful">
            <div className="status-content">
                <div className="status-motif" aria-hidden="true">
                    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                        <polyline points="24,42 36,54 58,30" stroke="rgba(201,168,76,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
                <div className="status-tag">{storeSuccessPage.tag}</div>
                <h1 className="status-title">{storeSuccessPage.title}</h1>
                <p className="status-desc">{storeSuccessPage.description}</p>
                <div className="status-actions">
                    <button onClick={handleContact} className="status-btn primary" id="store-success-btn-contact">
                        {storeSuccessPage.buttons.contact}
                    </button>
                    <button onClick={handleHome} className="status-btn secondary" id="store-success-btn-home">
                        {storeSuccessPage.buttons.home}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreSuccessPage;
