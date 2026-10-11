import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Portfolio ErrorBoundary captured error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
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
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff4455' }}>Something went wrong</h1>
                    <p style={{ color: '#a0a0a0', maxWidth: '480px', marginBottom: '2rem', lineHeight: 1.6 }}>
                        An unexpected application error occurred. We have safely isolated the issue.
                    </p>
                    <button
                        onClick={this.handleReload}
                        style={{
                            padding: '12px 28px',
                            background: '#ffffff',
                            color: '#080808',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '0.95rem'
                        }}
                    >
                        Reload Portfolio
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
