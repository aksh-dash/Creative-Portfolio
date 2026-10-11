import React from 'react';
import { personalInfo, stats } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/About.css';

const About = () => {
    const labelRef = useReveal();
    const titleRef = useReveal();
    const photoRef = useReveal();
    const contentRef = useReveal();

    return (
        <section className="about" id="about">
            <div className="section-label reveal" ref={labelRef}>ABOUT THE CREATOR</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Meet Akshat <span className="accent">Dange.</span>
            </h2>

            <div className="about-inner">
                <div ref={photoRef} className="about-photo-col">
                    <div className="about-photo-wrap">
                        <img
                            src="/assets/me.png"
                            alt="Akshat Dange Content Creation and Commercial Photography"
                            width="400"
                            height="420"
                            loading="lazy"
                            className="about-photo-img"
                        />
                    </div>
                </div>

                <div ref={contentRef} className="about-text-col">
                    <p className="about-bio">
                        Content creator, filmmaker, and founder who owns the <strong>full pipeline</strong>: concept development, hook-driven scripting, camera direction, precision editing, color grading, caption strategy, and audience analytics.
                    </p>
                    
                    <p className="about-sub-bio">
                        With 9+ years of hands-on visual storytelling experience, I've built <strong>Gymophilic</strong>, founded <strong>Creatively Lensed</strong> (reaching 4.5M+ views on top reels), co-founded <strong>Visdom Studios</strong> agency, and led flagship media operations for <strong>E-Cell RSCOE</strong>.
                    </p>

                    <div className="about-secondary-line">
                        Let's Make Something Worth Watching
                    </div>

                    <div className="about-stats">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <div>{s.number}</div>
                                <div>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <a href="#contact" className="about-cta-btn">Get in touch &rarr;</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;