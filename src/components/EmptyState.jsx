import React from 'react';
import { emptyState } from '../content/status-pages';
import '../styles/StatusPages.css';

/**
 * EmptyState — reusable component for empty downloads, empty search, etc.
 * Props:
 *   - title (optional): override default title
 *   - description (optional): override default description
 */
const EmptyState = ({ title, description }) => {
    return (
        <div className="empty-state" role="status">
            <div style={{ marginBottom: '1rem', opacity: 0.4 }} aria-hidden="true">
                <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
                    <rect x="8" y="14" width="48" height="36" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <line x1="8" y1="24" x2="56" y2="24" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <circle cx="32" cy="36" r="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                </svg>
            </div>
            <h3 className="empty-state-title">{title || emptyState.title}</h3>
            <p className="empty-state-desc">{description || emptyState.description}</p>
        </div>
    );
};

export default EmptyState;
