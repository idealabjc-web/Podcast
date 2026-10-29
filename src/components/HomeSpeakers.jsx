import { useState, useEffect } from 'react'
import { E, S } from '../data.js'
import bannerWebp from '../img/speakers-banner.webp'
import bannerPng from '../img/speakers-banner.png'

// Exact 6 keynote speakers matching Screenshot 4:
// 1: Barb Varcl Smith (index 1)
// 2: Cindy B. Hipolito (index 3)
// 3: Paula Andersen (index 14)
// 4: Jackie Nugara (index 7)
// 5: Vanessa Hariparsad (index 18)
// 6: Bethsaida Hingston (index 2)
const SPOTLIGHT_INDICES = [1, 3, 14, 7, 18, 2]

export default function HomeSpeakers({ onProfile, onNavigate, player }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const spotlightSpeakers = SPOTLIGHT_INDICES.map((i) => ({ ...E[i], profile: S[i], index: i }))

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKey)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxOpen])

  return (
    <section className="home-speakers-spotlight" id="speakers" aria-label="Keynote Speakers Spotlight">
      <div className="wrap">
        {/* Section Header matching Screenshot 2 */}
        <div className="home-spk-head text-center rv">
          <div className="home-spk-badges">
            <span className="home-spk-badge gold">
              <span className="home-spk-dot" />
              FEATURED SERIES SPOTLIGHT
            </span>
            <span className="home-spk-badge outline">
              DR. P PODCAST ENSEMBLE
            </span>
          </div>

          <h2 className="home-spk-title">
            THREE AGES. THREE QUESTIONS.<br />
            <em>ONE EXTRAORDINARY STORY.</em>
          </h2>

          <p className="home-spk-desc">
            A landmark storytelling series exploring the defining moments, bold decisions,
            and raw backstage truths behind 20 remarkable journeys.
          </p>
        </div>

        {/* 6 Roman Arched Portraits Strip matching Screenshot 4 */}
        <div className="home-arch-strip-wrap rv">
          <div className="home-arch-strip">
            {spotlightSpeakers.map((spk) => (
              <div
                key={spk.g}
                className="home-arch-item"
                onClick={() => onProfile?.(spk.index)}
                role="button"
                tabIndex={0}
                aria-label={`Open profile for ${spk.g}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onProfile?.(spk.index)
                  }
                }}
              >
                {/* Roman Arch Frame */}
                <div className="home-arch-frame" style={{ background: spk.b }}>
                  {spk.img ? (
                    <img
                      src={spk.img}
                      alt={`Keynote Speaker ${spk.g}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="home-arch-fallback">
                      <span>{spk.f?.[0] || '✦'}</span>
                    </div>
                  )}
                  <div className="home-arch-overlay">
                    <span className="home-arch-tag mono">
                      EP {String(spk.index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Speaker Caption & Actions */}
                <div className="home-arch-caption">
                  <h4 className="home-arch-name">{spk.g}</h4>
                  <p className="home-arch-role">{spk.c || spk.profile.r || 'Keynote Speaker'}</p>

                  <div className="home-arch-actions">
                    <button
                      type="button"
                      className="btn home-arch-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        onProfile?.(spk.index)
                      }}
                      title="View Full Profile"
                    >
                      Profile →
                    </button>
                    <button
                      type="button"
                      className="btn gold home-arch-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        player?.play?.(spk.index)
                      }}
                      title="Listen to Episode"
                    >
                      ▶ Listen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directory Navigation & Showcase CTA */}
        <div className="home-spk-footer rv">
          <div className="home-spk-footer-text">
            <span className="k mono">Complete Ensemble / Season One</span>
            <p className="sec-more-note">
              Featuring 19 visionary authors, trauma therapists, global keynote speakers, and industry founders.
            </p>
          </div>
          <div className="home-spk-footer-btns">
            <button
              type="button"
              className="btn gold mag"
              onClick={() => onNavigate?.('speakers')}
            >
              <span>View All 19 Speakers &amp; Directory</span>
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
              <span>Enlarge Official Lineup Banner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for Ensemble Banner */}
      {lightboxOpen && (
        <div
          className="spk-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged 19-Speaker Ensemble Banner"
        >
          <div className="spk-lightbox-backdrop" />
          <button
            type="button"
            className="spk-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            ✕ Close
          </button>
          <div
            className="spk-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              <source srcSet={bannerWebp} type="image/webp" />
              <img
                src={bannerPng}
                alt="Dr. P Podcast Complete Season One Speaker Ensemble"
                className="spk-lightbox-img"
              />
            </picture>
          </div>
        </div>
      )}
    </section>
  )
}
