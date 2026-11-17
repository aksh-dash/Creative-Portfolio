import React, { useEffect } from 'react';
import { notFoundPage } from '../content/status-pages';
import '../styles/NotFound.css';

const NotFound = ({ onReturn }) => {
    useEffect(() => {
        document.title = "404 — Frame Not Found | Akshat Dange";
        // Set noindex for error page
        let meta = document.querySelector('meta[name="robots"]');
        const original = meta ? meta.getAttribute('content') : null;
        if (meta) {
            meta.setAttribute('content', 'noindex, nofollow');
        } else {
            meta = document.createElement('meta');
            meta.name = 'robots';
            meta.content = 'noindex, nofollow';
            document.head.appendChild(meta);
        }
        return () => {
            document.title = "Akshat Dange | Content Creator, Filmmaker & Visual Storyteller | Pune";
            if (original !== null) {
                const m = document.querySelector('meta[name="robots"]');
                if (m) m.setAttribute('content', original);
            }
        };
    }, []);

    const handleHome = () => {
        if (onReturn) onReturn();
    };

    const handlePortfolio = () => {
        if (onReturn) onReturn();
        setTimeout(() => {
            const el = document.getElementById('work') || document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleContact = () => {
        if (onReturn) onReturn();
        setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="notfound-container" role="main" aria-label="Page not found">
            <div className="notfound-content">
                {/* Camera / Aperture SVG Motif */}
                <div className="notfound-motif" aria-hidden="true">
                    <svg viewBox="0 0 120 120" width="120" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="56" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                        <circle cx="60" cy="60" r="38" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                        <circle cx="60" cy="60" r="22" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        {/* Aperture blades */}
                        <path d="M60 38 L72 54 L60 50 Z" fill="rgba(255,255,255,0.06)" />
                        <path d="M60 82 L48 66 L60 70 Z" fill="rgba(255,255,255,0.06)" />
                        <path d="M38 60 L54 48 L50 60 Z" fill="rgba(255,255,255,0.06)" />
                        <path d="M82 60 L66 72 L70 60 Z" fill="rgba(255,255,255,0.06)" />
                        {/* Cross-hair */}
                        <line x1="60" y1="4" x2="60" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <line x1="60" y1="100" x2="60" y2="116" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <line x1="4" y1="60" x2="20" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <line x1="100" y1="60" x2="116" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    </svg>
                </div>

                <div className="notfound-tag">{notFoundPage.tag}</div>
                <h1 className="notfound-code">{notFoundPage.code}</h1>
                <h2 className="notfound-title">{notFoundPage.title}</h2>
                <p className="notfound-desc">{notFoundPage.description}</p>

                <div className="notfound-actions">
                    <button
                        onClick={handleHome}
                        className="notfound-btn primary"
                        id="notfound-btn-home"
                    >
                        {notFoundPage.buttons.home}
                    </button>
                    <button
                        onClick={handlePortfolio}
                        className="notfound-btn secondary"
                        id="notfound-btn-portfolio"
                    >
                        {notFoundPage.buttons.portfolio}
                    </button>
                    <button
                        onClick={handleContact}
                        className="notfound-btn secondary"
                        id="notfound-btn-contact"
                    >
                        {notFoundPage.buttons.contact}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
