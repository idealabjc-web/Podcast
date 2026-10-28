import { useState } from 'react'
import studioMainJpg from '../img/drp-studio-backdrop.jpg'
import studioReelVideo from '../img/drp-reel-4.mp4'
import loungeWebp from '../img/podcast-green-room-lounge.webp'
import loungeJpg from '../img/podcast-green-room-lounge.jpg'

const STUDIO_SPACES = [
  {
    id: 'main-stage',
    tag: 'Official Studio Stage',
    title: 'The Dr. P Main Broadcast Set',
    badge: 'Signature Live Stage',
    desc: 'The official Dr. P Podcast broadcast stage — featuring luxury armchairs, four-camera broadcast arrays, high-definition guest monitors, and the iconic illuminated gold Dr. P wall.',
    webp: studioMainJpg,
    jpg: studioMainJpg,
    video: studioReelVideo,
    alt: 'The official Dr. P Podcast live studio stage with executive armchairs, guest video screen and illuminated gold wall',
    specs: ['4K Multi-Camera Array', 'Illuminated Gold Signature Wall', 'Acoustic Cove Lighting', 'Live Guest Monitors']
  },
  {
    id: 'drp-studio-lounge',
    tag: 'Pre-Show Hospitality',
    title: 'The Dr. P Studio Lounge',
    badge: 'Speaker Prep Suite',
    desc: 'The room before the stage. Where keynote speakers, authors, and guests decompress, review talking points, and settle their nerves over espresso.',
    webp: loungeWebp,
    jpg: loungeJpg,
    alt: 'Luxury private backstage Dr. P podcast lounge with walnut paneling, plush sofa and warm ambient lighting',
    specs: ['Executive Tufted Sofas', 'Private Hospitality Service', 'Warm Amber Lighting', 'Acoustic Sound Isolation']
  }
]

export default function StudioTour({ player }) {
  const [activeSpace, setActiveSpace] = useState(0)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [isVideoMode, setIsVideoMode] = useState(false)

  const handleSelectSpace = (idx) => {
    setActiveSpace(idx)
    setIsVideoMode(false)
  }

  const currentSpace = STUDIO_SPACES[activeSpace]

  return (
    <>
      <section className="studio-section" id="studio" aria-label="Inside the Podcast Studio">
        <div className="studio-container">
          {/* Header */}
          <div className="studio-header">
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>✦ Backstage Production Spaces</span>
            <h2 className="hd studio-title">Inside The Dr. P Studio</h2>
            <p className="studio-sub">
              An authentic look into the spaces where Dr. P's conversations are made — from the quiet backstage lounge to the broadcast microphones and analog control booth.
            </p>
          </div>

          {/* Interactive Feature Hero Image or Live 16:9 Video */}
          <div className="studio-hero-card">
            <div 
              className="studio-hero-media" 
              onClick={() => {
                if (!isVideoMode) setLightboxImg(currentSpace)
              }}
            >
              {isVideoMode && currentSpace.video ? (
                <div className="studio-video-player-frame" onClick={(e) => e.stopPropagation()}>
                  <video 
                    src={currentSpace.video} 
                    controls 
                    autoPlay 
                    playsInline 
                    className="studio-active-video"
                  />
                </div>
              ) : (
                <picture>
                  <source srcSet={currentSpace.webp} type="image/webp" />
                  <img 
                    src={currentSpace.jpg} 
                    alt={currentSpace.alt}
                    className="studio-hero-img"
                    loading="lazy"
                  />
                </picture>
              )}
              <div className="studio-hero-overlay" />
              <div className="studio-hero-hud">
                <span className="studio-pill-tag">● {currentSpace.tag}</span>
                {currentSpace.video && (
                  <button 
                    className="studio-mode-toggle-pill"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsVideoMode(!isVideoMode)
                    }}
                    data-c="FeedToggle"
                  >
                    {isVideoMode ? '📸 Switch to Photo' : '▶ Watch Live Studio Feed'}
                  </button>
                )}
                {!isVideoMode && (
                  <span className="studio-zoom-cue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    Click to enlarge photo
                  </span>
                )}
              </div>
            </div>

            <div className="studio-hero-info">
              <div className="studio-hero-headline">
                <span className="studio-badge-gold">{STUDIO_SPACES[activeSpace].badge}</span>
                <h3>{STUDIO_SPACES[activeSpace].title}</h3>
              </div>
              <p>{STUDIO_SPACES[activeSpace].desc}</p>
              
              <div className="studio-specs-list">
                {STUDIO_SPACES[activeSpace].specs.map((spec) => (
                  <span key={spec} className="studio-spec-chip">✓ {spec}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Spaces Selector Strip */}
          <div className="studio-strip" role="tablist" aria-label="Select Studio Room">
            {STUDIO_SPACES.map((space, idx) => (
              <button
                key={space.id}
                className={`studio-strip-card ${idx === activeSpace ? 'is-active' : ''}`}
                onClick={() => handleSelectSpace(idx)}
                role="tab"
                aria-selected={idx === activeSpace}
                data-c="View"
              >
                <div className="studio-strip-thumb">
                  <picture>
                    <source srcSet={space.webp} type="image/webp" />
                    <img src={space.jpg} alt="" loading="lazy" />
                  </picture>
                  <span className="studio-strip-num">0{idx + 1}</span>
                </div>
                <div className="studio-strip-meta">
                  <small>{space.tag}</small>
                  <b>{space.title}</b>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for High-Res Studio Photos */}
      {lightboxImg && (
        <div 
          className="spk-lightbox" 
          role="dialog" 
          aria-modal="true"
          onClick={() => setLightboxImg(null)}
          data-c="Close"
        >
          <div className="spk-lightbox-header" onClick={(e) => e.stopPropagation()}>
            <div className="spk-lightbox-info">
              <b>{lightboxImg.title}</b>
              <span>{lightboxImg.tag} · Dr. P Podcast Studio</span>
            </div>
            <div className="spk-lightbox-controls">
              <button 
                className="spk-lightbox-close" 
                onClick={() => setLightboxImg(null)}
                title="Close (Esc)"
                data-c="Close"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="spk-lightbox-body" onClick={() => setLightboxImg(null)}>
            <picture>
              <source srcSet={lightboxImg.webp} type="image/webp" />
              <img src={lightboxImg.jpg} alt={lightboxImg.alt} className="spk-lightbox-img" />
            </picture>
          </div>
          <div className="spk-lightbox-footer" onClick={(e) => e.stopPropagation()}>
            <small>{lightboxImg.desc}</small>
          </div>
        </div>
      )}
    </>
  )
}
