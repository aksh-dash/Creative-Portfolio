import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';
import Cancelled from './pages/Cancelled';
import Downloads from './pages/Downloads';
import FAQ from './pages/FAQ';
import License from './pages/License';
import RefundPolicy from './pages/RefundPolicy';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="store-app" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Header />
      <div style={{ flex: 1, paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/p/:slug" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/license" element={<License />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
