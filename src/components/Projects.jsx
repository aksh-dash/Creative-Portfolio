import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import useReveal from '../hooks/useReveal';
import '../styles/Projects.css';

const placeholderStyles = [
    { background: 'linear-gradient(135deg, #141414, #1a1a1a)' },
    { background: 'linear-gradient(135deg, #0d0d0d, #181818)' },
    { background: 'linear-gradient(135deg, #1a1a1a, #111111)' },
    { background: 'linear-gradient(135deg, #121212, #1c1c1c)' },
];

const placeholderIcons = ['🏋️', '💎', '🏃', '🎬', '⚡', '🏎️'];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const labelRef = useReveal();
    const titleRef = useReveal();
    const gridRef = useReveal();

    return (
        <section className="projects" id="projects">
            <div className="section-label reveal" ref={labelRef}>FEATURED CLIENT &amp; VENTURE PROJECTS</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Featured <span className="accent">Projects.</span>
            </h2>

            <div className="projects-grid reveal" ref={gridRef}>
                {projects.map((p, i) => (
                    <div
                        className="project-card"
                        key={p.id}
                        data-cursor="hover"
                        onClick={() => setSelectedProject(p)}
                    >
                        {p.coverImage ? (
                            <img src={p.coverImage} className="project-cover" alt={`${p.title} project cover banner`} loading="lazy" />
                        ) : (
                            <div className="project-placeholder" style={placeholderStyles[i % 4]}>
                                <span className="project-placeholder-icon">{placeholderIcons[i % placeholderIcons.length]}</span>
                            </div>
                        )}

                        <div className="project-overlay" />
                        <div className="project-arrow">↗</div>

                        <div className="project-info">
                            <div className="project-num">{p.num} — {p.category}</div>
                            <div className="project-title">{p.title}</div>
                            <div className="project-type">{p.type}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PROJECT MODAL SHOWCASE */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default Projects;