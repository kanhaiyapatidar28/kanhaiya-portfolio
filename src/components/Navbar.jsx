import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Milestones', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-999 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'} glass`}>
      <div className="container px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-lg shadow-emerald">
            <span className="text-black text-lg">K</span>
          </div>
          <span className="hidden sm:inline-block">KANHAIYA PATIDAR</span>
        </a>

        {/* Desktop Navigation links - The "Top Bar" labels requested */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-all"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-6 py-2 rounded-full bg-accent text-black text-xs font-extrabold flex items-center gap-1 hover:scale-105 active:scale-95 transition-all shadow-emerald"
          >
            Hire Me <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-text-primary glass bg-white/5 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-bg-color z-999 flex flex-col items-center justify-center gap-10 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none hidden'}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-5xl font-black tracking-tighter hover:text-accent transition-all italic"
          >
            {link.name}
          </a>
        ))}
        <button 
          className="absolute top-8 right-8 p-4 glass rounded-full"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
      </div>
    </nav>
  )
}
