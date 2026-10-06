import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Sparkles,
  Play,
  Pause,
  Zap,
  Layout,
  ArrowRight
} from 'lucide-react'
import BlurRevealText from './BlurRevealText'

gsap.registerPlugin(ScrollTrigger)

export default function LaptopShowcase({
  videoSrc = "/Place_the_uploaded_website_scr (1).mp4",
  photoSrc = "/drag_me.png"
}) {
  const sectionRef = useRef(null)
  const videoCardRef = useRef(null)
  const videoScreenRef = useRef(null)
  const videoRef = useRef(null)
  const photoContainerRef = useRef(null)
  const photoRef = useRef(null)

  const [currentSrc, setCurrentSrc] = useState(videoSrc)
  const [currentPhoto, setCurrentPhoto] = useState(photoSrc)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  // Drag state refs for high-frequency pointer updates
  const dragData = useRef({
    isDown: false,
    offsetX: 0,
    offsetY: 0,
    currentX: 0,
    currentY: 0,
  })

  // --------------------------------------------------
  // Update video source
  // --------------------------------------------------
  useEffect(() => {
    setCurrentSrc(videoSrc)
  }, [videoSrc])

  // --------------------------------------------------
  // Update photo source
  // --------------------------------------------------
  useEffect(() => {
    setCurrentPhoto(photoSrc)
  }, [photoSrc])

  // --------------------------------------------------
  // Autoplay attempt
  // --------------------------------------------------
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }, [currentSrc])

  // --------------------------------------------------
  // GSAP entrance animation
  // --------------------------------------------------
  useEffect(() => {
    const el = videoCardRef.current
    const section = sectionRef.current
    const photo = photoRef.current

    if (!el || !section) return

    const ctx = gsap.context(() => {
      // Video card entrance animation
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Drag image entrance
      if (photo) {
        gsap.from(photo, {
          scale: 0.6,
          opacity: 0,
          y: 15,
          duration: 0.6,
          delay: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        })
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // --------------------------------------------------
  // DRAG HANDLER
  // Image can ONLY move inside video screen
  // --------------------------------------------------
  const handlePointerDown = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const photo = photoRef.current
    const container = videoScreenRef.current

    if (!photo || !container) return

    const containerRect = container.getBoundingClientRect()
    const photoRect = photo.getBoundingClientRect()

    dragData.current.isDown = true

    // Remember where inside the image user clicked
    dragData.current.offsetX =
      e.clientX - photoRect.left

    dragData.current.offsetY =
      e.clientY - photoRect.top

    // Convert current visual position into
    // coordinates relative to the video
    dragData.current.currentX =
      photoRect.left - containerRect.left

    dragData.current.currentY =
      photoRect.top - containerRect.top

    setIsDragging(true)

    // Capture pointer
    try {
      photo.setPointerCapture(e.pointerId)
    } catch {
      // Ignore unsupported pointer capture
    }

    // Small press animation
    gsap.to(photo, {
      scale: 1.05,
      duration: 0.15,
      ease: 'power2.out',
    })

    // ------------------------------------------------
    // Pointer Move
    // ------------------------------------------------
    const onPointerMove = (moveEvent) => {
      if (!dragData.current.isDown) return

      const containerRect =
        videoScreenRef.current?.getBoundingClientRect()

      if (!containerRect) return

      // Calculate desired position
      let x =
        moveEvent.clientX -
        containerRect.left -
        dragData.current.offsetX

      let y =
        moveEvent.clientY -
        containerRect.top -
        dragData.current.offsetY

      // ----------------------------------------------
      // IMPORTANT:
      // Use unscaled image dimensions for boundaries
      // ----------------------------------------------
      const imageWidth = photo.offsetWidth
      const imageHeight = photo.offsetHeight

      const maxX = Math.max(
        0,
        containerRect.width - imageWidth
      )

      const maxY = Math.max(
        0,
        containerRect.height - imageHeight
      )

      // ----------------------------------------------
      // Clamp image inside video
      // ----------------------------------------------
      x = Math.max(0, Math.min(x, maxX))
      y = Math.max(0, Math.min(y, maxY))

      dragData.current.currentX = x
      dragData.current.currentY = y

      // Use gsap.set for instant 60fps movement
      gsap.set(photo, {
        x,
        y,
      })
    }

    // ------------------------------------------------
    // Pointer Up
    // ------------------------------------------------
    const onPointerUp = () => {
      dragData.current.isDown = false
      setIsDragging(false)

      window.removeEventListener(
        'pointermove',
        onPointerMove
      )

      window.removeEventListener(
        'pointerup',
        onPointerUp
      )

      gsap.to(photo, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    window.addEventListener(
      'pointermove',
      onPointerMove
    )

    window.addEventListener(
      'pointerup',
      onPointerUp
    )
  }

  // --------------------------------------------------
  // Play / Pause
  // --------------------------------------------------
  const togglePlay = () => {
    if (!videoRef.current) return

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => { })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  // --------------------------------------------------
  // Video fallback
  // --------------------------------------------------
  const handleVideoError = () => {
    if (currentSrc !== "/portfolio_demo.mp4") {
      console.warn(
        "Primary screen recording not ready, switching to fallback portfolio_demo.mp4"
      )

      setCurrentSrc("/portfolio_demo.mp4")
    }
  }

  // --------------------------------------------------
  // Photo fallback
  // --------------------------------------------------
  const handlePhotoError = () => {
    if (currentPhoto === "/drag_me.png") {
      setCurrentPhoto("/drag me.png")
    } else if (currentPhoto === "/drag me.png") {
      setCurrentPhoto("/Portfolio logo.png")
    }
  }

  // --------------------------------------------------
  // JSX
  // --------------------------------------------------
  return (
    <section
      id="preview"
      ref={sectionRef}
      className="py-16 md:py-20 relative overflow-hidden bg-[#050505] z-20 border-t border-white/5"
    >
      <div className="container px-6 mx-auto relative z-10">

        {/* ------------------------------------------
            Section Header
        ------------------------------------------ */}
        <div className="section-header-bar mb-8 md:mb-10">
          <span className="section-title-label">
            Live Preview
          </span>

          <span className="section-num">
            03 / 06
          </span>
        </div>

        {/* ------------------------------------------
            2 Column Layout
        ------------------------------------------ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 w-full">

          {/* ==========================================
              LEFT COLUMN
          ========================================== */}
          <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col items-start text-left">

            {/* Live Showcase Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[0.68rem] font-bold uppercase tracking-widest mb-3">
              <Sparkles size={12} />
              Live Showcase
            </div>

            {/* Heading */}
            <BlurRevealText
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight mb-3"
              scrub={false}
              duration={0.5}
              blurAmount={7}
              start="top 95%"
            >
              PORTFOLIO <br />

              <span className="text-accent italic">
                IN FLUID MOTION
              </span>
            </BlurRevealText>

            {/* Description */}
            <BlurRevealText
              as="p"
              className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-5 opacity-90 max-w-md"
              scrub={0.4}
              start="top 96%"
              end="top 75%"
              blurAmount={6}
              initialOpacity={0.4}
            >
              Experience seamless page transitions,
              interactive 3D physics, and tactile
              micro-animations engineered for maximum
              visual engagement.
            </BlurRevealText>

            {/* Feature Chips */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full max-w-md mb-6">

              {/* Feature 1 */}
              <div className="glass px-3 py-2 rounded-xl border border-white/5 flex items-center gap-3 hover:border-accent/30 transition-colors">

                <div className="p-1.5 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Zap size={14} />
                </div>

                <div>
                  <h4 className="text-[0.78rem] font-bold text-white leading-tight">
                    60 FPS Fluid Motion
                  </h4>

                  <p className="text-[0.68rem] text-text-secondary">
                    Hardware accelerated GSAP transforms & scrub physics.
                  </p>
                </div>

              </div>

              {/* Feature 2 */}
              <div className="glass px-3 py-2 rounded-xl border border-white/5 flex items-center gap-3 hover:border-accent/30 transition-colors">

                <div className="p-1.5 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Layout size={14} />
                </div>

                <div>
                  <h4 className="text-[0.78rem] font-bold text-white leading-tight">
                    Dynamic Translucent UI
                  </h4>

                  <p className="text-[0.68rem] text-text-secondary">
                    Refined glassmorphism with responsive adaptive layouts.
                  </p>
                </div>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">

              {/* View Projects */}
              <a
                href="#work"
                className="px-5 py-2.5 rounded-full bg-accent text-black font-extrabold text-[0.75rem] uppercase tracking-wider flex items-center gap-1.5 shadow-emerald hover:scale-105 active:scale-98 transition-transform"
              >
                <span>
                  View Projects
                </span>

                <ArrowRight size={13} />
              </a>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="px-4 py-2.5 rounded-full glass border border-white/10 text-white font-bold text-[0.75rem] uppercase tracking-wider flex items-center gap-1.5 hover:border-white/30 active:scale-98 transition-all"
              >
                {isPlaying ? (
                  <Pause
                    size={12}
                    className="text-accent"
                  />
                ) : (
                  <Play
                    size={12}
                    className="text-accent"
                  />
                )}

                <span>
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>

            </div>

          </div>

          {/* ==========================================
              RIGHT COLUMN - VIDEO
          ========================================== */}
          <div
            ref={photoContainerRef}
            className="w-full md:w-1/2 lg:w-5/12 flex justify-center md:justify-end items-center relative flex-shrink-0"
          >

            {/* ----------------------------------------
                Video Card
            ---------------------------------------- */}
            <div
              ref={videoCardRef}
              className="relative overflow-hidden w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-video rounded-2xl bg-[#09090c] p-2 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer group z-10 select-none transition-all duration-300"
              style={{ aspectRatio: '16 / 9' }}
              onClick={togglePlay}
              title="Click to Play/Pause"
            >

              {/* --------------------------------------
                  ACTUAL VIDEO SCREEN

                  THIS IS THE DRAG BOUNDARY
              -------------------------------------- */}
              <div
                ref={videoScreenRef}
                className="relative w-full h-full rounded-xl overflow-hidden bg-black"
                style={{ aspectRatio: '16 / 9' }}
              >

                {/* Video */}
                <video
                  ref={videoRef}
                  key={currentSrc}
                  src={currentSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={handleVideoError}
                  className="w-full h-full object-cover object-top"
                  style={{ aspectRatio: '16 / 9' }}
                />

                {/* Subtle Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none z-10" />

                {/* Ambient Edge Glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none z-10" />

                {/* Hover Play/Pause Overlay */}
                <div className="absolute bottom-2 right-2 glass px-2 py-1 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-20">

                  {isPlaying ? (
                    <Pause
                      size={10}
                      className="text-accent"
                    />
                  ) : (
                    <Play
                      size={10}
                      className="text-accent"
                    />
                  )}

                  <span className="text-[0.6rem] font-bold text-white uppercase tracking-wider">
                    {isPlaying ? 'Pause' : 'Play'}
                  </span>

                </div>

                {/* ======================================
                    DRAGGABLE MINIATURE IMAGE

                    CONFINED INSIDE VIDEO SCREEN
                ====================================== */}
                <div
                  ref={photoRef}
                  onPointerDown={handlePointerDown}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-3 left-3 z-50 select-none touch-none filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)] ${isDragging
                      ? 'cursor-grabbing scale-105'
                      : 'cursor-grab hover:scale-105'
                    }`}
                  title="Drag me around!"
                >

                  <img
                    src={currentPhoto}
                    alt="Drag Me"
                    onError={handlePhotoError}
                    draggable={false}
                    className="w-24 sm:w-28 lg:w-32 h-auto max-h-28 object-contain pointer-events-none select-none block"
                  />

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ------------------------------------------
          Background Decorative Glow
      ------------------------------------------ */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[45vw] h-[45vw] bg-accent/5 blur-[140px] rounded-full pointer-events-none -z-10" />

    </section>
  )
}