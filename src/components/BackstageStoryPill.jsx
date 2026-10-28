import { useState, useEffect } from 'react'
import reelVideo from '../img/drp-reel-1.mp4'

export default function BackstageStoryPill() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleOpen = () => setIsOpen(true)

    window.addEventListener('keydown', handleKey)
    window.addEventListener('open-backstage-story', handleOpen)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('open-backstage-story', handleOpen)
    }
  }, [])

  return (
    <>
      {/* Floating Story Pill */}
      <aside className="backstage-pill-wrapper" aria-label="Watch Backstage Video Reel">
        <button
          className="backstage-pill-btn"
          onClick={() => setIsOpen(true)}
          data-c="Watch Video"
          title="Watch Backstage Video Reel (0:15)"
        >
          <div className="backstage-pill-avatar">
            <span className="story-ring" />
            <video src={reelVideo} muted playsInline loop autoPlay aria-hidden="true" />
            <span className="story-play-badge">▶</span>
          </div>
          <div className="backstage-pill-text">
            <div className="backstage-pill-top">
              <span className="story-live-badge">
                <span className="story-live-dot" />
                VIDEO REEL
              </span>
              <span className="story-time">0:15</span>
            </div>
            <b>Watch Backstage Video</b>
            <small>Tap to play live story ›</small>
          </div>
        </button>
      </aside>

      {/* 9:16 Full Vertical Story Reel Lightbox */}
      {isOpen && (
        <div
          className="vertical-story-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
          data-c="Close"
        >
          <div className="vertical-story-phone" onClick={(e) => e.stopPropagation()}>
            <div className="vertical-story-header">
              <div className="vertical-story-user">
                <span className="story-live-dot" />
                <div>
                  <b>Dr. P Broadcast</b>
                  <small>Backstage Reel · Season 2026</small>
                </div>
              </div>
              <button
                className="vertical-story-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close Story"
              >
                ✕
              </button>
            </div>

            <div className="vertical-story-frame">
              <video
                src={reelVideo}
                controls
                autoPlay
                playsInline
                className="vertical-story-video"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
