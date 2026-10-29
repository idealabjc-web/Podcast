import { useState } from 'react'
import { E, S } from '../data.js'
import EpisodeStack from './EpisodeStack.jsx'
import HowItWorks from './HowItWorks.jsx'

export default function SpeakersPage({
  active = 0,
  onChangeActive,
  player,
  onProfile,
  onNavigate,
}) {
  const [filter, setFilter] = useState('all')

  const allTags = ['all', ...new Set(S.flatMap((s) => s.tags).filter(Boolean))]

  const filteredSpeakers = E.map((e, i) => ({ ...e, profile: S[i], index: i })).filter((item) => {
    if (filter === 'all') return true
    return item.profile.tags.includes(filter)
  })

  return (
    <div className="speakers-page cs-page-view">
      <div className="wrap">
        <div className="page-top-bar rv in">
          <button
            type="button"
            className="page-back-btn mono"
            onClick={() => onNavigate?.('home')}
          >
            ← Back to Home
          </button>
          <span className="page-meta-pill mono">
            {E.length} Keynote Voices · Season 01
          </span>
        </div>

        {/* Theatrical Page Header */}
        <div className="sh" style={{ marginBottom: '40px' }}>
          <div>
            <span className="k mono rv in">Ensemble / Keynote Speakers</span>
            <h2 className="rv in">
              The voices <em>behind</em> the curtain.
            </h2>
          </div>
          <p className="rv in">
            Meet the clinicians, educators, authors, and industry pioneers who step into the Dr. P studio before taking the stage.
          </p>
        </div>

        {/* Interactive 3D Stage Carousel (Screenshot 2 Animation) */}
        <div style={{ marginBottom: '60px' }}>
          <EpisodeStack
            active={active}
            onChangeActive={onChangeActive}
            player={player}
            onProfile={onProfile}
            onOpenCallSheet={() => onNavigate?.('call-sheet')}
          />
        </div>

        {/* Directory Header & Filter tags bar */}
        <div className="sh" style={{ marginBottom: '24px' }}>
          <div>
            <span className="k mono rv in">Directory &amp; Index</span>
            <h3 className="rv in" style={{ fontFamily: 'var(--display)', fontSize: '2.2rem', margin: 0 }}>
              All {E.length} Season One Keynotes
            </h3>
          </div>
        </div>

        <div className="spk-filter-bar rv in">
          <span className="mono" style={{ color: 'var(--mute)', fontSize: '0.72rem' }}>
            Filter by topic:
          </span>
          <div className="spk-filter-pills">
            {allTags.slice(0, 8).map((t) => (
              <button
                key={t}
                type="button"
                className={`spk-filter-btn ${filter === t ? 'is-active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t === 'all' ? 'All Speakers' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Arched Roman Portrait Cards Directory matching Image 2 */}
        <div className="speakers-arched-grid">
          {filteredSpeakers.map((spk) => (
            <article
              key={spk.g}
              className="spk-arch-card rv in"
              onClick={() => onProfile?.(spk.index)}
            >
              {/* Arched Roman Portrait Frame */}
              <div className="spk-arch-portrait" style={{ background: spk.b }}>
                {spk.img && (
                  <img
                    src={spk.img}
                    alt={`Portrait of ${spk.g}`}
                    loading="lazy"
                  />
                )}
                <span className="spk-arch-num mono">
                  EP {String(spk.index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Speaker Meta Information */}
              <div className="spk-arch-info">
                <span className="spk-arch-topic mono">{spk.c || 'Keynote Session'}</span>
                <h3 className="spk-arch-name">{spk.g}</h3>
                <p className="spk-arch-role">{spk.profile.r || spk.profile.o}</p>

                <div className="spk-arch-actions">
                  <button
                    type="button"
                    className="btn"
                    style={{ padding: '8px 14px', fontSize: '0.68rem' }}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      onProfile?.(spk.index)
                    }}
                  >
                    Profile →
                  </button>
                  <button
                    type="button"
                    className="btn gold"
                    style={{ padding: '8px 14px', fontSize: '0.68rem' }}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      player?.play?.(spk.index)
                    }}
                  >
                    ▶ Listen
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Speaker Guest Application Process */}
        <div style={{ marginTop: '90px' }}>
          <HowItWorks onProfile={onProfile} onNavigate={onNavigate} isPage={true} />
        </div>
      </div>
    </div>
  )
}
