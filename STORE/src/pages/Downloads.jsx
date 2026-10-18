import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import './Downloads.css';

export default function Downloads() {
  return (
    <main className="downloads-page">
      <div className="container section-spacing">
        <span className="mono-meta">Your Files</span>
        <h1>Downloads</h1>

        <div className="downloads-empty">
          <div className="downloads-empty__icon">
            <Lock size={40} />
          </div>
          <h2>No Downloads Yet</h2>
          <p>
            After purchasing a wallpaper, your download links will appear here.
            Downloads are tied to your purchase email.
          </p>
          <Link to="/shop" className="btn-primary">
            Browse Wallpapers <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
