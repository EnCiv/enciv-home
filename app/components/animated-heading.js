// https://github.com/EnCiv/enciv-home/issues/5
// https://github.com/EnCiv/enciv-home/issues/41
// https://github.com/EnCiv/enciv-home/issues/80
import { useEffect, useRef, useState } from 'react'
import { headingMotion } from '../theme'

export function useRevealOnView(threshold = 0.25) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function getRevealTiming(text) {
  const steps = Math.max(Array.from(String(text)).length, 1)
  const duration = Math.min(
    headingMotion.maxTypeDuration,
    Math.max(headingMotion.minTypeDuration, steps * headingMotion.typeDurationPerCharacter)
  )
  return { steps, duration }
}

export function getAnimatedHeadingStyles({ isVisible, duration, steps, enabled = true }) {
  const shouldAnimate = enabled && isVisible
  return {
    opacity: enabled && !isVisible ? 0 : 1,
    clipPath: shouldAnimate ? 'inset(0)' : 'none',
    animation: shouldAnimate
      ? `$titleFade ${headingMotion.fadeDuration} ${headingMotion.fadeEasing} both, $titleType ${duration}s steps(${steps}, end) both`
      : 'none',
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      clipPath: 'none',
      animation: 'none',
    },
  }
}

export const titleRevealKeyframes = {
  '@keyframes titleFade': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes titleType': {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: { clipPath: 'inset(0)' },
  },
}