import React, { useState, useEffect } from 'react';
import '../styles/CookieBanner.css';

const CookieBanner = ({ onOpenPrivacy }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('creatively_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('creatively_cookie_consent', 'accepted');
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('creatively_cookie_consent', 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="cookie-banner-wrap" role="region" aria-label="Cookie consent">
            <div className="cookie-banner-content">
                <div className="cookie-text-col">
                    <span className="cookie-icon">🍪</span>
                    <p className="cookie-msg">
                        This site uses essential cookies &amp; anonymous performance metrics to ensure cinematic media playback and protect creative assets. By continuing, you agree to our{' '}
                        <button type="button" className="cookie-link-btn" onClick={onOpenPrivacy}>
                            Privacy Policy
                        </button>.
                    </p>
                </div>
                <div className="cookie-actions">
                    <button className="cookie-btn accept" onClick={handleAccept}>
                        Accept All
                    </button>
                    <button className="cookie-btn decline" onClick={handleDecline}>
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
