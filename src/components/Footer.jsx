import { useInView } from '../hooks/useInView.js'

export default function Footer() {
  const [ref, on] = useInView()
  return (
    <footer className={`wm ${on ? 'in' : ''}`} id="join" ref={ref}>
      <div className="wr">
        <div className="wl"><span>The Green</span></div>
        <div className="wl"><span>Room Live</span></div>
        <div className="wl"><span>Backstage</span></div>
      </div>
      <div className="cols">
        <div>Get new episodes first<input placeholder="Enter your email" aria-label="Email" /></div>
        <div>Listen<a href="#latest">Apple Podcasts</a><a href="#latest">Spotify</a><a href="#latest">YouTube</a></div>
        <div>Contact<a href="mailto:hello@thegreenroom.fm">hello@thegreenroom.fm</a></div>
      </div>
    </footer>
  )
}
