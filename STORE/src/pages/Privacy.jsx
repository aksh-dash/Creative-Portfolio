import LegalPage from '../components/LegalPage';

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" meta="Legal">
      <p><em>Last updated: October 2024</em></p>

      <h2>What We Collect</h2>
      <p>When you make a purchase, we collect:</p>
      <ul>
        <li><strong>Email address</strong> — to deliver your download link and order confirmation.</li>
        <li><strong>Payment information</strong> — processed securely by our payment provider (Razorpay / Stripe). We never store your card details.</li>
        <li><strong>Basic analytics</strong> — page views and session data via privacy-friendly analytics (no personal tracking).</li>
      </ul>

      <h2>How We Use It</h2>
      <ul>
        <li>To deliver purchased products.</li>
        <li>To send order confirmations and download links.</li>
        <li>To respond to support requests.</li>
        <li>To improve the store experience.</li>
      </ul>

      <h2>What We Don't Do</h2>
      <ul>
        <li>We do not sell, rent, or share your personal information with third parties.</li>
        <li>We do not send marketing emails unless you explicitly opt in.</li>
        <li>We do not use invasive tracking or fingerprinting.</li>
      </ul>

      <h2>Data Retention</h2>
      <p>
        We retain order records for accounting and legal purposes. You may request deletion of your
        data at any time by emailing <a href="mailto:hello@creativelylensed.com">hello@creativelylensed.com</a>.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, contact Akshat Dange
        at <a href="mailto:hello@creativelylensed.com">hello@creativelylensed.com</a>.
      </p>
    </LegalPage>
  );
}
