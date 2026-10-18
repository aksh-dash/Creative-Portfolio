import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowLeft } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const portfolioUrl = import.meta.env.VITE_PORTFOLIO_URL || 'https://creativelylensed.com';

  return (
    <header className="store-header" id="store-header">
      <div className="container header-inner">
        {/* Back to portfolio */}
        <a href={portfolioUrl} className="header-back" aria-label="Back to portfolio">
          <ArrowLeft size={16} />
          <span className="header-back-label">Portfolio</span>
        </a>

        {/* Logo / Brand */}
        <Link to="/" className="header-brand" id="store-logo">
          <span className="header-brand-mark">CL</span>
          <span className="header-brand-text">Store</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav-desktop" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Shop
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            FAQ
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contact
          </NavLink>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="header-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          id="mobile-menu-toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`header-mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>
            Shop All
          </NavLink>
          <NavLink to="/faq" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>
            FAQ
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>
            Contact
          </NavLink>
          <NavLink to="/license" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>
            License
          </NavLink>
        </nav>
        <a href={portfolioUrl} className="mobile-nav-portfolio" onClick={() => setMenuOpen(false)}>
          <ArrowLeft size={14} />
          Back to Portfolio
        </a>
      </div>
    </header>
  );
}
