import { useEffect, useState } from 'react'
import { E } from '../data.js'

export default function Header({ active, onSelectEpisode }) {
  const [dd, setDd] = useState(false)
  const [nav, setNav] = useState(false)
  const e = E[active]
  useEffect(() => {
    const k = (ev) => { if (ev.key === 'Escape') { setDd(false); setNav(false) } }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])
  const goFilm = (i) => {
    onSelectEpisode?.(i)
    const el = document.getElementById('eps')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top, left: 0, behavior: 'smooth' })
    }
    setDd(false)
  }
  return (
    <header>
      <a className="logo d" href="#top">GR.</a>
      <div className="hr">
        <div className="tab">
          <button data-c="Open" onClick={() => setDd(!dd)} aria-expanded={dd}>
            <i style={{ background: e.b }}>{e.img && <img src={e.img} alt="" />}</i><span>{e.n}</span><small>▾</small>
          </button>
          <div className="tags"><b>Episode</b><b>{String(active + 1).padStart(2, '0')}</b><b>{e.m ? `${e.m} min` : 'Soon'}</b></div>
          <div className={`dd ${dd ? 'on' : ''}`}>
            {E.map((x, i) => <button key={x.g} onClick={() => goFilm(i)}><i style={{ background: x.b }}>{x.img && <img src={x.img} alt="" />}</i>{x.n}</button>)}
          </div>
        </div>
        <button className={`burger ${nav ? 'on' : ''}`} onClick={() => setNav(!nav)} aria-label="Menu"><span /></button>
        <nav className={`nav ${nav ? 'on' : ''}`} onClick={() => setNav(false)}>
          <a href="#series">Series Banner</a><a href="#eps">Episodes</a><a href="#latest">Listen</a><a href="#studio">Studio</a><a href="#how">For speakers</a><a href="#praise">Praise</a><a href="#join">Join</a>
        </nav>
      </div>
    </header>
  )
}
