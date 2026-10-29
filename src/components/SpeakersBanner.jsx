import { useState, useEffect } from 'react'
import { E } from '../data.js'
import bannerWebp from '../img/speakers-banner.webp'
import bannerPng from '../img/speakers-banner.png'

export default function SpeakersBanner({ onNavigate }) {
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
    <>
      <section className="spk-banner-section" id="series" aria-label="Official Series Banner">
        <div className="spk-banner-glow" aria-hidden="true" />

        <div className="spk-banner-container">
          {/* Minimal Eyebrow Pill only — no duplicate banner text */}
          <div className="spk-banner-header" style={{ marginBottom: '18px' }}>
            <div className="spk-badge-wrap" style={{ marginBottom: 0 }}>
              <span className="spk-pill gold">
                <span className="spk-dot" />
                Official Series Showcase
              </span>
              <span className="spk-pill outline">{E.length} Keynote Voices</span>
            </div>
          </div>

          {/* Interactive Highlighted Banner Frame */}
          <div
            className="spk-banner-frame"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true)
            }}
            aria-label={`Click to enlarge the Dr. P Podcast ${E.length} Speakers Banner`}
            data-c="Enlarge"
          >
            <div className="spk-banner-sheen" />

            <picture className="spk-banner-pic">
              <source srcSet={bannerWebp} type="image/webp" />
              <img
                src={bannerPng}
                alt={`Dr. P Podcast Series Banner featuring ${E.length} keynote speakers`}
                loading="lazy"
                className="spk-banner-img"
              />
            </picture>

            <div className="spk-banner-overlay">
              <div className="spk-banner-overlay-top">
                <span className="spk-tag-glass">✦ Season 01 Lineup</span>
                <span className="spk-tag-count">Click to Enlarge</span>
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

          {/* Action Row */}
          <div className="spk-banner-actions" style={{ marginBottom: 0 }}>
            {onNavigate && (
              <button
                type="button"
                className="btn gold"
                onClick={() => onNavigate('speakers')}
              >
                <span>Meet All {E.length} Speakers</span>
                <span className="btn-icon">→</span>
              </button>
            )}
            <button
              type="button"
              className="btn"
              data-c="Zoom"
              onClick={() => setLightboxOpen(true)}
            >
              ⤢ Enlarge Banner
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="spk-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Series Banner"
          onClick={() => setLightboxOpen(false)}
          data-c="Close"
        >
          <div className="spk-lightbox-header" onClick={(e) => e.stopPropagation()}>
            <div className="spk-lightbox-info">
              <b>Dr. P Podcast · Official Series Banner</b>
              <span>Season 01 Keynote Ensemble</span>
            </div>
            <div className="spk-lightbox-controls">
              <button
                className="spk-lightbox-btn"
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? 'Zoom Out' : 'Zoom In (100%)'}
                data-c={isZoomed ? 'Reset' : 'Zoom'}
              >
                {isZoomed ? '− 100%' : '+ Zoom'}
              </button>
              <a
                className="spk-lightbox-btn"
                href={bannerPng}
                download="Dr-P-Podcast-Speakers-Banner.png"
                title="Download High-Res Banner"
                data-c="Save"
              >
                ↓ Save
              </a>
              <button
                className="spk-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                title="Close (Esc)"
                data-c="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className={`spk-lightbox-body ${isZoomed ? 'zoomed' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(!isZoomed)
            }}
            data-c={isZoomed ? 'Zoom −' : 'Zoom +'}
          >
            <picture>
              <source srcSet={bannerWebp} type="image/webp" />
              <img
                src={bannerPng}
                alt="Dr. P Podcast Series Banner"
                className="spk-lightbox-img"
              />
            </picture>
          </div>

          <div className="spk-lightbox-footer" onClick={(e) => e.stopPropagation()}>
            <small>
              Press <b>Esc</b> or click anywhere outside to close. Click image to toggle zoom.
            </small>
          </div>
        </div>
      )}
    </>
  )
}
