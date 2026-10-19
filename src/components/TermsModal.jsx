import React, { useEffect } from 'react';
import '../styles/LegalModal.css';

const TermsModal = ({ onClose }) => {
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
                    <span className="legal-tag">TERMS OF USE</span>
                    <h2 className="legal-title">Terms &amp; Conditions</h2>
                    <button className="legal-close-btn" onClick={onClose} aria-label="Close">✕</button>
                </div>
                <div className="legal-body">
                    <p className="legal-updated">Last Updated: October 2026</p>

                    <h3>1. Ownership &amp; Intellectual Property</h3>
                    <p>
                        All original photographs, short-form reels, long-form films, color grades, and graphic designs displayed on this website are the intellectual property of <strong>Akshat Dange</strong> and <em>Creatively Lensed</em>, unless otherwise indicated as licensed client work.
                    </p>

                    <h3>2. Prohibited Use &amp; Anti-Theft Protection</h3>
                    <p>
                        No content, video files, images, or audio may be copied, reproduced, hotlinked, republished, uploaded, posted, or distributed in any way without prior written consent from Akshat Dange. Client-side security mechanisms are active to protect creative assets against unauthorized downloads.
                    </p>

                    <h3>3. Client Engagements &amp; Deliverables</h3>
                    <p>
                        Contracted creative services (including video shoots, reels production, photography, social media retainers, and branding campaigns) are governed by individual client contracts outlining scope of work, revision limits, licensing rights, payment schedules, and delivery milestones.
                    </p>

                    <h3>4. Revisions &amp; Color Grading Policy</h3>
                    <p>
                        All cinematic grades, color balancing, and edits follow professional creative direction. Specific aesthetic deliverables are established during pre-production briefing.
                    </p>

                    <h3>5. Governing Jurisdiction</h3>
                    <p>
                        These terms are governed by and construed in accordance with the laws of India, under the jurisdiction of courts in Pune, Maharashtra.
                    </p>

                    <h3>6. Enquiries</h3>
                    <p>
                        For licensing enquiries, permissions, or questions:
                        <br />
                        <strong>Email:</strong> creativelensesstore@gmail.com
                        <br />
                        <strong>Phone:</strong> +91 84828 72105
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
