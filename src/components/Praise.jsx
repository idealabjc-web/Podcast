import { useEffect, useRef, useState } from 'react'
import { P } from '../data.js'

export default function Praise() {
  const [i, setI] = useState(0)
  const hold = useRef(false)
  useEffect(() => {
    const id = setInterval(() => { if (!hold.current) setI((v) => (v + 1) % P.length) }, 4800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="dark" id="praise">
      <span className="tick">Listener notes</span>
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
