import React from 'react';
import '../styles/StatusPages.css';

/**
 * GallerySkeleton — skeleton placeholders for the photography gallery.
 * Uses fixed aspect-ratio to prevent CLS. CSS-only shimmer animation.
 * Props:
 *   - count: number of skeleton cards (default 6)
 */
const GallerySkeleton = ({ count = 6 }) => {
    return (
        <div className="gallery-skeleton-grid" aria-label="Loading gallery" role="status">
            {Array.from({ length: count }, (_, i) => (
                <div className="skeleton-card" key={i} aria-hidden="true" />
            ))}
            <span className="sr-only" style={{
                position: 'absolute', width: '1px', height: '1px',
                padding: 0, margin: '-1px', overflow: 'hidden',
                clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0
            }}>
                Loading photography gallery…
            </span>
        </div>
    );
};

export default GallerySkeleton;
