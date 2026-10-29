import { useEffect, useState } from 'react'
import { E } from '../data.js'

const PAGES = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'speakers', path: '/speakers', label: 'Speakers', badge: `${E.length}` },
  { id: 'call-sheet', path: '/call-sheet', label: 'Call Sheet' },
  { id: 'studio', path: '/studio', label: 'The Studio' },
  { id: 'host', path: '/host', label: 'The Host' },
]

export default function Header({ active, onSelectEpisode, page = 'home', onNavigate }) {
  const [dd, setDd] = useState(false)
  const [nav, setNav] = useState(false)
  const e = E[active]

  useEffect(() => {
    const k = (ev) => {
      if (ev.key === 'Escape') {
        setDd(false)
        setNav(false)
      }
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [])

  const scrollToHash = (hash) => {
    const id = hash.replace(/^#/, '')
    if (!id || id === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top, left: 0, behavior: 'smooth' })
    }
  }

  const handleSectionClick = (ev, hash) => {
    setNav(false)
    if (page !== 'home') {
      ev.preventDefault()
      onNavigate?.('home')
      setTimeout(() => scrollToHash(hash), 80)
    }
  }

  const handlePageClick = (ev, pageId) => {
    ev.preventDefault()
    setNav(false)
    setDd(false)
    onNavigate?.(pageId)
  }

  const goFilm = (i) => {
    onSelectEpisode?.(i)
    setDd(false)
    if (page === 'call-sheet') {
      const row = document.querySelector(`.ep[data-i="${i}"]`)
      if (row) {
        const top = row.getBoundingClientRect().top + window.scrollY - 120
        window.scrollTo({ top, left: 0, behavior: 'smooth' })
      }
      return
    }
    if (page !== 'home') {
      onNavigate?.('home')
      setTimeout(() => scrollToHash('#eps'), 80)
      return
    }
    scrollToHash('#eps')
  }

  return (
    <header>
      <a
        className="logo d drp-logo"
        href="#top"
        aria-label="Dr. P Podcast Home"
        onClick={(ev) => {
          if (page !== 'home') {
            ev.preventDefault()
            onNavigate?.('home')
          }
        }}
      >
        <span className="drp-logo-mark">
          <span className="drp-logo-dr">Dr.</span>
          <span className="drp-logo-p">P</span>
        </span>
        <span className="drp-logo-badge">
          <span className="drp-logo-dot" />
          <span>PODCAST</span>
        </span>
      </a>

      {/* Multi-Page Top Header Navigation Bar */}
      <nav className="hdr-pages-bar" aria-label="Main pages">
        {PAGES.map((p) => {
          const isActive = page === p.id
          return (
            <a
              key={p.id}
              href={p.path}
              className={`hdr-page-link ${isActive ? 'is-active' : ''}`}
              onClick={(ev) => handlePageClick(ev, p.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span>{p.label}</span>
              {p.badge && <small className="hdr-page-badge">{p.badge}</small>}
            </a>
          )
        })}
      </nav>

      <div className="hr">
        <div className="tab">
          <button data-c="Open" onClick={() => setDd(!dd)} aria-expanded={dd}>
            <i style={{ background: e.b }}>{e.img && <img src={e.img} alt="" />}</i>
            <span>{e.n}</span>
            <small>▾</small>
          </button>
          <div className="tags">
            <b>Episode</b>
            <b>{String(active + 1).padStart(2, '0')}</b>
            <b>{e.m ? `${e.m} min` : 'Soon'}</b>
          </div>
          <div className={`dd ${dd ? 'on' : ''}`}>
            {E.map((x, i) => (
              <button key={x.g} onClick={() => goFilm(i)}>
                <i style={{ background: x.b }}>{x.img && <img src={x.img} alt="" />}</i>
                {x.n}
              </button>
            ))}
          </div>
        </div>
        <button className={`burger ${nav ? 'on' : ''}`} onClick={() => setNav(!nav)} aria-label="Menu">
          <span />
        </button>
        <nav className={`nav ${nav ? 'on' : ''}`} onClick={() => setNav(false)}>
          <div className="nav-pages-group">
            <small className="nav-group-label">Pages</small>
            {PAGES.map((p) => (
              <a
                key={p.id}
                href={p.path}
                className={page === p.id ? 'is-active-page' : ''}
                onClick={(ev) => handlePageClick(ev, p.id)}
              >
                {p.label}
              </a>
            ))}
          </div>
          <div className="nav-sections-group">
            <small className="nav-group-label">Sections</small>
            <a href="#series" onClick={(ev) => handleSectionClick(ev, '#series')}>Series Banner</a>
            <a href="#eps" onClick={(ev) => handleSectionClick(ev, '#eps')}>Episodes</a>
            <a href="#latest" onClick={(ev) => handleSectionClick(ev, '#latest')}>Listen</a>
            <a href="#studio" onClick={(ev) => handleSectionClick(ev, '#studio')}>Studio</a>
            <a href="#how" onClick={(ev) => handleSectionClick(ev, '#how')}>For speakers</a>
            <a href="#join" onClick={(ev) => handleSectionClick(ev, '#join')}>Join</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
