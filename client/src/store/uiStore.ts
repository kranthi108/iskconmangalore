import { create } from 'zustand'
import type { GalleryImage } from '@/types'

interface UiStoreState {
  isMobileMenuOpen: boolean
  isGalleryModalOpen: boolean
  selectedGalleryImage: GalleryImage | null
  toggleMobileMenu: (force?: boolean) => void
  openGalleryModal: (image: GalleryImage) => void
  closeGalleryModal: () => void
}

export const useUiStore = create<UiStoreState>((set) => ({
  isMobileMenuOpen: false,
  isGalleryModalOpen: false,
  selectedGalleryImage: null,
  toggleMobileMenu: (force) =>
    set((state) => ({
      isMobileMenuOpen: typeof force === 'boolean' ? force : !state.isMobileMenuOpen,
    })),
  openGalleryModal: (image) =>
    set({
      isGalleryModalOpen: true,
      selectedGalleryImage: image,
    }),
  closeGalleryModal: () =>
    set({
      isGalleryModalOpen: false,
      selectedGalleryImage: null,
    }),
}))
