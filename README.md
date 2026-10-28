# Dr. P Podcast — animated podcast website (React + Vite)

## Run it
    npm install
    npm run dev        # open the printed http://localhost:5173
    npm run build      # production build in /dist

## Edit content
Everything lives in `src/data.js`: episodes (E), speaker profiles + upcoming sessions (S),
listener quotes (P), credits and gallery colours.
- Add a speaker: add one item to `E` and one to `S` (same order).
- Add a future session: add `{ d: 'Mar 3', t: 'Title', k: 'Live session' }` to that speaker's `up` list.
  It appears on their profile AND in the "Coming up" list automatically.

## Real audio
The player is simulated (src/hooks/usePlayer.js). Add an <audio> element there and call
audio.play()/pause() where setPlaying is called.

## Animations included
Loader slide, hero title reveal, drifting glow, animated waveform, marquee, stacked episode cards
(scale/dim on scroll), profile panel slide-up, header ticket dropdown, custom gold cursor with labels,
scroll progress bar, ruled-title reveal, auto-scrolling gallery, review arches carousel, ruled wordmark footer.
# Podcast 
