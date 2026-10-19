import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import '../styles/Hero.css';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 15;
            const y = (clientY / window.innerHeight - 0.5) * 15;
            const bg = hero?.querySelector('.hero-bg');
            if (bg) {
                bg.style.transform = `scale(1.01) translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero-section" id="hero" ref={heroRef}>
            <div className="hero-card">
                {/* Silhouette Portrait Background */}
                <div className="hero-bg" />
                <div className="hero-overlay" />

                {/* Hero Top Grid: Split Left & Right Text Layout */}
                <div className="hero-main-layout">
                    {/* Left Column Text */}
                    <div className="hero-left-col">
                        <span className="hero-greeting">Hey, I'm Akshat Dange,</span>
                        <h1 className="hero-main-title">
                            Content<br />Creator
                        </h1>
                    </div>

                    {/* Right Column Text */}
                    <div className="hero-right-col">
                        <h2 className="hero-side-title">
                            I build frames<br />for feelings.
                        </h2>
                        <p className="hero-side-sub">
                            From idea to final edit, I shoot, cut and post stories built to hold attention.
                        </p>
                        <div className="hero-cta-wrap">
                            <a
                                href="/store"
                                className="hero-store-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.history.pushState(null, '', '/store');
                                    window.dispatchEvent(new PopStateEvent('popstate'));
                                }}
                            >
                                <span>Visit Store</span>
                                <span className="hero-store-arrow">↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Feature Numbers inside Hero Card */}
                <div className="hero-features-grid">
                    <div className="hero-feature-item">
                        <span className="feature-num">#01</span>
                        <span className="feature-label">Reels &amp; Short-Form Video</span>
                    </div>
                    <div className="hero-feature-item">
                        <span className="feature-num">#02</span>
                        <span className="feature-label">Photography</span>
                    </div>
                    <div className="hero-feature-item">
                        <span className="feature-num">#03</span>
                        <span className="feature-label">Brand &amp; Social Media</span>
                    </div>
                    <div className="hero-feature-item">
                        <span className="feature-num">#04</span>
                        <span className="feature-label">Video Editing &amp; Color Grading</span>
                    </div>
                </div>
            </div>

            {/* Ventures & Collaborations Strip Below Hero Card */}
            <div className="hero-brands-strip">
                <span className="brands-title">Ventures &amp; Collaborations</span>
                <div className="brands-logos">
                    <span className="brand-logo-item">Gymophilic</span>
                    <span className="brand-dot">•</span>
                    <a
                        href="/store"
                        className="brand-logo-item brand-logo-link"
                        title="Visit Creatively Lensed Store"
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState(null, '', '/store');
                            window.dispatchEvent(new PopStateEvent('popstate'));
                        }}
                    >
                        Creatively Lensed <span className="brand-link-tag">Store ↗</span>
                    </a>
                    <span className="brand-dot">•</span>
                    <span className="brand-logo-item">Visdom Studios</span>
                    <span className="brand-dot">•</span>
                    <span className="brand-logo-item">E-Cell RSCOE</span>
                    <span className="brand-dot">•</span>
                    <span className="brand-logo-item">NextGen Fitness Studio</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;