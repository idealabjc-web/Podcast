import { useEffect, useRef, useState } from 'react'
import { E, S } from '../data.js'
import RemindButton from './RemindButton.jsx'

function Ask({ name }) {
  const [sent, setSent] = useState(false)
  return sent
    ? <b>Thanks! Your question is queued for the next session.</b>
    : <div className="ask"><input placeholder="Your question…" aria-label="Your question" /><button className="btn gold" onClick={() => setSent(true)}>Send</button></div>
}

export default function ProfilePanel({ index, onClose, onNav, player }) {
  const open = index !== null
  const last = useRef(0)
  const panel = useRef(null)
  if (open) last.current = index
  const i = last.current, e = E[i], s = S[i], first = [e.f || e.g.split(' ')[0]]
  const initials = e.g.replace(/^Dr\.\s*/, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')
  const role = [s.r, s.o].filter(Boolean).join(' · ')
  const scrollPos = useRef(0)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (open) {
      if (!wasOpen.current) {
        scrollPos.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
        wasOpen.current = true
      }
      document.body.style.overflow = 'hidden'
      if (panel.current) panel.current.scrollTop = 0
    } else {
      if (wasOpen.current) {
        wasOpen.current = false
        document.body.style.overflow = ''
        const targetY = scrollPos.current
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' })
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' })
        })
      }
    }
  }, [open])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <button className={`pfx ${open ? 'on' : ''}`} data-c="Close" aria-label="Close profile" onClick={onClose}>✕</button>
      <div id="pfw" ref={panel} className={open ? 'on' : ''} role="dialog" aria-label="Speaker profile">
        <div id="pf" key={i}>
          <div className="pfg">
            <div className="pfp d" style={{ background: e.b }}>
              {e.img ? <img src={e.img} alt={`Portrait of ${e.g}`} /> : initials}
            </div>
            <div>
              <small className="eyebrow" style={{ color: '#7a5a2c' }}>Speaker profile</small>
              <h2 className="d pfh">{e.g}</h2>
              {role && <p style={{ margin: '0 0 14px', fontWeight: 600 }}>{role}</p>}
              {s.tags.length > 0 && <div>{s.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>}
              <p className="bio">{s.bio || `Full profile for ${e.g} is coming soon.`}</p>
              <div className="pfa">
                <button className="btn gold" data-c="Play" onClick={() => player.play(i)}>▶ Play episode</button>
                <button className="btn" onClick={() => onNav(-1)}>← Prev speaker</button>
                <button className="btn" onClick={() => onNav(1)}>Next speaker →</button>
              </div>
            </div>
          </div>
          <div className="pfs">
            <div>
              {s.tk.length > 0 && <>
                <h3 className="sh">What you'll take away</h3>
                {s.tk.map((t, k) => <div className="tk" key={t}><b>{String(k + 1).padStart(2, '0')}</b>{t}</div>)}
              </>}
              <h3 className="sh">This episode</h3>
              <div className="sess"><time>{e.y}</time><div style={{ flex: 1 }}><b>{e.n}</b><br /><small>{[e.m && `${e.m} min`, e.c].filter(Boolean).join(' · ') || 'Details coming soon'}</small></div><button className="rm" onClick={() => player.play(i)}>Play</button></div>
            </div>
            <div>
              <h3 className="sh">Upcoming sessions</h3>
              {s.up.map((u) => <div className="sess" key={u.t}><time>{u.d}</time><div style={{ flex: 1 }}><b>{u.t}</b><br /><small>{u.k}</small></div><RemindButton /></div>)}
              <p className="note">More sessions with {first[0]} will appear here as they're scheduled.</p>
              <h3 className="sh">Ask {first[0]} a question</h3>
              <Ask name={first[0]} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
