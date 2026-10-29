import { useEffect, useRef } from 'react'

const REELS = [
  { sp: -30, src: '/media/clip_head.mp4', poster: '/media/reel_a.jpg', tag: '01 / Sound Booth', label: 'Studio headphones & monitoring' },
  { sp: 25, src: '/media/clip_cam.mp4', poster: '/media/trailer.jpg', tag: '02 / Capture', label: '18-35mm cinema focus pull' },
  { sp: -25, src: '/media/session.mp4', poster: '/media/session.jpg', tag: '03 / Live Feed', label: 'Radial ON AIR spectrum' },
  { sp: 30, src: '/media/clip_chair.mp4', poster: '/media/hero.jpg', tag: '04 / The Stage', label: 'The broadcast chair' },
]

export default function BehindTheMic({ isPage = false, onNavigate }) {
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

    // Ensure all videos play reliably and pause off-screen
    const videos = root.querySelectorAll('video')
    videos.forEach((v) => {
      v.muted = true
      v.defaultMuted = true
      v.play().catch(() => {})
    })

    const vidIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target
          if (entry.isIntersecting) {
            v.muted = true
            v.play().catch(() => {})
          } else {
            v.pause()
          }
        })
      },
      { threshold: 0.1 }
    )
    videos.forEach((v) => vidIo.observe(v))

    // Smooth scroll parallax with requestAnimationFrame throttling
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rls = [...root.querySelectorAll('.rl')]
    let ticking = false

    const updateParallax = () => {
      const vh = window.innerHeight
      rls.forEach((el) => {
        const b = el.getBoundingClientRect()
        const q = (b.top + b.height / 2 - vh / 2) / vh
        el.style.transform = `translate3d(0, ${q * (+el.dataset.sp)}px, 0)`
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    if (!reduce) {
      window.addEventListener('scroll', onScroll, { passive: true })
      updateParallax()
    }

    return () => {
      rvIo.disconnect()
      vidIo.disconnect()
      if (!reduce) {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [isPage])

  return (
    <section
      id="studio"
      className={`btm-section ${isPage ? 'cs-page-view' : ''}`}
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
              Behind the Mic · Studio Gallery &amp; Sound Spaces
            </span>
          </div>
        )}

        <div className="sh">
          <div>
            <span className="k mono rv">Behind the mic / The studio</span>
            <h2 className="rv">
              Where the <em>sound</em> is made.
            </h2>
          </div>
          <p className="rv">
            Warm light, good glass, an empty chair waiting for the next guest.
          </p>
        </div>

        <div className="reels" id="reels">
          {REELS.map((r) => (
            <div className="rl" data-sp={r.sp} key={r.tag}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={r.poster}
                src={r.src}
              />
              <span>
                <small>{r.tag}</small>
                {r.label}
              </span>
            </div>
          ))}
        </div>

        {!isPage && onNavigate && (
          <div className="sec-more-row rv" style={{ marginTop: '80px' }}>
            <p className="sec-more-note mono">
              Multi-angle 4K broadcast array · Acoustic sound isolation · Live monitoring
            </p>
            <button
              type="button"
              className="btn gold"
              onClick={() => onNavigate('studio')}
            >
              <span>Explore Full Studio Gallery</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
