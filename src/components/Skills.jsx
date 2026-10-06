import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Code2, Palette, Globe, Cpu, MessageSquare, Rocket } from 'lucide-react'
import Ballpit from './Ballpit'
import ErrorBoundary from './ErrorBoundary'
import BlurRevealText from './BlurRevealText'

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Palette className="text-accent" size={40} />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    title: 'Programming Languages',
    icon: <Code2 className="text-accent" size={40} />,
    skills: ['C++', 'Python', 'Java']
  },
  {
    title: 'Other Technologies',
    icon: <Cpu className="text-accent" size={40} />,
    skills: ['IoT', 'Cybersecurity']
  }
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="section-header-bar mb-24">
          <span className="section-title-label">Expertise</span>
          <span className="section-num">04 / 06</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <BlurRevealText
              as="h2"
              className="text-7xl font-black tracking-tighter leading-none"
              scrub={false}
              duration={0.6}
              blurAmount={8}
              start="top 95%"
            >
              MY <span className="text-white/20">ARSENAL</span>
            </BlurRevealText>
          </div>
          <BlurRevealText
            as="p"
            className="max-w-md text-text-secondary text-lg leading-relaxed"
            scrub={0.5}
            start="top 96%"
            end="top 75%"
            blurAmount={8}
          >
            I combine technical mastery with creative vision to deliver digital products that stand out and perform.
          </BlurRevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="skill-card glass p-10 rounded-3xl group hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] cursor-pointer"
            >
              <div className="mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                {category.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight group-hover:text-accent transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold border border-white/10 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 w-full h-[500px] rounded-[3rem] overflow-hidden relative border border-white/5 bg-accent/5">
          <div className="absolute top-8 left-8 z-10 pointer-events-none">
            <h3 className="text-2xl font-black text-white/50 tracking-widest uppercase shadow-black drop-shadow-lg">
              Interactive Expertise
            </h3>
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] mt-2 shadow-black drop-shadow-lg">
              Play around with the technologies I use
            </p>
          </div>
          <ErrorBoundary>
            <Ballpit 
              count={35}
              gravity={0.05}
              friction={0.9975}
              wallBounce={0.8}
              followCursor={true}
            />
          </ErrorBoundary>
        </div>

      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  )
}
