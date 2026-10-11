import React, { useState, useRef, useEffect, useCallback } from 'react';
import useReveal from '../hooks/useReveal';
import '../styles/BeforeAfter.css';

/* Mini histogram bars for Lightroom panel decoration */
const MiniHistogram = () => {
    const heights = [35, 65, 85, 70, 55, 90, 75, 60, 45, 80, 95, 70, 50, 65, 85, 60, 40, 75, 55, 45];
    return (
        <div className="lr-histogram" aria-hidden="true">
            {heights.map((h, i) => (
                <div
                    key={i}
                    className="lr-histogram-bar"
                    style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.12}s`,
                    }}
                />
            ))}
        </div>
    );
};

/* Individual Lightroom-style Dual Before/After Slider */
const LightroomDevelopCard = ({ item }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = useCallback((clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPos(percent);
    }, []);

    const onMouseDown = (e) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const onTouchStart = (e) => {
        setIsDragging(true);
        if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX);
        }
    };

    useEffect(() => {
        const onMouseMove = (e) => {
            if (isDragging) handleMove(e.clientX);
        };
        const onTouchMove = (e) => {
            if (isDragging && e.touches && e.touches[0]) {
                handleMove(e.touches[0].clientX);
            }
        };
        const onEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('touchmove', onTouchMove, { passive: true });
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchend', onEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchend', onEnd);
        };
    }, [isDragging, handleMove]);

    return (
        <div className="lr-card-wrapper">
            <div className="lr-panel">
                {/* Lightroom Panel Header */}
                <div className="lr-panel-header">
                    <div className="lr-panel-title">
                        <svg className="lr-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                        <span>DEVELOP</span>
                    </div>
                    <MiniHistogram />
                </div>

                {/* Slider viewport */}
                <div
                    ref={containerRef}
                    className="lr-viewport"
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    data-cursor="DRAG"
                    role="slider"
                    aria-valuenow={Math.round(sliderPos)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${item.title} comparison slider`}
                >
                    {/* Background Layer: Graded / After image */}
                    <div className="lr-layer lr-layer-after">
                        <img
                            src={item.after}
                            alt={`${item.title} - ${item.label2}`}
                            className="lr-img"
                            loading="lazy"
                        />
                        <span className="lr-img-text lr-text-right">{item.label2}</span>
                    </div>

                    {/* Clipped Top Layer: RAW / Before image */}
                    <div
                        className="lr-layer lr-layer-before"
                        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                    >
                        <img
                            src={item.before}
                            alt={`${item.title} - ${item.label1}`}
                            className="lr-img"
                            loading="lazy"
                        />
                        <span className="lr-img-text lr-text-left">{item.label1}</span>
                    </div>

                    {/* Gold Divider Handle */}
                    <div className="lr-handle-line" style={{ left: `${sliderPos}%` }}>
                        <div className="lr-handle-thumb">
                            <span className="lr-handle-arrow left">‹</span>
                            <span className="lr-handle-arrow right">›</span>
                        </div>
                    </div>
                </div>

                {/* Panel Footer Bar */}
                <div className="lr-panel-footer">
                    <span className="lr-footer-label">{item.label1}</span>
                    <span className="lr-footer-percent">{Math.round(sliderPos)}%</span>
                    <span className="lr-footer-label">{item.label2}</span>
                </div>
            </div>

            {/* Bold Straightforward Title Beneath Panel */}
            <h3 className="lr-item-caption">{item.title}</h3>
        </div>
    );
};

const BeforeAfter = () => {
    const labelRef = useReveal();
    const titleRef = useReveal();
    const gridRef = useReveal();

    const examples = [
        {
            id: 'portrait',
            title: 'PORTRAIT RETOUCHING',
            label1: 'RAW',
            label2: 'Graded',
            before: '/photography/before_2.jpeg',
            after: '/photography/after_2.jpeg',
        },
        {
            id: 'landscape',
            title: 'LANDSCAPE GRADING',
            label1: 'Before',
            label2: 'After',
            before: '/photography/before_1.jpeg',
            after: '/photography/after_1.jpeg',
        }
    ];

    return (
        <section className="beforeafter-section" id="beforeafter">
            <div className="section-label reveal" ref={labelRef}>COLOR GRADING &amp; RETOUCHING</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Before vs <span className="accent">After.</span>
            </h2>

            {/* Two Side-by-Side Dual Lightroom Panels */}
            <div className="lr-grid reveal" ref={gridRef}>
                {examples.map((item) => (
                    <LightroomDevelopCard key={item.id} item={item} />
                ))}
            </div>

            {/* Editing Technique Pills */}
            <div className="lr-techniques-pills reveal">
                <span className="lr-technique-pill">
                    <span className="pill-dot">◉</span>
                    <span>Film emulation</span>
                </span>
                <span className="lr-technique-pill">
                    <span className="pill-dot">◐</span>
                    <span>Dodging &amp; Burning</span>
                </span>
                <span className="lr-technique-pill">
                    <span className="pill-dot">◑</span>
                    <span>Colour harmony</span>
                </span>
            </div>
        </section>
    );
};

export default BeforeAfter;