import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let lenis = null;
    let tickerCallback = null;

    try {
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Feed Lenis directly into GSAP's optimized ticker loop
      tickerCallback = (time) => {
        if (lenis) {
          lenis.raf(time * 1000);
        }
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn("SmoothScroll initialization warning:", e);
    }

    return () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenis) {
        try {
          lenis.destroy();
        } catch (e) {}
      }
    };
  }, [])

  return <>{children}</>
}

