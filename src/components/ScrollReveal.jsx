import { useEffect, useRef } from 'react'

export default function ScrollReveal({ children, className = '', threshold = 0.2 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If no browser APIs (like in tests), just reveal immediately
    const hasIO = typeof window !== 'undefined' && 'IntersectionObserver' in window
    if (!hasIO) {
      el.style.opacity = 1
      el.style.transform = 'none'
      return
    }

    el.style.opacity = 0
    el.style.transform = 'translateY(12px)'
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = 'opacity .5s ease, transform .5s ease'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
        io.unobserve(el)
      }
    }, { threshold })

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return <div ref={ref} className={className}>{children}</div>
}
