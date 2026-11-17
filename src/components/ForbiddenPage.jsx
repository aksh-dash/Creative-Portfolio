import React, { useEffect } from 'react';
import { forbiddenPage } from '../content/status-pages';
import '../styles/StatusPages.css';

const ForbiddenPage = ({ onReturn }) => {
    useEffect(() => {
        document.title = '403 — Link Expired | Akshat Dange';
        let meta = document.querySelector('meta[name="robots"]');
        if (meta) {
            meta.setAttribute('content', 'noindex, nofollow');
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

    const handleContact = () => {
        handleHome();
        setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="status-container" role="main" aria-label="Link expired">
            <div className="status-content">
                <div className="status-motif" aria-hidden="true">
                    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <line x1="20" y1="20" x2="60" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <line x1="60" y1="20" x2="20" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    </svg>
                </div>
                <div className="status-tag">{forbiddenPage.tag}</div>
                <h1 className="status-title">{forbiddenPage.title}</h1>
                <p className="status-desc">{forbiddenPage.description}</p>
                <div className="status-actions">
                    <button onClick={handleContact} className="status-btn primary" id="forbidden-btn-contact">
                        {forbiddenPage.buttons.contact}
                    </button>
                    <button onClick={handleHome} className="status-btn secondary" id="forbidden-btn-home">
                        {forbiddenPage.buttons.home}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;
