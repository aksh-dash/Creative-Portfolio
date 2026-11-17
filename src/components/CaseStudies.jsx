import React from 'react';
import useReveal from '../hooks/useReveal';
import '../styles/StatusPages.css';

/**
 * CaseStudies — layout slot for 2-3 case studies (client, brief, result).
 * Hidden by default (hidden attribute) until real content is provided.
 * To show: remove the `hidden` prop or set `studies` to a non-empty array.
 *
 * Each study: { client: string, brief: string, result: string }
 */
const CaseStudies = ({ studies = [] }) => {
    const labelRef = useReveal();
    const titleRef = useReveal();

    // Stay hidden until real content is provided
    if (!studies || studies.length === 0) {
        return (
            <section className="case-studies-section" id="case-studies" hidden aria-hidden="true">
                {/* Hidden layout slot — no invented content */}
            </section>
        );
    }

    return (
        <section className="case-studies-section" id="case-studies">
            <div className="section-label reveal" ref={labelRef}>CASE STUDIES</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Results That <span className="accent">Speak.</span>
            </h2>

            <div className="case-studies-grid">
                {studies.map((study, idx) => (
                    <div className="case-study-card" key={idx}>
                        <div className="case-study-client">{study.client}</div>
                        <h3 className="case-study-brief">{study.brief}</h3>
                        <p className="case-study-result">{study.result}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CaseStudies;
