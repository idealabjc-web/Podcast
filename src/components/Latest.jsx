import { E, CREDITS } from '../data.js'
import Reveal from './Reveal.jsx'
import controlRoomWebp from '../img/podcast-control-room.webp'

export default function Latest({ player }) {
  return (
    <section className="paper" id="latest">
      <Reveal className="ruled"><small>Latest episode</small><div className="rules"><h2 className="d">{E[0].n}</h2></div><div className="arrow">↓</div></Reveal>
      <Reveal className="trailer" data-c="Play" onClick={() => player.play(0)}>
        <div className="bg" style={{ background: E[0].b }}>{E[0].img && <img src={E[0].img} alt={`Portrait of ${E[0].g}`} />}</div><div className="grain" />
        <svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z" /></svg><b>Listen<br />now</b>
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
