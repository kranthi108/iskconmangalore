import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { cn } from '@/utils/cn'

type ParticleSpec = {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  color: string
  drift: number
}

function randomBetween(min: number, max: number, seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  const frac = x - Math.floor(x)
  return min + frac * (max - min)
}

export interface FloatingParticlesProps {
  className?: string
}

export default function FloatingParticles({ className }: FloatingParticlesProps) {
  const particles = useMemo<ParticleSpec[]>(() => {
    const count = Math.round(randomBetween(20, 30, 1))
    return Array.from({ length: count }, (_, index) => {
      const seed = index + 2
      return {
        id: index,
        left: `${randomBetween(2, 96, seed)}%`,
        size: Math.round(randomBetween(2, 6, seed + 0.3)),
        duration: randomBetween(10, 25, seed + 0.6),
        delay: randomBetween(0, 8, seed + 0.9),
        color: randomBetween(0, 1, seed + 1.2) > 0.45 ? 'bg-gold-400/55' : 'bg-saffron/50',
        drift: randomBetween(-18, 18, seed + 1.5),
      }
    })
  }, [])

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-10 overflow-hidden', className)}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={cn('absolute bottom-[-12px] rounded-full blur-[0.25px]', p.color)}
          style={{ left: p.left, width: p.size, height: p.size }}
          initial={{ opacity: 0.15, y: 0 }}
          animate={{ opacity: [0.15, 0.75, 0.2], y: [-12, -420], x: [0, p.drift] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
