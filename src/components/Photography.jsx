import React, { useState, useEffect, useCallback } from 'react';
import { photographyGallery } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Photography.css';

const Photography = () => {
    const [activePhotoIndex, setActivePhotoIndex] = useState(null);
    const [filter, setFilter] = useState('All');
    const labelRef = useReveal();
    const titleRef = useReveal();

    const categories = ['All', 'Portrait', 'Product', 'Street', 'Nature', 'Urban', 'Event'];

    const filteredPhotos = filter === 'All'
        ? photographyGallery
        : photographyGallery.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase()));

    const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    }, [filteredPhotos.length]);

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }, [filteredPhotos.length]);

    const handleClose = useCallback(() => {
        setActivePhotoIndex(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activePhotoIndex === null) return;
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePhotoIndex, handleClose, handlePrev, handleNext]);

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
                        onClick={() => {
                            setFilter(cat);
                            setActivePhotoIndex(null);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Masonry-Style Photo Grid with Skeletons */}
            <div className="photo-masonry-grid">
                {filteredPhotos.map((photo, idx) => (
                    <div
                        key={photo.id}
                        className="photo-card"
                        tabIndex={0}
                        role="button"
                        aria-label={`View photo: ${photo.title}`}
                        onKeyDown={(e) => { if (e.key === 'Enter') setActivePhotoIndex(idx); }}
                        onClick={() => setActivePhotoIndex(idx)}
                    >
                        <img
                            src={photo.src}
                            alt={photo.title}
                            loading="lazy"
                            width="600"
                            height="450"
                            className="photo-img"
                        />
                        <div className="photo-overlay">
                            <span className="photo-cat">{photo.category}</span>
                            <h4 className="photo-title">{photo.title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Accessible Lightbox Overlay */}
            {activePhoto && (
                <div
                    className="photo-lightbox-backdrop"
                    onClick={handleClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Lightbox view of ${activePhoto.title}`}
                >
                    <div className="photo-lightbox-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="lightbox-close-btn"
                            onClick={handleClose}
                            aria-label="Close photo preview (Press Esc)"
                        >
                            ✕
                        </button>
                        <button
                            className="lightbox-nav-btn lightbox-prev-btn"
                            onClick={handlePrev}
                            aria-label="Previous photo (Left arrow)"
                        >
                            ‹
                        </button>
                        <button
                            className="lightbox-nav-btn lightbox-next-btn"
                            onClick={handleNext}
                            aria-label="Next photo (Right arrow)"
                        >
                            ›
                        </button>
                        <img
                            src={activePhoto.src}
                            alt={activePhoto.title}
                            width="1200"
                            height="900"
                            className="lightbox-full-img"
                        />
                        <div className="photo-lightbox-info">
                            <span className="photo-lightbox-cat">{activePhoto.category} • {activePhotoIndex + 1} of {filteredPhotos.length}</span>
                            <h3>{activePhoto.title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Photography;
