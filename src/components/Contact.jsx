import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic effect for the mail button
      const button = document.querySelector('.magnetic-button')
      if (button) {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.5,
            ease: 'power2.out'
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)'
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="container px-6">
        <div className="section-header-bar mb-32">
          <span className="section-title-label">Connect</span>
          <span className="section-num">06 / 06</span>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-display font-black tracking-tighter leading-none mb-16">
            WANT TO <br /> <span className="text-white/20">WORK?</span>
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-32">
            <a href="mailto:hello@kanhaiya.dev" className="magnetic-button p-10 bg-accent rounded-full text-black flex items-center justify-center group shadow-emerald">
              <Mail size={48} className="transition-all" />
            </a>
            <div className="text-left max-w-sm">
              <h3 className="text-4xl font-bold mb-2">Ready to start?</h3>
              <p className="text-text-secondary text-lg">Send me an email and let's bring your vision to life.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: <Github />, label: 'Github' },
            { icon: <Linkedin />, label: 'LinkedIn' },
            { icon: <Instagram />, label: 'Instagram' },
            { icon: <ArrowUpRight />, label: 'Resume' }
          ].map((item, idx) => (
            <a key={idx} href="#" className="flex flex-col items-center gap-4 group p-8 rounded-3xl hover:bg-white/5 transition-all">
              <div className="p-4 rounded-xl bg-white/5 text-accent transform transition-transform">
                {item.icon}
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-32 pt-16 border-t border-white/5 text-center">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Kanhaiya Patidar. All rights reserved. Built with Passion & Perfection.
        </p>
      </div>
    </section>
  )
}
