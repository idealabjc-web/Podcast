import { useEffect, useRef } from 'react'
import { E, CREDITS } from '../data.js'

const PILLARS = [
  [
    '01 / The Hour Before',
    'Unscripted Backstage Truth',
    'Before the stage lights come up and the teleprompter starts rolling, guests speak without armor—sharing the doubts, rituals, and turning points that shaped them.',
  ],
  [
    '02 / Three Ages',
    'Childhood, Teenage & Today',
    'Every conversation traces the guest across three defining chapters of life—connecting early imprints and formative crossroads to the leader on stage today.',
  ],
  [
    '03 / The Voice in the Wings',
    'Intimate Broadcast Craft',
    'Recorded in the Dr. P Studio with warm tungsten light, broadcast-grade acoustics, and the quiet focus of a private dressing room.',
  ],
]

export default function HostSection({ isPage = false, onNavigate }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    // Reveal animations (.rv -> .rv.in)
    const rvEls = root.querySelectorAll('.rv')
    const rvIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            rvIo.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    rvEls.forEach((el) => rvIo.observe(el))

    // Count-up animation for [data-c] inside .stats
    const countEls = root.querySelectorAll('.stats [data-c]')
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          cio.unobserve(e.target)
          const end = +e.target.dataset.c
          const t0 = performance.now()
          const f = (t) => {
            const p = Math.min((t - t0) / 1500, 1)
            e.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)))
            if (p < 1) requestAnimationFrame(f)
          }
          f(t0)
        })
      },
      { threshold: 0.5 }
    )
    countEls.forEach((el) => cio.observe(el))

    return () => {
      rvIo.disconnect()
      cio.disconnect()
    }
  }, [isPage])

  return (
    <section
      id="host"
      className={`host-section ${isPage ? 'cs-page-view' : ''}`}
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
              The Host · Backstage Philosophy &amp; Credits
            </span>
          </div>
        )}

        <div className="host">
          <div className="portrait rv" aria-label="Portrait placeholder for Dr. P">
            <span>P</span>
          </div>
          <div>
            <span className="k mono rv">The host</span>
            <h2 className="rv">
              Meet <em>Dr. P,</em> the voice in the wings.
            </h2>
            <p className="rv">
              Dr. P sits down with performers, directors, composers and the crew nobody applauds, in the hour before the show, when the real conversation happens.
            </p>
            {isPage && (
              <>
                <p className="rv">
                  The microphone goes where the audience never does: the stage door, the wardrobe rail, the corridor outside the green room.
                </p>
                <p className="rv">
                  Guided by the signature <em>“Three Ages. Three Questions. One Extraordinary Story.”</em> format, each session invites world-class authors, clinicians, strategists, and transformational speakers to look back at the moments that forged their voice.
                </p>
              </>
            )}

            <div className="stats rv">
              <div>
                <b data-c={E.length}>{E.length}</b>
                <span className="mono">Episodes</span>
              </div>
              <div>
                <b data-c={E.length}>{E.length}</b>
                <span className="mono">Guests</span>
              </div>
              <div>
                <b data-c="18">18</b>
                <span className="mono">Countries</span>
              </div>
            </div>

            {!isPage && (
              <div className="host-more-cta rv" style={{ marginTop: '36px' }}>
                <button
                  type="button"
                  className="btn gold"
                  onClick={() => onNavigate?.('host')}
                >
                  <span>Read Full Host Story &amp; Backstage Bio</span>
                  <span className="btn-icon">→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {isPage && (
          <>
            <div className="host-pillars-grid rv">
              {PILLARS.map(([tag, title, desc]) => (
                <div className="host-pillar-card" key={tag}>
                  <small className="mono">{tag}</small>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>

            <div className="host-credits-block rv">
              <span className="k mono">Production Team &amp; Credits</span>
              <div className="host-credits-grid">
                {CREDITS.map(([role, name]) => (
                  <div className="host-credit-cell" key={role}>
                    <small className="mono">{role}</small>
                    <b>{name}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="sec-more-row rv" style={{ marginTop: '56px' }}>
              <p className="sec-more-note mono">
                Ready to hear all {E.length} Season One conversations?
              </p>
              <button
                type="button"
                className="btn gold"
                onClick={() => onNavigate?.('call-sheet')}
              >
                <span>Open Season One Call Sheet</span>
                <span className="btn-icon">→</span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
