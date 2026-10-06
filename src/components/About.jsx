import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlurRevealText from './BlurRevealText'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to('.about-img', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -60
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 relative z-20 overflow-hidden bg-[#050505] shadow-[0_-50px_120px_rgba(0,0,0,0.98)] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] border-t border-white/10"
    >
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

            {/* Main Image Container */}
            <div
              className="relative h-full overflow-hidden rounded-[3rem] about-img shadow-2xl transform-gpu hover:scale-[1.015] hover:border-accent/40 transition-transform duration-500 will-change-transform"
              style={{ minHeight: '550px' }}
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
            {/* Stacked Headline with exact original line layout & 1/4 screen Blurry Reveal */}
            <div className="text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-none mb-8">
              {["FRONTEND", "DEVELOPER &", "CYBERSECURITY", "ENTHUSIAST"].map((text, i) => (
                <BlurRevealText
                  key={i}
                  as="div"
                  className="mb-2"
                  scrub={false}
                  duration={0.5}
                  blurAmount={8}
                  start="top 95%"
                >
                  {text}
                </BlurRevealText>
              ))}
            </div>

            {/* Blurry Text Reveal Paragraph (1/4 Screen Reveal - Quick & Crisp) */}
            <BlurRevealText
              as="p"
              className="text-[1.15rem] text-text-secondary leading-relaxed opacity-85 max-w-lg mb-12"
              scrub={0.4}
              start="top 96%"
              end="top 75%"
              blurAmount={7}
              initialOpacity={0.4}
            >
              I am a passionate Frontend Developer with a strong interest in Cybersecurity and emerging technologies. I enjoy creating clean, user-friendly interfaces while also exploring how systems can be made more secure and reliable. Beyond coding, I have a creative side—I love sketching, which helps me think visually and bring unique design ideas into my projects. I am always eager to learn new technologies, solve real-world problems, and build innovative solutions that make a difference.
            </BlurRevealText>

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
