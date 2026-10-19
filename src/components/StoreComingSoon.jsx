import React, { useState, useEffect } from 'react';
import '../styles/StoreComingSoon.css';

const STORAGE_KEY = 'creatively_lensed_store_subscriber';

const StoreComingSoon = ({ onReturn }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // Track anonymous visit in real time
        try {
            fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'visit' })
            }).catch(() => {});
        } catch (e) {}

        // Check if previously subscribed
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setIsConfirmed(true);
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
            setErrorMsg('Please enter a valid email');
            return;
        }

        setIsSubmitting(true);

        try {
            // Real-time registration to serverless API & persistent storage
            await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmed })
            }).catch(() => {});

            localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: trimmed, date: new Date().toISOString() }));
            setIsConfirmed(true);
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
                {/* Top Left: SIGNATURE */}
                <span className="cs-top-brand">SIGNATURE</span>

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
                            {isConfirmed ? 'CHECK YOUR INBOX • EARLY ACCESS CONFIRMED' : "GET NOTIFIED WHEN IT'S READY"}
                        </span>

                        {!isConfirmed ? (
                            <>
                                <form className="cs-exact-pill-form" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        placeholder="ENTER YOUR EMAIL"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
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
                            /* Pure Minimalist Confirmed Pill - Exactly preserves reference silhouette */
                            <div 
                                className="cs-exact-pill-form cs-confirmed-state"
                                onClick={() => {
                                    setIsConfirmed(false);
                                    localStorage.removeItem(STORAGE_KEY);
                                }}
                                title="Click to enter a different email"
                                role="button"
                                tabIndex={0}
                            >
                                <span className="cs-confirmed-clean-text">
                                    YOU'RE ON THE LIST
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
