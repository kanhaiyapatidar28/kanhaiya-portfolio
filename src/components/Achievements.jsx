import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, Award, Medal, ShieldCheck } from 'lucide-react'
import BlurRevealText from './BlurRevealText'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  { title: '1st Winner – Ideathon 2k26 PIMR, Bhopal', type: 'Hackathon', icon: <Trophy className="text-accent" size={30} /> },
  { title: '1st Winner – Minor Project Exhibition 2k26 at PIEMR, Indore', type: 'Exhibition', icon: <Award className="text-accent" size={30} /> },
  { title: '1st Winner – Smart Indore Hackathon', type: 'Hackathon', icon: <Trophy className="text-accent" size={30} /> },
  { title: 'Smart Innovation Award – Praytna 3.0', type: 'Innovation', icon: <Award className="text-accent" size={30} /> },
  { title: 'Smart Innovation Award – AI Manthan', type: 'Hackathon', icon: <Medal className="text-accent" size={30} /> },
]

const certifications = [
  'C++ Programming',
  'Python Programming',
  'Blockchain Technology',
  'Cybersecurity'
]

export default function Achievements() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.achieve-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
      gsap.from('.cert-item', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.certs-container',
          start: 'top 85%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="container px-6 relative z-10">
        
        <div className="section-header-bar mb-20">
          <span className="section-title-label">Milestones</span>
          <span className="section-num">05 / 06</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Hackathons & Awards */}
          <div>
            <BlurRevealText
              as="h2"
              className="text-4xl md:text-5xl font-black tracking-tighter mb-10"
              scrub={false}
              duration={0.8}
              blurAmount={14}
              highlightWords={["HACKATHONS"]}
              highlightClassName="text-accent italic"
            >
              AWARDS & HACKATHONS
            </BlurRevealText>
            <div className="flex flex-col gap-4">
              {achievements.map((item, idx) => (
                <div 
                  key={idx} 
                  className="achieve-card glass p-5 rounded-2xl flex items-center gap-5 group hover:border-accent/50 hover:bg-white/5 transition-all"
                >
                  <div className="p-3.5 bg-white/5 rounded-xl group-hover:scale-110 group-hover:bg-accent/10 transition-all flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white leading-snug">{item.title}</h4>
                    <span className="text-[0.65rem] uppercase tracking-widest text-accent font-black mt-1.5 inline-block">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="certs-container flex flex-col justify-start">
            <BlurRevealText
              as="h2"
              className="text-4xl md:text-5xl font-black tracking-tighter mb-10"
              scrub={false}
              duration={0.8}
              blurAmount={14}
            >
              CERTIFICATIONS
            </BlurRevealText>
            <div className="flex flex-col gap-3">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="cert-item flex items-center gap-4 glass p-4 rounded-xl border border-white/5 hover:border-accent/40 transition-colors"
                >
                  <ShieldCheck className="text-accent flex-shrink-0" size={22} />
                  <span className="text-lg font-bold text-text-primary">
                    {cert}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Highlight Box */}
            <div className="mt-8 glass p-6 rounded-2xl border border-accent/20 bg-accent/5">
              <h4 className="text-base font-extrabold text-white mb-2 flex items-center gap-2">
                <Trophy size={18} className="text-accent" /> Competitive Excellence
              </h4>
              <BlurRevealText
                as="p"
                className="text-sm text-text-secondary leading-relaxed"
                scrub={0.6}
                start="top 90%"
                end="bottom 60%"
                blurAmount={10}
                highlightWords={["winning", "hackathons", "innovative", "cybersecurity"]}
                highlightClassName="text-white font-medium"
              >
                Consistently winning and placing in collegiate and regional hackathons with innovative prototypes spanning IoT, full-stack web platforms, and cybersecurity.
              </BlurRevealText>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
