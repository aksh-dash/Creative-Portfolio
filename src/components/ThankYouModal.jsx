import React from 'react';
import '../styles/ThankYouModal.css';

const ThankYouModal = ({ onClose, clientName }) => {
    return (
        <div className="ty-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="ty-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ty-icon">✓</div>
                <span className="ty-label">MESSAGE DISPATCHED</span>
                <h3 className="ty-title">Thank You, {clientName || 'Friend'}!</h3>
                <p className="ty-desc">
                    Your inquiry has been received. Akshat will review your project brief and get back to you within 24 hours via email or WhatsApp.
                </p>
                <div className="ty-contact-highlight">
                    <span>Direct WhatsApp: </span>
                    <a href="https://wa.me/918482872105" target="_blank" rel="noopener noreferrer">
                        +91 84828 72105 ↗
                    </a>
                </div>
                <button className="ty-close-btn" onClick={onClose}>
                    Back to Portfolio
                </button>
            </div>
        </div>
    );
};

export default ThankYouModal;
