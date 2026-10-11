import React, { useState, useRef } from 'react';
import { stats } from '../data/portfolioData';
import useReveal from '../hooks/useReveal';
import '../styles/Showreel.css';

const Showreel = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const labelRef = useReveal();
    const titleRef = useReveal();
    const reelRef = useReveal();
    const statsRef = useReveal();

    const handleStartPlay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <section className="showreel" id="showreel">
            <div className="section-label reveal" ref={labelRef}>FEATURED VIDEO SHOWREEL</div>
            <h2 className="section-title reveal" ref={titleRef}>
                Cinematic <span className="accent">Showreel.</span>
            </h2>

            <div className="reel-container reveal" ref={reelRef} onClick={!isPlaying ? handleStartPlay : undefined}>
                <video
                    ref={videoRef}
                    className="reel-video"
                    src="/videos/Introduction.mp4"
                    controls={isPlaying}
                    playsInline
                    preload="none"
                    poster="/assets/Stylized Crimson Portrait of a Smiling Man.png"
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => {
                        if (videoRef.current && videoRef.current.currentTime === 0) {
                            setIsPlaying(false);
                        }
                    }}
                >
                    Your browser does not support the video tag.
                </video>

                {/* Custom Overlay Before Play Starts */}
                {!isPlaying && (
                    <div className="reel-poster" onClick={handleStartPlay}>
                        <div className="play-btn">
                            <div className="play-icon" />
                        </div>
                        <span className="reel-label">Click to Play Introduction Showreel</span>
                    </div>
                )}
            </div>

            {/* Headline Impact Counters */}
            <div className="reel-stats reveal" ref={statsRef}>
                {stats.map((s, i) => (
                    <div className="reel-stat" key={i}>
                        <div className="stat-num">{s.number}</div>
                        <div className="stat-lbl">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Showreel;