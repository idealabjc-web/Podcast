import { useCallback, useRef, useState } from 'react'
import { E } from '../data.js'

export function usePlayer() {
  const [cur, setCur] = useState(0)
  const [notice, setNotice] = useState(null)
  const timerRef = useRef(null)

  const showNotice = useCallback((info) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const normalized = typeof info === 'string'
      ? { title: 'Available Soon', desc: info }
      : info
    setNotice(normalized)
    timerRef.current = setTimeout(() => {
      setNotice(null)
    }, 4500)
  }, [])

  const closeNotice = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setNotice(null)
  }, [])

  const play = useCallback((i = 0, customMsg) => {
    const idx = typeof i === 'number' && i >= 0 && i < E.length ? i : 0
    setCur(idx)
    const speaker = E[idx]?.g || 'Dr. P'
    const title = E[idx]?.n || 'Episode'
    showNotice({
      title: 'Episode Available Soon',
      speaker,
      name: title,
      desc: customMsg || `"${title}" with ${speaker} will be available soon! The podcast sessions are currently being recorded.`
    })
  }, [showNotice])

  return {
    cur,
    notice,
    showNotice,
    closeNotice,
    play,
    playing: false,
    visible: !!notice
  }
}
