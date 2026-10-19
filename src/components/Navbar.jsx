import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import '../styles/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="navbar-container" aria-label="Main Navigation">
                {/* Top-left: "AD" monogram logo (SVG, white) */}
                <Link
                    to="hero"
                    smooth={true}
                    duration={600}
                    className="nav-monogram-link"
                    onClick={closeMenu}
                    aria-label="Akshat Dange Home"
                >
                    <svg
                        className="nav-ad-svg"
                        viewBox="0 0 94 80"
                        width="34"
                        height="28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M 36 11 L 33 11 L 28 25 L 7 68 L 8 71 L 16 70 L 23 53 L 35 30 L 46 55 L 54 55 L 54 52 L 46 33 L 41 25 Z M 47 6 L 44 9 L 47 14 L 64 17 L 73 25 L 77 34 L 77 45 L 75 51 L 67 60 L 60 63 L 45 63 L 43 65 L 44 71 L 62 71 L 71 67 L 81 57 L 86 44 L 86 34 L 82 23 L 72 12 L 61 7 Z"
                            fill="#ffffff"
                            fillRule="evenodd"
                        />
                    </svg>
                </Link>

                {/* Desktop: HOME (underlined, active), WORK, ABOUT, CONTACT in small uppercase */}
                <ul className={`nav-menu-links ${menuOpen ? 'mobile-open' : ''}`}>
                    <li>
                        <Link
                            to="hero"
                            spy={true}
                            smooth={true}
                            duration={600}
                            offset={0}
                            activeClass="active"
                            className="nav-link-item default-active"
                            onClick={closeMenu}
                        >
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="showreel"
                            spy={true}
                            smooth={true}
                            duration={700}
                            offset={-70}
                            activeClass="active"
                            className="nav-link-item"
                            onClick={closeMenu}
                        >
                            WORK
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="about"
                            spy={true}
                            smooth={true}
                            duration={700}
                            offset={-70}
                            activeClass="active"
                            className="nav-link-item"
                            onClick={closeMenu}
                        >
                            ABOUT
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="contact"
                            spy={true}
                            smooth={true}
                            duration={800}
                            offset={-70}
                            activeClass="active"
                            className="nav-link-item"
                            onClick={closeMenu}
                        >
                            CONTACT
                        </Link>
                    </li>
                </ul>

                {/* Mobile: hamburger (two thin lines) on the right */}
                <button
                    type="button"
                    className={`nav-hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span className="ham-line ham-line-1" />
                    <span className="ham-line ham-line-2" />
                </button>
            </nav>
        </header>
    );
};

export default Navbar;