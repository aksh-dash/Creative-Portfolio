import React, { useState, useEffect } from 'react';
import '../styles/StoreComingSoon.css';

const StoreComingSoon = ({ onReturn }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(true);
    const [websiteTrap, setWebsiteTrap] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registeredSpot, setRegisteredSpot] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Record visitor hit
        try {
            fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'visit' })
            }).catch(() => {});
        } catch (e) {}

        const prevTitle = document.title;
        document.title = 'Store Coming Soon | Creatively Lensed';
        return () => {
            document.title = prevTitle;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setStatusMessage('');

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (trimmedName && (trimmedName.length < 2 || trimmedName.length > 100)) {
            setErrorMsg('Please enter a valid name (2-100 characters)');
            return;
        }

        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            setErrorMsg('Please enter a valid email address');
            return;
        }

        if (!consent) {
            setErrorMsg('Please confirm your consent to receive VIP access updates');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    consent: true,
                    website_trap: websiteTrap
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Unable to register. Please try again.');
                return;
            }

            const spot = data.spotNumber || 1;
            setRegisteredSpot(spot);
            setStatusMessage(
                data.isExisting
                    ? `You're already on the VIP list as Spot #${spot}!`
                    : `VIP Spot #${spot} officially reserved!`
            );
        } catch (err) {
            setErrorMsg('Unable to connect to the server. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setRegisteredSpot(null);
        setName('');
        setEmail('');
        setStatusMessage('');
        setErrorMsg('');
    };

    return (
        <div className="cs-exact-viewport">
            {/* The Framed Canvas Mockup */}
            <div className="cs-mockup-frame">
                {/* Top Left: AD Logo + CREATIVELY LENSED */}
                <div className="cs-top-brand" aria-label="Creatively Lensed by Akshat Dange">
                    <svg
                        className="cs-ad-logo-svg"
                        viewBox="0 0 94 80"
                        width="24"
                        height="20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M 36 11 L 33 11 L 28 25 L 7 68 L 8 71 L 16 70 L 23 53 L 35 30 L 46 55 L 54 55 L 54 52 L 46 33 L 41 25 Z M 47 6 L 44 9 L 47 14 L 64 17 L 73 25 L 77 34 L 77 45 L 75 51 L 67 60 L 60 63 L 45 63 L 43 65 L 44 71 L 62 71 L 71 67 L 81 57 L 86 44 L 86 34 L 82 23 L 72 12 L 61 7 Z"
                            fill="#ffffff"
                            fillRule="evenodd"
                        />
                    </svg>
                    <span className="cs-brand-name">CREATIVELY LENSED</span>
                </div>

                {/* Top Right: Discreet Back Navigation */}
                <button
                    type="button"
                    className="cs-top-back"
                    onClick={onReturn}
                    aria-label="Back to Portfolio"
                >
                    ← Back
                </button>

                {/* Central Stage */}
                <div className="cs-center-content">
                    {/* The Eclipse */}
                    <div className="cs-eclipse-stage">
                        <div className="cs-ambient-soft-aura" />
                        <div className="cs-top-corona-glow" />
                        <div className="cs-black-disk" />

                        {/* C O M I N G   S O O N */}
                        <div className="cs-coming-soon-banner">
                            <h1 className="cs-exact-title">
                                C O M I N G<span className="cs-title-space" />S O O N
                            </h1>
                        </div>
                    </div>

                    {/* Bottom Interaction Area */}
                    <div className="cs-bottom-bar-area">
                        <span className="cs-exact-subtext">
                            {registeredSpot !== null
                                ? `REGISTERED AS SPOT #${registeredSpot} • CONFIRMATION SENT`
                                : "EARLY BIRD VIP ACCESS • GET NOTIFIED"}
                        </span>

                        {registeredSpot === null ? (
                            <form className="cs-vip-form-wrap" onSubmit={handleSubmit} noValidate>
                                {/* Bot Trap */}
                                <div style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true">
                                    <input
                                        type="text"
                                        name="website_trap"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={websiteTrap}
                                        onChange={(e) => setWebsiteTrap(e.target.value)}
                                    />
                                </div>

                                <div className="cs-exact-pill-form">
                                    <input
                                        type="text"
                                        placeholder="your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isSubmitting}
                                        autoComplete="name"
                                        aria-label="Your Name"
                                        className="cs-name-input"
                                    />
                                    <span className="cs-input-divider" aria-hidden="true">|</span>
                                    <input
                                        type="email"
                                        placeholder="your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                        autoComplete="email"
                                        aria-label="Your Email"
                                        className="cs-email-input"
                                    />
                                    <button
                                        type="submit"
                                        className="cs-exact-notify-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? '...' : 'JOIN VIP'}
                                    </button>
                                </div>

                                <div className="cs-consent-row">
                                    <label className="cs-consent-label">
                                        <input
                                            type="checkbox"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            className="cs-consent-checkbox"
                                        />
                                        <span>I agree to receive early access announcements &amp; VIP updates. (Opt out anytime)</span>
                                    </label>
                                </div>

                                {errorMsg && <span className="cs-pill-error" role="alert">{errorMsg}</span>}
                            </form>
                        ) : (
                            /* Confirmed State */
                            <div className="cs-confirmed-container">
                                <div
                                    className="cs-exact-pill-form cs-confirmed-state"
                                    onClick={handleReset}
                                    title="Click to register another email"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleReset(); }}
                                >
                                    <span className="cs-confirmed-clean-text">
                                        SPOT #{registeredSpot} RESERVED
                                    </span>
                                    <span className="cs-exact-notify-btn cs-confirmed-chip">
                                        CONFIRMED ✓
                                    </span>
                                </div>
                                <p className="cs-confirmed-notice">
                                    {statusMessage || 'Confirmation email dispatched.'} Check your inbox (and spam folder).
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreComingSoon;
