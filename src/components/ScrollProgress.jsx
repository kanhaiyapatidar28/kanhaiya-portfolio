import { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-white/10 z-[100] hidden lg:block rounded-full overflow-hidden">
      <div 
        className="w-full bg-accent transition-all duration-100 ease-out"
        style={{ height: `${progress}%` }}
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent vertical-text">
        {Math.round(progress)}%
      </div>
    </div>
  )
}
