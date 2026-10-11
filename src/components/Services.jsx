import React from 'react';
import { services, servicesBanner } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Services.css';

const renderServiceIcon = (iconType) => {
    const strokeProps = { stroke: "#e8e8e8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
    switch (iconType) {
        case 'clapperboard':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 8h20" />
                    <path d="M6 4l2 4" />
                    <path d="M12 4l2 4" />
                    <path d="M18 4l2 4" />
                </svg>
            );
        case 'film':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="2" y1="7" x2="7" y2="7" />
                    <line x1="2" y1="17" x2="7" y2="17" />
                    <line x1="17" y1="17" x2="22" y2="17" />
                    <line x1="17" y1="7" x2="22" y2="7" />
                </svg>
            );
        case 'camera':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                </svg>
            );
        case 'scissors':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" y1="4" x2="8.12" y2="15.88" />
                    <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
            );
        case 'share-2':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
            );
        case 'badge':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        case 'megaphone':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <path d="M3 11l18-5v12L3 13v-2z" />
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
            );
        case 'globe':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            );
        case 'bar-chart-3':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            );
        case 'layers':
        default:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" {...strokeProps}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            );
    }
};

const Services = () => {
    const labelRef = useReveal();
    const titleRef = useReveal();
    const gridRef = useReveal();

    const handleEnquire = (serviceTitle) => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            // Dispatch a custom event to prefill message
            window.dispatchEvent(new CustomEvent('prefill-enquiry', { detail: serviceTitle }));
        }
    };

    return (
        <section className="services" id="services">
            <div className="section-label reveal" ref={labelRef}>CORE SERVICES &amp; CAPABILITIES</div>
            <h2 className="section-title reveal" ref={titleRef}>
                What I Do — <span className="accent">Services.</span>
            </h2>

            <div className="services-grid reveal" ref={gridRef}>
                {/* 3x3 GRID OF EQUAL HEIGHT CARDS (01 - 09) */}
                {services.map((s) => (
                    <div className="service-card" key={s.id} data-cursor="hover">
                        <div className="s-card-top">
                            <div className="s-num">{s.num}</div>
                            <div className="s-icon">{renderServiceIcon(s.iconType)}</div>
                            <h3 className="s-title">{s.title}</h3>
                            <p className="s-desc">{s.description}</p>
                        </div>
                        <div className="s-card-bottom">
                            <div className="s-tags">
                                {s.tags.map((tag) => (
                                    <span className="s-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                            <button className="s-enquire-btn" onClick={() => handleEnquire(s.title)}>
                                Enquire Now ↗
                            </button>
                        </div>
                    </div>
                ))}

                {/* FULL-WIDTH BANNER CARD BELOW GRID */}
                <div className="service-card service-banner-card" data-cursor="hover">
                    <div className="s-banner-content">
                        <div className="s-icon">{renderServiceIcon(servicesBanner.iconType)}</div>
                        <div className="s-banner-text">
                            <h3 className="s-title">{servicesBanner.title}</h3>
                            <p className="s-desc">{servicesBanner.description}</p>
                            <div className="s-tags">
                                {servicesBanner.tags.map((tag) => (
                                    <span className="s-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="s-enquire-btn s-banner-btn" onClick={() => handleEnquire(servicesBanner.title)}>
                        Enquire For Complete Package ↗
                    </button>
                </div>
            </div>

            {/* Transparent Pricing & Retainer Structure Note */}
            <div style={{
                textAlign: 'center',
                marginTop: '2.5rem',
                padding: '1.25rem 2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                maxWidth: '800px',
                margin: '2.5rem auto 0 auto'
            }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a0a0a0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    TRANSPARENT QUOTES &amp; FLEXIBLE ENGAGEMENT
                </span>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: '#e0e0e0', lineHeight: 1.6 }}>
                    Every brand and project is unique. We offer <strong>bespoke per-project pricing</strong> (commercial films, photoshoots) as well as <strong>monthly retainer agreements</strong> (continuous reel production &amp; social management) with clear deliverables, zero hidden fees, and defined timelines.
                </p>
            </div>
        </section>
    );
};

export default Services;