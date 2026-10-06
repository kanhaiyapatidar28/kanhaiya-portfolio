import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Disable custom cursor on touch devices for maximum performance
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const xDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" })
    const yDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" })
    const xRing = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power2.out" })
    const yRing = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power2.out" })

    let isHovered = false

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e
      xDot(x)
      yDot(y)
      xRing(x)
      yRing(y)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (target.closest && (target.closest('a') || target.closest('button') || target.closest('.project-card') || target.closest('.magnetic-button'))) {
        if (!isHovered) {
          isHovered = true
          gsap.to(ring, { scale: 1.6, borderColor: 'rgba(16, 185, 129, 0.8)', backgroundColor: 'rgba(16, 185, 129, 0.08)', duration: 0.25 })
          gsap.to(dot, { scale: 0.5, duration: 0.2 })
        }
      } else if (isHovered) {
        isHovered = false
        gsap.to(ring, { scale: 1, borderColor: 'rgba(16, 185, 129, 0.35)', backgroundColor: 'transparent', duration: 0.25 })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* Precision Dot */}
      <div 
        ref={dotRef} 
        className="absolute top-0 left-0 w-2 h-2 bg-accent rounded-full shadow-emerald will-change-transform" 
      />
      {/* Smooth Ring */}
      <div 
        ref={ringRef} 
        className="absolute top-0 left-0 w-8 h-8 border border-accent/40 rounded-full will-change-transform transition-colors" 
      />
    </div>
  )
}

