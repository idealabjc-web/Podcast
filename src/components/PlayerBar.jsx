import { E, fmt } from '../data.js'

export default function PlayerBar({ player }) {
  const { cur, visible, playing, t, toggle } = player
  const e = E[cur], pct = Math.min(100, (t / ((e.m || 45) * 60)) * 100)
  return (
    <div id="pbar" className={visible ? 'on' : ''}>
      <button className="pp" onClick={toggle} aria-label="Play or pause">{playing ? '❚❚' : '▶'}</button>
      <div><b>{e.n === e.g ? e.g : `${e.n} — ${e.g}`}</b><div className="t"><i style={{ width: `${pct}%` }} /></div></div>
      <time>{fmt(t)}</time>
    </div>
  )
}
