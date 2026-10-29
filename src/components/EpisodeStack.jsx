import { useEffect, useRef, useState, useCallback } from 'react'
import { E } from '../data.js'

export default function EpisodeStack({ active = 0, onChangeActive, player, onProfile, onOpenCallSheet }) {
  const [touchStartY, setTouchStartY] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const trackRef = useRef(null)
  const dockRef = useRef(null)

  const AUTOPLAY_INTERVAL = 4500

  const goTo = useCallback((idx) => {
    const nextIdx = (idx + E.length) % E.length
    onChangeActive(nextIdx)
  }, [onChangeActive])

  // Up arrow clicked -> current card translates UP, next speaker card shows up
  const goNext = useCallback(() => goTo(active + 1), [goTo, active])
  // Down arrow clicked -> current card translates DOWN, previous speaker card shows up
  const goPrev = useCallback(() => goTo(active - 1), [goTo, active])

  // Auto-scroll loop: advances to next episode every 4.5s, pauses on hover or drag
  useEffect(() => {
    if (!autoplay || isHovered || isDragging) return

    const timer = setInterval(() => {
      goTo(active + 1)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [autoplay, isHovered, isDragging, active, goTo])

  // Keep thumbnail dock centered on active speaker without shifting window
  useEffect(() => {
    const container = dockRef.current
    if (!container) return
    const activeThumb = container.children[active]
    if (activeThumb) {
      const scrollPos = activeThumb.offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2)
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' })
    }
    if (window.scrollX !== 0) {
      window.scrollTo(0, window.scrollY)
    }
  }, [active])

  // Keyboard navigation when carousel is focused/hovered
  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      goPrev()
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      goNext()
    }
  }

  // Touch and drag handlers for vertical gesture
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches ? e.touches[0].clientY : e.clientY)
    setIsDragging(true)
    setDragOffsetY(0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || touchStartY === null) return
    const currentY = e.touches ? e.touches[0].clientY : e.clientY
    setDragOffsetY(currentY - touchStartY)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    if (dragOffsetY < -50) goNext()
    else if (dragOffsetY > 50) goPrev()
    setIsDragging(false)
    setTouchStartY(null)
    setDragOffsetY(0)
  }

  return (
    <section
      className="ep-carousel-section"
      id="eps"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label="Episodes vertical carousel"
    >
      {/* Top Header info & Auto-scroll control */}
      <div className="ep-ctrl-header-row">
        <div className="ep-ctrl-info">
          <span className="eyebrow">
            Episode {String(active + 1).padStart(2, '0')} / {String(E.length).padStart(2, '0')}
          </span>
          <h3 className="ep-ctrl-title">{E[active].g}</h3>
        </div>

        <div className="ep-autoplay-badge" style={{ gap: '10px', flexWrap: 'wrap' }}>
          {onOpenCallSheet && (
            <button
              type="button"
              className="ep-callsheet-cta"
              onClick={onOpenCallSheet}
              title="Open full Call Sheet / Season One page"
            >
              <span>✦ Call Sheet / Season 1</span>
              <i>→</i>
            </button>
          )}
          <button
            className={`ep-autoplay-toggle ${autoplay ? 'is-active' : ''}`}
            onClick={() => setAutoplay((prev) => !prev)}
            title={autoplay ? 'Click to pause auto-scroll' : 'Click to resume auto-scroll'}
            aria-label={autoplay ? 'Pause auto-scroll' : 'Resume auto-scroll'}
          >
            <span className={`ep-autoplay-dot ${autoplay && !isHovered ? 'pulsing' : 'idle'}`} />
            <span className="ep-autoplay-text">
              {autoplay ? (isHovered ? '❚❚ Paused (hovering)' : '● Auto-scrolling') : '▶ Auto-scroll Off'}
            </span>
          </button>
        </div>
      </div>

      {/* Countdown progress track for auto-scroll */}
      <div className="ep-progress-track" aria-hidden="true">
        <div
          key={`${active}-${autoplay}-${isHovered}`}
          className={`ep-progress-bar ${isHovered || !autoplay ? 'is-paused' : ''}`}
          style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }}
        />
      </div>

      {/* Main Stage: Card Viewport + Right-Side Vertical Controls */}
      <div className="ep-stage-layout">
        <div
          className="carousel-viewport vertical"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="carousel-track vertical"
            style={{
              transform: `translateY(calc(-${active * 100}% + ${dragOffsetY}px))`,
              transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {E.map((e, i) => {
              const no = String(i + 1).padStart(2, '0')
              const isActive = i === active

              return (
                <div
                  className={`carousel-slide vertical ${isActive ? 'is-active' : ''}`}
                  key={e.g}
                  aria-hidden={!isActive}
                >
                  <article
                    className="card"
                    data-c="Profile"
                    onClick={() => onProfile(i)}
                  >
                    <div className="bg" style={{ background: e.b }}>
                      {e.img && <img className="bgi" src={e.img} alt="" loading="lazy" />}
                    </div>
                    {e.img && (
                      <figure className="por">
                        <img src={e.img} alt={`Portrait of ${e.g}`} loading="lazy" />
                      </figure>
                    )}
                    <div className="grain" />
                    <div className="yr">
                      {e.y}
                      <small>Ep. {no} · Dr. P Podcast</small>
                    </div>
                    <div className="ttl">
                      <small>Episode {no}</small>
                      <h2 className="d">{e.n}</h2>
                      <div className="meta">
                        <span>Guest</span>
                        <span>{e.g}</span>
                        <span>Topic</span>
                        <span>{e.c || 'Coming soon'}</span>
                      </div>
                    </div>
                    {e.q.length > 0 && (
                      <div className="revs">
                        {e.q.map((q) => (
                          <div key={q}>
                            <div style={{ letterSpacing: '.2em', fontSize: '.6rem' }}>★★★★★</div>
                            <small>Listener review</small>
                            <h4>“{q}”</h4>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="acts">
                      <button
                        className="explore"
                        data-c="Open"
                        onClick={(ev) => {
                          ev.stopPropagation()
                          onProfile(i)
                        }}
                      >
                        <span>Profile</span>
                        <i>→</i>
                      </button>
                      <button
                        className="explore"
                        data-c="Play"
                        onClick={(ev) => {
                          ev.stopPropagation()
                          player.play(i)
                        }}
                      >
                        <span>Listen</span>
                        <i>▶</i>
                      </button>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right-Side Vertical Controls */}
        <aside className="ep-v-rail" aria-label="Episode vertical navigation">
          <button
            className="ep-v-btn"
            onClick={goPrev}
            aria-label="Previous episode"
            title="Previous episode"
            data-c="Prev"
          >
            ↑
          </button>

          <div className="ep-v-counter-wrap">
            <span className="ep-v-num current">{String(active + 1).padStart(2, '0')}</span>
            <div className="ep-v-bar">
              <i style={{ height: `${((active + 1) / E.length) * 100}%` }} />
            </div>
            <span className="ep-v-num total">{String(E.length).padStart(2, '0')}</span>
          </div>

          <button
            className="ep-v-btn"
            onClick={goNext}
            aria-label="Next episode"
            title="Next episode"
            data-c="Next"
          >
            ↓
          </button>
        </aside>
      </div>

      {/* Speaker Thumbnail Dock */}
      <div className="ep-dock" ref={dockRef} role="tablist" aria-label="Jump to speaker">
        {E.map((e, i) => (
          <button
            key={e.g}
            className={`ep-dock-item ${i === active ? 'active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === active}
            title={e.g}
            data-c="Select"
          >
            <span className="ep-dock-thumb" style={{ background: e.b }}>
              {e.img ? <img src={e.img} alt={e.g} loading="lazy" /> : null}
            </span>
            <span className="ep-dock-name">{e.g.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
