import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ArrowDown, 
  ArrowUpRight, 
  Download, 
  Shield, 
  Code, 
  Award, 
  Linkedin, 
  Github, 
  Mail 
} from 'lucide-react'
import BlurRevealText from './BlurRevealText'

gsap.registerPlugin(ScrollTrigger)

const roles = [
  'Cybersecurity',
  'Front-End Development',
  'UI/UX Design'
]

export default function Hero() {
  const heroRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const [profileTilt, setProfileTilt] = useState({ x: 0, y: 0, isHovered: false })

  // Interactive 3D tilt handler for profile photo
  const handleProfileMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setProfileTilt({ x: x * 22, y: -y * 22, isHovered: true })
  }

  const handleProfileMouseLeave = () => {
    setProfileTilt({ x: 0, y: 0, isHovered: false })
  }

  // Typing effect animation hook
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 30 : 50

    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      )
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, roleIndex])

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-anim-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
      )
      .fromTo(
        '.profile-visuals-wrapper',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' },
        '-=0.6'
      )
      .fromTo(
        '.floating-badge',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        '.stat-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      )

      // Subtle scroll parallax
      gsap.to('.hero-container-inner', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: -60,
        opacity: 0.85
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={heroRef} 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="container px-6 relative z-10 hero-container-inner">
        
        {/* Section Top Bar */}
        <div className="section-header-bar mb-10">
          <span className="section-title-label">Introduction</span>
          <span className="section-num">01 / 05</span>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="hero-grid">
          
          {/* Left Column: Introduction & Details */}
          <div className="flex flex-col items-start justify-center md:pt-4">
            
            <div className="hero-anim-item">
              <span className="text-xs uppercase tracking-widest text-accent font-black mb-3 inline-block">
                Hello, I am
              </span>
            </div>

            {/* 3D Name Graphic */}
            <div className="hero-anim-item hero-name-img-wrapper">
              <img 
                src="/name.png" 
                alt="Kanhaiya Patidar" 
                className="hero-name-img hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Dynamic Typing Title */}
            <div className="hero-anim-item mb-5">
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                Passionate about{' '}
                <br className="block md:hidden" />
                <span className="text-accent font-black">
                  {displayedText}
                </span>
                <span className="typing-cursor">|</span>
              </h2>
            </div>

            {/* Description with Blurry Reveal */}
            <div className="hero-anim-item max-w-xl mb-8">
              <BlurRevealText
                as="p"
                className="text-text-secondary text-base md:text-lg leading-relaxed"
                scrub={false}
                duration={0.6}
                stagger={0.02}
                blurAmount={7}
                start="top 95%"
              >
                Full-stack developer & cybersecurity enthusiast dedicated to building secure, high-performance web applications with refined aesthetics and intuitive user experiences.
              </BlurRevealText>
            </div>

            {/* Action Buttons with Spring Micro-Interactions */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 mb-8">
              <a href="#work" className="cta-button-primary group/cta">
                <span>Explore Work</span>
                <ArrowUpRight size={17} className="cta-icon-move transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
              </a>
              <a 
                href="/Kanhaiya_Patidar_Updated_Resume.pdf" 
                download="Kanhaiya_Patidar_Updated_Resume.pdf" 
                className="cta-button-secondary group/res"
              >
                <Download size={16} className="transition-transform duration-300 group-hover/res:-translate-y-0.5" /> <span>Resume</span>
              </a>
              <a href="#contact" className="cta-button-secondary">
                Contact Me
              </a>
            </div>

            {/* Social Links with Scale & Glow Micro-Interactions */}
            <div className="hero-anim-item flex items-center gap-5">
              <a 
                href="https://www.linkedin.com/in/kanhaiya-patidar-b054aa32a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-300 hover:scale-115 hover:-translate-y-1 shadow-lg hover:shadow-accent/20"
                title="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/kanhaiyapatidar28" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-300 hover:scale-115 hover:-translate-y-1 shadow-lg hover:shadow-accent/20"
                title="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kanheyapatidar32@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl text-text-secondary hover:text-accent hover:border-accent/50 transition-all duration-300 hover:scale-115 hover:-translate-y-1 shadow-lg hover:shadow-accent/20"
                title="Send Email via Gmail (To: kanheyapatidar32@gmail.com)"
              >
                <Mail size={20} />
              </a>
            </div>

          </div>

          {/* Right Column: Visual Profile with 3D Micro Tilt, Radar Glow & Floating Badges */}
          <div className="flex justify-center items-center relative py-6">
            <div 
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              className="profile-visuals-wrapper transition-transform duration-200 ease-out cursor-pointer"
              style={{
                transform: profileTilt.isHovered 
                  ? `perspective(1000px) rotateX(${profileTilt.y}deg) rotateY(${profileTilt.x}deg) scale(1.03)` 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                transformStyle: 'preserve-3d'
              }}
            >
              
              {/* Radial Glowing Background Orb */}
              <div className="profile-glow" />

              {/* Concentric Radar Rings */}
              <div className="radar-circles-container">
                <div className="radar-circle radar-circle-1" />
                <div className="radar-circle radar-circle-2" />
                <div className="radar-circle radar-circle-3" />
              </div>

              {/* Core Profile Image with 3D Depth */}
              <div 
                className="profile-img-container transition-transform duration-300"
                style={{
                  transform: profileTilt.isHovered ? 'translateZ(30px)' : 'translateZ(0px)'
                }}
              >
                <img 
                  src="/profile_transparent.png" 
                  alt="Kanhaiya Patidar" 
                  className="profile-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              {/* Glassmorphic Floating Badges with 3D Parallax */}
              <div 
                className="floating-badge badge-top-right transition-transform duration-300"
                style={{
                  transform: profileTilt.isHovered ? 'translateZ(50px) translateY(-5px)' : 'translateZ(0px)'
                }}
              >
                <Shield size={16} className="text-accent animate-pulse" />
                <span>Cybersecurity Enthusiast</span>
              </div>

              <div 
                className="floating-badge badge-middle-left transition-transform duration-300"
                style={{
                  transform: profileTilt.isHovered ? 'translateZ(45px) translateX(-5px)' : 'translateZ(0px)'
                }}
              >
                <Code size={16} className="text-accent animate-bounce" />
                <span>Front-End Developer</span>
              </div>

              <div 
                className="floating-badge badge-bottom-right transition-transform duration-300"
                style={{
                  transform: profileTilt.isHovered ? 'translateZ(55px) translateY(5px)' : 'translateZ(0px)'
                }}
              >
                <Award size={16} className="text-accent" />
                <span>Problem Solver</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Stats Banner & Scroll Down Prompt */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-14">
            <div className="stat-item flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black text-white italic">10+</span>
              <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
                Projects Completed
              </span>
            </div>
            <div className="stat-item flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black text-accent italic">5+</span>
              <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
                Hackathons & Awards
              </span>
            </div>
            <div className="stat-item flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black text-white italic">100%</span>
              <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
                Code Quality
              </span>
            </div>
          </div>

          <a 
            href="#work" 
            className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-text-secondary hover:text-accent transition-colors group"
          >
            <span>Scroll Down</span>
            <div className="w-9 h-9 rounded-full border border-white/10 glass flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all">
              <ArrowDown size={14} className="text-accent animate-bounce" />
            </div>
          </a>

        </div>

      </div>

      {/* Subtle Background Glow Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] bg-accent/5 blur-[160px] rounded-full pointer-events-none" />
    </section>
  )
}
