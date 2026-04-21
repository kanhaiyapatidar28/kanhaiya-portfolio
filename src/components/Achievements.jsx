import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Trophy, Award, Medal, Rocket, ShieldCheck } from 'lucide-react'

const achievements = [
  { title: '1st Winner – Smart Indore Hackathon', type: 'Hackathon', icon: <Trophy className="text-accent" size={32} /> },
  { title: 'Smart Innovation Award – Praytna 3.0', type: 'Hackathon', icon: <Award className="text-accent" size={32} /> },
  { title: 'Smart Innovation Award – AI Manthan', type: 'Hackathon', icon: <Medal className="text-accent" size={32} /> },
  { title: 'Participant – Hackwave Hackathon', type: 'Hackathon', icon: <Rocket className="text-accent" size={32} /> },
  { title: 'Participant – TechXLR', type: 'Hackathon', icon: <Rocket className="text-accent" size={32} /> },
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
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
      gsap.from('.cert-item', {
        x: -40,
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
    <section id="achievements" ref={sectionRef} className="py-32 relative overflow-hidden bg-bg-color">
      <div className="container px-6 relative z-10">
        <div className="section-header-bar mb-24">
          <span className="section-title-label">Milestones</span>
          <span className="section-num">05 / 06</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Hackathons & Awards */}
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-12">
              AWARDS & <span className="text-white/20">HACKATHONS</span>
            </h2>
            <div className="flex flex-col gap-6">
              {achievements.map((item, idx) => (
                <div key={idx} className="achieve-card glass p-6 rounded-2xl flex items-center gap-6 group hover:border-accent/50 transition-colors">
                  <div className="p-4 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <span className="text-xs uppercase tracking-widest text-accent font-black mt-2 inline-block">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="certs-container">
            <h2 className="text-5xl font-black tracking-tighter mb-12">
              CERTIFICATIONS
            </h2>
            <div className="flex flex-col gap-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="cert-item flex items-center gap-4 border-b border-white/10 pb-4">
                  <ShieldCheck className="text-accent" size={24} />
                  <span className="text-xl font-bold text-text-secondary hover:text-white transition-colors">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
