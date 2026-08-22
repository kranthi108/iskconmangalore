import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { formatCurrency } from '@/utils/formatCurrency'
import { cn } from '@/utils/cn'

export interface DonationAmountSelectorProps {
  amounts: number[]
  selectedAmount: number | null
  onSelect: (amount: number | null) => void
  customAmount: string
  onCustomAmountChange: (value: string) => void
  onDonate?: (amount: number) => void
  className?: string
  minAmount?: number
}

export default function DonationAmountSelector({
  amounts,
  selectedAmount,
  onSelect,
  customAmount,
  onCustomAmountChange,
  onDonate,
  className,
  minAmount = 1,
}: DonationAmountSelectorProps) {
  const parsedCustom = Number.parseFloat(customAmount.replace(/,/g, ''))
  const resolvedAmount =
    selectedAmount ?? (Number.isFinite(parsedCustom) && parsedCustom >= minAmount ? Math.round(parsedCustom) : null)
  const canDonate = resolvedAmount !== null && resolvedAmount >= minAmount

  return (
    <Card className={cn('border border-gold-400/30 bg-gradient-to-br from-cream via-white to-peacock-50 shadow-xl', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-maroon/90 text-gold-400 shadow-md">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="font-heading text-lg font-semibold text-maroon sm:text-xl">Choose your offering</h3>
          <p className="text-sm text-peacock-900/75">Every rupee becomes flowers, lamps, and sanctified prasadam for the Lord.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amounts.map((amount) => {
          const active = selectedAmount === amount
          return (
            <motion.div key={amount} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant={active ? 'maroon' : 'outline'}
                size="lg"
                className="w-full justify-center border-2 font-semibold tracking-wide"
                onClick={() => {
                  onSelect(amount)
                  onCustomAmountChange(String(amount))
                }}
                aria-pressed={active}
              >
                {formatCurrency(amount)}
              </Button>
            </motion.div>
          )
        })}
      </div>
      <div className="mt-6">
        <Input
          label="Custom amount"
          inputMode="decimal"
          placeholder={`Enter any amount more than ${formatCurrency(minAmount)}`}
          value={customAmount}
          onChange={(e) => {
            const next = e.target.value.replace(/[^0-9.]/g, '')
            onCustomAmountChange(next)
            onSelect(null)
          }}
        />
      </div>
      {onDonate && (
        <motion.div className="mt-6" whileTap={canDonate ? { scale: 0.98 } : undefined}>
          <Button
            type="button"
            variant="maroon"
            size="lg"
            className="w-full justify-center gap-2"
            disabled={!canDonate}
            onClick={() => {
              if (canDonate && resolvedAmount) onDonate(resolvedAmount)
            }}
          >
            <Heart className="h-5 w-5 fill-current" aria-hidden />
            Donate{resolvedAmount ? ` ${formatCurrency(resolvedAmount, { maximumFractionDigits: 0 })}` : ''}
          </Button>
        </motion.div>
      )}
    </Card>
  )
}
