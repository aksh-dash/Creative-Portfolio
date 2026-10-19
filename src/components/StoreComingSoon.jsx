import React, { useState, useEffect } from 'react';
import '../styles/StoreComingSoon.css';

const STORAGE_KEY = 'creatively_lensed_store_vip';

const StoreComingSoon = ({ onReturn }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registeredSpot, setRegisteredSpot] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Real-time visitor hit
        try {
            fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'visit' })
            }).catch(() => {});
        } catch (e) {}

        // Check if already registered
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.spotNumber) {
                    setRegisteredSpot(parsed.spotNumber);
                    setEmail(parsed.email || '');
                }
            }
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

        const trimmed = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmed || !emailRegex.test(trimmed)) {
            setErrorMsg('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            let spot = 1;
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmed })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.spotNumber) spot = data.spotNumber;
            }

            setRegisteredSpot(spot);
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                email: trimmed,
                spotNumber: spot,
                date: new Date().toISOString()
            }));
        } catch (err) {
            setErrorMsg('Unable to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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

                    {/* Bottom Interaction Area - Ultra Minimalist */}
                    <div className="cs-bottom-bar-area">
                        <span className="cs-exact-subtext">
                            {registeredSpot !== null
                                ? `REGISTERED AS SPOT #${registeredSpot} • CONFIRMATION SENT`
                                : "GET NOTIFIED WHEN IT'S READY"}
                        </span>

                        {registeredSpot === null ? (
                            <>
                                <form className="cs-exact-pill-form" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        placeholder="enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                        autoComplete="email"
                                        aria-label="Enter your email to get notified"
                                    />
                                    <button
                                        type="submit"
                                        className="cs-exact-notify-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? '...' : 'NOTIFY ME'}
                                    </button>
                                </form>
                                {errorMsg && <span className="cs-pill-error">{errorMsg}</span>}
                            </>
                        ) : (
                            /* Pure Minimalist Confirmed Pill with Real Sequential Spot Number */
                            <div
                                className="cs-exact-pill-form cs-confirmed-state"
                                onClick={() => {
                                    setRegisteredSpot(null);
                                    localStorage.removeItem(STORAGE_KEY);
                                }}
                                title="Click to register another email"
                                role="button"
                                tabIndex={0}
                            >
                                <span className="cs-confirmed-clean-text">
                                    SPOT #{registeredSpot} REGISTERED
                                </span>
                                <span className="cs-exact-notify-btn cs-confirmed-chip">
                                    CONFIRMED ✓
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreComingSoon;
