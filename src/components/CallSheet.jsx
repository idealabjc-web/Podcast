import { useEffect, useRef, useState } from 'react'
import { E } from '../data.js'

const HOME_PREVIEW_COUNT = 5

export default function CallSheet({
  isPage = false,
  onSelectEpisode,
  player,
  onProfile,
  onNavigate,
}) {
  const sectionRef = useRef(null)
  const floatRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const posRef = useRef({ fx: 0, fy: 0, tx: 0, ty: 0, initialized: false })

  const displayedEpisodes = isPage ? E : E.slice(0, HOME_PREVIEW_COUNT)

  // IntersectionObserver for scroll reveal (.rv -> .rv.in)
  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const els = root.querySelectorAll('.rv')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [isPage])

  // Cursor follower loop for floating speaker portrait preview
  useEffect(() => {
    const onPointerMove = (e) => {
      const p = posRef.current
      p.tx = e.clientX + 170
      p.ty = e.clientY
      if (!p.initialized) {
        p.fx = p.tx
        p.fy = p.ty
        p.initialized = true
      }
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    let rafId
    const loop = () => {
      const p = posRef.current
      p.fx += (p.tx - p.fx) * 0.14
      p.fy += (p.ty - p.fy) * 0.14
      if (floatRef.current) {
        floatRef.current.style.left = `${p.fx}px`
        floatRef.current.style.top = `${p.fy}px`
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const loadEp = (i) => {
    onSelectEpisode?.(i)
    player?.play?.(i)
  }

  const activeEp = hoveredIdx !== null ? E[hoveredIdx] : null

  return (
    <section
      id="episodes"
      className={`cs-section ${isPage ? 'cs-page-view' : ''}`}
      ref={sectionRef}
    >
      <div className="wrap">
        {isPage && (
          <div className="page-top-bar rv">
            <button
              type="button"
              className="page-back-btn mono"
              onClick={() => onNavigate?.('home')}
            >
              ← Back to Home
            </button>
            <span className="page-meta-pill mono">
              Season 01 · All {E.length} Episodes in Running Order
            </span>
          </div>
        )}

        <div className="sh">
          <div>
            <span className="k mono rv">Call sheet / Season one</span>
            <h2 className="rv">
              Every <em>conversation,</em> in running order.
            </h2>
          </div>
          <p className="rv">
            Hover to preview the speaker poster. Click an episode to load it into the player.
          </p>
        </div>

        <div
          className="sheet"
          id="sheet"
          onPointerLeave={() => setHoveredIdx(null)}
        >
          {displayedEpisodes.map((e, i) => {
            const num = String(i + 1).padStart(2, '0')
            const dur = e.m ? `${e.m}:00` : 'Soon'
            return (
              <div
                key={e.g}
                className="ep rv"
                style={{ '--d': `${i * 0.04}s` }}
                tabIndex={0}
                role="button"
                data-i={i}
                aria-label={`Load episode ${i + 1}: ${e.n} with ${e.g}`}
                onPointerOver={() => setHoveredIdx(i)}
                onClick={() => loadEp(i)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault()
                    loadEp(i)
                  }
                }}
              >
                <span className="n">{num}</span>
                <div className="ep-title-col">
                  <h4>{e.n}</h4>
                  {isPage && e.c && <small className="ep-topic-sub mono">{e.c}</small>}
                </div>
                <span className="g">with {e.g}</span>
                <span className="dur mono">{dur}</span>
                <span className="go" title="Play Episode">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            )
          })}
        </div>

        {!isPage && (
          <div className="sec-more-row rv">
            <p className="sec-more-note mono">
              Showing {HOME_PREVIEW_COUNT} of {E.length} conversations in Season One
            </p>
            <button
              type="button"
              className="btn gold"
              onClick={() => onNavigate?.('call-sheet')}
            >
              <span>View Full Call Sheet (All {E.length} Episodes)</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating 4:5 cursor-following speaker portrait card */}
      <div
        className={`float ${activeEp ? 'on' : ''}`}
        id="float"
        ref={floatRef}
        style={{ background: activeEp?.b || '#121815' }}
        aria-hidden="true"
      >
        {activeEp?.img && (
          <img
            key={activeEp.g}
            src={activeEp.img}
            alt={activeEp.g}
          />
        )}
        {activeEp && (
          <div className="cap">
            <small>
              Episode {String(hoveredIdx + 1).padStart(2, '0')} · {activeEp.g}
            </small>
            <b>{activeEp.n}</b>
          </div>
        )}
      </div>
    </section>
  )
}
