import React, { useRef, useEffect, useState, useCallback } from 'react'

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const isFinishedRef = useRef(false)

  const handleFinish = useCallback(() => {
    if (isFinishedRef.current) return
    isFinishedRef.current = true

    // Trigger smooth fade-out
    setIsFadingOut(true)

    // Wait for the fade-out transition (500ms) before unmounting overlay
    setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 500)
  }, [onComplete])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video is muted for reliable autoplay across all browsers
    video.muted = true
    video.playsInline = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay prevented or video issue:', err)
      })
    }

    // Preload critical hero images in background so they are ready instantly
    const preloadAssets = ['/name.png', '/profile_transparent.png']
    preloadAssets.forEach((src) => {
      const img = new Image()
      img.src = src
      if (img.decode) {
        img.decode().catch(() => {})
      }
    })

    // Keyboard shortcut or scroll to skip intro
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish()
      }
    }
    const handleScroll = () => {
      if (window.scrollY > 30) {
        handleFinish()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Failsafe safety timeout (e.g. 12s max)
    const failsafe = setTimeout(() => {
      handleFinish()
    }, 12000)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(failsafe)
    }
  }, [handleFinish])

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-black overflow-hidden transition-opacity duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* Crisp Fullscreen Video On Top */}
      <video
        ref={videoRef}
        src="/video%20my%20portfolio.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onEnded={handleFinish}
        onError={handleFinish}
        className="w-full h-full object-cover md:object-contain bg-black"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  )
}
