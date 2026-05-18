import { useCallback, useEffect, useState } from 'react'

export interface UseScrollAnimationResult<T extends Element> {
  ref: (element: T | null) => void
  isInView: boolean
}

export function useScrollAnimation<T extends Element>(
  observerOptions?: IntersectionObserverInit,
): UseScrollAnimationResult<T> {
  const [node, setNode] = useState<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!node) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      const active = Boolean(entry?.isIntersecting || (entry?.intersectionRatio ?? 0) > 0)
      setIsIntersecting(active)
    }, observerOptions)

    observer.observe(node)

    return () => observer.disconnect()
  }, [node, observerOptions])

  const ref = useCallback((element: T | null) => {
    setNode(element)
  }, [])

  const isInView = node !== null && isIntersecting

  return { ref, isInView }
}
