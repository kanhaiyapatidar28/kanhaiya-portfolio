import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageTransition() {
  const overlayRef = useRef(null)

  useEffect(() => {
    // Initial entrance animation
    gsap.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.2,
      ease: 'expo.inOut',
      delay: 0.5
    })
  }, [])

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-accent z-[9999] pointer-events-none"
      style={{ transform: 'scaleY(1)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-4xl font-black tracking-tighter">
        ANTIGRAVITY
      </div>
    </div>
  )
}
