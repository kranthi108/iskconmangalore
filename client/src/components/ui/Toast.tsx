import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

export interface ToastData {
  message: string
  type: 'success' | 'error'
}

interface ToastProps extends ToastData {
  onDismiss: () => void
  duration?: number
}

export default function Toast({ message, type, onDismiss, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  return createPortal(
    <AnimatePresence onExitComplete={onDismiss}>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -40, x: '-50%' }}
          className={cn(
            'fixed left-1/2 top-6 z-[200] flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-lg',
            type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white',
          )}
        >
          {type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
          <span className="text-sm font-medium">{message}</span>
          <button type="button" onClick={() => setVisible(false)} className="ml-2 rounded-full p-1 hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
