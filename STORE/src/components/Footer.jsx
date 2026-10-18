import { Link } from 'react-router-dom';
import { Instagram, Mail, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const portfolioUrl = import.meta.env.VITE_PORTFOLIO_URL || 'https://creativelylensed.com';
  const year = new Date().getFullYear();

  return (
    <footer className="store-footer" id="store-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark">CL</span>
              <span className="footer-logo-text">Store</span>
            </Link>
            <p className="footer-tagline">
              Handcrafted digital wallpapers from original photography by Akshat Dange, Pune.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/creativelylensed" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                <Instagram size={18} />
              </a>
              <a href="mailto:hello@creativelylensed.com" aria-label="Email" className="footer-social-link">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shop</h4>
            <Link to="/shop" className="footer-link">All Wallpapers</Link>
            <Link to="/shop?category=automotive" className="footer-link">Automotive</Link>
            <Link to="/shop?category=nature" className="footer-link">Nature</Link>
            <Link to="/shop?category=architecture" className="footer-link">Architecture</Link>
          </div>

          {/* Info column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Info</h4>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/license" className="footer-link">License</Link>
            <Link to="/refund-policy" className="footer-link">Refund Policy</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          {/* Legal column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <a href={portfolioUrl} className="footer-link footer-link-ext" target="_blank" rel="noopener noreferrer">
              Portfolio <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} Akshat Dange. All rights reserved.</p>
          <p className="footer-copy footer-copy-sub">All artwork originates from original photography. Unauthorized reproduction is prohibited.</p>
        </div>
      </div>
    </footer>
  );
}
