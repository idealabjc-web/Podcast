import { useEffect, useRef } from 'react'

// Gold custom cursor ring. Instantaneous 1:1 hardware tracking with zero lag.
export default function Cursor() {
  const root = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
    document.body.classList.add('fine')

    const c = root.current
    const ring = ringRef.current
    if (!c || !ring) return

    let rafId = null
    let latestX = -100
    let latestY = -100

    const updatePosition = () => {
      c.style.transform = `translate3d(${latestX}px,${latestY}px,0)`
      rafId = null
    }

    const mv = (e) => {
      latestX = e.clientX
      latestY = e.clientY
      c.classList.add('on')
      // Render immediately with RAF for 60/120/144fps instant response without input lag
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition)
      }
    }

    const ov = (e) => {
      const h = e.target.closest?.('[data-c]')
      ring.textContent = h ? h.dataset.c : ''
      c.classList.toggle('big', !!h && h.dataset.c !== 'Scroll')
    }

    const onLeave = () => c.classList.remove('on')
    const onEnter = () => c.classList.add('on')

    window.addEventListener('mousemove', mv, { passive: true })
    window.addEventListener('mouseover', ov, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('fine')
      window.removeEventListener('mousemove', mv)
      window.removeEventListener('mouseover', ov)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cur" ref={root}>
      <i />
      <b ref={ringRef} />
    </div>
  )
}
