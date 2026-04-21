import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import SplashCursor from './components/SplashCursor'
import Hero from './components/Hero'
import Lanyard from './components/Lanyard'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import ErrorBoundary from './components/ErrorBoundary'

const LiquidFilter = () => (
  <svg className="hidden">
    <filter id="liquid">
      <feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="2" result="turbulence" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
)

function App() {
  const [lanyardInView, setLanyardInView] = useState(false)
  const lanyardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setLanyardInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    if (lanyardRef.current) observer.observe(lanyardRef.current)
    return () => {
      if (lanyardRef.current) observer.unobserve(lanyardRef.current)
    }
  }, [])

  return (
    <div className="bg-bg-color min-h-screen relative">
      <LiquidFilter />
      <ErrorBoundary>
        <PageTransition />
      </ErrorBoundary>
      <ScrollProgress />
      <CustomCursor />

      {/* SplashCursor: only active when Lanyard section is NOT in view (context-swap) */}
      {!lanyardInView && (
        <ErrorBoundary>
          <SplashCursor />
        </ErrorBoundary>
      )}

      <Navbar />
      <main className="relative z-10">
        <Hero />

        {/* Lanyard ID Card Section */}
        <section ref={lanyardRef} className="relative w-full h-[100svh] bg-bg-color overflow-hidden border-y border-white/5">
          <ErrorBoundary>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </ErrorBoundary>
        </section>

        <Projects />
        <About />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}

export default App
