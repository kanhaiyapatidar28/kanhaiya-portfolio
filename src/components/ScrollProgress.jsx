import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    const glow = glowRef.current
    if (!bar) return

    let lastP = -1

    const updateUI = (progress) => {
      const p = Math.min(1, Math.max(0, progress))
      if (Math.abs(p - lastP) < 0.0002) return
      lastP = p

      // GPU-accelerated transform: 0 layout reflows, buttery 120fps
      bar.style.transform = `scaleX(${p})`
      if (glow) {
        glow.style.transform = `translateX(${p * 100}vw)`
        glow.style.opacity = p > 0.005 ? '1' : '0'
      }
    }

    // ScrollTrigger tracks full page scroll including all horizontal/pinned sections
    let st = null
    const timer = setTimeout(() => {
      st = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (self.progress >= 0.995) {
            updateUI(1)
          } else {
            updateUI(self.progress)
          }
        }
      })
      if (st) updateUI(st.progress)
    }, 120)

    // Highly responsive fallback listener with subpixel tolerance for laptops
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const totalDocHeight = document.documentElement.scrollHeight
      const viewHeight = window.innerHeight
      const maxScroll = totalDocHeight - viewHeight

      if (maxScroll <= 0) {
        updateUI(1)
        return
      }

      // Laptop subpixel scaling tolerance: if within 8px of bottom, snap to 100% complete
      if (maxScroll - scrollY <= 8) {
        updateUI(1)
        return
      }

      const p = scrollY / maxScroll
      updateUI(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      clearTimeout(timer)
      if (st) st.kill()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div 
      className="page-scroll-progress-track"
      role="progressbar"
      aria-label="Page reading progress"
    >
      <div 
        ref={barRef}
        className="page-scroll-progress-bar"
        style={{ transform: 'scaleX(0)' }}
      />
      <div 
        ref={glowRef}
        className="page-scroll-progress-glow"
        style={{ transform: 'translateX(0px)', opacity: 0 }}
      />
    </div>
  )
}
