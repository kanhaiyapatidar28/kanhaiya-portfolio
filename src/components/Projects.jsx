import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import BlurRevealText from './BlurRevealText'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Real-time Hospital Resource Sharing System",
    subtitle: "AI Bed & Resource Logistics",
    image: "/Project 1.jpeg",
    link: "https://sanjivani-frontend.onrender.com",
    color: "#06b6d4",
  },
  {
    title: "Intelligent Legal Assistance System",
    subtitle: "NLP Legal & Case Law AI",
    image: "/Project 2.jpeg",
    link: "#contact",
    color: "#a855f7",
  },
  {
    title: "Mechanic on Call",
    subtitle: "Emergency Roadside Dispatch",
    image: "/Project 3.jpeg",
    link: "#contact",
    color: "#f59e0b",
  },
  {
    title: "DeLance",
    subtitle: "Decentralized Freelance Marketplace",
    image: "/project 4.jpeg",
    link: "https://de-lance.vercel.app/",
    color: "#a855f7",
  },
  {
    title: "Crowdsourced Civic Issue Reporting",
    subtitle: "Civic Triage & GIS Routing",
    image: "/Project 5.jpeg",
    link: "#contact",
    color: "#10b981",
  }
]

function ProjectCardItem({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, spotX: 50, spotY: 50, isHovered: false })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({
      x: (x - 0.5) * 16,
      y: (0.5 - y) * 16,
      spotX: x * 100,
      spotY: y * 100,
      isHovered: true,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, spotX: 50, spotY: 50, isHovered: false })
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card flex-shrink-0 flex flex-col justify-center transition-transform duration-200 ease-out cursor-pointer group"
      style={{ 
        width: 'min(76vw, 760px)',
        maxWidth: '760px',
        transform: tilt.isHovered 
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.025)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="w-full relative transition-all duration-500 bg-[#070a0f] rounded-2xl sm:rounded-[28px] overflow-hidden group/img"
        style={{
          aspectRatio: '16 / 9',
          isolation: 'isolate',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          border: tilt.isHovered ? '1.5px solid rgba(16, 185, 129, 0.45)' : '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow: tilt.isHovered 
            ? '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(16, 185, 129, 0.2)' 
            : '0 20px 60px rgba(0, 0, 0, 0.85)'
        }}
      >
        {tilt.isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(600px circle at ${tilt.spotX}% ${tilt.spotY}%, rgba(16, 185, 129, 0.15), transparent 40%)`
            }}
          />
        )}

        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-106"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        <span className="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-white shadow-lg pointer-events-none group-hover:border-accent/50 group-hover:text-accent transition-colors">
          0{index + 1}
        </span>
      </div>

      <div className="mt-3.5 sm:mt-5 flex items-center justify-between gap-4 px-1 sm:px-2">
        <div className="flex flex-col items-start max-w-[72%]">
          <p className="text-[7.5px] sm:text-xs font-mono uppercase tracking-widest font-bold text-accent mb-0.5 sm:mb-1 group-hover:translate-x-1 transition-transform">
            {project.subtitle}
          </p>
          <h3 className="text-xs sm:text-2xl md:text-3xl lg:text-[2.25rem] font-black text-white tracking-tight leading-snug sm:leading-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="flex-shrink-0">
          <a 
            href={project.link}
            className="inline-flex items-center justify-center rounded-full bg-accent text-black font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.45),inset_0_1.5px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.9)] hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto select-none group/btn h-8 sm:h-11 md:h-12 px-4 sm:px-6 md:px-7 gap-1.5 sm:gap-2"
            style={{
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
            }}
          >
            <span 
              style={{ 
                display: 'inline-block',
                lineHeight: 1,
                letterSpacing: '0.08em',
              }}
            >
              Visit
            </span>
            <span 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              <ArrowUpRight 
                strokeWidth={2.8}
                className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 w-3 sm:w-4 md:w-4.5 h-3 sm:h-4 md:h-4.5" 
                style={{ 
                  display: 'block',
                  flexShrink: 0,
                }} 
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!sectionRef.current) return 0
        return sectionRef.current.scrollWidth - window.innerWidth
      }

      const scrollTween = gsap.to(sectionRef.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.4,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      })

      gsap.to(progressRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          invalidateOnRefresh: true
        },
        width: '100%',
        ease: 'none'
      })

      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          y: 12,
          opacity: 0.4,
          scale: 0.98,
          duration: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 98%',
            toggleActions: 'play none none reverse'
          }
        })
      })

    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="overflow-hidden bg-[#030508] relative z-10">
      <div ref={triggerRef}>
        <div 
          ref={sectionRef} 
          className="flex items-center relative w-max flex-nowrap" 
          style={{ height: '100vh', gap: '8vw', paddingRight: '15vw' }}
        >
          
          <div 
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-20"
            style={{ width: '100vw', minWidth: '100vw' }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 w-full max-w-[94vw] 2xl:max-w-[1700px]">
              
              <div className="flex flex-col justify-center max-w-5xl">
                <div className="section-header-bar mb-4 sm:mb-7 max-w-md">
                  <span className="section-title-label text-xs sm:text-sm md:text-base font-mono">Selected Works</span>
                  <span className="section-num text-xs sm:text-sm md:text-base font-mono">02 / 05</span>
                </div>
                
                <BlurRevealText
                  as="h2"
                  className="font-black tracking-tighter text-white uppercase mb-4 sm:mb-6"
                  style={{
                    fontSize: 'clamp(3.2rem, 7.2vw, 9.2rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em'
                  }}
                  scrub={false}
                  duration={0.6}
                  blurAmount={8}
                  start="top 95%"
                >
                  CRAFTING <br />
                  <span className="text-accent italic">IMPACTFUL</span> <br />
                  SOLUTIONS
                </BlurRevealText>
                
                <BlurRevealText
                  as="p"
                  className="text-text-secondary leading-relaxed mb-6 sm:mb-10 font-normal opacity-90"
                  style={{
                    fontSize: 'clamp(1rem, 1.85vw, 2.25rem)',
                    maxWidth: 'min(92%, 950px)',
                    lineHeight: 1.3
                  }}
                  scrub={false}
                  duration={0.6}
                  blurAmount={7}
                  start="top 95%"
                >
                  A curated showcase of full-stack engineering, real-time architectures, and polished interactive experiences.
                </BlurRevealText>
                
                <div className="flex items-center gap-3.5 text-xs sm:text-base md:text-lg font-bold uppercase tracking-widest text-accent">
                  <span className="w-10 sm:w-14 md:w-20 h-[3px] bg-accent inline-block"></span>
                  Scroll horizontally to explore
                </div>
              </div>

              <div className="projects-floating-photo-container">
                <img 
                  src="/floating photo.png" 
                  alt="Floating Art" 
                  className="projects-floating-photo hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

          {projects.map((project, index) => (
            <ProjectCardItem key={index} project={project} index={index} />
          ))}

        </div>
      </div>

      <div 
        className="fixed overflow-hidden rounded-full z-100" 
        style={{ bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', width: '28vw', height: '3px', backgroundColor: 'rgba(255,255,255,0.08)' }}
      >
        <div ref={progressRef} className="h-full bg-accent shadow-emerald" style={{ width: '0%' }} />
      </div>
    </section>
  )
}
