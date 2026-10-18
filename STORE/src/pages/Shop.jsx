import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { getAllProducts, getCategories, searchProducts, getProductsByCategory } from '../lib/api';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'name', label: 'Name A–Z' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = getCategories();

  const products = useMemo(() => {
    let result = query ? searchProducts(query) : getProductsByCategory(activeCategory);

    // If searching, also filter by category unless "all"
    if (query && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [query, activeCategory, sortBy]);

  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  }

  return (
    <main className="shop-page">
      <section className="shop-header section-spacing" id="shop-header">
        <div className="container">
          <span className="mono-meta">Collection</span>
          <h1>All Wallpapers</h1>
          <p className="shop-header__desc">
            Browse the entire catalog of handcrafted digital wallpapers.
          </p>
        </div>
      </section>

      <section className="shop-content" id="shop-content">
        <div className="container">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-search">
              <Search size={16} className="shop-search__icon" />
              <input
                type="search"
                placeholder="Search wallpapers…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="shop-search__input"
                id="shop-search-input"
                aria-label="Search wallpapers"
              />
              {query && (
                <button className="shop-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              className="shop-filter-toggle btn-secondary"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-expanded={filtersOpen}
              id="filter-toggle"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="shop-sort"
              id="shop-sort-select"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Category filters */}
          <div className={`shop-categories ${filtersOpen ? 'open' : ''}`}>
            <button
              className={`shop-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`shop-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="shop-results-meta mono-meta">
            {products.length} wallpaper{products.length !== 1 ? 's' : ''}
            {query && <> matching "{query}"</>}
          </div>

          {products.length > 0 ? (
            <div className="shop-grid" id="shop-product-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <p>No wallpapers found.</p>
              <button className="btn-secondary" onClick={() => { setQuery(''); handleCategoryChange('all'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
