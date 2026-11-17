import React, { Component } from 'react';
import { crashPage } from '../../content/status-pages';

/**
 * ErrorBoundary — wraps the app and individual sections.
 * Props:
 *   - fallbackLevel: 'app' (full-page crash) or 'section' (inline fallback)
 *   - sectionName: optional label for section-level boundaries
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to console in development only
        if (import.meta.env.DEV) {
            console.error('Portfolio ErrorBoundary captured error:', error, errorInfo);
        }
    }

    handleReload = () => {
        window.location.reload();
    };

    handleHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            const level = this.props.fallbackLevel || 'app';

            // Section-level: show a smaller inline fallback
            if (level === 'section') {
                return (
                    <div style={{
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        margin: '2rem auto',
                        maxWidth: '600px'
                    }}>
                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.92rem',
                            margin: '0 0 1rem 0',
                            lineHeight: 1.6
                        }}>
                            This section couldn't load.{' '}
                            <button
                                onClick={this.handleReload}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ffffff',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    padding: 0,
                                    minHeight: '44px',
                                    minWidth: '44px'
                                }}
                            >
                                Reload page
                            </button>
                        </p>
                    </div>
                );
            }

            // App-level: full branded crash page
            return (
                <div
                    role="main"
                    aria-label="Application error"
                    style={{
                        minHeight: '100dvh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#080808',
                        color: '#ffffff',
                        fontFamily: 'Inter, sans-serif',
                        padding: '2rem',
                        textAlign: 'center'
                    }}
                >
                    {/* Camera aperture motif */}
                    <div style={{ marginBottom: '1.5rem', opacity: 0.5 }} aria-hidden="true">
                        <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                            <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                            <circle cx="40" cy="40" r="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                            <line x1="40" y1="4" x2="40" y2="16" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                            <line x1="40" y1="64" x2="40" y2="76" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                            <line x1="4" y1="40" x2="16" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                            <line x1="64" y1="40" x2="76" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                        </svg>
                    </div>

                    <div style={{
                        fontFamily: '"DM Mono", monospace',
                        fontSize: '0.75rem',
                        letterSpacing: '0.2em',
                        color: 'rgba(201, 168, 76, 0.8)',
                        marginBottom: '1.25rem',
                        textTransform: 'uppercase'
                    }}>
                        {crashPage.tag}
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: '#ffffff'
                    }}>
                        {crashPage.title}
                    </h1>

                    <p style={{
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '480px',
                        marginBottom: '2rem',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                    }}>
                        {crashPage.description}
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <button
                            onClick={this.handleReload}
                            id="crash-btn-reload"
                            style={{
                                padding: '0.85rem 1.85rem',
                                background: '#ffffff',
                                color: '#080808',
                                border: 'none',
                                borderRadius: '100px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.92rem',
                                minHeight: '44px'
                            }}
                        >
                            {crashPage.buttons.reload}
                        </button>
                        <button
                            onClick={this.handleHome}
                            id="crash-btn-home"
                            style={{
                                padding: '0.85rem 1.85rem',
                                background: 'rgba(255,255,255,0.08)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '100px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.92rem',
                                minHeight: '44px'
                            }}
                        >
                            {crashPage.buttons.home}
                        </button>
                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); this.handleHome(); }}
                            id="crash-btn-contact"
                            style={{
                                padding: '0.85rem 1.85rem',
                                background: 'rgba(255,255,255,0.08)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '100px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.92rem',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                minHeight: '44px'
                            }}
                        >
                            {crashPage.buttons.contact}
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
