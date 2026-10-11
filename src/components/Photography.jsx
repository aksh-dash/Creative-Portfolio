import React, { useState } from 'react';
import { photographyGallery } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Photography.css';

const Photography = () => {
    const [activePhoto, setActivePhoto] = useState(null);
    const [filter, setFilter] = useState('All');
    const labelRef = useReveal();
    const titleRef = useReveal();

    const categories = ['All', 'Portrait', 'Product', 'Street', 'Nature', 'Urban', 'Event'];

    const filteredPhotos = filter === 'All'
        ? photographyGallery
        : photographyGallery.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase()));

    return (
        <section className="photography" id="photography">
            <div className="section-label reveal" ref={labelRef}>STILL PHOTOGRAPHY GALLERY</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Photography <span className="accent">Portfolio.</span>
            </h2>

            {/* Filter Tabs */}
            <div className="photo-filter-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`photo-filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Masonry-Style Photo Grid */}
            <div className="photo-masonry-grid">
                {filteredPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="photo-card"
                        onClick={() => setActivePhoto(photo)}
                    >
                        <img src={photo.src} alt={photo.title} loading="lazy" className="photo-img" />
                        <div className="photo-overlay">
                            <span className="photo-cat">{photo.category}</span>
                            <h4 className="photo-title">{photo.title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {activePhoto && (
                <div className="photo-lightbox-backdrop" onClick={() => setActivePhoto(null)}>
                    <div className="photo-lightbox-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close-btn" onClick={() => setActivePhoto(null)}>✕</button>
                        <img src={activePhoto.src} alt={activePhoto.title} className="lightbox-full-img" />
                        <div className="photo-lightbox-info">
                            <span className="photo-lightbox-cat">{activePhoto.category}</span>
                            <h3>{activePhoto.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Photography;
