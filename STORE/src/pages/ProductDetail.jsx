import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Download, Monitor, Smartphone, ShieldCheck, Check } from 'lucide-react';
import { getProductBySlug, formatPrice, createCheckoutSession, getAllProducts } from '../lib/api';
import WatermarkedImage from '../components/WatermarkedImage';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [buying, setBuying] = useState(false);

  if (!product) return <Navigate to="/404" replace />;

  // Related products (same category, different product)
  const related = getAllProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  async function handleBuy() {
    setBuying(true);
    try {
      const session = await createCheckoutSession(product.id, selectedFormat);
      // In production, redirect to payment gateway
      window.location.href = session.redirectUrl;
    } catch (err) {
      console.error(err);
      setBuying(false);
    }
  }

  return (
    <main className="pdp-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop" className="pdp-breadcrumb__back">
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
          <span className="pdp-breadcrumb__sep">/</span>
          <span className="pdp-breadcrumb__current mono-meta">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="pdp-layout section-spacing">
          {/* Image */}
          <div className="pdp-image" id="pdp-image">
            <WatermarkedImage
              src={product.preview}
              alt={product.name}
              className="pdp-image__wrap"
            />
          </div>

          {/* Details */}
          <div className="pdp-details" id="pdp-details">
            <span className="badge-pill">{product.collection}</span>
            <h1 className="pdp-title">{product.name}</h1>
            <p className="pdp-description">{product.description}</p>

            {/* Formats */}
            <div className="pdp-formats">
              <span className="mono-meta">Available Formats</span>
              <div className="pdp-formats__list">
                {product.formats.map((fmt, i) => (
                  <button
                    key={i}
                    className={`pdp-format-btn ${selectedFormat === i ? 'active' : ''}`}
                    onClick={() => setSelectedFormat(i)}
                    id={`format-btn-${i}`}
                  >
                    <span className="pdp-format-btn__icon">
                      {fmt.label.toLowerCase().includes('phone') ? <Smartphone size={16} /> : <Monitor size={16} />}
                    </span>
                    <span className="pdp-format-btn__info">
                      <span className="pdp-format-btn__label">{fmt.label}</span>
                      <span className="pdp-format-btn__res mono-meta">{fmt.resolution} · {fmt.fileType} · {fmt.sizeMB} MB</span>
                    </span>
                    {selectedFormat === i && <Check size={14} className="pdp-format-btn__check" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Buy */}
            <div className="pdp-buy-section">
              <div className="pdp-price">
                <span className="pdp-price__amount">{formatPrice(product.price, product.currency)}</span>
                <span className="pdp-price__note mono-meta">One-time purchase</span>
              </div>
              <button
                className="btn-primary pdp-buy-btn"
                onClick={handleBuy}
                disabled={buying}
                id="buy-now-btn"
              >
                {buying ? 'Processing…' : <>Buy Now <Download size={16} /></>}
              </button>
            </div>

            {/* Trust signals */}
            <div className="pdp-trust">
              <div className="pdp-trust__item">
                <ShieldCheck size={14} />
                <span>Secure checkout</span>
              </div>
              <div className="pdp-trust__item">
                <Download size={14} />
                <span>Instant download</span>
              </div>
            </div>

            {/* Tags */}
            <div className="pdp-tags">
              {product.tags.map(tag => (
                <span key={tag} className="pdp-tag mono-meta">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pdp-related section-spacing" id="pdp-related">
            <h2>You may also like</h2>
            <div className="pdp-related__grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
