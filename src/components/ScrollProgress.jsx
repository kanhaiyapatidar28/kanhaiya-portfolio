import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrolled)))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateProgress()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div 
      className="page-scroll-progress-track"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Page reading progress"
    >
      <div 
        className="page-scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />
      {progress > 1 && (
        <div 
          className="page-scroll-progress-glow"
          style={{ left: `${progress}%` }}
        />
      )}
    </div>
  )
}
