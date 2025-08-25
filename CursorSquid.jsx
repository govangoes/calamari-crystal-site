import { useEffect, useRef } from 'react'

export default function CursorSquid(){
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    let x = window.innerWidth/2, y = window.innerHeight/2
    let tx = x, ty = y
    const speed = 0.18

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      // trail bubble
      const b = document.createElement('div')
      b.className = 'squid-trail'
      b.style.left = tx + 'px'
      b.style.top  = ty + 'px'
      document.body.appendChild(b)
      setTimeout(() => b.remove(), 400)
    }

    const raf = () => {
      x += (tx - x) * speed
      y += (ty - y) * speed
      if(cursor){
        cursor.style.left = x + 'px'
        cursor.style.top  = y + 'px'
        cursor.style.transform = 'translate(-50%, -50%) rotate(' + (tx < x ? -8 : 8) + 'deg)'
      }
      requestAnimationFrame(raf)
    }

    window.addEventListener('mousemove', onMove)
    requestAnimationFrame(raf)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <svg ref={cursorRef} className="squid-cursor" viewBox="0 0 64 64" fill="none">
      <path d="M32 4c8 8 12 14 12 20 0 8-6 12-12 12s-12-4-12-12c0-6 4-12 12-20Z" fill="url(#g)"/>
      <path d="M18 36c2 8 6 12 14 12s12-4 14-12" stroke="rgba(238,62,150,0.85)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 44c-2 6-4 8-8 10M44 44c2 6 4 8 8 10" stroke="rgba(0,246,255,0.75)" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="g" x1="0" x2="64" y1="0" y2="64">
          <stop offset="0" stopColor="rgba(238,62,150,0.95)"/>
          <stop offset="1" stopColor="rgba(0,246,255,0.95)"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
