import { Link } from 'react-router-dom';
import { XCircle, ArrowRight } from 'lucide-react';
import './StatusPage.css';

export default function Cancelled() {
  return (
    <main className="status-page">
      <div className="container">
        <div className="status-card status-card--cancelled">
          <XCircle size={56} className="status-icon" />
          <h1>Payment Cancelled</h1>
          <p>
            Your payment was cancelled and you have not been charged. 
            Feel free to return to the store and try again whenever you're ready.
          </p>
          <div className="status-actions">
            <Link to="/shop" className="btn-primary">
              Back to Shop <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
