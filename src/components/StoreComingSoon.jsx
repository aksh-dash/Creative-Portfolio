import React, { useState, useEffect } from 'react';
import '../styles/StoreComingSoon.css';

const STORAGE_KEY = 'creatively_lensed_store_vip';

const StoreComingSoon = ({ onReturn }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [vipData, setVipData] = useState(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setVipData(JSON.parse(saved));
            }
        } catch (e) {
            console.error(e);
        }

        const prevTitle = document.title;
        document.title = 'Store Coming Soon | Creatively Lensed';
        return () => {
            document.title = prevTitle;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const trimmed = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmed || !emailRegex.test(trimmed)) {
            setErrorMsg('Please enter a valid email');
            return;
        }

        setIsSubmitting(true);

        try {
            let spotNumber = Math.floor(82 + Math.random() * 11);
            let code = 'EARLYBIRD25';

            try {
                const res = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: trimmed })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.spotNumber) spotNumber = data.spotNumber;
                    if (data.discountCode) code = data.discountCode;
                }
            } catch (err) {
                // Local fallback
            }

            const record = {
                email: trimmed,
                spotNumber,
                code,
                registeredAt: new Date().toISOString()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
            setVipData(record);
        } catch (err) {
            setErrorMsg('Something went wrong. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCalendarReminder = () => {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Creatively Lensed//Store Launch Reminder//EN',
            'BEGIN:VEVENT',
            'SUMMARY:🚀 Creatively Lensed Store Launch & 25% Early Bird Drop',
            'DESCRIPTION:The Creatively Lensed Store is live! Use your private VIP Early Bird discount code EARLYBIRD25 for 25% off presets and assets. Visit https://creativelylensed.com/store',
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

                    {/* Bottom Interaction Area */}
                    <div className="cs-bottom-bar-area">
                        <span className="cs-exact-subtext">
                            GET NOTIFIED WHEN IT'S READY
                        </span>

                        {!vipData ? (
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
                            /* Minimal Confirmed Pill - Preserves exact silhouette */
                            <>
                                <div className="cs-confirmed-pill">
                                    <span className="cs-confirmed-label">
                                        ✓ SPOT #{vipData.spotNumber} RESERVED
                                    </span>
                                    <button
                                        type="button"
                                        className="cs-confirmed-btn"
                                        onClick={handleCalendarReminder}
                                        title="Download calendar launch reminder"
                                    >
                                        REMIND ME 📅
                                    </button>
                                </div>
                                <div className="cs-confirmed-subhint">
                                    <span>Code: <strong>{vipData.code || 'EARLYBIRD25'}</strong> (25% Off)</span>
                                    <span>•</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            localStorage.removeItem(STORAGE_KEY);
                                            setVipData(null);
                                            setEmail('');
                                        }}
                                    >
                                        Change email
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreComingSoon;
