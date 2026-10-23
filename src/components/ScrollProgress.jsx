import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    let raf
    const up = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const m = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`
    }) }
    up(); addEventListener('scroll', up, { passive: true }); addEventListener('resize', up)
    return () => { removeEventListener('scroll', up); removeEventListener('resize', up); cancelAnimationFrame(raf) }
  }, [])
  return <div id="bar" ref={bar} />
}
