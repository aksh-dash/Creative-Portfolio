import './LegalPage.css';

export default function LegalPage({ title, meta, children }) {
  return (
    <main className="legal-page">
      <div className="container section-spacing">
        {meta && <span className="mono-meta">{meta}</span>}
        <h1>{title}</h1>
        <div className="legal-content">
          {children}
        </div>
      </div>
    </main>
  );
}
