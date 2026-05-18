import { motion, type Variants } from 'framer-motion'

export interface FestivalScheduleProps {
  schedule: Array<{ time: string; event: string }>
  className?: string
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
}

export default function FestivalSchedule({ schedule, className }: FestivalScheduleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={listVariants}
      className={className}
    >
      <div className="relative">
        <div className="absolute left-[4.85rem] top-2 hidden h-[calc(100%-0.75rem)] w-px bg-gradient-to-b from-gold-400 via-peacock-500 to-gold-400 md:block" />
        <ol className="space-y-6">
          {schedule.map((slot, idx) => (
            <motion.li
              variants={rowVariants}
              key={`${slot.time}-${idx}`}
              className="relative flex flex-col gap-3 md:flex-row md:gap-12"
            >
              <div className="flex items-center md:w-44">
                <span className="inline-flex rounded-full bg-gradient-to-br from-gold-500 to-saffron px-5 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-maroon shadow">
                  {slot.time}
                </span>
              </div>
              <div className="flex flex-1 items-start gap-3">
                <span className="mt-1 hidden h-3 w-3 rounded-full border-2 border-gold-600 bg-maroon shadow md:inline-flex md:shrink-0" aria-hidden />
                <div className="rounded-3xl border border-white/35 bg-white/70 p-4 shadow-md backdrop-blur md:p-6">
                  <p className="font-heading text-lg text-maroon">{slot.event}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}
