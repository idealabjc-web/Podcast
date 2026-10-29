import { useState, useEffect } from 'react'
import { E } from '../data.js'
import bannerWebp from '../img/speakers-banner.webp'
import bannerPng from '../img/speakers-banner.png'
import bannerHd from '../img/speakers-banner-hd.png'

export default function Hero({ player, onNavigate }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
        setIsZoomed(false)
      }
    }
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKey)
    } else {
      document.body.style.overflow = ''
      setIsZoomed(false)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxOpen])

  return (
    <section className="hero-banner-section" id="hero" aria-label="Dr. P Podcast Hero Banner">
      <div className="hero-banner-glow" aria-hidden="true" />

      <div className="wrap">
        {/* Grand Banner Showcase Frame - Starting Itself Right at the Top */}
        <div
          className="spk-banner-frame hero-banner-card rv in"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setLightboxOpen(true)
            }
          }}
          aria-label={`Enlarge the Dr. P Podcast ${E.length} Speakers Banner`}
          data-c="Enlarge"
        >
          <div className="spk-banner-sheen" />

          <picture className="spk-banner-pic">
            <source srcSet={bannerWebp} type="image/webp" />
            <img
              src={bannerPng}
              alt={`Dr. P Podcast Series Banner featuring ${E.length} keynote speakers`}
              className="spk-banner-img"
              loading="eager"
            />
          </picture>

          <div className="spk-banner-overlay">
            <div className="spk-banner-overlay-top">
              <span className="spk-tag-glass">✦ Official Series Ensemble</span>
              <span className="spk-tag-count">Click To Enlarge</span>
            </div>
            <div className="spk-banner-overlay-bottom">
              <span className="spk-zoom-prompt">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                View Full-Screen Banner
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="hero-banner-actions rv in">
          <button
            type="button"
            className="btn gold mag"
            onClick={() => player?.play?.(0)}
          >
            <span className="btn-icon">▶</span>
            <span>Listen To Season 01</span>
          </button>

          <button
            type="button"
            className="btn mag"
            onClick={() => onNavigate?.('speakers')}
          >
            <span>View All {E.length} Speakers Directory</span>
            <span className="btn-icon">→</span>
          </button>

          <button
            type="button"
            className="btn mag"
            onClick={() => setLightboxOpen(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span>Enlarge Banner</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="spk-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Dr. P Podcast Series Banner"
        >
          <div className="spk-lightbox-backdrop" />

          <button
            type="button"
            className="spk-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox (Esc)"
          >
            ✕ Close
          </button>

          <div
            className={`spk-lightbox-content ${isZoomed ? 'is-zoomed' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="spk-lightbox-toolbar">
              <div className="spk-lightbox-meta">
                <b>Dr. P Podcast · Official Series Banner</b>
                <span>{E.length} Keynote Voices · High Resolution Lineup</span>
              </div>
              <div className="spk-lightbox-btns">
                <button
                  type="button"
                  className="spk-lightbox-action-btn"
                  onClick={() => setIsZoomed((z) => !z)}
                  title={isZoomed ? 'Zoom out' : 'Zoom in (100%)'}
                >
                  {isZoomed ? '⊖ Zoom Out' : '⊕ Zoom In'}
                </button>
                <a
                  href={bannerHd}
                  download="Dr-P-Podcast-Speakers-Banner.png"
                  className="spk-lightbox-action-btn primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↓ Download HD
                </a>
              </div>
            </div>

            <div
              className="spk-lightbox-scroll"
              onClick={() => setIsZoomed((z) => !z)}
              title="Click image to toggle zoom"
            >
              <picture>
                <source srcSet={bannerWebp} type="image/webp" />
                <img
                  src={bannerHd || bannerPng}
                  alt="Dr. P Podcast Season 01 Full Speaker Lineup Banner in High Definition"
                  className="spk-lightbox-img"
                />
              </picture>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
