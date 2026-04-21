import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Real-time Hospital Resource Sharing System",
    category: "Healthcare",
    tags: ["Real-time", "AI", "Platform"],
    image: "/Project 1.jpeg",
    color: "#06b6d4"
  },
  {
    title: "Intelligent Legal Assistance System",
    category: "Legal Tech",
    tags: ["AI", "Web", "Law"],
    image: "/Project 2.jpeg",
    color: "#8b5cf6"
  },
  {
    title: "Mechanic on call",
    category: "On-Demand Service",
    tags: ["Web", "Location", "Emergency"],
    image: "/Project 3.jpeg",
    color: "#f59e0b"
  },
  {
    title: "Valentine Store",
    category: "E-Commerce",
    tags: ["React", "Shop", "Web"],
    image: "/Project 4.jpeg",
    color: "#f43f5e"
  },
  {
    title: "Croudsourced civic issue reporting and resolution system",
    category: "IoT Automation",
    tags: ["IoT", "Web", "Smart City"],
    image: "/Project 5.jpeg",
    color: "#10b981"
  }
]

export default function Projects() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const scrollTween = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: '-400vw',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=4000',
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          }
        }
      )

      // Section Progress Bar
      gsap.to(progressRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=4000',
          scrub: true,
        },
        width: '100%',
        ease: 'none'
      })

      // Image Parallax within Horizontal Scroll
      gsap.utils.toArray('.project-image').forEach((img) => {
        gsap.fromTo(img, 
          { x: -50 },
          {
            x: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        )
      })

      // Card Entry Reveal
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })

    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="overflow-hidden" style={{ backgroundColor: '#000' }}>
      <div ref={triggerRef}>
        <div ref={sectionRef} className="flex items-center relative" style={{ height: '100vh', width: '500vw', gap: '8vw', paddingLeft: '10vw', paddingRight: '10vw' }}>
          
          {/* Section Header */}
          <div className="flex-shrink-0 flex flex-col justify-center" style={{ width: '80vw' }}>
            <div className="section-header-bar mb-12">
              <span className="section-title-label">Selected Works</span>
              <span className="section-num">02 / 06</span>
            </div>
            
            <h2 className="text-display font-black tracking-tighter leading-none mb-8">
              CRAFTING <br /> IMPACTFUL <br /> SOLUTIONS
            </h2>
            <p className="text-xl text-text-secondary max-w-lg mb-12">
              A curated collection of projects where design meets functionality. Scroll to explore my journey through digital craftsmanship.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-accent">
              <span className="w-12 h-[1px] bg-accent"></span>
              Scroll to explore
            </div>
          </div>

          {/* Project Items */}
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card flex-shrink-0 relative group perspective-1000"
              style={{ width: '65vw', height: '70vh' }}
            >
              <div 
                className="w-full h-full overflow-hidden relative transition-all duration-500 glass transform-gpu"
                style={{ borderRadius: '3rem' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = (e.clientX - rect.left) / rect.width
                  const y = (e.clientY - rect.top) / rect.height
                  const rotateX = (y - 0.5) * 10
                  const rotateY = (x - 0.5) * -10
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
                {/* Image Wrap for Parallax */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image object-cover absolute transition-transform duration-700"
                    style={{ width: '110%', height: '110%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 40%)' }} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-16 flex flex-col justify-between z-10">
                  {/* Top Content */}
                  <div className="max-w-4xl pr-24">
                    <div className="mb-6 flex flex-wrap gap-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="px-4 py-1.5 bg-accent text-black text-[0.6rem] font-black uppercase tracking-tighter rounded-full shadow-emerald">
                        {project.category}
                      </span>
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[0.6rem] font-bold uppercase tracking-widest rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-8 transform-gpu group-hover:translate-x-4 transition-transform duration-500 italic max-w-3xl" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex items-center gap-6 transform translate-y-4 transition-all duration-500 delay-100" style={{ opacity: 0.9 }}>
                    <button className="px-10 py-4 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 transition-colors shadow-xl" style={{ backgroundColor: '#fff', color: '#000' }}>
                      View Project <ArrowUpRight size={18} />
                    </button>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest border-l border-white/20 pl-6 h-4 flex items-center">
                      Case Study 2024
                    </span>
                  </div>
                </div>

                <div className="absolute border flex items-center justify-center backdrop-blur-md transition-all" style={{ top: '3rem', right: '3rem', width: '5rem', height: '5rem', borderRadius: '50%', borderColor: 'rgba(255,255,255,0.1)', opacity: 0.5, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                   <div className="text-accent italic font-black text-2xl transition-transform">0{index + 1}</div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Horizontal Progress bar */}
      <div className="fixed overflow-hidden rounded-full z-100" style={{ bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '30vw', height: '2px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <div ref={progressRef} className="h-full bg-accent shadow-emerald" style={{ width: '0%' }} />
      </div>
    </section>
  )
}
