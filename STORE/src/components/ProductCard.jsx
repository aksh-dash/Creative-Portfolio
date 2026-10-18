import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import WatermarkedImage from './WatermarkedImage';
import { formatPrice } from '../lib/api';
import './ProductCard.css';

export default function ProductCard({ product, featured = false }) {
  return (
    <Link
      to={`/p/${product.slug}`}
      className={`product-card ${featured ? 'product-card--featured' : ''}`}
      id={`product-${product.id}`}
    >
      <div className="product-card__image">
        <WatermarkedImage
          src={product.preview}
          alt={product.name}
          className="product-card__img-wrap"
        />
        {product.new && <span className="product-card__badge">New</span>}
        <div className="product-card__hover-icon">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="product-card__info">
        <span className="product-card__collection mono-meta">{product.collection}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.shortDescription}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price, product.currency)}</span>
          <span className="product-card__formats mono-meta">
            {product.formats.length} format{product.formats.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}
