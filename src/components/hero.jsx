import React from 'react';
import {
    Clapperboard,
    Camera,
    Users,
    SlidersHorizontal,
    MapPin,
    Instagram,
    Youtube
} from 'lucide-react';
import '../styles/Hero.css';

const XIcon = ({ size = 18 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const servicesData = [
    {
        num: '01',
        icon: Clapperboard,
        title: 'Reels & Short-Form Video',
        tagline: 'CATCHY FRAMES. REAL MOMENTS.'
    },
    {
        num: '02',
        icon: Camera,
        title: 'Photography',
        tagline: 'PEOPLE. PLACES. PERSPECTIVES.'
    },
    {
        num: '03',
        icon: Users,
        title: 'Brand & Social Media',
        tagline: 'IDEAS. CONTENT. IMPACT.'
    },
    {
        num: '04',
        icon: SlidersHorizontal,
        title: 'Video Editing & Color Grading',
        tagline: 'RAW FOOTAGE. BETTER STORIES.'
    }
];

const Hero = () => {
    return (
        <section className="hero-root" id="hero">
            {/* HERO STAGE */}
            <div className="hero-stage">
                {/* 1. Subtle Red Radial Glow behind the head */}
                <div className="hero-red-glow" aria-hidden="true" />

                {/* 2. Original Photo Portrait (right-aligned, cropped so face is in right 55-60%) */}
                <div className="hero-portrait-wrap" aria-hidden="true">
                    <img
                        src="/assets/akshat-portrait.png"
                        alt="Akshat Dange"
                        className="hero-portrait-img"
                    />
                </div>

                {/* 3. Left-to-right dark overlay & bottom fade into #0a0a0a */}
                <div className="hero-overlays" aria-hidden="true">
                    <div className="hero-gradient-side" />
                    <div className="hero-gradient-bottom" />
                </div>

                {/* 4. Text Block (max-width 55% on mobile, z-index above overlay, no text touches face) */}
                <div className="hero-content-container">
                    <div className="hero-text-block">
                        <span className="hero-eyebrow">HEY, I'M</span>
                        <h1 className="hero-headline">
                            Akshat<br />Dange
                        </h1>
                        <div className="hero-role">Content Creator</div>
                        <div className="hero-divider" aria-hidden="true" />
                        <h2 className="hero-catchphrase">I build frames for feelings.</h2>
                        <p className="hero-subtext">
                            From idea to final edit, I shoot, cut and post stories built to hold attention.
                        </p>
                    </div>
                </div>
            </div>

            {/* SERVICES SECTION */}
            <div className="hero-services-section">
                <div className="hero-services-grid">
                    {servicesData.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div className="hero-service-card" key={service.num}>
                                <div className="service-icon-wrap">
                                    <IconComponent size={24} strokeWidth={1.5} className="service-icon" />
                                </div>
                                <span className="service-number">{service.num}</span>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-tagline">{service.tagline}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* VENTURES & COLLABORATIONS */}
            <div className="hero-ventures-section">
                <div className="hero-ventures-container">
                    <div className="ventures-left">
                        <span className="ventures-label">VENTURES &amp; COLLABORATIONS</span>
                        <div className="ventures-brands-row">
                            <div className="venture-brand-item">
                                <span className="venture-name">Gymophilic</span>
                                <span className="venture-underline" />
                            </div>
                            <span className="venture-dot">•</span>
                            <div className="venture-brand-item">
                                <span className="venture-name">Creatively Lensed</span>
                                <span className="venture-underline" />
                            </div>
                        </div>
                    </div>

                    <div className="ventures-right">
                        <div className="signature-wrap">
                            <img
                                src="/assets/stay-utkrusht-clean.png"
                                alt="stay उत्कृष्ट नजरेपलीकडचं"
                                className="signature-img"
                            />
                            <div className="signature-underline" />
                        </div>
                    </div>
                </div>
            </div>

            {/* HERO FOOTER STRIP */}
            <footer className="hero-footer-strip">
                <div className="hero-footer-container">
                    <div className="footer-location">
                        <MapPin size={13} strokeWidth={1.5} className="footer-pin-icon" />
                        <span>PUNE, INDIA</span>
                    </div>

                    <div className="footer-socials">
                        <a
                            href="https://instagram.com/dangeakshat"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="social-icon-link"
                        >
                            <Instagram size={19} strokeWidth={1.5} />
                        </a>
                        <a
                            href="https://youtube.com/@creativelylensed"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="social-icon-link"
                        >
                            <Youtube size={19} strokeWidth={1.5} />
                        </a>
                        <a
                            href="https://x.com/notsoakshat"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            className="social-icon-link"
                        >
                            <XIcon size={17} />
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Hero;