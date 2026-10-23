// All site content lives here. Add a speaker by adding one item to SPEAKERS (photo goes in src/img).
// Fields left empty ('' / []) are hidden or shown as "coming soon" in the UI until real data is added.

// Load every speaker photo from src/img, keyed by file name (without extension).
const IMGS = Object.fromEntries(
  Object.entries(import.meta.glob('./img/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.replace(/^\.\/img\//, '').replace(/\.(jpeg|jpg|png|webp)$/i, ''), url])
)

// Card background tints (cycled across speakers).
const TINTS = [
  'linear-gradient(135deg,#2f5242,#0f1a15)', 'linear-gradient(135deg,#7a5a2c,#1a120a)',
  'linear-gradient(135deg,#3b4f66,#0e141c)', 'linear-gradient(135deg,#6a2f3a,#170a0e)',
  'linear-gradient(135deg,#4a3d66,#110d1a)', 'linear-gradient(135deg,#2c5f63,#0a1718)',
  'linear-gradient(135deg,#6b4a2f,#1a110a)',
]

/*
  One entry per speaker. Fields:
  img   – file name in src/img (without extension)
  g     – display name          f  – first name used in "Ask ___ a question"
  n     – episode title         c  – topic         m – minutes      y – year
  q     – listener review quotes (shown on the episode card)
  r     – role / title          o  – organisation
  bio   – short biography       tags – topic chips
  tk    – key takeaways         up – upcoming sessions [{ d: 'Oct 28', t: 'Title', k: 'Live session' }]
*/
const SPEAKERS = [
  { img: 'Ann-Marie Emmanuel', g: 'Ann-Marie Emmanuel', f: 'Ann-Marie' },
  { img: 'Bethsaida Hingston', g: 'Bethsaida Hingston', f: 'Bethsaida' },
  { img: 'Cindy B Hipolito', g: 'Cindy B. Hipolito', f: 'Cindy' },
  { img: 'Deborah S. Greenhut', g: 'Deborah S. Greenhut', f: 'Deborah' },
  { img: 'Dr. Carolyn Tabb', g: 'Dr. Carolyn Tabb', f: 'Dr. Tabb' },
  { img: 'Jackie Nugara', g: 'Jackie Nugara', f: 'Jackie' },
  { img: 'James E. Spence, Jr.', g: 'James E. Spence, Jr.', f: 'James' },
  { img: 'Jeffrey Williams', g: 'Jeffrey Williams', f: 'Jeffrey' },
  { img: 'Lisa Skinner', g: 'Lisa Skinner', f: 'Lisa' },
  { img: 'Paula Andersen', g: 'Paula Andersen', f: 'Paula' },
  { img: 'Pauline Corea', g: 'Pauline Corea', f: 'Pauline' },
  { img: 'Phoebe Wasfy', g: 'Phoebe Wasfy', f: 'Phoebe' },
  { img: 'Sharon Josef. Ph.D', g: 'Sharon Josef, Ph.D.', f: 'Sharon' },
  { img: 'Vanessa Hariparsad', g: 'Vanessa Hariparsad', f: 'Vanessa' },
]

// Episodes (one per speaker). Title falls back to the speaker's name until a real title is added.
export const E = SPEAKERS.map((s, i) => ({
  n: s.n || s.g, g: s.g, f: s.f, img: IMGS[s.img], c: s.c || '', m: s.m || 0, y: s.y || '2026',
  b: s.b || TINTS[i % TINTS.length], q: s.q || [],
}))

// Speaker profiles (same order as E). `up` = upcoming sessions shown on the profile and in "Coming up".
export const S = SPEAKERS.map((s) => ({
  r: s.r || '', o: s.o || '', bio: s.bio || '', tags: s.tags || [], tk: s.tk || [], up: s.up || [],
}))

export const P = [
  ['Like sitting on the sofa twenty minutes before the keynote.', 'Listener, Lisbon'],
  ['I rewrote my opening line after one of these episodes.', 'Listener, Austin'],
  ['The only podcast I replay before I speak.', 'Listener, Mumbai'],
  ['Honest, unpolished, and exactly what first-timers need.', 'Listener, Berlin'],
  ['Short clips on the commute, full tapes on the weekend.', 'Listener, Toronto'],
]

export const CREDITS = [['Host', 'Maya Linden'], ['Producer', 'Sam Okoye'], ['Guest', E[0].g], ['Editor', 'Nora Feld'], ['Sound', 'Theo Bright'], ['Recorded at', 'The Green Room']]
export const GALLERY = ['#2a3b40', '#3a2c28', '#1f2c33', '#45342e', '#243038', '#3a3a34']
export const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0')
