import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LegalPage from '../components/LegalPage';

const faqs = [
  {
    q: 'What do I get after purchase?',
    a: 'You receive a set of ultra-high resolution PNG files: a 5K desktop wallpaper (5120 × 2880) and a 4K phone wallpaper (2160 × 3840). Both are delivered instantly via a secure download link sent to your email.',
  },
  {
    q: 'What resolution and format are the wallpapers?',
    a: 'All wallpapers are delivered as lossless PNG files. Desktop editions are 5120 × 2880 (5K) and phone editions are 2160 × 3840 (4K Ultra-Retina). They look razor-sharp on any modern display.',
  },
  {
    q: 'Can I use these as my phone and desktop wallpaper?',
    a: 'Yes! That is exactly what they are designed for. You receive both a desktop and phone version with every purchase so you can match your setup.',
  },
  {
    q: 'Are these real photographs?',
    a: 'Every wallpaper starts as an original photograph taken by Akshat Dange. The photos are then digitally processed with brush-stroke and painterly effects to create unique artwork. No stock imagery is used.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Because these are digital downloads delivered instantly, refunds are generally not available once the file has been accessed. However, if there is a genuine issue with your download, please reach out via the Contact page and we will make it right.',
  },
  {
    q: 'Can I use a wallpaper commercially (prints, merch, social media)?',
    a: 'The standard license covers personal, non-commercial use only — your screens, devices and personal setups. For any commercial or print use, please contact us for a commercial license.',
  },
  {
    q: 'How do I contact you?',
    a: 'Use the Contact page on this site, or email hello@creativelylensed.com. You can also DM on Instagram @creativelylensed.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <LegalPage title="Frequently Asked Questions" meta="Help">
      <div className="legal-content">
        {faqs.map((item, i) => (
          <div className="faq-item" key={i}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              id={`faq-q-${i}`}
            >
              {item.q}
              <ChevronDown
                size={18}
                style={{
                  transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.25s ease',
                  flexShrink: 0,
                  color: 'var(--muted)',
                }}
              />
            </button>
            <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
