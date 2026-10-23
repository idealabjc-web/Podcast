import { E, S } from '../data.js'
import RemindButton from './RemindButton.jsx'

const STEPS = [
  ['01', 'Apply', "Tell us your topic and one story you'd like to share. Takes 5 minutes."],
  ['02', 'Prep call', 'A short call to shape your outline. No scripts, no slides.'],
  ['03', 'Record', 'About 40 minutes in the green room. We handle all the audio.'],
  ['04', 'Publish', 'Your episode, clips and profile page go live, with your next sessions listed.'],
]
const FAQ = [
  ['Do I need experience?', 'No. Many guests are first-time speakers. Nerves are welcome.'],
  ['How long is a session?', 'Recording takes about 40 to 50 minutes. The prep call is 15.'],
  ['Can I promote my own sessions?', 'Yes. Upcoming sessions appear on your profile and in the Coming up list, with a reminder button for listeners.'],
]

export default function HowItWorks({ onProfile }) {
  const upcoming = S.flatMap((s, i) => s.up.map((u) => ({ ...u, i })))
  return (
    <section className="how" id="how"><div className="hw">
      <small className="eyebrow" style={{ color: '#7a5a2c' }}>For speakers</small>
      <h2 className="hd">Tap any episode card to meet the speaker</h2>
      <p style={{ maxWidth: 600, lineHeight: 1.7, margin: '14px 0 0' }}>Every guest has a profile with their story, key lessons, this episode, and the sessions they're hosting next.</p>
      <div className="steps">{STEPS.map(([n, h, p]) => <div key={n}><b>{n}</b><h4>{h}</h4><p>{p}</p></div>)}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
        <h2 className="hd" style={{ margin: 0 }}>Meet the speakers</h2>
        <a href="#series" className="btn" style={{ borderColor: '#111', padding: '8px 18px', fontSize: '0.68rem' }} data-c="Scroll">✦ View Official Series Banner</a>
      </div>
      <div className="spk">
        {E.map((e, i) => (
          <button className="spc" key={e.g} data-c="Profile" onClick={() => onProfile(i)} aria-label={`Open profile of ${e.g}`}>
            <span className="spi" style={{ background: e.b }}>{e.img && <img src={e.img} alt="" loading="lazy" />}</span>
            <b>{e.g}</b>{S[i].r && <small>{S[i].r}</small>}
          </button>
        ))}
      </div>
      <h2 className="hd">Coming up</h2>
      <div style={{ margin: '24px 0 60px' }}>
        {upcoming.length === 0 && <p className="note">New sessions will be listed here as soon as they're scheduled.</p>}
        {upcoming.map((u) => (
          <div className="sess" key={u.t}>
            <time>{u.d}</time>
            {E[u.i].img && <img className="av" src={E[u.i].img} alt="" loading="lazy" />}
            <div style={{ flex: 1 }}><b>{u.t}</b><br /><small>{E[u.i].g} · {u.k}</small></div>
            <RemindButton />
            <button className="rm" onClick={() => onProfile(u.i)}>Profile</button>
          </div>
        ))}
      </div>
      <h2 className="hd" style={{ marginBottom: 14 }}>Good to know</h2>
      {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      <div style={{ marginTop: 34 }}><a className="btn gold" href="mailto:hello@thegreenroom.fm?subject=Guest%20application" data-c="Open">Apply to be a guest →</a></div>
    </div></section>
  )
}
