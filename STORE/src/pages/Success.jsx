import { Link } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import './StatusPage.css';

export default function Success() {
  return (
    <main className="status-page">
      <div className="container">
        <div className="status-card status-card--success">
          <CheckCircle size={56} className="status-icon" />
          <h1>Payment Successful!</h1>
          <p>
            Thank you for your purchase. Your wallpaper download link has been sent to your email.
            You can also access your downloads below.
          </p>
          <div className="status-actions">
            <Link to="/downloads" className="btn-primary">
              <Download size={16} />
              Go to Downloads
            </Link>
            <Link to="/shop" className="btn-secondary">
              Continue Shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
