import { useState } from 'react';
import { Send, Instagram, Mail } from 'lucide-react';
import LegalPage from '../components/LegalPage';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Mock submission — in production, send to API
    setSubmitted(true);
  }

  return (
    <LegalPage title="Get in Touch" meta="Contact">
      <p>
        Have a question about a purchase, need a commercial license, or just want to say hi?
        Drop a message below or reach out directly.
      </p>

      <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Direct channels */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="mailto:hello@creativelylensed.com"
            className="btn-secondary"
            style={{ fontSize: '0.88rem' }}
          >
            <Mail size={16} />
            hello@creativelylensed.com
          </a>
          <a
            href="https://www.instagram.com/creativelylensed"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: '0.88rem' }}
          >
            <Instagram size={16} />
            @creativelylensed
          </a>
        </div>

        {/* Contact form */}
        {submitted ? (
          <div className="status-card" style={{ maxWidth: '100%', textAlign: 'left', padding: '2rem' }}>
            <p style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: 600 }}>
              ✓ Message sent!
            </p>
            <p>
              Thanks for reaching out. I'll get back to you within 48 hours.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input type="text" id="contact-name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input type="email" id="contact-email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input type="text" id="contact-subject" placeholder="Order help, licensing, etc." />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" placeholder="Tell me what's on your mind…" rows={5} required />
            </div>
            <button type="submit" className="btn-primary" id="contact-submit" style={{ alignSelf: 'flex-start' }}>
              <Send size={14} />
              Send Message
            </button>
          </form>
        )}
      </div>
    </LegalPage>
  );
}
