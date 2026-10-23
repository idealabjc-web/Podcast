import { useMemo, useEffect, useRef, useState } from 'react'
import { E } from '../data.js'

export default function Hero({ player }) {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHoveringWave, setIsHoveringWave] = useState(false)

  // Waveform bars with calculated idle wave heights and animation delays
  const bars = useMemo(() => Array.from({ length: 52 }, (_, i) => {
    const waveSin = Math.sin(i * 0.28) * 0.5 + 0.5
    return {
      d: (i * 65) % 1100,
      idleH: 18 + waveSin * 48,
      playH: 15 + Math.abs(Math.sin(i * 0.55)) * 82,
    }
  }), [])

  // Floating guest spheres on the periphery
  const floatingGuests = useMemo(() => [
    { guest: E[0], role: 'Featured Speaker', delay: '0s', pos: 'top-left' },
    { guest: E[4], role: 'Keynote Speaker', delay: '1.2s', pos: 'bottom-left' },
    { guest: E[8], role: 'Special Guest', delay: '0.6s', pos: 'top-right' },
    { guest: E[6], role: 'First-Timer Voice', delay: '1.8s', pos: 'bottom-right' },
  ], [])

  const names = [...E, ...E].map((e) => (e.n === e.g ? `${e.g} ●` : `${e.n} ● ${e.g} ●`)).join(' ')

  // Ambient theatrical stage dust & golden light particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle pool
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.7 + 0.3,
      alphaSpeed: Math.random() * 0.015 + 0.005,
      hue: Math.random() > 0.4 ? '45, 80%, 65%' : '150, 40%, 60%',
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.alpha += p.alphaSpeed

        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed
        }

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, ${Math.max(0, p.alpha)})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(227, 190, 108, 0.4)'
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Mouse move handler for interactive parallax & spotlight
  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }

  return (
    <>
      <section 
        className="hero" 
        id="hero" 
        ref={heroRef}
        onMouseMove={handleMouseMove}
      >
        {/* Absolute Background FX Layer */}
        <div className="hero-bg-fx" aria-hidden="true">
          <div 
            className="hero-cursor-spotlight" 
            style={{
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
            }}
          />
          <div className="hero-spot-beam hero-spot-1" />
          <div className="hero-spot-beam hero-spot-2" />
          <div className="hero-spot-beam hero-spot-3" />
          <canvas ref={canvasRef} className="hero-canvas" />

          <div className="hero-floating-guests">
            {floatingGuests.map(({ guest, role, delay, pos }) => (
              <div 
                key={guest.g} 
                className={`hero-guest-orb ${pos}`}
                style={{ animationDelay: delay }}
              >
                <div className="hero-orb-ring" />
                <div className="hero-orb-avatar" style={{ background: guest.b }}>
                  {guest.img && <img src={guest.img} alt="" loading="lazy" />}
                </div>
                <div className="hero-orb-info">
                  <b>{guest.g}</b>
                  <small>{role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Hero Content */}
        <div className="hero-content">
          {/* Studio On-Air Badge */}
          <div className="hero-studio-badge">
            <span className="hero-rec-dot" />
            <span className="hero-badge-title">ON AIR · LIVE BACKSTAGE</span>
            <span className="hero-badge-divider">|</span>
            <span className="hero-badge-sub">14 EXCLUSIVE CONVERSATIONS</span>
          </div>

          <p className="eyebrow hero-eyebrow-animated">
            <span>A podcast about the minutes before you speak</span>
          </p>

          {/* Title with Shimmer and Depth */}
          <h1 className="d hero-title-animated">
            <span className="l">
              <span className="hero-shimmer-text">The Green</span>
            </span>
            <span className="l">
              <span className="hero-shimmer-text gold-text">Room</span>
            </span>
          </h1>

          <p className="hero-desc">
            Honest backstage conversations with keynote speakers, performers and first-timers — recorded in the twenty intense minutes before the stage lights come up.
          </p>

          {/* Live Responsive Soundwave Visualizer */}
          <div 
            className={`wave hero-wave-active ${player?.playing ? 'is-playing' : 'is-idle'} ${isHoveringWave ? 'is-hover' : ''}`}
            onMouseEnter={() => setIsHoveringWave(true)}
            onMouseLeave={() => setIsHoveringWave(false)}
            onClick={() => player?.play?.(0)}
            title={player?.playing ? 'Click to pause' : 'Click to play sound'}
            role="button"
            tabIndex={0}
            aria-label={player?.playing ? 'Audio visualizer playing. Click to pause.' : 'Audio visualizer idle. Click to play.'}
          >
            {bars.map((b, i) => (
              <i 
                key={i} 
                style={{ 
                  animationDelay: `${b.d}ms`, 
                  height: `${player?.playing ? b.playH : b.idleH}%`,
                }} 
              />
            ))}
          </div>

          {/* Interactive Action Buttons */}
          <div className="hero-actions">
            <button 
              className="btn gold btn-pulse" 
              data-c="Play" 
              onClick={() => player?.play?.(0)}
            >
              <span className="btn-icon">{player?.playing ? '❚❚' : '▶'}</span>
              <span>{player?.playing ? 'Pause episode' : 'Play latest episode'}</span>
            </button>
            {' '}&nbsp;{' '}
            <a className="btn btn-shimmer" href="#series" data-c="Scroll">
              <span>Meet the cast ✦</span>
            </a>
            {' '}&nbsp;{' '}
            <a className="btn" href="#eps" data-c="Scroll">
              Browse episodes ↓
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="mq">
        <div>{names} {names}</div>
      </div>
    </>
  )
}
