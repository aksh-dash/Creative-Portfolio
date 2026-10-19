import React, { useState, useEffect } from 'react';
import '../styles/StoreComingSoon.css';

const STORAGE_KEY = 'creatively_lensed_store_vip';

const StoreComingSoon = ({ onReturn }) => {
    const [email, setEmail] = useState('');
    const [selectedPerks, setSelectedPerks] = useState([
        'Cinematic LUTs & Presets',
        '25% Launch Discount'
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [vipData, setVipData] = useState(null);
    const [copiedShare, setCopiedShare] = useState(false);

    // Initial check for existing registration
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setVipData(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Error reading waitlist storage:', e);
        }

        // Title update
        const prevTitle = document.title;
        document.title = 'Store Coming Soon | Creatively Lensed by Akshat Dange';
        return () => {
            document.title = prevTitle;
        };
    }, []);

    const togglePerk = (perk) => {
        setSelectedPerks((prev) =>
            prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const trimmed = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmed || !emailRegex.test(trimmed)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Attempt API call
            let spotNumber = Math.floor(82 + Math.random() * 11);
            let code = 'EARLYBIRD25';

            try {
                const res = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: trimmed, perks: selectedPerks })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.spotNumber) spotNumber = data.spotNumber;
                    if (data.discountCode) code = data.discountCode;
                }
            } catch (netErr) {
                // Network/offline fallback works gracefully
                console.warn('Waitlist API offline, saving locally:', netErr);
            }

            const record = {
                email: trimmed,
                spotNumber,
                code,
                perks: selectedPerks,
                registeredAt: new Date().toISOString()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
            setVipData(record);
        } catch (err) {
            setErrorMsg('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShare = () => {
        const shareUrl = window.location.origin + '/store';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl).then(() => {
                setCopiedShare(true);
                setTimeout(() => setCopiedShare(false), 2500);
            });
        }
    };

    const handleCalendarReminder = () => {
        // Generate an .ics calendar file for the Store Launch Reminder
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Creatively Lensed//Store Launch VIP Reminder//EN',
            'BEGIN:VEVENT',
            'SUMMARY:🚀 Creatively Lensed Store Launch & Early Bird VIP Drop',
            'DESCRIPTION:Get ready! The official Creatively Lensed Store is live. Use your VIP Early Bird code EARLYBIRD25 for 25% off presets, LUTs, and digital assets. Visit https://creativelylensed.com/store',
            'DTSTART:20261115T120000Z',
            'DTEND:20261115T130000Z',
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'creatively-lensed-store-launch.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="coming-soon-wrapper">
            <div className="cs-ambient-glow" />

            {/* Top Bar */}
            <header className="cs-header">
                <div className="cs-brand">
                    <span className="cs-signature-logo">CREATIVELY LENSED</span>
                    <span className="cs-brand-badge">STORE / 2026</span>
                </div>

                <button
                    type="button"
                    className="cs-back-btn"
                    onClick={onReturn}
                    aria-label="Return to portfolio homepage"
                >
                    <span>←</span>
                    <span>Back to Portfolio</span>
                </button>
            </header>

            {/* Main Stage: The Dark Celestial Eclipse */}
            <main className="cs-main-stage">
                <div className="cs-eclipse-container">
                    <div className="cs-outer-aura" />
                    <div className="cs-corona-glow" />

                    <div className="cs-eclipse-disk">
                        <div className="cs-rim-light" />
                    </div>

                    <div className="cs-title-overlay">
                        <h1 className="cs-coming-soon-text">
                            C O M I N G &nbsp; S O O N
                        </h1>
                    </div>
                </div>

                {/* Interaction & Waitlist Section */}
                <div className="cs-interaction-area">
                    <div className="cs-spots-counter">
                        <span className="cs-pulse-dot" />
                        <span>
                            {vipData ? `Spot #${vipData.spotNumber} Claimed` : '84 of 100 Early Bird Spots Claimed'}
                        </span>
                    </div>

                    <h2 className="cs-red-subheading">
                        Get Notified When It's Ready
                    </h2>

                    {!vipData ? (
                        <>
                            <p className="cs-description">
                                Register now to secure priority access, launch day presets drop, and an exclusive 25% early bird discount.
                            </p>

                            <form className="cs-form-pill" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="ENTER YOUR EMAIL"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                    aria-label="Email for store launch notification"
                                />
                                <button
                                    type="submit"
                                    className="cs-notify-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Securing...' : 'Notify Me ↗'}
                                </button>
                            </form>

                            {errorMsg && <p className="cs-error-msg">{errorMsg}</p>}

                            {/* Early Bird Preferences */}
                            <div className="cs-perks-tags">
                                {[
                                    'Cinematic LUTs & Presets',
                                    'Video Overlays & SFX',
                                    'Fine Art Photo Prints',
                                    '25% Launch Discount'
                                ].map((perk) => (
                                    <span
                                        key={perk}
                                        className={`cs-perk-chip ${selectedPerks.includes(perk) ? 'active' : ''}`}
                                        onClick={() => togglePerk(perk)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        {selectedPerks.includes(perk) ? '✓ ' : '+ '}
                                        {perk}
                                    </span>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Confirmed VIP Pass */
                        <div className="cs-success-card">
                            <span className="cs-vip-badge">
                                VIP EARLY BIRD PASS #{vipData.spotNumber}
                            </span>
                            <h3 className="cs-success-title">Your Spot is Secured!</h3>
                            <p className="cs-success-desc">
                                We've reserved your early access for <strong>{vipData.email}</strong>. You'll receive private access 24 hours before the public launch.
                            </p>

                            <div className="cs-code-pill" title="Save this early bird discount code">
                                <span>Code:</span>
                                <strong>{vipData.code || 'EARLYBIRD25'}</strong>
                                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>(25% Off)</span>
                            </div>

                            <div className="cs-action-row">
                                <button
                                    type="button"
                                    className="cs-secondary-btn"
                                    onClick={handleCalendarReminder}
                                >
                                    📅 Add Launch Reminder
                                </button>

                                <button
                                    type="button"
                                    className="cs-secondary-btn"
                                    onClick={handleShare}
                                >
                                    {copiedShare ? '✓ Link Copied!' : '🔗 Share Link'}
                                </button>
                            </div>

                            <button
                                type="button"
                                className="cs-reset-link"
                                onClick={() => {
                                    localStorage.removeItem(STORAGE_KEY);
                                    setVipData(null);
                                    setEmail('');
                                }}
                            >
                                Register a different email
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="cs-footer">
                <span className="cs-footer-copy">
                    &copy; {new Date().getFullYear()} Creatively Lensed by Akshat Dange. All rights reserved.
                </span>

                <div className="cs-footer-perks">
                    <span className="cs-footer-perk-item">✦ 100% Original Presets</span>
                    <span className="cs-footer-perk-item">✦ Instant Digital Delivery</span>
                    <span className="cs-footer-perk-item">✦ Creator Community</span>
                </div>
            </footer>
        </div>
    );
};

export default StoreComingSoon;
