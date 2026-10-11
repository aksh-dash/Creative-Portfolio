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
        <div className="legal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="privacy-title">
            <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
                <div className="legal-header">
                    <span className="legal-tag">LEGAL &amp; COMPLIANCE</span>
                    <h2 className="legal-title" id="privacy-title">Privacy Policy</h2>
                    <button className="legal-close-btn" onClick={onClose} aria-label="Close Privacy Policy">✕</button>
                </div>
                <div className="legal-body">
                    <p className="legal-updated">Last Updated: October 2026 • Compliant with Indian DPDP Act 2023</p>
                    
                    <h3>1. Introduction &amp; Data Fiduciary</h3>
                    <p>
                        Welcome to the official portfolio of <strong>Akshat Dange</strong> (operating under <em>Creatively Lensed</em> and co-founding <em>Visdom Studios</em>), based in Pune, Maharashtra, India. As the Data Fiduciary, we are committed to upholding your privacy and safeguarding your personal information in strict adherence to the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
                    </p>

                    <h3>2. Information We Collect &amp; Purpose</h3>
                    <p>
                        We collect personal data only when voluntarily submitted by you via our contact and project inquiry forms:
                    </p>
                    <ul>
                        <li><strong>Personal Identifiers:</strong> Name, professional entity/brand name.</li>
                        <li><strong>Contact Coordinates:</strong> Email address, mobile/WhatsApp telephone number.</li>
                        <li><strong>Project Context:</strong> Scope requirements, shoot locations, and creative briefs.</li>
                    </ul>
                    <p>
                        This data is processed solely to assess creative feasibility, prepare transparent quotations, schedule shoots, and fulfill agreed video and photography deliverables. We never sell, lease, or monetize your personal details.
                    </p>

                    <h3>3. Privacy-Friendly Analytics &amp; Cookies</h3>
                    <p>
                        Our platform employs non-intrusive, privacy-respecting session metrics to optimize media load times and playback fluidity. No third-party behavioral profiling or cross-site advertising tracking cookies are activated without your express consent through our Cookie Banner.
                    </p>

                    <h3>4. Your Rights under the DPDP Act 2023 (Data Principal Rights)</h3>
                    <p>
                        As a Data Principal under Indian law, you hold explicit statutory rights regarding your personal information:
                    </p>
                    <ul>
                        <li><strong>Right to Access:</strong> Request a summary of personal data held about you and any processing activities.</li>
                        <li><strong>Right to Correction &amp; Erasure:</strong> Request rectification of outdated details or complete deletion of your records from our inquiry archives.</li>
                        <li><strong>Right to Grievance Redressal:</strong> Direct questions, concerns, or deletion requests directly to our designated Data Officer.</li>
                    </ul>

                    <h3>5. Data Deletion Request Procedure</h3>
                    <p>
                        To request the permanent erasure of your inquiry data and contact history, send a direct written request with the subject line <strong>"DPDP Data Deletion Request"</strong> to:
                        <br />
                        <strong>Email:</strong> <a href="mailto:dange.akshat2107@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>dange.akshat2107@gmail.com</a>
                        <br />
                        All verified requests are fulfilled within 7 business days, accompanied by written confirmation.
                    </p>

                    <h3>6. Intellectual Property &amp; Anti-Theft Protection</h3>
                    <p>
                        All original photographs, video showreels, client commercial reels, motion graphics, and editorial copy displayed across this platform are protected under the Indian Copyright Act, 1957. Automated web scraping, rip extraction, and unauthorized commercial redistribution are strictly prohibited.
                    </p>

                    <h3>7. Contact &amp; Grievance Officer</h3>
                    <p>
                        <strong>Akshat Dange</strong>
                        <br />
                        Founder &amp; Filmmaker, Creatively Lensed
                        <br />
                        Wakad / Tathawade, Pune, Maharashtra 411033, India
                        <br />
                        <strong>WhatsApp:</strong> +91 8482872105
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
