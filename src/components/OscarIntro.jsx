import { useEffect, useRef, useState } from 'react'

/* Timeline (ms) for the award-ceremony opening */
const T = { spot: 150, reveal: 1100, curtains: 3600, done: 5100 }

/* Gold laurel branch drawn as SVG (mirrored for the right side) */
const CX = 70, CY = 62, R = 50
const pt = (deg) => [CX + Math.cos((deg * Math.PI) / 180) * R, CY + Math.sin((deg * Math.PI) / 180) * R]

function Laurel({ flip = false }) {
  const n = 11
  const leaves = Array.from({ length: n }, (_, i) => {
    const deg = 82 + i * 16 // from bottom, round the left side, up to the top
    const [x, y] = pt(deg)
    const s = 1 - i * 0.045 // leaves taper toward the tip
    return (
      <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg + 90}) scale(${s.toFixed(2)})`}>
        <ellipse cx="-3" cy="-7" rx="3.4" ry="8.5" transform="rotate(-38)" />
        <ellipse cx="3" cy="-7" rx="3.4" ry="8.5" transform="rotate(38)" />
      </g>
    )
  })
  const [sx, sy] = pt(82)
  const [ex, ey] = pt(82 + (n - 1) * 16)
  return (
    <svg className={`oi-laurel ${flip ? 'flip' : ''}`} viewBox="0 0 100 124" aria-hidden="true">
      <defs>
        <linearGradient id="oiGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".45" stopColor="#e3be6c" />
          <stop offset="1" stopColor="#9c7428" />
        </linearGradient>
      </defs>
      <path d={`M${sx.toFixed(1)} ${sy.toFixed(1)} A${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`} fill="none" stroke="url(#oiGold)" strokeWidth="1.8" strokeLinecap="round" />
      <g fill="url(#oiGold)">{leaves}</g>
    </svg>
  )
}

export default function OscarIntro({ onReveal, onDone }) {
  const [stage, setStage] = useState(0)
  const canvasRef = useRef(null)
  const revealed = useRef(false)

  const reveal = () => {
    if (revealed.current) return
    revealed.current = true
    onReveal?.()
  }

  const skip = () => {
    reveal()
    setStage(3)
    setTimeout(() => onDone?.(), 1100)
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { reveal(); onDone?.(); return }
    const ids = [
      setTimeout(() => setStage(1), T.spot),
      setTimeout(() => setStage(2), T.reveal),
      setTimeout(() => { setStage(3); reveal() }, T.curtains),
      setTimeout(() => onDone?.(), T.done),
    ]
    const key = (e) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') skip() }
    addEventListener('keydown', key)
    return () => { ids.forEach(clearTimeout); removeEventListener('keydown', key) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Gold confetti burst at the moment of the reveal */
  useEffect(() => {
    if (stage !== 2) return
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = (c.width = innerWidth * dpr)
    const h = (c.height = innerHeight * dpr)
    const golds = ['#fff3c4', '#f6d98b', '#e3be6c', '#c49942', '#ffffff']
    const bits = Array.from({ length: 170 }, () => {
      const a = Math.random() * Math.PI * 2
      const s = (Math.random() * 9 + 4) * dpr
      return {
        x: w / 2, y: h * 0.48,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6 * dpr,
        r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        sz: (Math.random() * 6 + 3) * dpr, c: golds[(Math.random() * golds.length) | 0],
        life: 1,
      }
    })
    let id
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      let alive = 0
      bits.forEach((b) => {
        b.vy += 0.22 * dpr; b.vx *= 0.985; b.vy *= 0.985
        b.x += b.vx; b.y += b.vy; b.r += b.vr; b.life -= 0.006
        if (b.life <= 0 || b.y > h + 20) return
        alive++
        ctx.save()
        ctx.globalAlpha = Math.max(0, b.life)
        ctx.translate(b.x, b.y); ctx.rotate(b.r)
        ctx.fillStyle = b.c
        ctx.fillRect(-b.sz / 2, -b.sz / 4, b.sz, b.sz / 2 * Math.abs(Math.cos(b.r * 2)) + 1)
        ctx.restore()
      })
      if (alive) id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [stage])

  return (
    <div className={`oi s${stage}`} role="dialog" aria-label="Dr. P Podcast opening">
      {/* Velvet curtains */}
      <div className="oi-curtain left" aria-hidden="true" />
      <div className="oi-curtain right" aria-hidden="true" />
      <div className="oi-valance" aria-hidden="true" />

      {/* Sweeping spotlights */}
      <div className="oi-beam b1" aria-hidden="true" />
      <div className="oi-beam b2" aria-hidden="true" />
      <div className="oi-floor" aria-hidden="true" />

      <canvas ref={canvasRef} className="oi-confetti" aria-hidden="true" />

      {/* Ceremony copy */}
      <div className="oi-stage">
        <p className="oi-kicker">✦ Live from the stage ✦</p>

        <div className="oi-winner">
          <div className="oi-stars" aria-hidden="true">★ ★ ★ ★ ★</div>
          <div className="oi-name-row">
            <Laurel />
            <h2 className="oi-name">
              <span className="oi-dr">Dr.</span><span className="oi-p">P</span>
              <span className="oi-pod">Podcast</span>
            </h2>
            <Laurel flip />
          </div>
          <p className="oi-category">Best Backstage Conversations · Season 2026</p>
        </div>
      </div>

      <button className="oi-skip" onClick={skip} data-c="Skip">Skip intro ›</button>
    </div>
  )
}
