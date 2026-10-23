import { useState } from 'react'
import studioRecWebp from '../img/podcast-studio-recording.webp'
import studioRecJpg from '../img/podcast-studio-recording.jpg'
import loungeWebp from '../img/podcast-green-room-lounge.webp'
import loungeJpg from '../img/podcast-green-room-lounge.jpg'
import controlWebp from '../img/podcast-control-room.webp'
import controlJpg from '../img/podcast-control-room.jpg'

const STUDIO_SPACES = [
  {
    id: 'studio-table',
    tag: 'Live Studio Room',
    title: 'The Broadcast Table',
    badge: 'Pro Broadcast Setup',
    desc: 'Where the magic happens. High-fidelity condenser broadcast microphones and zero distractions. Recorded in acoustic-treated intimacy with warm ambient lighting.',
    webp: studioRecWebp,
    jpg: studioRecJpg,
    alt: 'Professional studio broadcast microphone with shock mount in acoustic isolation studio',
    specs: ['Broadcast Condenser Mics', 'Acoustic Isolation Booth', 'Pop-Shield Diffusion', 'Cloudlifter Preamp']
  },
  {
    id: 'green-room-lounge',
    tag: 'Pre-Show Hospitality',
    title: 'The Green Room Lounge',
    badge: 'Speaker Prep Suite',
    desc: 'The room before the stage. Where keynote speakers, authors, and guests decompress, review talking points, and settle their nerves over espresso.',
    webp: loungeWebp,
    jpg: loungeJpg,
    alt: 'Luxury private backstage green room lounge with walnut paneling, plush sofa and warm ambient lighting',
    specs: ['Executive Tufted Sofas', 'Private Hospitality Service', 'Warm Amber Lighting', 'Acoustic Sound Isolation']
  },
  {
    id: 'control-booth',
    tag: 'Audio Engineering',
    title: 'The Control Booth',
    badge: 'Neve Analog Console',
    desc: 'Real-time multi-track recording and analog mastering through soundproof studio glass. Every breath, laugh, and inflection captured with pristine warmth.',
    webp: controlWebp,
    jpg: controlJpg,
    alt: 'Classic Neve analog audio mixing desk with illuminated channel strips in acoustic control room',
    specs: ['Neve Analog Console', 'Pro Tools Ultimate', 'Hardware Compression', 'Zero-Latency Monitoring']
  }
]

export default function StudioTour() {
  const [activeSpace, setActiveSpace] = useState(0)
  const [lightboxImg, setLightboxImg] = useState(null)

  return (
    <>
      <section className="studio-section" id="studio" aria-label="Inside the Podcast Studio">
        <div className="studio-container">
          {/* Header */}
          <div className="studio-header">
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>✦ Backstage Production Spaces</span>
            <h2 className="hd studio-title">Inside The Green Room</h2>
            <p className="studio-sub">
              An authentic look into the spaces where our conversations are made — from the quiet backstage lounge to the broadcast microphones and analog control booth.
            </p>
          </div>

          {/* Interactive Feature Hero Image */}
          <div className="studio-hero-card" onClick={() => setLightboxImg(STUDIO_SPACES[activeSpace])}>
            <div className="studio-hero-media">
              <picture>
                <source srcSet={STUDIO_SPACES[activeSpace].webp} type="image/webp" />
                <img 
                  src={STUDIO_SPACES[activeSpace].jpg} 
                  alt={STUDIO_SPACES[activeSpace].alt}
                  className="studio-hero-img"
                  loading="lazy"
                />
              </picture>
              <div className="studio-hero-overlay" />
              <div className="studio-hero-hud">
                <span className="studio-pill-tag">● {STUDIO_SPACES[activeSpace].tag}</span>
                <span className="studio-zoom-cue">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Click to enlarge photo
                </span>
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
                onClick={() => setActiveSpace(idx)}
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
              <span>{lightboxImg.tag} · The Green Room Studio</span>
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
