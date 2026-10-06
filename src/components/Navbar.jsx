import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight, Download } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      const sections = ['contact', 'achievements', 'skills', 'about', 'work', 'home']
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('.mobile-toggle-btn')
      ) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Navigation items for Work / About / Skills / Milestone / Contact
  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Milestone', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const yOffset = -80
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header className={`capsule-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="capsule-container" aria-label="Main Navigation">
          
          {/* Left Pod: Brand / Monogram & Live Vital Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')}
              className="capsule-brand group"
              aria-label="Kanhaiya Patidar Home"
            >
              <img 
                src="/Portfolio logo.png" 
                alt="Kanhaiya Patidar Logo" 
                className="capsule-brand-icon"
              />
              <div className="flex flex-col">
                <span className="capsule-brand-text">KANHAIYA PATIDAR</span>
              </div>
            </a>

            {/* Vital Status Indicator Pill (Desktop Only) */}
            <div className="hidden lg:flex vital-status-badge">
              <span className="vital-pulse-dot"></span>
              <span>Available</span>
            </div>
          </div>

          {/* Center Pod: Navigation Links (Desktop / Laptop Only - Hidden on Mobile) */}
          <div className="capsule-links-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`capsule-link flex items-center gap-1.5 transition-all duration-300 ${isActive ? 'active text-white font-bold' : ''}`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                  <span>{link.name}</span>
                </a>
              )
            })}
          </div>

          {/* Right Pod: Persistent Resume Button + CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Persistent Visible Resume CTA Button (Always visible on BOTH Mobile and Desktop) */}
            <a
              href="/resume.pdf"
              download="Kanhaiya_Patidar_Resume.pdf"
              className="capsule-resume-btn group/navres hover:scale-105 active:scale-95 transition-transform duration-300"
              title="Download Resume"
              aria-label="Download Resume"
            >
              <Download size={13} className="resume-icon transition-transform duration-300 group-hover/navres:-translate-y-0.5" />
              <span>Resume</span>
            </a>

            {/* Hire Me CTA Button (Tablet / Desktop) */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="capsule-cta-button group/navcta hover:scale-105 active:scale-95 transition-transform duration-300"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/navcta:translate-x-0.5 group-hover/navcta:-translate-y-0.5" />
            </a>

            {/* Mobile Menu Toggle Button (Mobile screens only - not on laptop) */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="capsule-mobile-backdrop md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Capsule Menu (Work, About, Skills, Milestone, Contact) */}
      {mobileMenuOpen && (
        <div ref={menuRef} className="capsule-mobile-menu animate-fadeIn md:hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="vital-status-badge">
              <span className="vital-pulse-dot"></span>
              <span>Open to Opportunities</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Mobile Navigation"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 my-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`capsule-mobile-link ${isActive ? 'active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>}
                    {link.name}
                  </span>
                  <ArrowUpRight size={14} className={isActive ? 'text-accent opacity-100' : 'opacity-40'} />
                </a>
              )
            })}
          </div>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="w-full py-3 rounded-full bg-accent text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-emerald mt-1 hover:brightness-110 active:scale-98 transition-all"
          >
            <span>Let's Build Something</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </>
  )
}


