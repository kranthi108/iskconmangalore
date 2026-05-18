import { create } from 'zustand'
import type { DonationFormData } from '@/types'

export type DonorInfoFields = Omit<DonationFormData, 'amount'>

interface DonationStoreState {
  selectedAmount: number | null
  customAmount: string
  donorInfo: Partial<DonorInfoFields>
  setAmount: (amount: number | null) => void
  setCustomAmount: (value: string) => void
  setDonorInfo: (patch: Partial<DonorInfoFields>) => void
  reset: () => void
}

export const useDonationStore = create<DonationStoreState>((set) => ({
  selectedAmount: null,
  customAmount: '',
  donorInfo: {},
  setAmount: (amount) =>
    set((state) => ({
      selectedAmount: amount,
      customAmount: amount === null ? state.customAmount : '',
    })),
  setCustomAmount: (value) =>
    set({
      customAmount: value,
      selectedAmount: null,
    }),
  setDonorInfo: (patch) => set((state) => ({ donorInfo: { ...state.donorInfo, ...patch } })),
  reset: () =>
    set({
      selectedAmount: null,
      customAmount: '',
      donorInfo: {},
    }),
}))
