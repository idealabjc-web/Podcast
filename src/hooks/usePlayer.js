import { useCallback, useEffect, useState } from 'react'

// Simulated player. To use real audio: add an <audio> element and call play()/pause() where setPlaying is called.
export function usePlayer() {
  const [cur, setCur] = useState(0)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)

  useEffect(() => { document.body.classList.toggle('playing', playing) }, [playing])
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setT((v) => v + 1), 1000)
    return () => clearInterval(id)
  }, [playing])

  const play = useCallback((i) => {
    if (playing && cur === i) { setPlaying(false); return }
    if (cur !== i || !visible) { setCur(i); setT(0); setVisible(true) }
    setPlaying(true)
  }, [playing, cur, visible])
  const toggle = useCallback(() => setPlaying((p) => !p), [])
  return { cur, visible, playing, t, play, toggle }
}
