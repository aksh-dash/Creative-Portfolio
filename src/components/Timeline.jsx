import React from 'react';
import { timeline } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Timeline.css';

const Timeline = () => {
    const labelRef = useReveal();
    const titleRef = useReveal();
    const trackRef = useReveal();

    return (
        <section className="timeline" id="timeline">
            <div className="section-label reveal" ref={labelRef}>CAREER TIMELINE &amp; JOURNEY</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Work Experience &amp; <span className="accent">Track Record.</span>
            </h2>

            <div className="timeline-track reveal" ref={trackRef}>
                <div className="timeline-line" />
                {timeline.map((item) => (
                    <div className="tl-item" key={item.title}>
                        <div className="tl-dot" />
                        <div className="tl-year">{item.year}</div>
                        <div className="tl-title">{item.title}</div>
                        <div className="tl-desc">{item.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;