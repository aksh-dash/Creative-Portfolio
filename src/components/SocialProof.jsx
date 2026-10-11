import React from 'react';
import { socialProof } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/SocialProof.css';

const SocialProof = () => {
    const labelRef = useReveal();
    const titleRef = useReveal();
    const gridRef = useReveal();

    return (
        <section className="social-proof" id="proof">
            <div className="section-label reveal" ref={labelRef}>PROVEN IMPACT &amp; METRICS</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Numbers &amp; <span className="accent">Social Proof.</span>
            </h2>

            <div className="proof-grid reveal" ref={gridRef}>
                {socialProof.map((p, i) => (
                    <div className="proof-card" key={i}>
                        <div className="proof-num">{p.number}</div>
                        <div className="proof-label">{p.label}</div>
                        <div className="proof-desc">{p.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SocialProof;