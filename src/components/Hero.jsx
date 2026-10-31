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
            <span className="spk-tag-count">Click To Enlarge</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="hero-banner-actions rv in">
          <button
            type="button"
            className="btn gold sm"
            onClick={() => player?.play?.(0)}
          >
            <span className="btn-icon">▶</span>
            <span>Listen To Season 01</span>
          </button>

          <button
            type="button"
            className="btn sm"
            onClick={() => onNavigate?.('speakers')}
          >
            <span>View All {E.length} Speakers Directory</span>
            <span className="btn-icon">→</span>
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
