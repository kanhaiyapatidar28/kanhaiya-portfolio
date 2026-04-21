import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glassRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const glass = glassRef.current

    if (!cursor || !dot || !ring || !glass) return

    // Initial setup for centering using GSAP to avoid CSS conflicts
    gsap.set([dot, ring, glass], { xPercent: -50, yPercent: -50 })

    // Ultra-optimized position setters
    const xDotSetter = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power4" })
    const yDotSetter = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power4" })
    
    const xRingSetter = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3" })
    const yRingSetter = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3" })

    const xGlassSetter = gsap.quickTo(glass, "x", { duration: 0.6, ease: "power2.out" })
    const yGlassSetter = gsap.quickTo(glass, "y", { duration: 0.6, ease: "power2.out" })

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e
      xDotSetter(x)
      yDotSetter(y)
      xRingSetter(x)
      yRingSetter(y)
      xGlassSetter(x)
      yGlassSetter(y)
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      if (target.closest('a') || target.closest('button') || target.classList.contains('project-card')) {
        gsap.to([ring, glass], { scale: 1.5, duration: 0.3 })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      if (target.closest('a') || target.closest('button') || target.classList.contains('project-card')) {
        gsap.to([ring, glass], { scale: 1, duration: 0.3 })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[99999]">
        {/* Precise Dot */}
        <div ref={dotRef} className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full shadow-emerald" />
        
        {/* Aesthetic Ring */}
        <div ref={ringRef} className="absolute top-0 left-0 w-10 h-10 border border-accent/40 rounded-full" />
        
        {/* Fluid Glass Lens */}
        <div 
          ref={glassRef} 
          className="absolute top-0 left-0 w-40 h-40 rounded-full flex items-center justify-center lens-orb transform-gpu"
        >
           {/* Liquid distortion border pulse */}
           <div className="absolute inset-0 rounded-full border-[2px] border-accent/10 opacity-40 animate-pulse" />
           {/* The refraction lens - styles defined in index.css */}
           <div className="glass-refraction-effect rounded-full shadow-2xl" />
        </div>
      </div>

      {/* SVG Filter for Liquid Distortion - Referenced in index.css */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', visibility: 'hidden' }}>
        <defs>
          <filter id="liquid-glass">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" />
          </filter>
        </defs>
      </svg>
    </>
  )
}
