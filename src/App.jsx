import { useCallback, useEffect, useState } from 'react'
import { E } from './data.js'
import { usePlayer } from './hooks/usePlayer.js'
import ScrollProgress from './components/ScrollProgress.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import SpeakersBanner from './components/SpeakersBanner.jsx'
import EpisodeStack from './components/EpisodeStack.jsx'
import SpeakersPage from './components/SpeakersPage.jsx'
import CallSheet from './components/CallSheet.jsx'
import Latest from './components/Latest.jsx'
import BehindTheMic from './components/BehindTheMic.jsx'
import HostSection from './components/HostSection.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Footer from './components/Footer.jsx'
import PlayerBar from './components/PlayerBar.jsx'
import ProfilePanel from './components/ProfilePanel.jsx'
import OscarIntro from './components/OscarIntro.jsx'
import BackstageStoryPill from './components/BackstageStoryPill.jsx'

const PATH_TO_PAGE = {
  '/': 'home',
  '/speakers': 'speakers',
  '/call-sheet': 'call-sheet',
  '/studio': 'studio',
  '/host': 'host',
}

const PAGE_TO_PATH = {
  home: '/',
  speakers: '/speakers',
  'call-sheet': '/call-sheet',
  studio: '/studio',
  host: '/host',
}

function getInitialPage() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return PATH_TO_PAGE[path] || 'home'
}

export default function App() {
  const player = usePlayer()
  const [page, setPage] = useState(getInitialPage)
  const [active, setActive] = useState(0)
  const [profile, setProfile] = useState(null)
  const [intro, setIntro] = useState(() => getInitialPage() === 'home')

  const navigate = useCallback((nextPage) => {
    const target = PAGE_TO_PATH[nextPage] ? nextPage : 'home'
    setPage(target)
    const nextPath = PAGE_TO_PATH[target]
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: target }, '', nextPath)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setPage(getInitialPage())
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('intro-lock', intro)
    if (!intro) {
      document.body.classList.add('go')
    }
  }, [intro])

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') setProfile(null)
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
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
      <Header
        active={active}
        onSelectEpisode={setActive}
        page={page}
        onNavigate={navigate}
      />
      <main id="top">
        {page === 'home' && (
          <>
            <Hero player={player} onNavigate={navigate} />
            <EpisodeStack
              active={active}
              onChangeActive={setActive}
              player={player}
              onProfile={setProfile}
              onOpenCallSheet={() => navigate('call-sheet')}
            />
            <CallSheet
              isPage={false}
              onSelectEpisode={setActive}
              player={player}
              onProfile={setProfile}
              onNavigate={navigate}
            />
            <Latest player={player} />
            <BehindTheMic isPage={false} onNavigate={navigate} />
            <HowItWorks onProfile={setProfile} onNavigate={navigate} isPage={false} />
          </>
        )}

        {page === 'speakers' && (
          <SpeakersPage
            active={active}
            onChangeActive={setActive}
            player={player}
            onProfile={setProfile}
            onNavigate={navigate}
          />
        )}

        {page === 'call-sheet' && (
          <CallSheet
            isPage
            onSelectEpisode={setActive}
            player={player}
            onProfile={setProfile}
            onNavigate={navigate}
          />
        )}

        {page === 'studio' && (
          <BehindTheMic isPage onNavigate={navigate} />
        )}

        {page === 'host' && (
          <HostSection isPage onNavigate={navigate} />
        )}

        <Footer />
      </main>
      <BackstageStoryPill />
      <ProfilePanel
        index={profile}
        onClose={() => setProfile(null)}
        onNav={(d) => setProfile((p) => (p + d + E.length) % E.length)}
        player={player}
      />
      <PlayerBar player={player} />
    </>
  )
}
