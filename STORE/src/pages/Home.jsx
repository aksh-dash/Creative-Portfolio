import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Monitor, Smartphone } from 'lucide-react';
import { getFeaturedProducts, getNewArrivals, formatPrice } from '../lib/api';
import ProductCard from '../components/ProductCard';
import WatermarkedImage from '../components/WatermarkedImage';
import './Home.css';

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="home-hero section-spacing" id="home-hero">
        <div className="container">
          <div className="home-hero__inner">
            <div className="home-hero__text">
              <span className="badge-pill">
                <Sparkles size={12} />
                Digital Art Store
              </span>
              <h1 className="home-hero__title">
                Walls deserve<br />
                <span className="home-hero__title-accent">better art.</span>
              </h1>
              <p className="home-hero__subtitle">
                Brush-stroke artwork wallpapers handcrafted from original car &amp; lifestyle
                photography. Ultra-high resolution for desktop and phone.
              </p>
              <div className="home-hero__actions">
                <Link to="/shop" className="btn-primary" id="hero-shop-btn">
                  Browse Collection <ArrowRight size={16} />
                </Link>
                <Link to="/faq" className="btn-secondary" id="hero-faq-btn">
                  How It Works
                </Link>
              </div>
              <div className="home-hero__formats">
                <div className="home-hero__format">
                  <Monitor size={16} />
                  <span>5K Desktop</span>
                </div>
                <div className="home-hero__format">
                  <Smartphone size={16} />
                  <span>4K Phone</span>
                </div>
              </div>
            </div>

            <div className="home-hero__visual">
              <div className="home-hero__grid">
                {featured.slice(0, 3).map((p, i) => (
                  <Link to={`/p/${p.slug}`} className={`home-hero__card home-hero__card--${i + 1}`} key={p.id}>
                    <WatermarkedImage src={p.preview} alt={p.name} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="home-featured section-spacing" id="home-featured">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="mono-meta">Curated</span>
              <h2>Featured Pieces</h2>
            </div>
            <Link to="/shop" className="btn-secondary section-header-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="home-featured__grid">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="home-new section-spacing" id="home-new-arrivals">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="mono-meta">Just Dropped</span>
                <h2>New Arrivals</h2>
              </div>
              <Link to="/shop" className="btn-secondary section-header-link">
                Shop All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="home-new__grid">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value Props */}
      <section className="home-value section-spacing" id="home-value">
        <div className="container">
          <div className="home-value__grid">
            <div className="home-value__card">
              <div className="home-value__icon">📸</div>
              <h3>Original Photography</h3>
              <p>Every wallpaper starts as an original photograph shot by Akshat — no stock imagery.</p>
            </div>
            <div className="home-value__card">
              <div className="home-value__icon">🎨</div>
              <h3>Brush-Stroke Artwork</h3>
              <p>Digitally hand-processed with painterly textures that make your screen feel like a gallery wall.</p>
            </div>
            <div className="home-value__card">
              <div className="home-value__icon">⚡</div>
              <h3>Instant Download</h3>
              <p>Secure checkout, instant delivery. Get your wallpaper in 5K desktop and 4K phone formats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta section-spacing" id="home-cta">
        <div className="container">
          <div className="home-cta__inner">
            <h2>Ready to upgrade your&nbsp;walls?</h2>
            <p>Browse the full collection and find the perfect piece for your setup.</p>
            <Link to="/shop" className="btn-primary" id="cta-shop-btn">
              Explore the Store <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
