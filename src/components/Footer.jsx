export default function Footer() {
  return (
    <footer className="site-footer" id="footer" aria-label="Site Footer">
      <div className="wrap site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-logo">Dr. P Podcast</span>
          <p className="site-footer-tagline">
            Backstage conversations before the stage lights. Unscripted, unhurried, unfiltered.
          </p>
        </div>
        <div className="site-footer-links">
          <div className="site-footer-col">
            <span className="mono site-footer-heading">Listen</span>
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">Spotify</a>
            <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className="site-footer-col">
            <span className="mono site-footer-heading">Contact &amp; Studio</span>
            <a href="mailto:podcast@drppodcast.fm">podcast@drppodcast.fm</a>
            <span>Recorded at Dr. P Studio</span>
            <span>Season 01 · 2026</span>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom wrap">
        <span className="mono">© {new Date().getFullYear()} Dr. P Podcast · All rights reserved</span>
        <span className="mono">Recorded in the wings before the house opens</span>
      </div>
    </footer>
  )
}
