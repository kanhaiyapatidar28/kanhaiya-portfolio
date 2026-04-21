import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal effect (simulated with lines)
      gsap.from('.about-line', {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        },
        opacity: 0.1,
        stagger: 0.1,
        y: 20
      })

      // Image parallax
      gsap.to('.about-img', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -100
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden bg-accent/5">
      <div className="container px-6">
        <div className="section-header-bar mb-24">
          <span className="section-title-label">About Me</span>
          <span className="section-num">03 / 06</span>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Enhanced Photo Layout */}
          <div className="relative group perspective-1000">
            {/* Background Offset Frame */}
            <div className="absolute -inset-4 border border-accent/20 rounded-[3rem] -z-10 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />

            {/* Main Image Container with Tilt */}
            <div
              className="relative h-full overflow-hidden rounded-[3rem] about-img shadow-2xl transform-gpu transition-all duration-300"
              style={{ minHeight: '550px' }}
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width
                const y = (e.clientY - rect.top) / rect.height
                const rotateX = (y - 0.5) * 12
                const rotateY = (x - 0.5) * -12
                gsap.to(card, {
                  rotateX: rotateX,
                  rotateY: rotateY,
                  scale: 1.02,
                  duration: 0.4,
                  ease: 'power2.out'
                })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: 'elastic.out(1, 0.3)'
                })
              }}
            >
              <img
                src="/profile_transparent.png"
                alt="Kanhaiya Patidar"
                className="w-full h-full object-contain hover:scale-105 transition-all duration-700 relative z-10"
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />

              {/* Floating Badge */}
              <div className="absolute bottom-10 right-10 glass px-6 py-4 rounded-2xl flex flex-col items-start gap-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span className="text-[0.6rem] font-black uppercase tracking-widest text-accent">Role</span>
                <span className="text-sm font-bold white whitespace-nowrap">Creative Developer</span>
              </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/10 blur-[100px] -z-20 rounded-full" />
          </div>

          <div className="flex flex-col justify-center">
            <div ref={textRef} className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-none mb-8">
              {["FRONTEND", "DEVELOPER &", "CYBERSECURITY", "ENTHUSIAST"].map((text, i) => (
                <div key={i} className="about-line mb-2">{text}</div>
              ))}
            </div>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed opacity-80 max-w-lg mb-12">
              I am a passionate Frontend Developer with a strong interest in Cybersecurity and emerging technologies. I enjoy creating clean, user-friendly interfaces while also exploring how systems can be made more secure and reliable. Beyond coding, I have a creative side—I love sketching, which helps me think visually and bring unique design ideas into my projects. I am always eager to learn new technologies, solve real-world problems, and build innovative solutions that make a difference.
            </p>
            <div className="flex gap-16">
              <div>
                <h5 className="text-5xl font-black text-white italic">04+</h5>
                <p className="text-accent uppercase text-[0.6rem] font-black tracking-[0.3em] mt-3">Countries worked</p>
              </div>
              <div className="w-[1px] h-16 bg-white/10" />
              <div>
                <h5 className="text-5xl font-black text-white italic">12k+</h5>
                <p className="text-accent uppercase text-[0.6rem] font-black tracking-[0.3em] mt-3">Hours Coding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
