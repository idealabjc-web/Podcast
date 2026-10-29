import { useEffect, useRef, useState } from 'react'

export default function CurtainCall() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    // Ensure background video plays reliably
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      const p = video.play()
      if (p !== undefined) {
        p.catch(() => {
          const resume = () => {
            if (video) {
              video.muted = true
              video.play().catch(() => {})
            }
            window.removeEventListener('scroll', resume)
            window.removeEventListener('pointerdown', resume)
          }
          window.addEventListener('scroll', resume, { passive: true, once: true })
          window.addEventListener('pointerdown', resume, { passive: true, once: true })
        })
      }
    }

    // Reveal on scroll (.rv -> .rv.in)
    const rvEls = root.querySelectorAll('.rv')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    rvEls.forEach((el) => io.observe(el))

    // Pause video off screen
    const vio = new IntersectionObserver(
      ([entry]) => {
        if (!video) return
        if (entry.isIntersecting) {
          video.muted = true
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )
    if (video) vio.observe(video)

    // Magnetic buttons (.mag)
    const magBtns = [...root.querySelectorAll('.mag')]
    const onMove = (e) => {
      const b = e.currentTarget
      const r = b.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) * 0.22
      const dy = (e.clientY - r.top - r.height / 2) * 0.35
      b.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const onLeave = (e) => {
      e.currentTarget.style.transform = ''
    }
    magBtns.forEach((b) => {
      b.addEventListener('pointermove', onMove)
      b.addEventListener('pointerleave', onLeave)
    })

    return () => {
      io.disconnect()
      vio.disconnect()
      magBtns.forEach((b) => {
        b.removeEventListener('pointermove', onMove)
        b.removeEventListener('pointerleave', onLeave)
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const v = email.trim()
    if (!/^\S+@\S+\.\S+$/.test(v)) {
      setMsg('Enter a valid email address, like name@example.com.')
      return
    }
    try {
      const saved = JSON.parse(localStorage.getItem('drp_subscribers') || '[]')
      if (!saved.includes(v)) {
        saved.push(v)
        localStorage.setItem('drp_subscribers', JSON.stringify(saved))
      }
    } catch {
      // ignore storage errors
    }
    setEmail('')
    setMsg("You're on the list.")
  }

  return (
    <section id="subscribe" className="cc-section" ref={sectionRef}>
      <div className="wrap">
        <div className="call rv">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/reel_b.jpg"
            src="/media/reel_b.mp4"
          />
          <span className="k mono">Curtain call</span>
          <h2>
            Take a <em>seat.</em>
            <br />
            The show is about to start.
          </h2>
          <p>
            Subscribe wherever you listen, and get each episode the moment it leaves the stage door.
          </p>
          <div className="plat">
            <a
              className="btn p mag"
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify
            </a>
            <a
              className="btn mag"
              href="https://podcasts.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple Podcasts
            </a>
            <a
              className="btn mag"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
          <form className="nl" id="nl" noValidate onSubmit={handleSubmit}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for the backstage pass"
              aria-label="Email address"
              required
            />
            <button className="btn p" type="submit">
              Join the list
            </button>
          </form>
          <div className="msg" id="msg" role="status" aria-live="polite">
            {msg}
          </div>
        </div>
      </div>
    </section>
  )
}

