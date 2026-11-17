import React, { useState } from 'react';
import { faqSection } from '../content/status-pages';
import useReveal from '../hooks/useReveal';
import '../styles/StatusPages.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const labelRef = useReveal();
    const titleRef = useReveal();

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="section-label reveal" ref={labelRef}>{faqSection.label}</div>
            <h2 className="section-title reveal" ref={titleRef}>
                {faqSection.title}<span className="accent">.</span>
            </h2>

            <div className="faq-list" role="list">
                {faqSection.items.map((item, idx) => (
                    <div className="faq-item" key={idx} role="listitem">
                        <button
                            className="faq-question-btn"
                            onClick={() => toggle(idx)}
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-answer-${idx}`}
                            id={`faq-question-${idx}`}
                        >
                            <span>{item.question}</span>
                            <span className={`faq-chevron ${openIndex === idx ? 'open' : ''}`} aria-hidden="true">
                                ▾
                            </span>
                        </button>
                        <div
                            className={`faq-answer ${openIndex === idx ? 'open' : ''}`}
                            id={`faq-answer-${idx}`}
                            role="region"
                            aria-labelledby={`faq-question-${idx}`}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
