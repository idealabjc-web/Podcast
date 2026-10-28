import { useEffect, useRef, useState, useMemo } from 'react'
import { E, P } from '../data.js'
import studioRecWebp from '../img/podcast-studio-recording.webp'
import loungeWebp from '../img/podcast-green-room-lounge.webp'
import controlWebp from '../img/podcast-control-room.webp'

export default function Praise() {
  const [i, setI] = useState(0)
  const hold = useRef(false)
  useEffect(() => {
    const id = setInterval(() => { if (!hold.current) setI((v) => (v + 1) % P.length) }, 4800)
    return () => clearInterval(id)
  }, [])

  const tiles = useMemo(() => {
    const list = [
      ...E.slice(0, 3),
      { img: studioRecWebp, g: 'Broadcast Desk', b: '#1b3a2b' },
      ...E.slice(3, 7),
      { img: loungeWebp, g: 'Dr. P Studio Lounge', b: '#172b21' },
      ...E.slice(7, 11),
      { img: controlWebp, g: 'Control Booth', b: '#141a17' },
      ...E.slice(11),
    ]
    return [...list, ...list]
  }, [])

  return (
    <section className="dark" id="praise">
      <span className="tick">Behind the mic &amp; in the studio</span>
      <div className="gal"><div className="gt">
        {tiles.map((e, k) => <i key={k} style={{ background: e.b }}>{e.img && <img src={e.img} alt={e.g} loading="lazy" />}<em>{e.g}</em></i>)}
      </div></div>
      <span className="tick" style={{ marginTop: 110 }}>Listener notes</span>
      <div className="stage" onMouseEnter={() => (hold.current = true)} onMouseLeave={() => (hold.current = false)}>
        <div className="track" style={{ '--i': i }}>
          {P.map(([q, w], k) => (
            <div key={q} className={`arch ${k === i ? 'on' : ''}`} data-c="Read" onClick={() => setI(k)}>
              <em>”</em><h3>{q}</h3><p>{w}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="ctrl">
        <div className="pb"><i style={{ width: `${((i + 1) / P.length) * 100}%` }} /></div>
        <div>
          <button onClick={() => setI((i + P.length - 1) % P.length)} aria-label="Previous">←</button>
          <button onClick={() => setI((i + 1) % P.length)} aria-label="Next">→</button>
        </div>
      </div>
    </section>
  )
}
