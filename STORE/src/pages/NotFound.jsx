import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import './StatusPage.css';

export default function NotFound() {
  return (
    <main className="status-page" id="not-found-page">
      <div className="container">
        <div className="status-card">
          <Compass size={56} className="status-icon" style={{ color: 'var(--crimson)' }} />
          <span className="badge-pill">404 Error</span>
          <h1>Lost in the Gallery?</h1>
          <p>
            The page or artwork you're searching for doesn't exist or has moved to a new collection.
          </p>
          <div className="status-actions">
            <Link to="/shop" className="btn-primary" id="not-found-shop-btn">
              Browse All Wallpapers <ArrowRight size={14} />
            </Link>
            <Link to="/" className="btn-secondary" id="not-found-home-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
