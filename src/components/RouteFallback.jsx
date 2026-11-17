import React from 'react';
import '../styles/StatusPages.css';

/**
 * RouteFallback — Suspense fallback skeletons for lazy-loaded routes/components.
 * Uses exact aspect-ratio and heights to prevent CLS (< 0.1).
 */
const RouteFallback = () => {
    return (
        <div className="route-fallback-skeleton" aria-busy="true" aria-label="Loading page content">
            <div className="fallback-hero-skeleton" style={{ minHeight: '60vh', background: '#0e0e0e', borderRadius: '24px', margin: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="skeleton-card" style={{ width: '80%', height: '240px', background: '#141414', borderRadius: '16px' }} />
            </div>
            <div className="gallery-skeleton-grid" style={{ padding: '0 2rem' }}>
                {Array.from({ length: 3 }, (_, i) => (
                    <div className="skeleton-card" key={i} />
                ))}
            </div>
        </div>
    );
};

export default RouteFallback;
