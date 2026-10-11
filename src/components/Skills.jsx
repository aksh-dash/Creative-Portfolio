import React, { useEffect, useRef } from 'react';
import { skills } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Skills.css';

const Skills = () => {
    const labelRef = useReveal();
    const titleRef = useReveal();
    const gridRef = useRef(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const items = grid.querySelectorAll('.skill-item');
                    items.forEach((item, i) => {
                        setTimeout(() => {
                            const fill = item.querySelector('.skill-bar-fill');
                            const level = item.getAttribute('data-level');
                            fill.style.width = level + '%';
                            item.classList.add('animated');
                        }, i * 100);
                    });
                    observer.unobserve(grid);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(grid);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="skills" id="skills">
            <div className="section-label reveal" ref={labelRef}>TECHNICAL SKILLS &amp; EQUIPMENT</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Software, Tools &amp; <span className="accent">Gear.</span>
            </h2>

            <div className="skills-grid" ref={gridRef}>
                {skills.map((s) => (
                    <div className="skill-item" key={s.name} data-level={s.level}>
                        <div className="skill-name">{s.name}</div>
                        <div className="skill-level">Mastery — {s.level}%</div>
                        <div className="skill-desc">{s.desc}</div>
                        <div className="skill-bar-bg" />
                        <div className="skill-bar-fill" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;