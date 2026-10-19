import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { personalInfo } from '../data/portfolioData';
import '../styles/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="/" className="nav-logo">
                <img src="/assets/creative-lenses-logo.png" alt="Creatively Lensed Logo" className="nav-logo-img" />
                <span>{personalInfo.title}</span>
            </a>

            <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
                {[
                    { to: 'showreel', label: 'Work' },
                    { to: 'projects', label: 'Projects' },
                    { to: 'photography', label: 'Photography' },
                    { to: 'graphics', label: 'Graphics' },
                    { to: 'skills', label: 'Skills' },
                    { to: 'about', label: 'About' },
                ].map(({ to, label }) => (
                    <li key={to}>
                        <Link to={to} smooth duration={800} offset={-80} onClick={closeMenu}>
                            {label}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link to="contact" smooth duration={800} offset={-80} className="nav-cta" onClick={closeMenu}>
                        Hire Me ↗
                    </Link>
                </li>
            </ul>

            <div
                className={`nav-hamburger ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setMenuOpen(!menuOpen);
                    }
                }}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                role="button"
                tabIndex={0}
            >
                <span /><span /><span />
            </div>
        </nav>
    );
};

export default Navbar;