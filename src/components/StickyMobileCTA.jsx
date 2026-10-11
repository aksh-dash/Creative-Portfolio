import React, { useState, useEffect } from 'react';
import '../styles/StickyMobileCTA.css';

const StickyMobileCTA = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show only after scrolling past hero (~350px)
            if (window.scrollY > 350) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="sticky-mobile-cta" role="region" aria-label="Quick contact mobile bar">
            <div className="sm-content">
                <div className="sm-left">
                    <span className="sm-pulse-dot" />
                    <div className="sm-text-wrap">
                        <span className="sm-title">Akshat Dange</span>
                        <span className="sm-subtitle">Open for Projects</span>
                    </div>
                </div>

                <div className="sm-actions">
                    <a
                        href="https://wa.me/918482872105"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-whatsapp-btn"
                        aria-label="Direct WhatsApp chat"
                    >
                        💬 WhatsApp
                    </a>
                    <a href="#contact" className="sm-book-btn">
                        Book Now ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StickyMobileCTA;
