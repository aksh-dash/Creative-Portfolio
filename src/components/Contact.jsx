import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import ThankYouModal from './ThankYouModal';
import '../styles/Contact.css';

const Contact = ({ onOpenPrivacy, onOpenTerms }) => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const labelRef = useReveal();
    const titleRef = useReveal();

    useEffect(() => {
        const handlePrefill = (e) => {
            const serviceTitle = e.detail;
            setForm((prev) => ({
                ...prev,
                message: `Hi Akshat, I would like to enquire about your ${serviceTitle} service. Let's discuss scope, timeline, and rates!`
            }));
            // Clear errors on prefill
            setErrors((prev) => ({ ...prev, message: '' }));
        };
        window.addEventListener('prefill-enquiry', handlePrefill);
        return () => window.removeEventListener('prefill-enquiry', handlePrefill);
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = 'Please provide your name or brand name.';
        }
        if (!form.email.trim()) {
            newErrors.email = 'Please provide a contact email address.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address (e.g., name@brand.com).';
        }
        if (!form.message.trim()) {
            newErrors.message = 'Please include a brief message or project description.';
        } else if (form.message.trim().length < 10) {
            newErrors.message = 'Please provide at least 10 characters so we can understand your goal.';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        if (window.trackPortfolioEvent) {
            window.trackPortfolioEvent('form_submission', {
                client_name: form.name,
                has_email: Boolean(form.email)
            });
        }

        // 1. Post to secure Vercel Serverless Function API
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                message: form.message,
                website_trap: form.website_trap || ''
            })
        })
        .catch(() => {
            // Silently fall back to WhatsApp if serverless API is offline
        })
        .finally(() => {
            setIsSubmitting(false);
            setShowThankYou(true);

            // 2. Open WhatsApp direct communication channel
            const text = encodeURIComponent(
                `*New Portfolio Inquiry*\n*Name:* ${form.name}\n*Email:* ${form.email}\n\n*Message:*\n${form.message}`
            );
            window.open(`https://wa.me/918482872105?text=${text}`, '_blank');
        });
    };

    return (
        <section className="contact" id="contact">
            <div className="section-label reveal" ref={labelRef}>CONTACT &amp; INQUIRIES</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Start a Project — <span className="accent">Contact.</span>
            </h2>

            <div className="contact-container">
                {/* Real Contact Address & Details Column */}
                <div className="contact-details-box">
                    <h3 className="details-title">Let's build something worth watching.</h3>
                    <p className="details-sub">
                        Whether you need a high-converting reel strategy, commercial film, luxury product photography, or end-to-end social media handling, let's connect.
                    </p>

                    <div className="details-list">
                        <div className="detail-item">
                            <div>
                                <span className="detail-label">STUDIO BASE &amp; LOCATION</span>
                                <p className="detail-val">
                                    {personalInfo.address}
                                    <br />
                                    <a
                                        href={personalInfo.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="maps-link"
                                    >
                                        View on Google Maps ↗
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div>
                                <span className="detail-label">PRIMARY EMAIL</span>
                                <a href={`mailto:${personalInfo.email}`} className="detail-val link">
                                    {personalInfo.email}
                                </a>
                                {personalInfo.secondaryEmail && (
                                    <div className="secondary-email">
                                        <a href={`mailto:${personalInfo.secondaryEmail}`} className="detail-val link">
                                            {personalInfo.secondaryEmail}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="detail-item">
                            <div>
                                <span className="detail-label">PHONE &amp; WHATSAPP</span>
                                <a
                                    href={personalInfo.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="detail-val link"
                                >
                                    {personalInfo.phone} ↗
                                </a>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div>
                                <span className="detail-label">OFFICIAL INSTAGRAM CHANNELS</span>
                                <div className="social-links-row">
                                    <a
                                        href="https://instagram.com/dangeakshat?exln=MnFvMTduYms0M3lj"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-pill"
                                    >
                                        @dangeakshat ↗
                                    </a>
                                    <a
                                        href="https://instagram.com/creativelylensed?obrf=MWVub3V0bm92aWZxbg%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-pill"
                                    >
                                        @creativelylensed ↗
                                    </a>
                                    <a
                                        href="https://instagram.com/gymophilic?cplk=MW9wNHl2c2tsYjl4Zw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-pill"
                                    >
                                        @gymophilic ↗
                                    </a>
                                    <a
                                        href="https://www.instagram.com/carclubofsambhajinagar?obrf=YXV0em1idHZsZW9h"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-pill"
                                    >
                                        @carclubofsambhajinagar ↗
                                    </a>
                                    <a
                                        href={personalInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-pill"
                                    >
                                        LinkedIn ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Column with Validation & Loading State */}
                <div className="contact-form-wrap">
                    <form onSubmit={handleSubmit} className="contact-form" noValidate>
                        {/* Hidden Honeypot Field for Spam Bot Filtering */}
                        <div style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true">
                            <input
                                type="text"
                                name="website_trap"
                                tabIndex={-1}
                                autoComplete="off"
                                value={form.website_trap || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="contact-name">Your Name / Brand *</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                placeholder="e.g. John Doe / NextGen Studios"
                                value={form.name}
                                onChange={handleChange}
                                className={errors.name ? 'input-error' : ''}
                                required
                            />
                            {errors.name && <span className="field-error-msg">{errors.name}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="contact-email">Email Address *</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                placeholder="e.g. contact@yourbrand.com"
                                value={form.email}
                                onChange={handleChange}
                                className={errors.email ? 'input-error' : ''}
                                required
                            />
                            {errors.email && <span className="field-error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="contact-message">Project Overview *</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Tell me about your project, target audience, deliverables, and timeline..."
                                value={form.message}
                                onChange={handleChange}
                                rows="5"
                                className={errors.message ? 'input-error' : ''}
                                required
                            />
                            {errors.message && <span className="field-error-msg">{errors.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className={`contact-submit-btn ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="submit-spinner-wrap">
                                    <span className="submit-spinner" />
                                    <span>Sending Inquiry...</span>
                                </span>
                            ) : (
                                <span>Send Message ↗</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer with Legal & Privacy Links */}
            <footer className="portfolio-footer">
                <div className="footer-content">
                    <div className="footer-left">
                        <span className="footer-brand">AKSHAT DANGE • CREATIVELY LENSED</span>
                        <p className="footer-copy">
                            &copy; {new Date().getFullYear()} Akshat Dange. All media assets &amp; content protected by copyright.
                        </p>
                    </div>
                    <div className="footer-links">
                        <a
                            href={personalInfo.storeUrl || "https://store.creativelylensed.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link-btn"
                        >
                            Store ↗
                        </a>
                        <span className="footer-sep">•</span>
                        <button type="button" className="footer-link-btn" onClick={onOpenPrivacy}>
                            Privacy Policy
                        </button>
                        <span className="footer-sep">•</span>
                        <button type="button" className="footer-link-btn" onClick={onOpenTerms}>
                            Terms &amp; Conditions
                        </button>
                    </div>
                </div>
            </footer>

            {/* Thank You Modal */}
            {showThankYou && (
                <ThankYouModal
                    clientName={form.name}
                    onClose={() => {
                        setShowThankYou(false);
                        setForm({ name: '', email: '', message: '' });
                    }}
                />
            )}
        </section>
    );
};

export default Contact;