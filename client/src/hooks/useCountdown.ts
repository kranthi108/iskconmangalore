import { useMemo, useCallback, useSyncExternalStore } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface UseCountdownOptions {
  /**
   * Stop emitting interval notifications once every counter reaches zero.
   */
  freezeAtZero?: boolean
}

function clampCountdown(deltaMs: number): CountdownParts {
  if (!Number.isFinite(deltaMs) || deltaMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const totalSeconds = Math.floor(deltaMs / 1000)
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function isZero(parts: CountdownParts): boolean {
  return parts.days === 0 && parts.hours === 0 && parts.minutes === 0 && parts.seconds === 0
}

function encodeParts(parts: CountdownParts): string {
  return `${parts.days}|${parts.hours}|${parts.minutes}|${parts.seconds}`
}

const ZERO_KEY = encodeParts({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

function decodeParts(key: string): CountdownParts {
  const [days, hours, minutes, seconds] = key.split('|').map((token) => Number.parseInt(token, 10))

  if ([days, hours, minutes, seconds].some((n) => Number.isNaN(n))) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return { days, hours, minutes, seconds }
}

function resolveTargetInstant(targetDate: Date | string | number | undefined): number {
  if (targetDate === undefined || targetDate === '') {
    return Number.NaN
  }

  if (typeof targetDate === 'number') {
    return Number.isFinite(targetDate) ? targetDate : Number.NaN
  }

  if (targetDate instanceof Date) {
    const value = targetDate.getTime()
    return Number.isFinite(value) ? value : Number.NaN
  }

  const parsed = Date.parse(String(targetDate))
  return Number.isFinite(parsed) ? parsed : Number.NaN
}

export function useCountdown(
  targetDate: Date | string | number | undefined,
  options?: UseCountdownOptions,
): CountdownParts {
  const freezeAtZero = options?.freezeAtZero ?? true

  const targetInstant = useMemo(() => resolveTargetInstant(targetDate), [targetDate])

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!Number.isFinite(targetInstant)) {
        return () => {}
      }

      const intervalId = window.setInterval(() => {
        onStoreChange()

        if (!freezeAtZero) {
          return
        }

        const next = clampCountdown(targetInstant - Date.now())
        if (isZero(next)) {
          window.clearInterval(intervalId)
        }
      }, 1000)

      return () => window.clearInterval(intervalId)
    },
    [targetInstant, freezeAtZero],
  )

  const getSnapshot = useCallback(() => {
    if (!Number.isFinite(targetInstant)) {
      return ZERO_KEY
    }

    return encodeParts(clampCountdown(targetInstant - Date.now()))
  }, [targetInstant])

  const getServerSnapshot = useCallback(() => ZERO_KEY, [])

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return useMemo(() => decodeParts(snapshot), [snapshot])
}
