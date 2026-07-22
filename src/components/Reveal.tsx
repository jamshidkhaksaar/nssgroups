import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  /** stagger delay in ms */
  delay?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/** Scroll-into-view reveal wrapper (see `.nss-reveal-io` in index.css). */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const Tag = as as 'div'
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {}
  return (
    <Tag
      ref={ref}
      style={style}
      className={`nss-reveal-io ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
