import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RoutePoint {
  id: number
  name: string
  description: string
  time: string
  x: number
  y: number
}

// Function to calculate point on cubic bezier curve
function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3
}

// Generate SVG path string from route points
function generatePathString(): string {
  return `M ${routePoints[0].x} ${routePoints[0].y} ` +
    routePoints.slice(1).map((p, i) => {
      const prev = routePoints[i]
      // Smoother, more uniform control points
      const cp1x = prev.x + (p.x - prev.x) * 0.5
      const cp1y = prev.y
      const cp2x = prev.x + (p.x - prev.x) * 0.5
      const cp2y = p.y
      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`
    }).join(' ')
}

// Get position on the bezier path at given progress (0-1)
function getPositionOnPath(progress: number): { x: number; y: number } {
  const totalSegments = routePoints.length - 1
  const segmentProgress = progress * totalSegments
  const currentSegment = Math.floor(segmentProgress)
  const segmentT = segmentProgress - currentSegment
  
  if (currentSegment >= totalSegments) {
    return { x: routePoints[totalSegments].x, y: routePoints[totalSegments].y }
  }
  
  const p0 = routePoints[currentSegment]
  const p1 = routePoints[currentSegment + 1]
  
  // Match the uniform control points from generatePathString
  const cp1x = p0.x + (p1.x - p0.x) * 0.5
  const cp1y = p0.y
  const cp2x = p0.x + (p1.x - p0.x) * 0.5
  const cp2y = p1.y
  
  return {
    x: cubicBezier(segmentT, p0.x, cp1x, cp2x, p1.x),
    y: cubicBezier(segmentT, p0.y, cp1y, cp2y, p1.y),
  }
}

const routePoints: RoutePoint[] = [
  {
    id: 1,
    name: 'Rolling Hills',
    description: 'Procession begins with traditional chants and Mangala Aarati',
    time: '4:00 PM',
    x: 10,
    y: 65,
  },
  {
    id: 2,
    name: 'Radisson Hotel',
    description: 'First major offering point. Flowers, fruits, and water seva',
    time: '5:00 PM',
    x: 26,
    y: 45,
  },
  {
    id: 3,
    name: 'DLF Road',
    description: 'Evening prayers and large-scale Mahaprasadam distribution',
    time: '6:15 PM',
    x: 42,
    y: 55,
  },
  {
    id: 4,
    name: 'Indra Nagar',
    description: 'Short halt for Harinam Sankirtan and community flower offerings',
    time: '6:15 PM',
    x: 58,
    y: 40,
  },
  {
    id: 5,
    name: 'Burugupalli Residency',
    description: 'Night rest stop. Devotional bhajans and crowd hydration squad',
    time: '7:30 PM',
    x: 74,
    y: 50,
  },
  {
    id: 6,
    name: 'ATD Temple',
    description: 'Final arrival of the Ratha. Sandhya Aarati & volunteer clean-up',
    time: '8:30 PM',
    x: 90,
    y: 55,
  },
]

export default function RathaYatraPage() {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(30000)

  // Calculate current point based on progress (0-1) - highlight point when ratha reaches it
  const currentPoint = Math.min(Math.round(progress * (routePoints.length - 1)), routePoints.length - 1)
  
  // Generate path string once
  const pathString = generatePathString()

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0
        return prev + 0.001
      })
    }, speed / 1000)

    return () => clearInterval(interval)
  }, [isPlaying, speed])

  const handlePointClick = (index: number) => {
    setProgress(index / routePoints.length)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-gold-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-maroon py-16 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-gold-400 md:text-6xl"
          >
            Ratha Yatra 2026
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-heading text-xl text-gold-200"
          >
            The Divine Journey of Lord Jagannatha
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 max-w-2xl mx-auto text-gold-100"
          >
            Join us as Lord Jagannatha blesses the streets of Mangalore with His divine presence
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Route Animation Section */}
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="font-heading mb-6 text-3xl font-bold text-maroon">Yatra Procession Route</h2>
          
          {/* Controls */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-lg bg-maroon px-4 py-2 font-heading font-semibold text-white transition-colors hover:bg-maroon-light"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value={60000}>Slow</option>
                <option value={30000}>Normal</option>
                <option value={15000}>Fast</option>
              </select>
            </div>
          </div>

          {/* Route Map */}
          <div className="relative h-[400px] overflow-hidden rounded-xl bg-gradient-to-br from-peacock-50 to-peacock-100 border-2 border-peacock-200">
            {/* Route Path - draw smooth curve through route points */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
              {/* Draw smooth curve through all points */}
              <path
                d={pathString}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Route Points */}
            {routePoints.map((point, index) => (
              <motion.button
                key={point.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handlePointClick(index)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 transition-all ${
                  currentPoint === index
                    ? 'h-12 w-12 border-maroon bg-maroon shadow-lg shadow-maroon/50'
                    : 'h-8 w-8 border-gold-500 bg-gold-400'
                }`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                title={point.name}
              >
                <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                  {point.id}
                </span>
              </motion.button>
            ))}

            {/* Ratha Icon - positioned using bezier calculation to match SVG path exactly */}
            <motion.div
              className="absolute z-10"
              animate={{
                left: `${getPositionOnPath(progress).x}%`,
                top: `${getPositionOnPath(progress).y}%`,
              }}
              transition={{ duration: 0.05, ease: "linear" }}
            >
              <div className="relative transform -translate-x-1/2 -translate-y-1/2">
                {/* People pulling the chariot */}
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ x: [0, -5, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                      className="text-2xl"
                    >
                      🙏
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl"
                >
                  🛕
                </motion.div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-2xl">
                  🎡
                </div>
              </div>
            </motion.div>

            {/* Current Point Info Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPoint}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon text-white font-bold">
                    {routePoints[currentPoint].id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-maroon">
                      {routePoints[currentPoint].name}
                    </h3>
                    <p className="text-sm text-gray-600">{routePoints[currentPoint].description}</p>
                    <p className="mt-1 text-sm font-semibold text-peacock-600">
                      🕐 {routePoints[currentPoint].time}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Route Points List */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routePoints.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePointClick(index)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  currentPoint === index
                    ? 'border-maroon bg-maroon/5'
                    : 'border-gray-200 bg-white hover:border-gold-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${
                      currentPoint === index
                        ? 'bg-maroon text-white'
                        : 'bg-gold-400 text-white'
                    }`}
                  >
                    {point.id}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-maroon">{point.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">{point.description}</p>
                    <p className="mt-2 text-sm font-medium text-peacock-600">🕐 {point.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Seva Opportunities Section */}
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="font-heading mb-6 text-3xl font-bold text-maroon">Seva Opportunities</h2>
          <p className="mb-6 text-gray-700">
            Participate in this divine festival by offering your service. Every task is an offering of pure devotion to Lord Jagannatha.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: 'Ratha Pulling Seva', icon: '🙏', desc: 'Pull the sacred ropes of Lord Jagannatha\'s chariot' },
              { title: 'Prasadam Distribution', icon: '🍚', desc: 'Distribute sacred Mahaprasadam to devotees' },
              { title: 'Crowd Management', icon: '👥', desc: 'Help manage the devotee crowd along the route' },
              { title: 'Flower Offering', icon: '🌸', desc: 'Offer flowers to the Lord at various stops' },
              { title: 'Route Preparation', icon: '🛣️', desc: 'Prepare and decorate the procession route' },
              { title: 'Water Distribution', icon: '💧', desc: 'Provide water to devotees during the yatra' },
            ].map((seva, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 rounded-xl border-2 border-gold-200 bg-gold-50 p-4 transition-colors hover:border-gold-400"
              >
                <span className="text-4xl">{seva.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-maroon">{seva.title}</h3>
                  <p className="text-sm text-gray-600">{seva.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="rounded-lg bg-maroon px-8 py-3 font-heading font-semibold text-white transition-colors hover:bg-maroon-light">
              Register for Seva
            </button>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-peacock-600 to-peacock-700 p-6 text-white shadow-xl">
          <h2 className="font-heading mb-4 text-2xl font-bold text-gold-400">About Ratha Yatra</h2>
          <p className="mb-4 text-peacock-100">
            The Sri Jagannatha Ratha Yatra is an ancient and glorious festival of devotion, love, and community. 
            Originating in Puri, Odisha, this sacred chariot procession represents the Lord's longing to visit His devotees.
          </p>
          <p className="mb-4 text-peacock-100">
            It is said that even a slight touch of the chariot's ropes or offering service during the procession 
            clears lifetime karmic bonds and grants immense spiritual liberation.
          </p>
          <p className="text-peacock-100">
            ISKCON Mangalore is bringing this grand celebration to the streets of Mangalore. 
            Come, step forward and participate in this transcendental legacy.
          </p>
        </div>
      </div>
    </div>
  )
}
