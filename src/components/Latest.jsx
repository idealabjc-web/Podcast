import { useState } from 'react'
import { E, CREDITS } from '../data.js'
import Reveal from './Reveal.jsx'
import controlRoomWebp from '../img/podcast-control-room.webp'
import drpVideo from '../img/drp-reel-4.mp4'

export default function Latest() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="paper" id="latest">
      <Reveal className="ruled">
        <small>Latest episode trailer</small>
        <div className="rules"><h2 className="d">{E[0].n}</h2></div>
        <div className="arrow">↓</div>
      </Reveal>

      <Reveal 
        className={`trailer ${isPlaying ? 'has-video' : ''}`} 
        data-c={isPlaying ? '' : 'Watch'} 
        onClick={() => { if (!isPlaying) setIsPlaying(true) }}
      >
        {isPlaying ? (
          <div className="trailer-video-wrap" onClick={(e) => e.stopPropagation()}>
            <video 
              src={drpVideo} 
              controls 
              autoPlay 
              playsInline 
              className="trailer-video" 
            />
            <button 
              className="trailer-close-btn"
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(false)
              }}
              title="Close video"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <div className="bg" style={{ background: E[0].b }}>
              {E[0].img && <img src={E[0].img} alt={`Portrait of ${E[0].g}`} />}
            </div>
            <div className="grain" />
            <svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z" /></svg>
            <b>Watch Studio<br />Reel</b>
          </>
        )}
      </Reveal>

      <Reveal className="credits">
        <div className="pic" style={{ background: '#0b0f0d' }}>
          <img src={controlRoomWebp} alt="Podcast audio control booth mixing desk" className="pic-img" loading="lazy" />
          <div className="pic-overlay" />
          <b className="d">Sound &amp;<br />Control</b>
        </div>
        <div className="cg">{CREDITS.map(([r, n]) => <div className="cell" key={r}><small>{r}</small><b>{n}</b></div>)}</div>
      </Reveal>
    </section>
  )
}
