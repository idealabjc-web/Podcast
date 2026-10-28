import { useMemo, useEffect, useRef, useState } from 'react'
import { E } from '../data.js'
import studioStage from '../img/drp-studio-backdrop.jpg'
import broadcastDesk from '../img/podcast-studio-recording.jpg'
import studioLounge from '../img/podcast-green-room-lounge.jpg'
import controlBooth from '../img/podcast-control-room.jpg'

const HERO_SLIDES = [
  {
    src: studioStage,
    alt: 'The Dr. P Main Broadcast Set with gold signature wall and luxury armchairs',
    title: 'Main Broadcast Set',
    tag: 'Official Stage',
  },
  {
    src: broadcastDesk,
    alt: 'Professional broadcast microphone on recording desk',
    title: 'The Broadcast Desk',
    tag: 'Acoustic Suite',
  },
  {
    src: studioLounge,
    alt: 'Private backstage Dr. P podcast lounge and hospitality suite',
    title: 'Dr. P Studio Lounge',
    tag: 'Pre-Show Suite',
  },
  {
    src: controlBooth,
    alt: 'Audio engineering mixing console booth',
    title: 'Sound & Control Booth',
    tag: 'Mastering Suite',
  },
]

// Floating Studio Production Badges (Clean, no speaker photos)
const STUDIO_CAPSULES = [
  { icon: '🎙️', title: 'Broadcast Desk', sub: '4K Condenser Mics', pos: 'top-left', delay: '0s' },
  { icon: '🛋️', title: 'The Main Stage', sub: 'Signature Gold Wall', pos: 'bottom-left', delay: '1.2s' },
  { icon: '🎚️', title: 'Control Booth', sub: 'Analog Mastering Console', pos: 'top-right', delay: '0.6s' },
  { icon: '✨', title: '17 Keynote Voices', sub: 'Unscripted Dialogue', pos: 'bottom-right', delay: '1.8s' },
]

export default function Hero({ player }) {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHoveringWave, setIsHoveringWave] = useState(false)

  // Auto-scrolling studio background carousel (every 4.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Waveform bars with calculated idle wave heights and animation delays
  const bars = useMemo(() => Array.from({ length: 52 }, (_, i) => {
    const waveSin = Math.sin(i * 0.28) * 0.5 + 0.5
    return {
      d: (i * 65) % 1100,
      idleH: 18 + waveSin * 48,
      playH: 15 + Math.abs(Math.sin(i * 0.55)) * 82,
    }
  }), [])

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

  const activeSlideData = HERO_SLIDES[currentSlide]

  return (
    <>
      <section 
        className="hero" 
        id="hero" 
        ref={heroRef}
        onMouseMove={handleMouseMove}
      >
        {/* Cinematic Auto-Scrolling Studio Carousel (Clear Studio Visibility) */}
        <div className="hero-backdrop" aria-hidden="true">
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={slide.title} 
              className={`hero-slide ${idx === currentSlide ? 'is-active' : ''}`}
            >
              <img 
                src={slide.src} 
                alt={slide.alt} 
                className="hero-backdrop-img"
                style={{
                  transform: `translate(${(mousePos.x - 0.5) * -18}px, ${(mousePos.y - 0.5) * -14}px) scale(1.06)`,
                }}
              />
            </div>
          ))}
          <div className="hero-backdrop-vignette" />
          <div className="hero-backdrop-ambient-glow" />

          {/* Interactive Carousel HUD */}
          <div className="hero-carousel-hud" onClick={(e) => e.stopPropagation()}>
            <span className="hero-carousel-tag">
              ● {activeSlideData.tag} · {activeSlideData.title}
            </span>
            <div className="hero-carousel-dots">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  className={`hero-dot ${idx === currentSlide ? 'is-active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  title={`View ${HERO_SLIDES[idx].title}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Absolute Background FX Layer with Floating Studio Elements */}
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

          {/* Floating Studio Production Capsules */}
          <div className="hero-floating-guests">
            {STUDIO_CAPSULES.map(({ icon, title, sub, pos, delay }) => (
              <div 
                key={title} 
                className={`hero-guest-orb ${pos}`}
                style={{ animationDelay: delay }}
              >
                <div className="hero-orb-ring" />
                <div className="hero-orb-icon">{icon}</div>
                <div className="hero-orb-info">
                  <b>{title}</b>
                  <small>{sub}</small>
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
            <span className="hero-badge-sub">{E.length} EXCLUSIVE CONVERSATIONS</span>
          </div>

          <p className="eyebrow hero-eyebrow-animated">
            <span>A podcast about the minutes before you speak</span>
          </p>

          {/* Signature Brand Title */}
          <h1 className="d hero-title-animated drp-hero-title">
            <span className="l">
              <span className="hero-shimmer-text drp-hero-line1">
                <span className="drp-name-dr">Dr.</span>
                <span className="drp-name-p">P</span>
              </span>
            </span>
            <span className="l">
              <span className="drp-hero-line2">PODCAST</span>
            </span>
          </h1>

          {/* Live Responsive Soundwave Visualizer */}
          <div 
            className="wave hero-wave-active is-idle"
            onMouseEnter={() => setIsHoveringWave(true)}
            onMouseLeave={() => setIsHoveringWave(false)}
            onClick={() => player?.play?.(0, "The Dr. P Podcast episodes and videos will be available soon! Recording is currently underway.")}
            title="Episodes will be available soon"
            role="button"
            tabIndex={0}
            aria-label="Episodes will be available soon. Click for status."
          >
            {bars.map((b, i) => (
              <i 
                key={i} 
                style={{ 
                  animationDelay: `${b.d}ms`, 
                  height: `${b.idleH}%`,
                }} 
              />
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="hero-actions">
            <button 
              className="btn gold btn-pulse hero-video-cta" 
              data-c="Watch Video" 
              onClick={() => window.dispatchEvent(new CustomEvent('open-backstage-story'))}
            >
              <span className="btn-icon">▶</span>
              <span>Watch Studio Reel (Video)</span>
            </button>
            <button 
              className="btn hero-audio-cta" 
              data-c="Play" 
              onClick={() => player?.play?.(0, "The Dr. P Podcast audio episodes will be available soon! Recording is currently underway.")}
            >
              <span>Podcast Audio (Available Soon)</span>
            </button>
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
