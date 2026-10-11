import React, { useState } from 'react';
import { graphicsGallery } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Graphics.css';

const Graphics = () => {
    const [activeGraphic, setActiveGraphic] = useState(null);
    const labelRef = useReveal();
    const titleRef = useReveal();

    return (
        <section className="graphics" id="graphics">
            <div className="section-label reveal" ref={labelRef}>GRAPHIC DESIGN &amp; BRANDING</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Graphic Design &amp; <span className="accent">Identity.</span>
            </h2>

            <div className="graphics-grid">
                {graphicsGallery.map((g) => (
                    <div
                        key={g.id}
                        className="graphic-card"
                        onClick={() => setActiveGraphic(g)}
                    >
                        <div className="graphic-img-wrap">
                            <img src={g.src} alt={g.title} className="graphic-img" loading="lazy" />
                            <div className="graphic-overlay">
                                <span className="graphic-cat">{g.category}</span>
                                <h4 className="graphic-title">{g.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox for Graphics */}
            {activeGraphic && (
                <div className="graphic-lightbox-backdrop" onClick={() => setActiveGraphic(null)}>
                    <div className="graphic-lightbox-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="graphic-close-btn" onClick={() => setActiveGraphic(null)}>✕</button>
                        <img src={activeGraphic.src} alt={activeGraphic.title} className="graphic-full-img" />
                        <div className="graphic-lightbox-info">
                            <span className="graphic-lightbox-cat">{activeGraphic.category}</span>
                            <h3>{activeGraphic.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Graphics;
