import React, { useEffect } from 'react';
import { thankYouPage } from '../content/status-pages';
import '../styles/StatusPages.css';

const ThankYouPage = ({ onReturn }) => {
    useEffect(() => {
        document.title = 'Thank You | Akshat Dange';
        let meta = document.querySelector('meta[name="robots"]');
        if (meta) meta.setAttribute('content', 'noindex, nofollow');

        // Fire analytics conversion event
        if (window.trackPortfolioEvent) {
            window.trackPortfolioEvent('form_thank_you', { page: '/thank-you' });
        }

        return () => {
            document.title = 'Akshat Dange | Content Creator, Filmmaker & Visual Storyteller | Pune';
        };
    }, []);

    const handleHome = () => {
        if (onReturn) {
            onReturn();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="status-container" role="main" aria-label="Thank you">
            <div className="status-content">
                <div className="status-motif" aria-hidden="true">
                    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                        <polyline points="24,42 36,54 58,30" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
                <div className="status-tag">{thankYouPage.tag}</div>
                <h1 className="status-title">{thankYouPage.title}</h1>
                <p className="status-desc">{thankYouPage.description}</p>
                <div className="status-actions">
                    <button onClick={handleHome} className="status-btn primary" id="thankyou-btn-home">
                        {thankYouPage.buttons.home}
                    </button>
                    <a
                        href={thankYouPage.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="status-btn secondary"
                        id="thankyou-btn-instagram"
                    >
                        {thankYouPage.buttons.instagram} ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
