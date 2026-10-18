import './WatermarkedImage.css';

export default function WatermarkedImage({ src, alt, className = '' }) {
  return (
    <div className={`watermarked-wrap ${className}`} onContextMenu={e => e.preventDefault()}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        className="watermarked-img"
      />
      <div className="watermark-overlay">
        <span className="watermark-badge">preview</span>
      </div>
    </div>
  );
}
