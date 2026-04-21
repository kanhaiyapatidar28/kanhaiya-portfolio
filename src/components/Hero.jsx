import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline()
      
      tl.from('.hero-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out'
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.8')
      .from('.stat-item', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
      }, '-=0.4')

      // Scroll Parallax for content
      gsap.to('.hero-content', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: -100,
        opacity: 0
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-32">
      <div className="container px-6 relative z-10">
        {/* Section Top Bar */}
        <div className="section-header-bar">
          <span className="section-title-label">Introduction</span>
          <span className="section-num">01 / 06</span>
        </div>

        <div className="hero-content text-center mt-12">
          {/* Decorative background text to satisfy GSAP/Design requirements */}
          <div className="hero-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.02] pointer-events-none select-none z-[-1]">
            PERFECT
          </div>
          <div ref={titleRef} className="mb-8">
            <div className="overflow-hidden">
              <h2 className="hero-line text-sm font-medium text-accent uppercase tracking-widest mb-4">
                Hello, I am Kanhaiya Patidar
              </h2>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-line text-display font-black leading-tight tracking-tighter">
                IMPACTFUL <span className="text-white">DIGITAL</span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-line text-display font-black leading-tight tracking-tighter text-accent italic">
                SOLUTIONS
              </h1>
            </div>
          </div>

          <p ref={subtitleRef} className="max-w-2xl mx-auto text-xl text-text-secondary leading-relaxed mb-12">
            Building impactful digital solutions with creativity, code, and security in mind.
          </p>

          <div ref={statsRef} className="flex flex-wrap justify-center gap-12 mb-16">
            <div className="stat-item">
              <h4 className="text-4xl font-bold mb-1">2+</h4>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Years Exp.</p>
            </div>
            <div className="stat-item">
              <h4 className="text-4xl font-bold mb-1">50+</h4>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Projects</p>
            </div>
            <div className="stat-item">
              <h4 className="text-4xl font-bold mb-1">100%</h4>
              <p className="text-xs text-text-secondary uppercase tracking-widest">Satisfaction</p>
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
              <ArrowDown className="text-accent" />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold opacity-50">Scroll Down</span>
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-accent/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-accent/5 blur-[150px] rounded-full" />

      <style jsx>{`
        .text-display { font-size: var(--fs-display); }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce { animation: bounce 2s infinite; }
      `}</style>
    </section>
  )
}
