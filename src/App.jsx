import { useCallback, useEffect, useState } from 'react'
import { E } from './data.js'
import { usePlayer } from './hooks/usePlayer.js'
import ScrollProgress from './components/ScrollProgress.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import SpeakersBanner from './components/SpeakersBanner.jsx'
import EpisodeStack from './components/EpisodeStack.jsx'
import Latest from './components/Latest.jsx'
import StudioTour from './components/StudioTour.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Praise from './components/Praise.jsx'
import Footer from './components/Footer.jsx'
import PlayerBar from './components/PlayerBar.jsx'
import ProfilePanel from './components/ProfilePanel.jsx'
import OscarIntro from './components/OscarIntro.jsx'
import BackstageStoryPill from './components/BackstageStoryPill.jsx'

export default function App() {
  const player = usePlayer()
  const [active, setActive] = useState(0)
  const [profile, setProfile] = useState(null)
  const [intro, setIntro] = useState(true)
  const onActive = useCallback((i) => setActive(i), [])

  useEffect(() => {
    document.body.classList.toggle('intro-lock', intro)
  }, [intro])
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') setProfile(null) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <ScrollProgress />
      {intro && (
        <OscarIntro
          onReveal={() => document.body.classList.add('go')}
          onDone={() => setIntro(false)}
        />
      )}
      <Header active={active} onSelectEpisode={setActive} />
      <main id="top">
        <Hero player={player} />
        <SpeakersBanner player={player} />
        <EpisodeStack active={active} onChangeActive={setActive} player={player} onProfile={setProfile} />
        <Latest player={player} />
        <StudioTour player={player} />
        <HowItWorks onProfile={setProfile} />
        <Praise />
        <Footer />
      </main>
      <BackstageStoryPill />
      <ProfilePanel index={profile} onClose={() => setProfile(null)} onNav={(d) => setProfile((p) => (p + d + E.length) % E.length)} player={player} />
      <PlayerBar player={player} />
    </>
  )
}
