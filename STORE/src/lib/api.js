/**
 * Data access layer for products.
 * All UI components access product data through these functions,
 * making future backend migration a zero-component-change swap.
 */
import productsData from '../data/products.json';

// ---------- Read helpers ----------

/** Get all products */
export function getAllProducts() {
  return productsData;
}

/** Get a single product by slug */
export function getProductBySlug(slug) {
  return productsData.find(p => p.slug === slug) || null;
}

/** Get featured products */
export function getFeaturedProducts() {
  return productsData.filter(p => p.featured);
}

/** Get new arrivals */
export function getNewArrivals() {
  return productsData.filter(p => p.new);
}

/** Get unique categories */
export function getCategories() {
  const cats = [...new Set(productsData.map(p => p.category))];
  return cats.sort();
}

/** Get unique collections */
export function getCollections() {
  const cols = [...new Set(productsData.map(p => p.collection))];
  return cols.sort();
}

/** Filter products by category */
export function getProductsByCategory(category) {
  if (!category || category === 'all') return productsData;
  return productsData.filter(p => p.category === category);
}

/** Search products by query string (name, description, tags) */
export function searchProducts(query) {
  if (!query) return productsData;
  const q = query.toLowerCase().trim();
  return productsData.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.collection.toLowerCase().includes(q)
  );
}

// ---------- Price formatting ----------

/** Format price with currency symbol */
export function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ---------- Mock checkout ----------

/**
 * Simulate a checkout flow.
 * Returns a Promise that resolves after a short delay with a mock session.
 * In production, this would call your payment API.
 */
export async function createCheckoutSession(productId, formatIndex = 0) {
  const product = productsData.find(p => p.id === productId);
  if (!product) throw new Error('Product not found');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    sessionId: `mock_${Date.now()}_${productId}`,
    product: product.name,
    format: product.formats[formatIndex]?.label || product.formats[0].label,
    amount: product.price,
    currency: product.currency,
    status: 'pending',
    redirectUrl: '/success',
  };
}
