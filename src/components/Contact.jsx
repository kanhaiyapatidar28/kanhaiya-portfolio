import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Mail, Github, Linkedin, Download, ArrowUpRight } from 'lucide-react'
import BlurRevealText from './BlurRevealText'

export default function Contact() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const button = document.querySelector('.magnetic-button')
      if (button) {
        const onMouseMove = (e) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(button, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.4,
            ease: 'power2.out'
          })
        }

        const onMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          })
        }

        button.addEventListener('mousemove', onMouseMove)
        button.addEventListener('mouseleave', onMouseLeave)

        return () => {
          button.removeEventListener('mousemove', onMouseMove)
          button.removeEventListener('mouseleave', onMouseLeave)
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={containerRef} className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="container px-6">
        
        <div className="section-header-bar mb-24">
          <span className="section-title-label">Connect</span>
          <span className="section-num">06 / 06</span>
        </div>

        <div className="text-center mb-16">
          <BlurRevealText
            as="h2"
            className="text-[12vw] sm:text-6xl md:text-display font-black tracking-tighter leading-none mb-12 px-2"
            scrub={false}
            duration={0.6}
            blurAmount={8}
            start="top 95%"
          >
            LET'S BUILD <br />
            <span className="text-accent italic">SOMETHING GREAT</span>
          </BlurRevealText>

          {/* Interactive Gmail CTA */}
          <div className="flex flex-col items-center gap-5 mb-20">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kanheyapatidar32@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button p-6 md:p-10 bg-accent rounded-full text-black flex items-center justify-center group shadow-emerald hover:scale-110 transition-transform cursor-pointer"
              title="Open Gmail with To: kanheyapatidar32@gmail.com"
            >
              <Mail className="w-8 h-8 md:w-11 md:h-11 transition-transform group-hover:scale-110" />
            </a>

            {/* Explicit Clickable Gmail Address */}
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kanheyapatidar32@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-xl md:text-3xl break-all text-center px-4 font-mono font-bold text-accent hover:text-white transition-all duration-300 underline underline-offset-8 decoration-accent/50 hover:decoration-white hover:scale-105"
            >
              kanheyapatidar32@gmail.com
            </a>

            <p className="text-text-secondary text-xs sm:text-sm max-w-md">
              Click to compose an email directly on Gmail to <span className="text-white font-bold">kanheyapatidar32@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Social / Direct Action Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { 
              icon: <Github size={24} />, 
              label: 'GitHub', 
              href: 'https://github.com/kanhaiyapatidar28', 
              target: '_blank' 
            },
            { 
              icon: <Linkedin size={24} />, 
              label: 'LinkedIn', 
              href: 'https://www.linkedin.com/in/kanhaiya-patidar-b054aa32a', 
              target: '_blank' 
            },
            { 
              icon: <Mail size={24} />, 
              label: 'Gmail', 
              href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kanheyapatidar32@gmail.com',
              target: '_blank'
            },
            { 
              icon: <Download size={24} />, 
              label: 'Download Resume', 
              href: '/resume.pdf',
              download: 'Kanhaiya_Patidar_Resume.pdf'
            }
          ].map((item, idx) => (
            <a 
              key={idx} 
              href={item.href}
              target={item.target || '_blank'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              download={item.download}
              className="flex flex-col items-center gap-3 glass p-6 rounded-2xl hover:border-accent/50 hover:bg-white/5 transition-all group hover:scale-105"
            >
              <div className="p-3.5 rounded-xl bg-white/5 text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                {item.icon}
              </div>
              <span className="font-bold uppercase tracking-widest text-xs text-text-primary group-hover:text-accent transition-colors">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer Copyright with Direct Gmail link */}
        <div className="mt-28 pt-12 border-t border-white/5 text-center flex flex-col items-center gap-2">
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=kanheyapatidar32@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-mono text-accent hover:text-white transition-colors"
          >
            kanheyapatidar32@gmail.com
          </a>
          <p className="text-xs uppercase tracking-widest text-text-secondary">
            &copy; {new Date().getFullYear()} Kanhaiya Patidar. All rights reserved. Built with React & Vite.
          </p>
        </div>

      </div>
    </section>
  )
}
