import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface AnimatedNumberProps {
  value: number
  /** suffix like "+" */
  suffix?: string
  duration?: number
  className?: string
}

/** Counts up from 0 to `value` when scrolled into view. */
export default function AnimatedNumber({
  value,
  suffix = '',
  duration = 1600,
  className = '',
}: AnimatedNumberProps) {
  const { ref, visible } = useReveal<HTMLSpanElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!visible) return
    let raf = 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setDisplay(value))
      return () => cancelAnimationFrame(raf)
    }
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, value, duration])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
