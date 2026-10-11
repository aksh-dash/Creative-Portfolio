import React, { useState, useEffect } from 'react';
import '../styles/ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
    const [selectedClient, setSelectedClient] = useState(
        project?.clients ? project.clients[0] : null
    );
    const [activeLightBox, setActiveLightBox] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (activeLightBox) setActiveLightBox(null);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeLightBox, onClose]);

    if (!project) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-meta">
                        <span className="modal-num">{project.num}</span>
                        <span className="modal-category">{project.category}</span>
                    </div>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                        ✕
                    </button>
                </div>

                <div className="modal-body-scroll">
                    <h2 className="modal-title">{project.title}</h2>
                    <p className="modal-desc">{project.description}</p>

                    {/* VISDOM STUDIOS: CLIENT CARDS WORKFLOW */}
                    {project.id === 'visdom' && project.clients && (
                        <div className="visdom-clients-wrapper">
                            <h3 className="sub-section-title">Select Client Project</h3>
                            <div className="client-cards-grid">
                                {project.clients.map((client) => (
                                    <div
                                        key={client.id}
                                        className={`client-card ${selectedClient?.id === client.id ? 'active' : ''} ${client.isUpcoming ? 'upcoming-card' : ''}`}
                                        onClick={() => setSelectedClient(client)}
                                    >
                                        <div className="client-card-img-wrap">
                                            {client.coverImage ? (
                                                <img src={client.coverImage} alt={client.name} className="client-card-img" />
                                            ) : (
                                                <div className="client-card-placeholder">✦</div>
                                            )}
                                            <div className="client-card-overlay" />
                                        </div>
                                        <div className="client-card-content">
                                            <span className="client-badge">
                                                {client.isUpcoming ? 'Future Collaboration' : `${client.items?.length || 0} Assets`}
                                            </span>
                                            <h4 className="client-name">{client.name}</h4>
                                            <p className="client-tagline">{client.tagline}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* SELECTED CLIENT ASSETS GRID */}
                            {selectedClient && !selectedClient.isUpcoming && (
                                <div className="client-assets-section">
                                    <div className="client-assets-header">
                                        <h4>{selectedClient.name} — Photography Collection ({selectedClient.items.length} Photos)</h4>
                                        <p>{selectedClient.description}</p>
                                    </div>

                                    <div className="sub-cards-grid photos-grid">
                                        {selectedClient.items.map((item, idx) => (
                                            <div
                                                key={item.id}
                                                className="sub-asset-card photo-asset-card"
                                                onClick={() => setActiveLightBox({ type: 'image', src: item.src, title: `${selectedClient.name} #${idx + 1}` })}
                                            >
                                                <img src={item.src} alt={item.title} loading="lazy" />
                                                <div className="asset-hover-overlay">
                                                    <span className="expand-icon">🔍 View High-Res</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* UPCOMING CLIENT CTA CARD */}
                            {selectedClient && selectedClient.isUpcoming && (
                                <div className="upcoming-cta-box">
                                    <div className="upcoming-glow" />
                                    <h3>You Can Be Next</h3>
                                    <p>Ready to level up your brand's visuals with cinematic video, short-form reels, and luxury product photography?</p>
                                    <a
                                        href="#contact"
                                        className="modal-cta-btn"
                                        onClick={() => {
                                            onClose();
                                            const el = document.getElementById('contact');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Start a Project Together ↗
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STANDARD VIDEO COLLECTION PROJECTS (NextGen, Gymophilic, Creatively Lensed, E-Cell, Automotive) */}
                    {project.items && project.id !== 'visdom' && (
                        <div className="video-collection-section">
                            <h3 className="sub-section-title">Media Content Collection ({project.items.length} Videos)</h3>
                            <div className="sub-cards-grid videos-grid">
                                {project.items.map((item, idx) => (
                                    <div key={item.id} className="sub-asset-card video-asset-card">
                                        <div className="video-player-wrap">
                                            <video
                                                src={item.src}
                                                controls
                                                playsInline
                                                preload="metadata"
                                                className="sub-video-element"
                                            />
                                        </div>
                                        <div className="video-asset-info">
                                            <span className="video-num">Clip #{idx + 1}</span>
                                            <h5 className="video-title">{item.title}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* LIGHTBOX FOR HIGH-RES PHOTOS */}
            {activeLightBox && (
                <div className="lightbox-backdrop" onClick={() => setActiveLightBox(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setActiveLightBox(null)} aria-label="Close high-res photo lightbox">✕</button>
                        <img src={activeLightBox.src} alt={activeLightBox.title} className="lightbox-img" />
                        <div className="lightbox-title">{activeLightBox.title}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectModal;
