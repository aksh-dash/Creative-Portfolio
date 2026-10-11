import React, { useEffect } from 'react';
import '../styles/NotFound.css';

const NotFound = ({ onReturn }) => {
    useEffect(() => {
        document.title = "404 — Frame Not Found | Akshat Dange";
        return () => {
            document.title = "Akshat Dange | Content Creator, Filmmaker & Visual Storyteller | Pune";
        };
    }, []);

    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <div className="notfound-tag">ERROR 404 • OUT OF FOCUS</div>
                <h1 className="notfound-code">404</h1>
                <h2 className="notfound-title">Lost in the Frames.</h2>
                <p className="notfound-desc">
                    The shot you are looking for has been cut in post-production or never existed. Let's get you back to the main reel.
                </p>
                <div className="notfound-actions">
                    <button onClick={onReturn} className="notfound-btn primary">
                        Return to Portfolio ↗
                    </button>
                    <a href="#contact" onClick={onReturn} className="notfound-btn secondary">
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
