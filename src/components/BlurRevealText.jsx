import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * BlurRevealText
 * Smooth blurry text reveal effect restricted strictly to the bottom 1/4 of the screen
 * so text becomes 100% crisp and readable before reaching the main viewing area.
 */
export default function BlurRevealText({
  children,
  as: Component = 'div',
  className = '',
  wordClassName = '',
  scrub = true,
  start = 'top 95%',
  end = 'top 75%',
  stagger = 0.02,
  blurAmount = 8,
  yOffset = 8,
  initialOpacity = 0.28,
  duration = 0.6,
  ease = 'power2.out',
  highlightWords = [],
  highlightClassName = 'text-accent',
  style = {},
  ...props
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.blur-reveal-word')
    if (!words || words.length === 0) return

    // Set initial subtle blur & opacity
    gsap.set(words, {
      filter: `blur(${blurAmount}px)`,
      opacity: initialOpacity,
      y: yOffset,
      willChange: 'filter, opacity, transform',
    })

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.to(words, {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          stagger: stagger,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: start,
            end: end,
            scrub: typeof scrub === 'number' ? scrub : 0.5,
            invalidateOnRefresh: true,
          }
        })
      } else {
        gsap.to(words, {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          stagger: stagger,
          duration: duration,
          ease: ease,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none reverse',
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [scrub, start, end, stagger, blurAmount, yOffset, initialOpacity, duration, ease, children])

  // Helper to wrap string into words
  const wrapString = (str, keyPrefix = 'w') => {
    if (typeof str !== 'string') return str
    const parts = str.split(/(\s+)/)
    return parts.map((part, i) => {
      if (/^\s+$/.test(part)) {
        return <span key={`${keyPrefix}-${i}`}>{part}</span>
      }
      const clean = part.replace(/[^a-zA-Z0-9]/g, '')
      const isHigh = highlightWords.some(
        hw => hw.toLowerCase() === clean.toLowerCase() || hw.toLowerCase() === part.toLowerCase()
      )
      return (
        <span
          key={`${keyPrefix}-${i}`}
          className={`blur-reveal-word inline-block whitespace-nowrap ${wordClassName} ${isHigh ? highlightClassName : ''}`}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            transform: 'translateZ(0)',
          }}
        >
          {part}
        </span>
      )
    })
  }

  // Recursively process children to preserve <br />, <span>, etc.
  const processNodes = (node, keyPrefix = 'node') => {
    if (typeof node === 'string') {
      return wrapString(node, keyPrefix)
    }
    if (Array.isArray(node)) {
      return node.map((child, idx) => processNodes(child, `${keyPrefix}-${idx}`))
    }
    if (React.isValidElement(node)) {
      if (node.type === 'br') {
        return node
      }
      return React.cloneElement(
        node,
        { key: node.key || keyPrefix },
        processNodes(node.props.children, `${keyPrefix}-c`)
      )
    }
    return node
  }

  return (
    <Component
      ref={containerRef}
      className={`blur-reveal-wrapper ${className}`}
      style={style}
      {...props}
    >
      {processNodes(children)}
    </Component>
  )
}
