import React, { useEffect } from 'react';
import '../styles/LegalModal.css';

const PrivacyPolicyModal = ({ onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="legal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
                <div className="legal-header">
                    <span className="legal-tag">LEGAL &amp; COMPLIANCE</span>
                    <h2 className="legal-title">Privacy Policy</h2>
                    <button className="legal-close-btn" onClick={onClose} aria-label="Close">✕</button>
                </div>
                <div className="legal-body">
                    <p className="legal-updated">Last Updated: October 2026</p>
                    
                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to the official portfolio of <strong>Akshat Dange</strong> (Founder of <em>Creatively Lensed</em> and co-founder of <em>Visdom Studios</em>), operating from Pune, Maharashtra, India. We respect your privacy and are committed to protecting any personal data you share through this website.
                    </p>

                    <h3>2. Information We Collect</h3>
                    <p>
                        We only collect information directly provided by you through our contact and project enquiry forms (such as your Name, Email address, Phone number, and project details). We do not sell, rent, or trade your personal information.
                    </p>

                    <h3>3. Use of Information</h3>
                    <p>
                        Your information is used solely to respond to inquiries, discuss video production, photography, or social media management services, provide project quotes, and coordinate media deliverables.
                    </p>

                    <h3>4. Cookies &amp; Tracking</h3>
                    <p>
                        We utilize essential cookies to retain user preferences and anonymous analytics data (via privacy-friendly metrics) to improve our site speed and visual presentation. You can modify your cookie choices at any time via our Cookie Banner.
                    </p>

                    <h3>5. Asset &amp; Intellectual Property Protection</h3>
                    <p>
                        All media assets, photographs, video reels, motion graphics, and graphic design presented on this website are the proprietary creative works of Akshat Dange and respective clients. Automated harvesting, scraping, or extraction of media is strictly forbidden.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        If you have questions regarding this Privacy Policy, please contact Akshat Dange directly at:
                        <br />
                        <strong>Email:</strong> dange.akshat2107@gmail.com
                        <br />
                        <strong>Location:</strong> Pune, Maharashtra, India 411033
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
