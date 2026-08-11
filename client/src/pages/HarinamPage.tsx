import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, BookOpen, Calendar, Clock, Download, Loader2, MapPin, Phone, Search, Send, Sparkles, Trophy, Users, X } from 'lucide-react'
import * as XLSX from 'xlsx'
import { Helmet } from 'react-helmet-async'
import namjapBg from '@/assets/namjap.jpg'
import HeroBanner from '@/components/layout/HeroBanner'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Toast, { type ToastData } from '@/components/ui/Toast'
import { cn } from '@/utils/cn'
import {
  getHarinamStats,
  getLeaderboard,
  getDevoteeActivity,
  searchDevoteNames,
  submitHarinam,
  type HarinamStats,
  type LeaderboardEntry,
  type ActivityEntry,
  type DevoteSuggestion,
} from '@/services/harinamService'

type LeaderboardScope = 'today' | 'overall'

// ── Bell sound ───────────────────────────────────────────────────────────────
// Replace with a different file path if you ever swap the audio clip.
const BELL_SOUND_SRC = '/sounds/harekrishnamantra-prabhupad.mp3'

const DEFAULT_STATS: HarinamStats = { totalRounds: 0, totalDevotees: 0, todayRounds: 0, todayDevotees: 0, deadline: '2026-08-15T23:59:59+05:30' }

function LeaderboardScopeTabs({
  value,
  onChange,
}: {
  value: LeaderboardScope
  onChange: (scope: LeaderboardScope) => void
}) {
  const tabs: { id: LeaderboardScope; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'overall', label: 'Overall' },
  ]

  return (
    <div className="mx-auto mt-8 flex w-full max-w-xs rounded-xl border border-peacock-200 bg-peacock-50/50 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-peacock-300',
            value === tab.id ? 'text-white' : 'text-peacock-700 hover:text-peacock-900',
          )}
        >
          {value === tab.id && (
            <motion.span
              layoutId="harinam-leaderboard-tab"
              className="absolute inset-0 rounded-lg bg-peacock-600 shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [displayed, setDisplayed] = useState(0)
  const prevValue = useRef(0)

  useEffect(() => {
    if (value === prevValue.current) return
    const from = prevValue.current
    prevValue.current = value
    const duration = 1500
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(from + (value - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="-mt-1 font-heading text-4xl font-bold tabular-nums leading-none text-white sm:text-5xl">
        {displayed.toLocaleString('en-IN')}
      </span>
      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-gold-200">{label}</span>
    </div>
  )
}

function CountdownTimer({ deadline }: { deadline: string }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const target = new Date(deadline).getTime()
  const diff = Math.max(0, target - now)
  const totalSec = Math.floor(diff / 1000)
  const days = Math.floor(totalSec / 86400)
  const hrs = Math.floor((totalSec % 86400) / 3600)
  const mins = Math.floor((totalSec % 3600) / 60)
  const secs = totalSec % 60

  if (diff <= 0) {
    return <span className="text-sm font-semibold text-gold-200">Yagna Concluded</span>
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  if (days > 0) {
    return (
      <div className="flex items-center gap-2 text-cream">
        <Clock className="h-4 w-4 shrink-0 text-gold-200" />
        <span className="text-base font-bold leading-none tabular-nums">{days}</span>
        <span className="text-xs leading-none text-gold-200/80">{days === 1 ? 'day' : 'days'} left</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 text-cream">
      <Clock className="h-4 w-4 shrink-0 text-gold-200" />
      <span className="text-base font-bold leading-none tabular-nums">
        {pad(hrs)}:{pad(mins)}:{pad(secs)}
      </span>
    </div>
  )
}

function ActivityModal({ entry, onClose }: { entry: { devoteName: string; phoneLast4: string } | null; onClose: () => void }) {
  const [rows, setRows] = useState<ActivityEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!entry) return
    setLoading(true)
    setRows([])
    getDevoteeActivity(entry.devoteName, entry.phoneLast4)
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false))
  }, [entry])

  useEffect(() => {
    if (!entry) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [entry, onClose])

  if (!entry) return null

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          className="relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-gold-200/30 bg-cream shadow-2xl"
        >
          <div className="bg-gradient-to-r from-maroon to-peacock-900 px-6 py-5 text-cream">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-gold-200" />
                <div>
                  <h2 className="font-heading text-lg font-semibold leading-tight">{entry.devoteName}</h2>
                  <p className="text-xs text-gold-200/80">Japa Activity Log</p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-peacock-50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-peacock-200">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-7 w-7 animate-spin text-peacock-400" />
              </div>
            ) : rows.length === 0 ? (
              <p className="py-10 text-center text-sm text-peacock-500">No activity records found.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 border-b border-peacock-100 bg-peacock-50/90 text-xs uppercase tracking-wider text-peacock-700 backdrop-blur-sm">
                  <tr>
                    <th className="px-5 py-3 font-semibold">#</th>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3 text-right font-semibold">Rounds</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.id} className="border-b border-peacock-50 transition-colors hover:bg-peacock-50/40">
                      <td className="px-5 py-3 text-peacock-500">{i + 1}</td>
                      <td className="px-5 py-3 text-peacock-800">{formatDate(row.chantedOn)}</td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums text-maroon">{row.rounds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {rows.length > 0 && (
            <div className="border-t border-peacock-100 bg-peacock-50/50 px-5 py-3 text-right text-xs font-semibold text-peacock-600">
              Total entries: {rows.length} &nbsp;·&nbsp; Total rounds:{' '}
              <span className="text-maroon">{rows.reduce((s, r) => s + r.rounds, 0).toLocaleString('en-IN')}</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function SubmitModal({ open, onClose, onSuccess, expired }: { open: boolean; onClose: () => void; onSuccess: (msg: string) => void; expired: boolean }) {
  const [devoteName, setDevoteName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [rounds, setRounds] = useState('')
  const [chantedOn, setChantedOn] = useState(() => new Date().toISOString().slice(0, 10))
  const [suggestions, setSuggestions] = useState<DevoteSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [isFocused, setIsFocused] = useState(false);
  const minDate = new Date(2026, 4, 31) // Month is 0-based, so 4 = May
    .toISOString()
    .slice(0, 10);

  const maskPhone = (value: string) => {
    if (value.length <= 4) return value;
    return '∗∗∗∗∗∗' + value.slice(-4);
  };
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  function handleNameChange(val: string) {
    setDevoteName(val)
    setError(null)
    clearTimeout(debounceRef.current)
    if (val.length >= 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          const data = await searchDevoteNames(val)
          setSuggestions(data)
          setShowSuggestions(data.length > 0)
        } catch {
          setSuggestions([])
        }
      }, 300)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function selectSuggestion(s: DevoteSuggestion) {
    setDevoteName(s.devoteName)
    setPhone(s.phone)
    setCity(s.city)
    setShowSuggestions(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!devoteName.trim() || !phone.trim() || !city.trim() || !rounds || !chantedOn) return

    setSubmitting(true)
    setError(null)
    try {
      await submitHarinam({
        devoteName: devoteName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        rounds: Number(rounds),
        chantedOn,
      })
      setRounds('')
      setChantedOn(new Date().toISOString().slice(0, 10))
      onClose()
      onSuccess('Hare Krishna! Your japa rounds have been recorded.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold-200/30 bg-cream shadow-2xl"
        >
          <div className="bg-gradient-to-r from-maroon to-peacock-900 px-6 py-5 text-cream">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-gold-200" />
                <h2 className="font-heading text-xl font-semibold">Submit Japa Rounds</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {expired ? (
            <div className="p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-peacock-300" />
              <h3 className="mt-4 font-heading text-xl text-maroon">Yagna Concluded</h3>
              <p className="mt-2 text-sm text-peacock-600">The Harinam Japa Yagna has concluded. Thank you for your devotion!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="relative">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-peacock-800">Devotee Name</label>
                <input
                  type="text"
                  value={devoteName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="e.g. Madhava Das"
                  required
                  className="w-full rounded-xl border border-peacock-200 bg-white px-4 py-3 text-peacock-950 outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20"
                />
                {showSuggestions && (
                  <ul className="absolute left-0 right-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-xl border border-peacock-200 bg-white shadow-lg">
                    {suggestions.map((s) => (
                      <li key={`${s.devoteName}-${s.phone}`}>
                        <button
                          type="button"
                          onMouseDown={() => selectSuggestion(s)}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-peacock-50"
                        >
                          <span className="font-semibold text-peacock-900">{s.devoteName}</span>
                          <span className="flex items-center gap-1 text-xs text-peacock-600">
                            <MapPin className="h-3 w-3" /> {s.city}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-peacock-800">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-peacock-400" />
                  <input
                    type="tel"
                    value={isFocused ? phone : maskPhone(phone)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
//                     value={phone}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                            setPhone(value);
                        }}
                    placeholder="e.g. 9876543210"
                    required
                    minLength={10}
                    maxLength={20}
                    className="w-full rounded-xl border border-peacock-200 bg-white py-3 pl-11 pr-4 text-peacock-950 outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-peacock-800">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mangalore"
                  required
                  className="w-full rounded-xl border border-peacock-200 bg-white px-4 py-3 text-peacock-950 outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-peacock-800">Rounds Chanted</label>
                  <input
                    type="number"
                    min={1}
                    max={192}
                    value={rounds}
                    onChange={(e) => setRounds(e.target.value)}
                    placeholder="16"
                    required
                    className="w-full rounded-xl border border-peacock-200 bg-white px-4 py-3 text-peacock-950 outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-peacock-800">Date</label>
                  <input
                    type="date"
                    value={chantedOn}
                    onChange={(e) => setChantedOn(e.target.value)}
                    min={minDate}
                    max={new Date().toISOString().slice(0, 10)}
                    required
                    className="w-full rounded-xl border border-peacock-200 bg-white px-4 py-3 text-peacock-950 outline-none transition focus:border-maroon focus:ring-2 focus:ring-maroon/20"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="maroon"
                size="lg"
                className="w-full"
                leftIcon={submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Japa Entry'}
              </Button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function HarinamPage() {
  const [stats, setStats] = useState<HarinamStats>(DEFAULT_STATS)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [leaderboardScope, setLeaderboardScope] = useState<LeaderboardScope>('today')
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)
  const [bellPlaying, setBellPlaying] = useState(false)
  const bellAudioRef = useRef<HTMLAudioElement | null>(null)

  function playBell() {
    const audio = new Audio(BELL_SOUND_SRC)
    audio.loop = true
    bellAudioRef.current = audio
    audio.play()
      .then(() => setBellPlaying(true))
      .catch(() => { bellAudioRef.current = null })
  }

  function stopBell() {
    bellAudioRef.current?.pause()
    if (bellAudioRef.current) bellAudioRef.current.currentTime = 0
    setBellPlaying(false)
  }

  function toggleBell() {
    if (bellPlaying) { stopBell(); return }
    playBell()
  }

  useEffect(() => {
    playBell()
    return () => { stopBell() }
  }, [])

  const scopedLeaderboard = useMemo(() => {
    const list = leaderboardScope === 'today'
      ? leaderboard.filter((e) => e.todayRounds > 0)
      : leaderboard
    return [...list].sort((a, b) => {
      const aRounds = leaderboardScope === 'today' ? a.todayRounds : a.totalRounds
      const bRounds = leaderboardScope === 'today' ? b.todayRounds : b.totalRounds
      return bRounds - aRounds
    })
  }, [leaderboard, leaderboardScope])

  const filteredLeaderboard = useMemo(() => {
    if (!searchQuery.trim()) return scopedLeaderboard
    const q = searchQuery.trim().toLowerCase()
    return scopedLeaderboard.filter(
      (e) => e.devoteName.toLowerCase().includes(q) || e.city.toLowerCase().includes(q),
    )
  }, [scopedLeaderboard, searchQuery])

  const downloadExcel = useCallback(() => {
    const data = searchQuery.trim() ? filteredLeaderboard : scopedLeaderboard
    const rows = data.map((e, i) => ({
      '#': i + 1,
      'Devotee': e.devoteName,
      'City': e.city,
      'Today Rounds': e.todayRounds,
      'Total Rounds': e.totalRounds,
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Leaderboard')
    XLSX.writeFile(wb, `harinam-leaderboard-${leaderboardScope}.xlsx`)
  }, [scopedLeaderboard, filteredLeaderboard, searchQuery, leaderboardScope])

  const expired = useMemo(() => Date.now() > new Date(stats.deadline).getTime(), [stats.deadline])

  const fetchStats = useCallback(async () => {
    try {
      const data = await getHarinamStats()
      setStats(data)
    } catch { /* ignore */ }
  }, [])

  const fetchLeaderboard = useCallback(async (p: number, append = false) => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)
    try {
      const data = await getLeaderboard(p, 1500)
      setLeaderboard((prev) => append ? [...prev, ...data.leaderboard] : data.leaderboard)
      setHasMore(data.pagination.hasMore)
      setPage(p)
    } catch { /* ignore */ }
    loadingRef.current = false
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchStats()
    fetchLeaderboard(1)
  }, [fetchStats, fetchLeaderboard])

  useEffect(() => {
    setSearchQuery('')
  }, [leaderboardScope])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          fetchLeaderboard(page + 1, true)
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, page, fetchLeaderboard])

  const [toast, setToast] = useState<ToastData | null>(null)
  const [activityEntry, setActivityEntry] = useState<{ devoteName: string; phoneLast4: string } | null>(null)

  function handleSubmitSuccess(message: string) {
    fetchStats()
    fetchLeaderboard(1)
    setToast({ message, type: 'success' })
  }

  return (
    <>
      {toast && <Toast {...toast} onDismiss={() => setToast(null)} />}
      <Helmet>
        <title>Harinam Japa Yagna - Sri Krishna Janmashtami - ISKCON Mangalore</title>
        <meta name="description" content="Join thousands of devotees in the Harinam Japa Yagna for Sri Krishna Janmashtami. Chant, submit your rounds, and see the global leaderboard." />
      </Helmet>

      <HeroBanner
        title={<><span className="block font-heading text-5xl font-bold tabular-nums text-gold-200 sm:text-7xl">{(stats.totalRounds * 1728).toLocaleString('en-IN')}</span><span className="block text-lg font-normal tracking-wide text-gold-200/80 sm:text-xl">Holy Names Chanted</span>Śatha Koti Harināma Japa Yajña</>}
        subtitle="Unite in chanting the Holy Names for Sri Krishna Janmashtami 2026."
        backgroundImage={namjapBg}
        height="large"
        centered
        topRight={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleBell}
              title={bellPlaying ? 'Stop bell' : 'Play temple bell'}
              className={cn(
                'rounded-full p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300',
                bellPlaying ? 'text-gold-300' : 'text-white/70 hover:text-white',
              )}
            >
              <Bell className={cn('h-5 w-5 shrink-0', bellPlaying && 'animate-[wiggle_0.4s_ease-in-out_infinite]')} />
            </button>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <CountdownTimer deadline={stats.deadline} />
            </div>
          </div>
        }
      >
        <div className="mt-4 flex w-full flex-col items-center gap-5">
          <div className="grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/30 bg-black/55 px-6 py-6 shadow-xl backdrop-blur-md">
              <Sparkles className="h-6 w-6 text-gold-300" />
              <AnimatedCounter value={stats.totalRounds} label="Total Rounds" />
              <div className="mt-1 rounded-full border border-gold-300/40 bg-black/30 px-3 py-1">
                <span className="text-xs font-semibold tabular-nums text-gold-200">
                  Today: {stats.todayRounds.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/30 bg-black/55 px-6 py-6 shadow-xl backdrop-blur-md">
              <Users className="h-6 w-6 text-gold-300" />
              <AnimatedCounter value={stats.totalDevotees} label="Devotees Joined" />
              <div className="mt-1 rounded-full border border-gold-300/40 bg-black/30 px-3 py-1">
                <span className="text-xs font-semibold tabular-nums text-gold-200">
                  Today: {stats.todayDevotees.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
            <div></div>
          {!expired && (
            <Button
              type="button"
              variant="secondary"
              size="xl"
              leftIcon={<BookOpen className="h-5 w-5" />}
              onClick={() => setModalOpen(true)}
            >
              Submit Your Japa Rounds
            </Button>
          )}
        </div>
      </HeroBanner>

      <section className="bg-gradient-to-b from-cream to-white py-16">
        <Container size="lg">
          <SectionHeading
            title="Leaderboard of Devotion"
            subtitle="Top chanters offering their hearts through the Maha-mantra"
            decorative
          />

          <LeaderboardScopeTabs value={leaderboardScope} onChange={setLeaderboardScope} />

          {loading && leaderboard.length === 0 && (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-peacock-400" />
            </div>
          )}

          {scopedLeaderboard.length > 0 && (
            <>
              {/* Top 3 podium cards */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {scopedLeaderboard.slice(0, 3).map((entry, idx) => {
                  const medals = ['bg-gradient-to-br from-gold-400 to-gold-200', 'bg-gradient-to-br from-gray-300 to-gray-100', 'bg-gradient-to-br from-amber-600 to-amber-400']
                  const ranks = ['1st', '2nd', '3rd']
                  return (
                    <motion.div
                      key={entry.devoteName}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        'relative overflow-hidden rounded-2xl border p-6 text-center shadow-md',
                        idx === 0 ? 'border-gold-300 bg-gradient-to-b from-gold-50 to-cream sm:order-2 sm:-mt-4 sm:scale-105' : 'border-peacock-100 bg-white',
                        idx === 1 && 'sm:order-1',
                        idx === 2 && 'sm:order-3',
                      )}
                    >
                      <div className={cn('mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-md', medals[idx])}>
                        {ranks[idx]}
                      </div>
                      <h3 className="mt-4 font-heading text-xl font-semibold text-maroon">{entry.devoteName}</h3>
                      <p className="mt-1 flex items-center justify-center gap-1 text-sm text-peacock-700">
                        <MapPin className="h-3.5 w-3.5" /> {entry.city}
                      </p>
                      <p className="mt-3 font-heading text-3xl font-bold text-peacock-900">
                        {(leaderboardScope === 'today' ? entry.todayRounds : entry.totalRounds).toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-peacock-600">
                        {leaderboardScope === 'today' ? 'rounds today' : 'total rounds'}
                      </p>
                      {leaderboardScope === 'overall' && entry.todayRounds > 0 && (
                        <p className="mt-1 text-xs font-semibold text-maroon/70">Today: {entry.todayRounds.toLocaleString('en-IN')}</p>
                      )}
                      {leaderboardScope === 'today' && entry.totalRounds > entry.todayRounds && (
                        <p className="mt-1 text-xs font-semibold text-maroon/70">Total: {entry.totalRounds.toLocaleString('en-IN')}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => setActivityEntry({ devoteName: entry.devoteName, phoneLast4: entry.phoneLast4 })}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-peacock-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-peacock-700 transition-colors hover:bg-peacock-50 hover:text-peacock-900"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        View Activity
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Search + remaining devotees table */}
              {scopedLeaderboard.length > 3 && (
                <>
                  <div className="mt-10 flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-peacock-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or city…"
                        className="w-full rounded-xl border border-peacock-200 bg-white py-2.5 pl-11 pr-4 text-sm text-peacock-900 placeholder:text-peacock-400 focus:border-peacock-400 focus:outline-none focus:ring-2 focus:ring-peacock-200"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={downloadExcel}
                      className="inline-flex items-center gap-2 rounded-xl border border-peacock-200 bg-white px-4 py-2.5 text-sm font-medium text-peacock-700 transition-colors hover:bg-peacock-50 focus:outline-none focus:ring-2 focus:ring-peacock-200"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>

                  <div className="mt-3 rounded-2xl border border-peacock-100 bg-white shadow-sm">
                    <table className="w-full table-fixed text-left text-sm">
                      <colgroup>
                        <col className="w-14" />
                        <col />
                        <col className="hidden w-[22%] sm:table-column" />
                        <col className="w-[12%]" />
                        <col className="w-[12%]" />
                        <col className="w-[10%] sm:w-[130px]" />
                      </colgroup>
                      <thead>
                        <tr className="border-b border-peacock-100 bg-peacock-50/50 text-xs uppercase tracking-wider text-peacock-700">
                          <th className="px-4 py-3.5 text-center font-semibold">#</th>
                          <th className="px-5 py-3.5 font-semibold">Devotee</th>
                          <th className="hidden px-5 py-3.5 font-semibold sm:table-cell">City</th>
                          <th className="px-5 py-3.5 text-right font-semibold">Today</th>
                          <th className="px-5 py-3.5 text-right font-semibold">Total</th>
                          <th className="px-4 py-3.5 text-center font-semibold">Activity</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="max-h-[480px] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-peacock-50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-peacock-200">
                      <table className="w-full table-fixed text-left text-sm">
                        <colgroup>
                          <col className="w-14" />
                          <col />
                          <col className="hidden w-[22%] sm:table-column" />
                          <col className="w-[12%]" />
                          <col className="w-[12%]" />
                          <col className="w-[10%] sm:w-[130px]" />
                        </colgroup>
                        <tbody>
                          {(searchQuery.trim() ? filteredLeaderboard : scopedLeaderboard.slice(3)).map((entry, idx) => (
                            <motion.tr
                              key={`${entry.devoteName}-${idx}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="border-b border-peacock-50 transition-colors hover:bg-peacock-50/40"
                            >
                              <td className="px-4 py-3.5 text-center">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-peacock-100 text-xs font-bold text-peacock-800">
                                  {searchQuery.trim() ? idx + 1 : idx + 4}
                                </span>
                              </td>
                              <td className="px-5 py-3.5">
                                <span className="font-semibold text-peacock-900">{entry.devoteName}</span>
                                <span className="ml-2 text-xs text-peacock-500 sm:hidden">{entry.city}</span>
                              </td>
                              <td className="hidden px-5 py-3.5 text-peacock-600 sm:table-cell">{entry.city}</td>
                              <td className="px-5 py-3.5 text-right tabular-nums text-peacock-700">
                                {entry.todayRounds > 0 ? entry.todayRounds.toLocaleString('en-IN') : '—'}
                              </td>
                              <td className="px-5 py-3.5 text-right font-bold tabular-nums text-maroon">{entry.totalRounds.toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => setActivityEntry({ devoteName: entry.devoteName, phoneLast4: entry.phoneLast4 })}
                                  className="inline-flex items-center gap-1 rounded-lg border border-peacock-200 bg-peacock-50 px-2.5 py-1.5 text-xs font-semibold text-peacock-700 transition-colors hover:bg-peacock-100 hover:text-peacock-900"
                                >
                                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                                  <span className="hidden sm:inline">View</span>
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                          {searchQuery.trim() && filteredLeaderboard.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-5 py-8 text-center text-sm text-peacock-500">
                                {`No devotees found matching "${searchQuery}"`}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              <div ref={sentinelRef} className="flex items-center justify-center py-6">
                {loading && <Loader2 className="h-6 w-6 animate-spin text-peacock-400" />}
                {!hasMore && scopedLeaderboard.length > 0 && (
                  <p className="text-sm text-peacock-500">Hare Krishna! All devotees displayed.</p>
                )}
              </div>
            </>
          )}

          {scopedLeaderboard.length === 0 && !loading && (
            <div className="mt-12 rounded-2xl border border-dashed border-peacock-200 bg-peacock-50/30 p-12 text-center">
              <Trophy className="mx-auto h-12 w-12 text-peacock-300" />
              <h3 className="mt-4 font-heading text-xl text-peacock-800">
                {leaderboardScope === 'today' ? 'No submissions today yet' : 'Be the first to chant!'}
              </h3>
              <p className="mt-2 text-peacock-600">
                {leaderboardScope === 'today'
                  ? 'No devotees have submitted japa rounds today. Switch to Overall or submit yours now.'
                  : 'No entries yet. Submit your japa rounds and inspire others.'}
              </p>
              {!expired && (
                <Button type="button" variant="maroon" size="lg" className="mt-6" onClick={() => setModalOpen(true)}>
                  Submit Japa Rounds
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-gradient-to-br from-peacock-900 via-maroon to-peacock-900 py-16 text-cream">
        <Container size="md" className="text-center">
          <SectionHeading
            alignment="center"
            title="How it works"
            decorative
            className="text-cream [&_h2]:text-cream [&_p]:text-gold-100/85"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { step: '1', title: 'Chant and Hear', desc: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare.' },
              { step: '2', title: 'Count', desc: 'Count your japa rounds (1 round = 108 times Full Hare Krishna Mahamantra Japa).' },
              { step: '3', title: 'Submit', desc: 'Submit the number of rounds you chanted on daily basis in this page.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 font-bold text-maroon shadow">
                  {item.step}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-gold-200">{item.title}</h3>
                <p className="mt-2 text-sm text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-12 text-center">
        <Container size="sm">
          <p className="font-heading text-xl italic text-maroon">
            "Hare Krishna Hare Krishna Krishna Krishna Hare Hare<br />
            Hare Rama Hare Rama Rama Rama Hare Hare"
          </p>
          <p className="mt-4 text-sm text-peacock-700">This sixteen-word mantra is especially recommended for the present age.</p>
          {!expired && (
            <Button
              type="button"
              variant="maroon"
              size="xl"
              className="mt-8"
              leftIcon={<BookOpen className="h-5 w-5" />}
              onClick={() => setModalOpen(true)}
            >
              Submit Your Japa Rounds
            </Button>
          )}
        </Container>
      </section>

      <ActivityModal entry={activityEntry} onClose={() => setActivityEntry(null)} />
      <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={handleSubmitSuccess} expired={expired} />
    </>
  )
}
