import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import SplashCursor from './components/SplashCursor'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import GallerySection from './components/GallerySection'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import ErrorBoundary from './components/ErrorBoundary'
import IntroVideo from './components/IntroVideo'

gsap.registerPlugin(ScrollTrigger)

const LiquidFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', opacity: 0 }}>
    <defs>
      <filter id="liquid">
        <feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="2" result="turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
)

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  return (
    <div className="bg-[#050505] min-h-screen relative text-text-primary">
      {showIntro ? (
        <ErrorBoundary>
          <IntroVideo onComplete={() => setShowIntro(false)} />
        </ErrorBoundary>
      ) : (
        <>
          <LiquidFilter />
          <ScrollProgress />
          <ErrorBoundary>
            <CustomCursor />
          </ErrorBoundary>

          {/* Interactive Splash Liquid Cursor */}
          <ErrorBoundary>
            <SplashCursor />
          </ErrorBoundary>

          <Navbar />
          <main className="relative z-10">
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <GallerySection />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Achievements />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </main>
        </>
      )}
    </div>
  )
}

export default App
