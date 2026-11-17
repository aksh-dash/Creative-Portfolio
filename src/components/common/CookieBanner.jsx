import React, { useState, useEffect } from 'react';
import { getConsent, saveConsent, applyConsent } from '../../utils/consentManager';
import '../../styles/CookieBanner.css';

const CookieBanner = ({ onOpenPrivacy }) => {
    const [visible, setVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [analyticsChecked, setAnalyticsChecked] = useState(false);

    useEffect(() => {
        const consent = getConsent();
        // If user already answered, apply their choice silently
        if (consent.answered) {
            applyConsent(consent);
        } else {
            // First time visitor: show banner after brief delay
            const timer = setTimeout(() => setVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        saveConsent({ analytics: true });
        setVisible(false);
    };

    const handleRejectNonEssential = () => {
        saveConsent({ analytics: false });
        setVisible(false);
    };

    const handleSavePreferences = () => {
        saveConsent({ analytics: analyticsChecked });
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="cookie-banner-wrap" role="region" aria-label="Privacy and Cookie Consent">
            <div className="cookie-banner-content">
                <div className="cookie-text-col">
                    <span className="cookie-icon" aria-hidden="true">🍪</span>
                    <div>
                        <p className="cookie-msg">
                            We use essential cookies to maintain security and site stability. With your consent, we also use privacy-friendly analytics to optimize media playback and understand visitor traffic. Review our{' '}
                            <button type="button" className="cookie-link-btn" onClick={onOpenPrivacy}>
                                Privacy Policy
                            </button>.
                        </p>
                    </div>
                </div>

                <div className="cookie-actions">
                    <button type="button" className="cookie-btn accept" onClick={handleAcceptAll}>
                        Accept All
                    </button>
                    <button type="button" className="cookie-btn decline" onClick={handleRejectNonEssential}>
                        Reject Non-Essential
                    </button>
                    <button
                        type="button"
                        className="cookie-btn preferences"
                        onClick={() => setShowPreferences(!showPreferences)}
                        aria-expanded={showPreferences}
                    >
                        {showPreferences ? 'Close Preferences' : 'Preferences'}
                    </button>
                </div>
            </div>

            {/* Granular Preference Drawer */}
            {showPreferences && (
                <div className="cookie-prefs-drawer">
                    <div className="cookie-pref-item">
                        <div className="cookie-pref-info">
                            <strong>Strictly Necessary &amp; Security</strong>
                            <p>Required for CSRF defense, bot protection, rate limiting, and essential media playback. Always active.</p>
                        </div>
                        <span className="cookie-pref-badge">Always Active</span>
                    </div>

                    <div className="cookie-pref-item">
                        <div className="cookie-pref-info">
                            <strong>Performance &amp; Analytics</strong>
                            <p>Anonymous metrics and session playback insights to improve video responsiveness and site performance. No cross-site ad profiling.</p>
                        </div>
                        <label className="cookie-toggle-label">
                            <input
                                type="checkbox"
                                checked={analyticsChecked}
                                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                                className="cookie-toggle-checkbox"
                            />
                            <span>Enable</span>
                        </label>
                    </div>

                    <div className="cookie-pref-save-row">
                        <button type="button" className="cookie-btn accept" onClick={handleSavePreferences}>
                            Save Preferences
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CookieBanner;
