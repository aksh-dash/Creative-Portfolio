import React from 'react';
import { maintenancePage } from '../content/status-pages';
import '../styles/StatusPages.css';

/**
 * MaintenancePage — standalone page shown when VITE_MAINTENANCE=true.
 * Replaces the entire app with a simple branded message.
 *
 * To activate:
 *   Vercel Dashboard → Settings → Environment Variables → Add:
 *     Key: VITE_MAINTENANCE    Value: true
 *   Then redeploy (or trigger a new deployment).
 *
 * To deactivate:
 *   Delete the VITE_MAINTENANCE variable (or set to "false") → redeploy.
 *
 * For local dev:
 *   Add VITE_MAINTENANCE=true to your .env file and restart the dev server.
 */
const MaintenancePage = () => {
    return (
        <div className="status-container maintenance" role="main" aria-label="Site under maintenance">
            <div className="status-content">
                <div className="status-motif" aria-hidden="true">
                    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                        <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                        <circle cx="40" cy="40" r="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                        <circle cx="40" cy="40" r="6" fill="rgba(255,255,255,0.15)" />
                    </svg>
                </div>
                <div className="status-tag">{maintenancePage.tag}</div>
                <h1 className="status-title">{maintenancePage.title}</h1>
                <p className="status-desc">{maintenancePage.description}</p>
                <div className="maintenance-contact">
                    <span className="maintenance-label">{maintenancePage.emailLabel}</span>
                    <a
                        href={`mailto:${maintenancePage.email}`}
                        className="maintenance-email"
                    >
                        {maintenancePage.email}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
